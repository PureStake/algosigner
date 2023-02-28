import algosdk from 'algosdk';

import { extensionBrowser } from '@algosigner/common/chrome';
import { AliasConfig } from '@algosigner/common/config';
import { RequestError } from '@algosigner/common/errors';
import { logging, LogLevel } from '@algosigner/common/logging';
import { Alias, Namespace, NamespaceConfig, SessionObject, SensitiveAccount, WalletStorage } from '@algosigner/common/types';
import { ConnectionDetails, getBaseSupportedNetworks, Network, NetworkTemplate } from '@algosigner/common/types/network';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { ExtensionStorage } from '@algosigner/storage/src/extensionStorage';

import { Settings } from '../config';
import encryptionWrap from '../encryptionWrap';
import Session from '../utils/session';
import AssetsDetailsHelper from '../utils/assetsDetailsHelper';
import { initializeCache, getAvailableNetworksFromCache } from '../utils/helper';
import { ValidationStatus } from '../utils/validator';
import {
  calculateEstimatedFee,
  getValidatedTxnWrap,
  getNetworkNameFromGenesisID,
  getNetworkFromMixedGenesis,
} from '../transaction/actions';
import { BaseValidatedTxnWrap } from '../transaction/baseValidatedTxnWrap';
import { buildTransaction } from '../utils/transactionBuilder';

import { Task } from './task';
import { API, Cache } from './types';

const session = new Session();

export class InternalMethods {
  private static _encryptionWrap: encryptionWrap | undefined;

  public static getAlgod(network: string | NetworkTemplate): algosdk.Algodv2 {
    let connection: ConnectionDetails;
    if (typeof network === 'string') {
      connection = Settings.getBackendParams(network, API.Algod);
    } else {
      connection = Settings.getConnectionFromTemplate(network).algod;
    }
    return new algosdk.Algodv2(connection.apiKey, connection.url, connection.port);
  }

  public static getIndexer(network: string): algosdk.Indexer {
    let connection: ConnectionDetails;
    if (typeof network === 'string') {
      connection = Settings.getBackendParams(network, API.Indexer);
    } else {
      connection = Settings.getConnectionFromTemplate(network).indexer;
    }
    return new algosdk.Indexer(connection.apiKey, connection.url, connection.port);
  }

  private static safeWallet(wallet: WalletStorage): WalletStorage {
    // Intialize the safe wallet then add the wallet networks in as empty arrays
    const safeWallet: WalletStorage = {};
    Object.keys(wallet).forEach((key) => {
      safeWallet[key] = [];

      // Afterwards we can add in all the non-private keys and names into the safeWallet
      for (let j = 0; j < wallet[key].length; j++) {
        const { address, name, isRef } = wallet[key][j];
        safeWallet[key].push({
          address: address,
          name: name,
          isRef: isRef,
        });
      }
    });

    return safeWallet;
  }

  // Load internal aliases (accounts and contacts)
  private static reloadAliases(): void {
    const extensionStorage = new ExtensionStorage();

    extensionStorage.getStorage('contacts', (storedContacts: any) => {
      const aliases = {};
      const wallet = session.wallet;
      const contacts = storedContacts || [];

      // Format contacts as aliases
      const contactAliases = [];
      for (const c of contacts) {
        contactAliases.push({
          name: c.name,
          address: c.address,
          namespace: Namespace.AlgoSigner_Contacts,
        });
      }

      for (const n in Network) {
        // Format accounts as aliases
        const networkAccountAliases = [];
        for (const acc of wallet[n]) {
          networkAccountAliases.push({
            name: acc.name,
            address: acc.address,
            namespace: Namespace.AlgoSigner_Accounts,
          });
        }
        // Save accounts and contacts as aliases
        aliases[n] = {
          [Namespace.AlgoSigner_Accounts]: networkAccountAliases,
          [Namespace.AlgoSigner_Contacts]: contactAliases,
        };
      }

      extensionStorage.setStorage('aliases', aliases, null);
    });
  }

  // Checks if an account for the given address exists on AlgoSigner for a given network.
  public static checkAccountIsImported(genesisID: string, address: string): void {
    const network: string = getNetworkNameFromGenesisID(genesisID);
    let found = false;
    for (let i = session.wallet[network].length - 1; i >= 0; i--) {
      if (session.wallet[network][i].address === address) {
        found = true;
        break;
      }
    }
    if (!found) throw RequestError.NoAccountMatch(address, network);
  }

  private static loadAccountAssetsDetails(address: string, network: Network) {
    const algod = this.getAlgod(network);
    algod
      .accountInformation(address)
      .do()
      .then((res: any) => {
        if ('assets' in res && res.assets.length > 0) {
          AssetsDetailsHelper.add(
            res.assets.map((x) => x['asset-id']),
            network
          );
        }
      })
      .catch((e: any) => {
        console.error(e);
      });
  }

  public static getSessionObject(): SessionObject {
    return session.asObject();
  }

  public static clearSession(): void {
    session.clearSession();
  }

  public static [JsonRpcMethod.GetSession](request: any, sendResponse: Function) {
    this._encryptionWrap = new encryptionWrap('');

    this._encryptionWrap?.checkStorage((exist: boolean) => {
      if (!exist) {
        sendResponse({ exist: false });
      } else {
        if (session.wallet) sendResponse({ exist: true, session: session.asObject() });
        else sendResponse({ exist: true });
      }
    });
    return true;
  }

  public static [JsonRpcMethod.CreateWallet](request: any, sendResponse: Function) {
    const extensionStorage = new ExtensionStorage();

    // Setup initial values for user-stored info
    extensionStorage.setStorage('contacts', [], null);
    const emptyAliases = {
      [Namespace.AlgoSigner_Accounts]: [],
      [Namespace.AlgoSigner_Contacts]: [],
    };
    extensionStorage.setStorage(
      'aliases',
      { [Network.MainNet]: emptyAliases, [Network.MainNet]: emptyAliases },
      null
    );
    const namespaceConfigs: Array<NamespaceConfig> = [];
    const externalNamespaces: Array<string> = AliasConfig.getExternalNamespaces();
    for (const n of externalNamespaces) {
      namespaceConfigs.push({
        name: AliasConfig[n].name,
        namespace: n as Namespace,
        toggle: true,
      });
    }
    extensionStorage.setStorage('namespaces', namespaceConfigs, null);

    const cache = initializeCache();
    extensionStorage.setStorage('cache', cache, null);

    this._encryptionWrap = new encryptionWrap(request.body.params.passphrase);
    const newWallet = {
      [Network.MainNet]: [],
      [Network.TestNet]: [],
    };
    this._encryptionWrap?.lock(JSON.stringify(newWallet), (isSuccessful: any) => {
      if (isSuccessful) {
        session.availableNetworks = getBaseSupportedNetworks();
        session.wallet = this.safeWallet(newWallet); 
        session.network = Network.MainNet;
        sendResponse(session.asObject());
      } else {
        sendResponse({ error: 'Lock failed' });
      }
    });
    return true;
  }

  public static [JsonRpcMethod.DeleteWallet](request: any, sendResponse: Function) {
    const { passphrase } = request.body.params;
    this._encryptionWrap = new encryptionWrap(passphrase);

    this._encryptionWrap.unlock((unlockedValue: any) => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
      } else {
        new ExtensionStorage().clearStorageLocal((res) => {
          if (res) {
            session.clearSession();
            Task.clearPool();
            sendResponse({ response: res });
          } else {
            sendResponse({ error: 'Storage could not be cleared' });
          }
        });
      }
    });
    return true;
  }

  public static [JsonRpcMethod.Login](request: any, sendResponse: Function) {
    this._encryptionWrap = new encryptionWrap(request.body.params.passphrase);
    this._encryptionWrap.unlock((response: any) => {
      if ('error' in response) {
        sendResponse(response);
      } else {
        const wallet = this.safeWallet(response);
        getAvailableNetworksFromCache((availableNetworks: Array<NetworkTemplate>) => {
          const extensionStorage = new ExtensionStorage();
          // Load Accounts details from Cache
          extensionStorage.getStorage('cache', async (storedCache: any) => {
            const cache: Cache = initializeCache(storedCache);
            const cachedNetworkAccounts = Object.keys(cache.accounts);

            for (let j = cachedNetworkAccounts.length - 1; j >= 0; j--) {
              const network = cachedNetworkAccounts[j];
              if (wallet[network]) {
                for (let i = wallet[network].length - 1; i >= 0; i--) {
                  if (wallet[network][i].address in cache.accounts[network]) {
                    wallet[network][i].details = cache.accounts[network][wallet[network][i].address];
                  }
                }
              }
            }

            // Setup session
            session.wallet = wallet;
            session.network = Network.MainNet;
            session.availableNetworks = availableNetworks;

            // Load internal aliases && namespace configurations
            this.reloadAliases();
            extensionStorage.getStorage('namespaces', (response: any) => {
              const namespaceConfigs: Array<NamespaceConfig> = [];

              const externalNamespaces: Array<string> = AliasConfig.getExternalNamespaces();
              for (const n of externalNamespaces) {
                const existingConfigs = response || [];
                const foundConfig = existingConfigs.find((config) => config.namespace === n);
                if (!foundConfig) {
                  namespaceConfigs.push({
                    name: AliasConfig[n].name,
                    namespace: n as Namespace,
                    toggle: true,
                  });
                } else {
                  namespaceConfigs.push(foundConfig);
                }
              }

              extensionStorage.setStorage('namespaces', namespaceConfigs, null);
            });

            sendResponse(session.asObject());
          });
        });
      }
    });
    return true;
  }

  public static [JsonRpcMethod.Logout](request: any, sendResponse: Function) {
    InternalMethods.clearSession();
    Task.clearPool();
    sendResponse(true);
    return true;
  }

  public static [JsonRpcMethod.ClearCache](request: any, sendResponse: Function) {
    const extensionStorage = new ExtensionStorage();
    extensionStorage.setStorage('cache', initializeCache(), (isSuccessful) =>
      sendResponse(isSuccessful)
    );
    return true;
  }

  public static [JsonRpcMethod.CreateAccount](request: any, sendResponse: Function) {
    var keys = algosdk.generateAccount();
    var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
    sendResponse([mnemonic, keys.addr]);
  }

  public static [JsonRpcMethod.SaveAccount](request: any, sendResponse: Function) {
    const { mnemonic, name, ledger: network, address, passphrase } = request.body.params;
    this._encryptionWrap = new encryptionWrap(passphrase);

    this._encryptionWrap.unlock((unlockedValue: any) => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
      } else {
        const newAccount = {
          address: address,
          mnemonic: mnemonic,
          name: name,
        };

        if (!unlockedValue[network]) {
          unlockedValue[network] = [];
        }

        unlockedValue[network].push(newAccount);
        this._encryptionWrap?.lock(JSON.stringify(unlockedValue), (isSuccessful: any) => {
          if (isSuccessful) {
            session.wallet = this.safeWallet(unlockedValue);
            this.reloadAliases();
            sendResponse(session.wallet);
          } else {
            sendResponse({ error: 'Lock failed' });
          }
        });
      }
    });
    return true;
  }

  public static [JsonRpcMethod.DeleteAccount](request: any, sendResponse: Function) {
    const { ledger: network, address, passphrase } = request.body.params;
    this._encryptionWrap = new encryptionWrap(passphrase);

    this._encryptionWrap.unlock((unlockedValue: any) => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
      } else {
        // Find address to delete
        for (var i = unlockedValue[network].length - 1; i >= 0; i--) {
          if (unlockedValue[network][i].address === address) {
            unlockedValue[network].splice(i, 1);
            break;
          }
        }
        this._encryptionWrap?.lock(JSON.stringify(unlockedValue), (isSuccessful: any) => {
          if (isSuccessful) {
            session.wallet = this.safeWallet(unlockedValue);
            this.reloadAliases();
            sendResponse(session.wallet);
          } else {
            sendResponse({ error: 'Lock failed' });
          }
        });
      }
    });
    return true;
  }

  public static [JsonRpcMethod.ImportAccount](request: any, sendResponse: Function) {
    const { mnemonic, address, isRef, name, ledger: network } = request.body.params;
    this._encryptionWrap = new encryptionWrap(request.body.params.passphrase);
    let newAccount: SensitiveAccount;

    try {
      const existingAccounts = session.wallet[network];
      let targetAddress = address;

      if (!isRef) {
        targetAddress = algosdk.mnemonicToSecretKey(mnemonic).addr;
      }

      if (existingAccounts) {
        for (let i = 0; i < existingAccounts.length; i++) {
          if (existingAccounts[i].address === targetAddress) {
            throw new Error(
              `An account with this address already exists in your ${network} wallet.`
            );
          }
          if (existingAccounts[i].name === name) {
            throw new Error(`An account named '${name}' already exists in your ${network} wallet.`);
          }
        }
      }

      newAccount = {
        address: targetAddress,
        mnemonic: !isRef ? mnemonic : null,
        isRef: isRef,
        name: name,
      };
    } catch (error) {
      sendResponse({ error: error.message });
      return false;
    }

    this._encryptionWrap.unlock((unlockedValue: any) => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
      } else {
        if (!unlockedValue[network]) {
          unlockedValue[network] = [];
        }

        unlockedValue[network].push(newAccount);
        this._encryptionWrap?.lock(JSON.stringify(unlockedValue), (isSuccessful: any) => {
          if (isSuccessful) {
            this.loadAccountAssetsDetails(newAccount.address, network);
            session.wallet = this.safeWallet(unlockedValue);
            this.reloadAliases();
            sendResponse(session.wallet);
          } else {
            sendResponse({ error: 'Lock failed' });
          }
        });
      }
    });
    return true;
  }

  public static [JsonRpcMethod.LedgerLinkAddress](request: any, sendResponse: Function) {
    const network = request.body.params.ledger;
    extensionBrowser.tabs.create(
      {
        active: true,
        url: extensionBrowser.extension.getURL(`/index.html#/${network}/ledger-hardware-connector`),
      },
      (tab) => {
        // Tab object is created here, but extension popover will close.
        sendResponse(tab);
      }
    );
    return true;
  }

  public static [JsonRpcMethod.LedgerGetSessionTxn](request: any, sendResponse: Function) {
    if (session.txnRequest && 'body' in session.txnRequest) {
      // The session object gets the transaction validation object from the original request
      sendResponse(session.txnObject);
    } else {
      sendResponse({ error: 'Transaction not found in session.' });
    }
    return true;
  }

  public static [JsonRpcMethod.LedgerSendTxnResponse](request: any, sendResponse: Function) {
    if (session.txnRequest && session.txnObject && request.body?.params?.txn) {
      const signedTxn = request.body.params.txn;
      const txnBuffer = Buffer.from(signedTxn, 'base64');
      const decodedTxn = algosdk.decodeSignedTransaction(txnBuffer);
      const signedTxnEntries = Object.entries(decodedTxn.txn).sort();

      // Get the current session transaction
      const { transactionWraps, ledgerIndexes, currentLedgerTransaction } = session.txnObject;
      const nextIndexToSign = ledgerIndexes[currentLedgerTransaction];
      const sessionTxnToSign = transactionWraps[nextIndexToSign];

      // Set the fee to the estimate we showed on the screen for validation if there is one.
      if (sessionTxnToSign.estimatedFee) {
        sessionTxnToSign.transaction['fee'] = sessionTxnToSign.estimatedFee;
      }
      const sessionTxnEntries = Object.entries(sessionTxnToSign).sort();

      // Update fields in the signed transaction that are not the same format
      for (let i = 0; i < signedTxnEntries.length; i++) {
        if (signedTxnEntries[i][0] === 'from') {
          signedTxnEntries[i][1] = algosdk.encodeAddress(signedTxnEntries[i][1]['publicKey']);
        } else if (signedTxnEntries[i][0] === 'to') {
          signedTxnEntries[i][1] = algosdk.encodeAddress(signedTxnEntries[i][1]['publicKey']);
        } else if (signedTxnEntries[i][1] && signedTxnEntries[i][1].constructor === Uint8Array) {
          signedTxnEntries[i][1] = Buffer.from(signedTxnEntries[i][1]).toString('base64');
        }
      }

      logging.log(`Signed Txn: ${signedTxnEntries}`, LogLevel.Debug);
      logging.log(`Session Txn: ${sessionTxnEntries}`, LogLevel.Debug);

      if (
        signedTxnEntries['amount'] === sessionTxnEntries['amount'] &&
        signedTxnEntries['fee'] === sessionTxnEntries['fee'] &&
        signedTxnEntries['genesisID'] === sessionTxnEntries['genesisID'] &&
        signedTxnEntries['firstRound'] === sessionTxnEntries['firstRound'] &&
        signedTxnEntries['lastRound'] === sessionTxnEntries['lastRound'] &&
        signedTxnEntries['type'] === sessionTxnEntries['type'] &&
        signedTxnEntries['to'] === sessionTxnEntries['to'] &&
        signedTxnEntries['from'] === sessionTxnEntries['from'] &&
        signedTxnEntries['closeRemainderTo'] === sessionTxnEntries['closeRemainderTo']
      ) {
        // Check the original request to see where it comes from
        if (session.txnRequest.source === 'dapp') {
          // If it comes from the dApp, we send the whole original request
          const message = session.txnRequest;
          message.response = signedTxn;

          sendResponse({ message: message });
        } else if (session.txnRequest.source === 'ui') {
          // If this is an UI transaction then we need to submit to the network
          const network = getNetworkNameFromGenesisID(decodedTxn.txn.genesisID);

          const algod = this.getAlgod(network);
          algod
            .sendRawTransaction(txnBuffer)
            .do()
            .then((response: any) => {
              sendResponse({ txId: response.txId });
            })
            .catch((e: any) => {
              if (e.message.includes('overspend')) {
                sendResponse({
                  error: "Overspending. Your account doesn't have sufficient funds.",
                });
              } else if (e.message.includes('below min')) {
                sendResponse({
                  error:
                    'Overspending. This transaction would bring your account below the minimum balance limit.',
                });
              } else {
                sendResponse({ error: e.message });
              }
            });
        } else {
          sendResponse({ error: 'Session transaction does not match the signed transaction.' });
        }
      } else {
        sendResponse({ error: 'Transaction not found in session, unable to validate for send.' });
      }
    }
    return true;
  }

  // Protected because this should only be called from within the ui or dapp sign methods
  protected static [JsonRpcMethod.LedgerSignTransaction](request: any, sendResponse: Function) {
    // Access store here here to save the transaction wrap to cache before the site picks it up.
    // Explicitly saving txnRequest on session instead of auth message for two reasons:
    // 1) So it lives inside background sandbox containment.
    // 2) The extension may close before a proper id on the new tab can allow the data to be saved.
    session.txnRequest = request;
    logging.log('Ledger Sign request:', LogLevel.Debug);
    logging.log(request, LogLevel.Debug);

    // Transaction wrap will contain response message if from dApp and structure will be different
    const txn = session.txnObject.transactionWraps[0].transaction;
    const network = getNetworkFromMixedGenesis(txn.genesisID, txn.genesisHash);
    extensionBrowser.tabs.create(
      {
        active: true,
        url: extensionBrowser.extension.getURL(`/index.html#/${network.name}/ledger-hardware-sign`),
      },
      (tab) => {
        // Tab object is created here, but extension popover will close.
        sendResponse(tab);
      }
    );
  }

  public static [JsonRpcMethod.LedgerSaveAccount](request: any, sendResponse: Function) {
    const { name, ledger: network, passphrase } = request.body.params;
    // The value returned from the Ledger device is hex.
    // This is passed directly to save and needs to be converted.
    const address = algosdk.encodeAddress(Buffer.from(request.body.params.hexAddress, 'hex'));

    this._encryptionWrap = new encryptionWrap(passphrase);
    this._encryptionWrap.unlock((unlockedValue: any) => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
      } else {
        const newAccount = {
          address: address,
          name: name,
          isHardware: true,
        };

        if (!unlockedValue[network]) {
          unlockedValue[network] = [];
        }

        unlockedValue[network].push(newAccount);
        this._encryptionWrap?.lock(JSON.stringify(unlockedValue), (isSuccessful: any) => {
          if (isSuccessful) {
            session.wallet = this.safeWallet(unlockedValue);
            sendResponse(session.wallet);
          } else {
            sendResponse({ error: 'Lock failed' });
          }
        });
      }
    });
    return true;
  }

  public static [JsonRpcMethod.AccountDetails](request: any, sendResponse: Function) {
    const { ledger: network, address } = request.body.params;
    const algod = this.getAlgod(network);
    algod
      .accountInformation(address)
      .do()
      .then((res: any) => {
        const extensionStorage = new ExtensionStorage();
        extensionStorage.getStorage('cache', (storedCache: any) => {
          const cache: Cache = initializeCache(storedCache, network);

          // Check for asset details saved in storage, if needed
          if ('assets' in res && res.assets.length > 0) {
            const assetDetails = [];
            for (var i = res.assets.length - 1; i >= 0; i--) {
              const assetId = res.assets[i]['asset-id'];
              if (assetId in cache.assets[network]) {
                res.assets[i] = {
                  ...cache.assets[network][assetId],
                  ...res.assets[i],
                };
              }
              assetDetails.push(assetId);
            }

            if (assetDetails.length > 0) AssetsDetailsHelper.add(assetDetails, network);

            res.assets.sort((a, b) => a['asset-id'] - b['asset-id']);
          }

          sendResponse(res);

          // Save account updated account details in cache
          cache.accounts[network][address] = res;
          extensionStorage.setStorage('cache', cache, null);

          // Add details to session
          const wallet = session.wallet;
          // Validate the network still exists in the wallet
          if (network && wallet[network]) {
            for (var i = wallet[network].length - 1; i >= 0; i--) {
              if (wallet[network][i].address === address) {
                wallet[network][i].details = res;
              }
            }
          }
        });
      })
      .catch((e: any) => {
        sendResponse({ error: e.message });
      });
    return true;
  }

  public static [JsonRpcMethod.Transactions](request: any, sendResponse: Function) {
    const { ledger: network, address, limit, 'next-token': token } = request.body.params;
    const indexer = this.getIndexer(network);
    const algod = this.getAlgod(network);
    const txList = indexer.lookupAccountTransactions(address);
    const pendingTxList = algod.pendingTransactionByAddress(address);
    if (limit) txList.limit(limit);
    if (token) txList.nextToken(token);
    txList
      .do()
      .then((txListResponse: any) => {
        pendingTxList.do().then((pendingTxsListResponse: any) => {
          new ExtensionStorage().getStorage('cache', (cache: any) => {
            const pending = [];
            pendingTxsListResponse['top-transactions'].forEach((pend) => {
              // We map algod transactions to something more readable
              let amount = pend['txn']['amt'] || pend['txn']['aamt'] || 0;
              const sender = pend['txn']['snd'];
              const assetSender = pend['txn']['asnd'];
              const receiver = pend['txn']['rcv'] || pend['txn']['arcv'];
              // asset or appl id
              const id = pend['txn']['xaid'] || pend['txn']['faid'] || pend['txn']['apid'];
              const cachedAsset =
                (pend['txn']['xaid'] || pend['txn']['faid']) && cache.assets[network][id];
              const assetName =
                cachedAsset &&
                (cachedAsset['unit-name'] || cachedAsset['name'] || cachedAsset['asset-id']);
              const decimals = (cachedAsset && cachedAsset.decimals) || 0;
              if (cachedAsset) amount = amount / Math.pow(10, decimals);
              pending.push({
                type: pend['txn']['type'],
                amount: amount,
                sender: sender && algosdk.encodeAddress(sender),
                assetSender: assetSender && algosdk.encodeAddress(assetSender),
                receiver: receiver && algosdk.encodeAddress(receiver),
                id: id,
                assetName: assetName,
              });
            });
            const uiResponse = {
              'next-token': txListResponse['next-token'],
              'transactions': txListResponse.transactions,
              'pending': pending,
            };
            sendResponse(uiResponse);
          });
        });
      })
      .catch((e: any) => {
        sendResponse({ error: e.message });
      });
    return true;
  }

  public static [JsonRpcMethod.AssetDetails](request: any, sendResponse: Function) {
    const { ledger: network } = request.body.params;
    const assetId = request.body.params['asset-id'];
    const indexer = this.getIndexer(network);
    indexer
      .lookupAssetByID(assetId)
      .do()
      .then((res: any) => {
        sendResponse(res);
        // Save asset details in storage if needed
        const extensionStorage = new ExtensionStorage();
        extensionStorage.getStorage('cache', (cache: any) => {
          if (cache === undefined) cache = new Cache();
          if (!(network in cache.assets)) cache.assets[network] = {};

          if (!(assetId in cache.assets[network])) {
            cache.assets[network][assetId] = res.asset.params;
            extensionStorage.setStorage('cache', cache, null);
          }
        });
      })
      .catch((e: any) => {
        sendResponse({ error: e.message });
      });
    return true;
  }

  public static [JsonRpcMethod.AssetsAPIList](request: any, sendResponse: Function) {
    function searchAssets(assets, indexer, nextToken, filter) {
      const req = indexer.searchForAssets().limit(30).name(filter);
      if (nextToken) req.nextToken(nextToken);
      req
        .do()
        .then((res: any) => {
          const newAssets = assets.concat(res.assets);
          for (var i = newAssets.length - 1; i >= 0; i--) {
            newAssets[i] = {
              asset_id: newAssets[i].index,
              name: newAssets[i]['params']['name'],
              unit_name: newAssets[i]['params']['unit-name'],
            };
          }
          res.assets = newAssets;

          sendResponse(res);
        })
        .catch((e: any) => {
          sendResponse({ error: e.message });
        });
    }

    const { ledger: network, filter, nextToken } = request.body.params;
    const indexer = this.getIndexer(network);
    // Do the search for asset id (if filter value is integer)
    // and asset name and concat them.
    if (filter.length > 0 && !isNaN(filter) && (!nextToken || nextToken.length === 0)) {
      indexer
        .searchForAssets()
        .index(filter)
        .do()
        .then((res: any) => {
          searchAssets(res.assets, indexer, nextToken, filter);
        })
        .catch((e: any) => {
          sendResponse({ error: e.message });
        });
    } else {
      searchAssets([], indexer, nextToken, filter);
    }
    return true;
  }

  public static [JsonRpcMethod.AssetsVerifiedList](request: any, sendResponse: Function) {
    const { ledger: network } = request.body.params;

    if (network === Network.MainNet) {
      fetch('https://mobile-api.algorand.com/api/assets/?status=verified')
        .then((response) => {
          return response.json().then((json) => {
            if (response.ok) {
              sendResponse(json);
            } else {
              sendResponse({ error: json });
            }
          });
        })
        .catch((e) => {
          sendResponse({ error: e.message });
        });
    } else {
      sendResponse({
        results: [],
      });
    }
    return true;
  }

  public static [JsonRpcMethod.SignSendTransaction](request: any, sendResponse: Function) {
    const { ledger: network, address, passphrase, txnParams } = request.body.params;
    this._encryptionWrap = new encryptionWrap(passphrase);
    const algod = this.getAlgod(network);

    this._encryptionWrap.unlock(async (unlockedValue: any) => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
        return false;
      }

      const params = await algod.getTransactionParams().do();
      const txn = {
        ...txnParams,
        amount: BigInt(txnParams.amount),
        fee: params.fee,
        firstRound: params.firstRound,
        lastRound: params.lastRound,
        genesisID: params.genesisID,
        genesisHash: params.genesisHash,
      };
      if ('note' in txn) txn.note = new Uint8Array(Buffer.from(txn.note));

      let account;
      const authAddr = await Task.getChainAuthAddress({ address, network });
      const signAddress = authAddr || address;

      // Find address to send algos from
      for (var i = unlockedValue[network].length - 1; i >= 0; i--) {
        if (unlockedValue[network][i].address === signAddress) {
          account = unlockedValue[network][i];
          break;
        }
      }

      let transactionWrap: BaseValidatedTxnWrap = undefined;
      try {
        transactionWrap = getValidatedTxnWrap(txn, txn['type']);
      } catch (e) {
        logging.log(`Validation failed. ${e.message}`);
        sendResponse({ error: `Validation failed. ${e.message}` });
        return false;
      }
      if (!transactionWrap) {
        // We don't have a transaction wrap. We have an unknow error or extra fields, reject the transaction.
        logging.log(
          'A transaction has failed because of an inability to build the specified transaction type.'
        );
        sendResponse({
          error:
            'A transaction has failed because of an inability to build the specified transaction type.',
        });
        return false;
      } else if (
        transactionWrap.validityObject &&
        Object.values(transactionWrap.validityObject).some(
          (value) => value['status'] === ValidationStatus.Invalid
        )
      ) {
        // We have a transaction that contains fields which are deemed invalid. We should reject the transaction.
        const e =
          'One or more fields are not valid. Please check and try again.\n' +
          Object.values(transactionWrap.validityObject)
            .filter((value) => value['status'] === ValidationStatus.Invalid)
            .map((vo) => vo['info']);
        sendResponse({ error: e });
        return false;
      } else {
        // We have a transaction which does not contain invalid fields,
        // but may still contain fields that are dangerous
        // or ones we've flagged as needing to be reviewed.
        // Perform a change based on if this is a ledger device account
        if (account.isHardware) {
          // TODO: Temporary workaround by adding min-fee for estimate calculations since it's not in the sdk get params.
          params['min-fee'] = 1000;
          calculateEstimatedFee(transactionWrap, params);

          // Pass the transaction wrap like a dApp request for consistency
          const message = {
            source: 'ui',
            body: {
              params: {
                transactionWraps: [transactionWrap],
                ledgerIndexes: [0],
                currentLedgerTransaction: 0,
              },
            },
          };
          this[JsonRpcMethod.LedgerSignTransaction](message, (response) => {
            // We only have to worry about possible errors here so we can ignore the created tab
            if ('error' in response) {
              sendResponse(response);
            } else {
              // Respond with a 0 tx id so that the page knows not to try and show it.
              sendResponse({ txId: 0 });
            }
          });

          // Return to close connection
          return true;
        } else if (!account.mnemonic) {
          sendResponse({ error: RequestError.NoMnemonicAvailable(account.address).message });
        } else {
          // We can use a modified popup to allow the normal flow, but require extra scrutiny.
          const recoveredAccount = algosdk.mnemonicToSecretKey(account.mnemonic);
          let signedTxn;
          try {
            const builtTx = buildTransaction(txn);
            signedTxn = {
              txID: builtTx.txID().toString(),
              blob: builtTx.signTxn(recoveredAccount.sk),
            };
          } catch (e) {
            sendResponse({ error: e.message });
            return false;
          }

          this.getAlgod(network)
            .sendRawTransaction(signedTxn.blob)
            .do()
            .then((resp: any) => {
              sendResponse({ txId: resp.txId });
            })
            .catch((e: any) => {
              if (e.message.includes('overspend')) {
                sendResponse({
                  error: "Overspending. Your account doesn't have sufficient funds.",
                });
              } else if (e.message.includes('below min')) {
                sendResponse({
                  error:
                    'Overspending. This transaction would bring your account below the minimum balance limit.',
                });
              } else {
                sendResponse({ error: e.message });
              }
            });
        }
      }
    });
    return true;
  }

  public static [JsonRpcMethod.ChangeNetwork](request: any, sendResponse: Function) {
    session.network = request.body.params['ledger'];
    sendResponse({ ledger: session.network });
  }

  public static [JsonRpcMethod.DeleteNetwork](request: any, sendResponse: Function) {
    const network = request.body.params['name'];
    const networkUniqueName = network.toLowerCase();
    getAvailableNetworksFromCache((availiableNetworks) => {
      const matchingNetwork = availiableNetworks.find(
        (network) => network.uniqueName === networkUniqueName
      );

      if (!matchingNetwork || !matchingNetwork.isEditable) {
        sendResponse({ error: 'This network can not be deleted.' });
      } else {
        // Delete network from availableNetworks and assign to new array
        const remainingNetworks = availiableNetworks.filter(
          (network) => network.uniqueName !== networkUniqueName
        );

        // Delete Accounts from wallet
        this._encryptionWrap = new encryptionWrap(request.body.params.passphrase);

        // Remove existing accounts in session.wallet
        const existingAccounts = session.wallet[request.body.params['ledger']];
        if (existingAccounts) {
          delete session.wallet[request.body.params['ledger']];
        }

        // Using the passphrase unlock the current saved data
        this._encryptionWrap.unlock((unlockedValue: any) => {
          if ('error' in unlockedValue) {
            sendResponse(unlockedValue);
          } else {
            if (unlockedValue[network]) {
              // The unlocked value contains network information - delete it
              delete unlockedValue[network];
            }

            // Resave the updated wallet value
            this._encryptionWrap
              ?.lock(JSON.stringify(unlockedValue), (isSuccessful: any) => {
                if (isSuccessful) {
                  // Fully rebuild the session wallet
                  session.wallet = this.safeWallet(unlockedValue);
                }
              })
              .then(() => {
                // Update cache with remaining networks
                const extensionStorage = new ExtensionStorage();
                extensionStorage.getStorage('cache', (cache: any) => {
                  if (cache === undefined) {
                    cache = initializeCache(cache);
                  }
                  if (cache) {
                    cache.availableLedgers = remainingNetworks;
                    extensionStorage.setStorage('cache', cache, () => {});
                  }

                  // Update the session
                  session.availableNetworks = remainingNetworks;

                  // Delete from the injected network settings
                  Settings.deleteInjectedNetwork(networkUniqueName);

                  // Send back remaining networks
                  sendResponse({ availableNetworks: remainingNetworks });
                });
              });
          }
        });
      }
    });
    return true;
  }

  public static [JsonRpcMethod.CheckNetwork](request: any, sendResponse: Function) {
    try {
      const connection = Settings.getConnectionFromTemplate(request.body.params);
      sendResponse(connection);
    } catch (e) {
      sendResponse({ error: e.message });
    }
  }

  public static [JsonRpcMethod.SaveNetwork](request: any, sendResponse: Function) {
    try {
      const params = request.body.params;
      // If we have a passphrase then we are modifying.
      // There may be accounts attatched, if we match on a unique name, we should update.
      if (params['passphrase'] !== undefined) {
        this._encryptionWrap = new encryptionWrap(request.body.params['passphrase']);
        this._encryptionWrap.unlock((unlockedValue: any) => {
          if ('error' in unlockedValue) {
            sendResponse(unlockedValue);
          }
          // We have evaluated the passphrase and it was valid.
        });
      }
      
      const previousName = params['previousName'].toLowerCase();
      const targetName = previousName ? previousName : params['name'].toLowerCase();
      const addedNetwork = new NetworkTemplate({
        name: params['name'],
        genesisID: params['genesisID'],
        genesisHash: params['genesisHash'],
        symbol: params['symbol'],
        algodUrl: params['algodUrl'],
        indexerUrl: params['indexerUrl'],
        headers: params['headers'],
      });

      // Specifically get the base networks to check and prevent them from being overriden.
      const defaultNetworks = getBaseSupportedNetworks();

      getAvailableNetworksFromCache((cacheNetworks) => {
        const availableNetworks = [...cacheNetworks];

        // Add the new network if it isn't there.
        if (!availableNetworks.some((network) => network.uniqueName === targetName)) {
          availableNetworks.push(addedNetwork);

          // Also add the network to the injected networks in settings
          Settings.addInjectedNetwork(addedNetwork);
        } else {
          // If the new network name does exist, we sould update the values as long as it is not a default network.
          const matchingNetwork = availableNetworks.find((network) => network.uniqueName === targetName);
          if (!defaultNetworks.some((network) => network.uniqueName === matchingNetwork.uniqueName)) {
            Settings.updateInjectedNetwork(addedNetwork, previousName);
            matchingNetwork.name = addedNetwork.name;
            matchingNetwork.genesisID = addedNetwork.genesisID;
            matchingNetwork.symbol = addedNetwork.symbol;
            matchingNetwork.genesisHash = addedNetwork.genesisHash;
            matchingNetwork.algodUrl = addedNetwork.algodUrl;
            matchingNetwork.indexerUrl = addedNetwork.indexerUrl;
            matchingNetwork.headers = addedNetwork.headers;
          }
        }
        // Update the session and send response before setting cache.
        session.availableNetworks = availableNetworks;
        sendResponse({ availableNetworks: availableNetworks });

        // Updated the cached networks.
        const extensionStorage = new ExtensionStorage();
        extensionStorage.getStorage('cache', (cache: any) => {
          if (cache === undefined) {
            cache = initializeCache(cache);
          }
          if (cache) {
            cache.availableLedgers = availableNetworks;
            extensionStorage.setStorage('cache', cache, () => {});
          }
        });
      });
      return true;
    } catch (e) {
      sendResponse({ error: e.message });
    }
  }

  public static [JsonRpcMethod.GetNetworks](request: any, sendResponse: Function) {
    getAvailableNetworksFromCache((availableNetworks) => {
      sendResponse(availableNetworks);
    });

    return true;
  }

  public static [JsonRpcMethod.GetContacts](request: any, sendResponse: Function) {
    const extensionStorage = new ExtensionStorage();
    extensionStorage.getStorage('contacts', (response: any) => {
      let contacts = [];
      if (response) {
        contacts = response;
      }
      sendResponse(contacts);
    });
    return true;
  }

  public static [JsonRpcMethod.SaveContact](request: any, sendResponse: Function) {
    const { name, previousName, address } = request.body.params;

    const extensionStorage = new ExtensionStorage();
    extensionStorage.getStorage('contacts', (response: any) => {
      let contacts = [];
      if (response) {
        contacts = response;
      }
      const newContact = {
        name: name,
        address: address,
      };
      const previousIndex = contacts.findIndex((contact) => contact.name === previousName);
      if (previousIndex >= 0) {
        contacts[previousIndex] = newContact;
      } else {
        contacts.push(newContact);
      }

      extensionStorage.setStorage('contacts', contacts, (isSuccessful: any) => {
        if (isSuccessful) {
          sendResponse(contacts);
          this.reloadAliases();
        } else {
          sendResponse({ error: 'Lock failed' });
        }
      });
    });
    return true;
  }

  public static [JsonRpcMethod.DeleteContact](request: any, sendResponse: Function) {
    const { name } = request.body.params;

    const extensionStorage = new ExtensionStorage();
    extensionStorage.getStorage('contacts', (response: any) => {
      let contacts = [];
      if (response) {
        contacts = response;
      }
      const contactIndex = contacts.findIndex((contact) => contact.name === name);
      contacts.splice(contactIndex, 1);

      extensionStorage.setStorage('contacts', contacts, (isSuccessful: any) => {
        if (isSuccessful) {
          sendResponse(contacts);
          this.reloadAliases();
        } else {
          sendResponse({ error: 'Lock failed' });
        }
      });
    });
    return true;
  }

  public static [JsonRpcMethod.GetAliasedAddresses](request: any, sendResponse: Function) {
    const { ledger: network, searchTerm } = request.body.params;

    // Check if the term matches any of our namespaces
    const matchingNamespaces: Array<Namespace> = AliasConfig.getMatchingNamespaces(network);
    const extensionStorage = new ExtensionStorage();

    extensionStorage.getStorage('aliases', async (aliases: any) => {
      // aliases: { network: { namespace: [...aliases] } }
      extensionStorage.getStorage(
        'namespaces',
        async (storedConfigs: Array<NamespaceConfig>) => {
          const availableExternalNamespaces: Array<string> = [];
          storedConfigs
            .filter((config) => config.toggle)
            .map((config) => availableExternalNamespaces.push(config.namespace));

          // Search the storage for the aliases stored for the matching namespaces
          const returnedAliasedAddresses: { [key: string]: Array<Alias> } = {};
          const apiFetches = [];
          for (const namespace of matchingNamespaces) {
            const aliasesMatchingInNamespace: Array<Alias> = [];
            if (aliases[network][namespace]) {
              for (const alias of aliases[network][namespace]) {
                if (alias.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  aliasesMatchingInNamespace.push({
                    name: alias.name,
                    address: alias.address,
                    namespace: namespace,
                    collides: false,
                  });
                }
              }
            }

            if (
              searchTerm.length &&
              availableExternalNamespaces.includes(namespace) &&
              AliasConfig[namespace].networks &&
              AliasConfig[namespace].networks[network]?.length > 0
            ) {
              // If we find enabled external namespaces, we prepare an API fetch
              const apiURL = AliasConfig[namespace].networks[network].replace('${term}', searchTerm);
              const apiTimeout = AliasConfig[namespace].apiTimeout;

              // We set a max timeout for each call
              const controller = new AbortController();
              const timerId = setTimeout(() => controller.abort(), apiTimeout);
              const handleResponse = async (response) => {
                if (response.ok) {
                  await response.json().then((json) => {
                    const aliasesFromAPI = AliasConfig[namespace].findAliasedAddresses(json);
                    if (aliasesFromAPI && aliasesFromAPI.length) {
                      const aliasesInMemory: Array<Alias> = aliasesMatchingInNamespace;

                      // We add any new aliases to end of the namespace list
                      aliasesInMemory.push(...aliasesFromAPI);

                      // We add the updated aliases from the API to the response
                      returnedAliasedAddresses[namespace] = aliasesInMemory;
                    }
                  });
                }
                clearTimeout(timerId);
              };
              // We save the fetch request to later execute all in parallel
              const apiCall = fetch(apiURL, { signal: controller.signal })
                .then(handleResponse)
                .catch(() => []);
              apiFetches.push(apiCall);
            } else {
              returnedAliasedAddresses[namespace] = aliasesMatchingInNamespace;
            }
          }

          await Promise.all(apiFetches);
          sendResponse(returnedAliasedAddresses);
        }
      );
    });

    return true;
  }

  public static [JsonRpcMethod.GetNamespaceConfigs](request: any, sendResponse: Function) {
    const extensionStorage = new ExtensionStorage();
    extensionStorage.getStorage('namespaces', (response: any) => {
      const namespaceConfigs: Array<NamespaceConfig> = response;
      sendResponse(namespaceConfigs);
    });
    return true;
  }

  public static [JsonRpcMethod.ToggleNamespaceConfig](request: any, sendResponse: Function) {
    const { namespace } = request.body.params;

    const extensionStorage = new ExtensionStorage();
    extensionStorage.getStorage('namespaces', (response: any) => {
      const namespaceConfigs: Array<NamespaceConfig> = response;

      const previousIndex = namespaceConfigs.findIndex((config) => config.namespace === namespace);
      namespaceConfigs[previousIndex] = {
        ...namespaceConfigs[previousIndex],
        toggle: !namespaceConfigs[previousIndex].toggle,
      };

      extensionStorage.setStorage('namespaces', namespaceConfigs, (isSuccessful: any) => {
        if (isSuccessful) {
          sendResponse(namespaceConfigs);
        } else {
          sendResponse({ error: 'Lock failed' });
        }
      });
    });
    return true;
  }

  public static [JsonRpcMethod.GetGovernanceAddresses](request: any, sendResponse: Function) {
    const governanceAccounts: Array<string> = [];
    fetch('https://governance.algorand.foundation/api/periods/').then(async (fetchResponse) => {
      if (fetchResponse.ok) {
        const governanceResponse = await fetchResponse.json();
        if ('results' in governanceResponse) {
          try {
            governanceResponse['results'].forEach((p) =>
              governanceAccounts.push(p['sign_up_address'])
            );
          } catch (e) {
            logging.log(
              "Governance accounts couldn't be fetched. Error: " + e.message,
              LogLevel.Debug
            );
          }
        }
      }

      if (governanceAccounts.length) {
        sendResponse({ accounts: governanceAccounts });
      }
    });
    return true;
  }
}
