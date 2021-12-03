import algosdk from 'algosdk';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { logging } from '@algosigner/common/logging';
import { ExtensionStorage } from '@algosigner/storage/src/extensionStorage';
import { Task } from './task';
import { API, Cache, Ledger } from './types';
import { Settings } from '../config';
import encryptionWrap from '../encryptionWrap';
import Session from '../utils/session';
import AssetsDetailsHelper from '../utils/assetsDetailsHelper';
import { initializeCache, getAvailableLedgersExt } from '../utils/helper';
import { ValidationStatus } from '../utils/validator';
import {
  calculateEstimatedFee,
  getValidatedTxnWrap,
  getLedgerFromGenesisId,
} from '../transaction/actions';
import { BaseValidatedTxnWrap } from '../transaction/baseValidatedTxnWrap';
import { buildTransaction } from '../utils/transactionBuilder';
import { getBaseSupportedLedgers, LedgerTemplate } from '@algosigner/common/types/ledgers';
import { NoAccountMatch } from '../../errors/transactionSign';
import { extensionBrowser } from '@algosigner/common/chrome';

const session = new Session();

export class InternalMethods {
  private static _encryptionWrap: encryptionWrap | undefined;

  public static getAlgod(ledger: string): algosdk.Algodv2 {
    const params = Settings.getBackendParams(ledger, API.Algod);
    return new algosdk.Algodv2(params.apiKey, params.url, params.port);
  }
  public static getIndexer(ledger: string): algosdk.Indexer {
    const params = Settings.getBackendParams(ledger, API.Indexer);
    return new algosdk.Indexer(params.apiKey, params.url, params.port);
  }

  private static safeWallet(wallet: any) {
    // Intialize the safe wallet then add the wallet ledgers in as empty arrays
    const safeWallet = {};
    Object.keys(wallet).forEach((key) => {
      safeWallet[key] = [];

      // Afterwards we can add in all the non-private keys and names into the safewallet
      for (let j = 0; j < wallet[key].length; j++) {
        const { address, name } = wallet[key][j];
        safeWallet[key].push({
          address: address,
          name: name,
        });
      }
    });

    return safeWallet;
  }

  // Checks if an address is a valid user account for a given ledger.
  public static checkValidAccount(genesisID: string, address: string): void {
    const ledger: string = getLedgerFromGenesisId(genesisID);
    let found = false;
    for (let i = session.wallet[ledger].length - 1; i >= 0; i--) {
      if (session.wallet[ledger][i].address === address) {
        found = true;
        break;
      }
    }
    if (!found) throw new NoAccountMatch(address, ledger);
  }

  private static loadAccountAssetsDetails(address: string, ledger: Ledger) {
    const algod = this.getAlgod(ledger);
    algod
      .accountInformation(address)
      .do()
      .then((res: any) => {
        if ('assets' in res && res.assets.length > 0) {
          AssetsDetailsHelper.add(
            res.assets.map((x) => x['asset-id']),
            ledger
          );
        }
      })
      .catch((e: any) => {
        console.error(e);
      });
  }

  public static getHelperSession(): Session {
    return session.session;
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
        if (session.wallet) sendResponse({ exist: true, session: session.session });
        else sendResponse({ exist: true });
      }
    });
    return true;
  }

  public static [JsonRpcMethod.CreateWallet](request: any, sendResponse: Function) {
    this._encryptionWrap = new encryptionWrap(request.body.params.passphrase);
    const newWallet = {
      TestNet: [],
      MainNet: [],
    };
    this._encryptionWrap?.lock(JSON.stringify(newWallet), (isSuccessful: any) => {
      if (isSuccessful) {
        (session.wallet = this.safeWallet(newWallet)), (session.ledger = Ledger.MainNet);
        sendResponse(session.session);
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
        getAvailableLedgersExt((availableLedgers) => {
          const extensionStorage = new ExtensionStorage();
          // Load Accounts details from Cache
          extensionStorage.getStorage('cache', (storedCache: any) => {
            const cache: Cache = initializeCache(storedCache);
            const cachedLedgerAccounts = Object.keys(cache.accounts);

            for (var j = cachedLedgerAccounts.length - 1; j >= 0; j--) {
              const ledger = cachedLedgerAccounts[j];
              if (wallet[ledger]) {
                for (var i = wallet[ledger].length - 1; i >= 0; i--) {
                  if (wallet[ledger][i].address in cache.accounts[ledger]) {
                    wallet[ledger][i].details = cache.accounts[ledger][wallet[ledger][i].address];
                  }
                }
              }
            }

            (session.wallet = wallet),
              (session.ledger = Ledger.MainNet),
              (session.availableLedgers = availableLedgers),
              sendResponse(session.session);
          });
        });
      }
    });
    return true;
  }

  public static [JsonRpcMethod.CreateAccount](request: any, sendResponse: Function) {
    var keys = algosdk.generateAccount();
    var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
    sendResponse([mnemonic, keys.addr]);
  }

  public static [JsonRpcMethod.SaveAccount](request: any, sendResponse: Function) {
    const { mnemonic, name, ledger, address, passphrase } = request.body.params;
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

        if (!unlockedValue[ledger]) {
          unlockedValue[ledger] = [];
        }

        unlockedValue[ledger].push(newAccount);
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

  public static [JsonRpcMethod.DeleteAccount](request: any, sendResponse: Function) {
    const { ledger, address, passphrase } = request.body.params;
    this._encryptionWrap = new encryptionWrap(passphrase);

    this._encryptionWrap.unlock((unlockedValue: any) => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
      } else {
        // Find address to delete
        for (var i = unlockedValue[ledger].length - 1; i >= 0; i--) {
          if (unlockedValue[ledger][i].address === address) {
            unlockedValue[ledger].splice(i, 1);
            break;
          }
        }
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

  public static [JsonRpcMethod.ImportAccount](request: any, sendResponse: Function) {
    const { mnemonic, name, ledger } = request.body.params;
    this._encryptionWrap = new encryptionWrap(request.body.params.passphrase);

    try {
      var recoveredAccountAddress = algosdk.mnemonicToSecretKey(mnemonic).addr;
      var existingAccounts = session.wallet[ledger];

      if (existingAccounts) {
        for (let i = 0; i < existingAccounts.length; i++) {
          if (existingAccounts[i].address === recoveredAccountAddress) {
            throw new Error(`Account already exists in ${ledger} wallet.`);
          }
        }
      }

      var newAccount = {
        address: recoveredAccountAddress,
        mnemonic: mnemonic,
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
        if (!unlockedValue[ledger]) {
          unlockedValue[ledger] = [];
        }

        unlockedValue[ledger].push(newAccount);
        this._encryptionWrap?.lock(JSON.stringify(unlockedValue), (isSuccessful: any) => {
          if (isSuccessful) {
            this.loadAccountAssetsDetails(newAccount.address, ledger);
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

  public static [JsonRpcMethod.LedgerLinkAddress](request: any, sendResponse: Function) {
    const ledger = request.body.params.ledger;
    extensionBrowser.tabs.create(
      {
        active: true,
        url: extensionBrowser.extension.getURL(`/index.html#/${ledger}/ledger-hardware-connector`),
      },
      (tab) => {
        // Tab object is created here, but extension popover will close.
        sendResponse(tab);
      }
    );
    return true;
  }

  public static [JsonRpcMethod.LedgerGetSessionTxn](request: any, sendResponse: Function) {
    if (session.txnWrap && 'body' in session.txnWrap) {
      // The transaction may contain source and JSONRPC info, the body.params will be the transaction validation object
      sendResponse(session.txnWrap.body.params);
    } else {
      sendResponse({ error: 'Transaction not found in session.' });
    }
    return true;
  }

  public static [JsonRpcMethod.LedgerSendTxnResponse](request: any, sendResponse: Function) {
    if (session.txnWrap && 'body' in session.txnWrap) {
      const txnBuf = Buffer.from(request.body.params.txn, 'base64');
      const decodedTxn = algosdk.decodeSignedTransaction(txnBuf);
      const signedTxnEntries = Object.entries(decodedTxn.txn).sort();

      // Get the session transaction
      const sessTxn = session.txnWrap.body.params.transaction;

      // Set the fee to the estimate we showed on the screen for validation.
      sessTxn['fee'] = session.txnWrap.body.params.estimatedFee;
      const sessTxnEntries = Object.entries(sessTxn).sort();

      // Update fields in the signed transaction that are not the same format
      for (let i = 0; i < signedTxnEntries.length; i++) {
        if (signedTxnEntries[i][0] === 'from') {
          signedTxnEntries[i][1] = algosdk.encodeAddress(signedTxnEntries[i][1]['publicKey']);
        } else if (signedTxnEntries[i][0] === 'to') {
          signedTxnEntries[i][1] = algosdk.encodeAddress(signedTxnEntries[i][1]['publicKey']);
        } else if (signedTxnEntries[i][1] && signedTxnEntries[i][1].constructor === Uint8Array) {
          //@ts-ignore
          signedTxnEntries[i][1] = Buffer.from(signedTxnEntries[i][1]).toString('base64');
        }
      }

      logging.log(`Signed Txn: ${signedTxnEntries}`, 2);
      logging.log(`Session Txn: ${sessTxnEntries}`, 2);

      if (
        signedTxnEntries['amount'] === sessTxnEntries['amount'] &&
        signedTxnEntries['fee'] === sessTxnEntries['fee'] &&
        signedTxnEntries['genesisID'] === sessTxnEntries['genesisID'] &&
        signedTxnEntries['firstRound'] === sessTxnEntries['firstRound'] &&
        signedTxnEntries['lastRound'] === sessTxnEntries['lastRound'] &&
        signedTxnEntries['type'] === sessTxnEntries['type'] &&
        signedTxnEntries['to'] === sessTxnEntries['to'] &&
        signedTxnEntries['from'] === sessTxnEntries['from'] &&
        signedTxnEntries['closeRemainderTo'] === sessTxnEntries['closeRemainderTo']
      ) {
        //Check the txnWrap for a dApp response and return the transaction
        if (session.txnWrap.source === 'dapp') {
          const message = session.txnWrap;
          message.response = {
            blob: request.body.params.txn,
          };
          sendResponse({ message: message });
        }
        // If this is a ui transaction then we need to also submit
        else if (session.txnWrap.source === 'ui') {
          const ledger = getLedgerFromGenesisId(decodedTxn.txn.genesisID);

          const algod = this.getAlgod(ledger);
          algod
            .sendRawTransaction(txnBuf)
            .do()
            .then((resp: any) => {
              sendResponse({ txId: resp.txId });
            })
            .catch((e: any) => {
              if (e.message.includes('overspend'))
                sendResponse({
                  error: "Overspending. Your account doesn't have sufficient funds.",
                });
              else sendResponse({ error: e.message });
            });
        } else {
          sendResponse({ error: 'Session transaction does not match the signed transaction.' });
        }

        // Clear the cached transaction
        session.txnWrap.body.params.transaction = undefined;
      } else {
        sendResponse({ error: 'Transaction not found in session, unable to validate for send.' });
      }
    }
    return true;
  }

  // Protected because this should only be called from within the ui or dapp sign methods
  protected static [JsonRpcMethod.LedgerSignTransaction](request: any, sendResponse: Function) {
    // Access store here here to save the transaction wrap to cache before the site picks it up.
    // Explicitly using txnWrap on session instead of auth message for two reasons:
    // 1) So it lives inside background sandbox containment.
    // 2) The extension may close before a proper id on the new tab can allow the data to be saved.
    session.txnWrap = request;

    // Transaction wrap will contain response message if from dApp and structure will be different
    const ledger = getLedgerFromGenesisId(request.body.params.transaction.genesisID);
    extensionBrowser.tabs.create(
      {
        active: true,
        url: extensionBrowser.extension.getURL(`/index.html#/${ledger}/ledger-hardware-sign`),
      },
      (tab) => {
        // Tab object is created here, but extension popover will close.
        sendResponse(tab);
      }
    );
  }

  public static [JsonRpcMethod.LedgerSaveAccount](request: any, sendResponse: Function) {
    const { name, ledger, passphrase } = request.body.params;
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

        if (!unlockedValue[ledger]) {
          unlockedValue[ledger] = [];
        }

        unlockedValue[ledger].push(newAccount);
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
    const { ledger, address } = request.body.params;
    const algod = this.getAlgod(ledger);
    algod
      .accountInformation(address)
      .do()
      .then((res: any) => {
        const extensionStorage = new ExtensionStorage();
        extensionStorage.getStorage('cache', (storedCache: any) => {
          const cache: Cache = initializeCache(storedCache, ledger);

          // Check for asset details saved in storage, if needed
          if ('assets' in res && res.assets.length > 0) {
            const missingAssets = [];
            for (var i = res.assets.length - 1; i >= 0; i--) {
              const assetId = res.assets[i]['asset-id'];
              if (assetId in cache.assets[ledger]) {
                res.assets[i] = {
                  ...res.assets[i],
                  ...cache.assets[ledger][assetId],
                };
              } else {
                missingAssets.push(assetId);
              }
            }

            if (missingAssets.length > 0) AssetsDetailsHelper.add(missingAssets, ledger);

            res.assets.sort((a, b) => a['asset-id'] - b['asset-id']);
          }

          sendResponse(res);

          // Save account updated account details in cache
          cache.accounts[ledger][address] = res;
          extensionStorage.setStorage('cache', cache, null);

          // Add details to session
          const wallet = session.wallet;
          // Validate the ledger still exists in the wallet
          if (ledger && wallet[ledger]) {
            for (var i = wallet[ledger].length - 1; i >= 0; i--) {
              if (wallet[ledger][i].address === address) {
                wallet[ledger][i].details = res;
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
    const { ledger, address, limit, 'next-token': token } = request.body.params;
    const indexer = this.getIndexer(ledger);
    const algod = this.getAlgod(ledger);
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
                (pend['txn']['xaid'] || pend['txn']['faid']) && cache.assets[ledger][id];
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
    const assetId = request.body.params['asset-id'];
    const { ledger } = request.body.params;
    const indexer = this.getIndexer(ledger);
    indexer
      .lookupAssetByID(assetId)
      .do()
      .then((res: any) => {
        sendResponse(res);
        // Save asset details in storage if needed
        const extensionStorage = new ExtensionStorage();
        extensionStorage.getStorage('cache', (cache: any) => {
          if (cache === undefined) cache = new Cache();
          if (!(ledger in cache.assets)) cache.assets[ledger] = {};

          if (!(assetId in cache.assets[ledger])) {
            cache.assets[ledger][assetId] = res.asset.params;
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

    const { ledger, filter, nextToken } = request.body.params;
    const indexer = this.getIndexer(ledger);
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
    const { ledger } = request.body.params;

    if (ledger === Ledger.MainNet) {
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
    const { ledger, address, passphrase, txnParams } = request.body.params;
    this._encryptionWrap = new encryptionWrap(passphrase);
    const algod = this.getAlgod(ledger);

    this._encryptionWrap.unlock(async (unlockedValue: any) => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
        return false;
      }
      let account;

      // Find address to send algos from
      for (var i = unlockedValue[ledger].length - 1; i >= 0; i--) {
        if (unlockedValue[ledger][i].address === address) {
          account = unlockedValue[ledger][i];
          break;
        }
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

      let transactionWrap: BaseValidatedTxnWrap = undefined;
      try {
        transactionWrap = getValidatedTxnWrap(txn, txn['type']);
      } catch (e) {
        logging.log(`Validation failed. ${e}`);
        sendResponse({ error: `Validation failed. ${e}` });
        return;
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
        return;
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
        return;
      } else {
        // We have a transaction which does not contain invalid fields,
        // but may still contain fields that are dangerous
        // or ones we've flagged as needing to be reviewed.
        // Perform a change based on if this is a ledger device account
        if (account.isHardware) {
          // TODO: Temporary workaround by adding min-fee for estimate calculations since it's not in the sdk get params.
          params['min-fee'] = 1000;
          calculateEstimatedFee(transactionWrap, params);

          // Pass the transaction wrap we can pass to the
          // central sign ledger function for consistency
          this[JsonRpcMethod.LedgerSignTransaction](
            { source: 'ui', body: { params: transactionWrap } },
            (response) => {
              // We only have to worry about possible errors here so we can ignore the created tab
              if ('error' in response) {
                sendResponse(response);
              } else {
                // Respond with a 0 tx id so that the page knows not to try and show it.
                sendResponse({ txId: 0 });
              }
            }
          );

          // Return to close connection
          return true;
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

          algod
            .sendRawTransaction(signedTxn.blob)
            .do()
            .then((resp: any) => {
              sendResponse({ txId: resp.txId });
            })
            .catch((e: any) => {
              if (e.message.includes('overspend'))
                sendResponse({
                  error: "Overspending. Your account doesn't have sufficient funds.",
                });
              else sendResponse({ error: e.message });
            });
        }
      }
    });

    return true;
  }

  public static [JsonRpcMethod.ChangeLedger](request: any, sendResponse: Function) {
    session.ledger = request.body.params['ledger'];
    sendResponse({ ledger: session.ledger });
  }

  public static [JsonRpcMethod.DeleteNetwork](request: any, sendResponse: Function) {
    const ledger = request.body.params['name'];
    const ledgerUniqueName = ledger.toLowerCase();
    getAvailableLedgersExt((availiableLedgers) => {
      const matchingLedger = availiableLedgers.find((avls) => avls.uniqueName === ledgerUniqueName);

      if (!matchingLedger || !matchingLedger.isEditable) {
        sendResponse({ error: 'This ledger can not be deleted.' });
      } else {
        // Delete ledger from availableLedgers and assign to new array //
        const remainingLedgers = availiableLedgers.filter(
          (avls) => avls.uniqueName !== ledgerUniqueName
        );

        // Delete Accounts from wallet //
        this._encryptionWrap = new encryptionWrap(request.body.params.passphrase);

        // Remove existing accoutns in session.wallet
        var existingAccounts = session.wallet[request.body.params['ledger']];
        if (existingAccounts) {
          delete session.wallet[request.body.params['ledger']];
        }

        // Using the passphrase unlock the current saved data
        this._encryptionWrap.unlock((unlockedValue: any) => {
          if ('error' in unlockedValue) {
            sendResponse(unlockedValue);
          } else {
            if (unlockedValue[ledger]) {
              // The unlocked value contains ledger information - delete it
              delete unlockedValue[ledger];
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
                // Update cache with remaining ledgers//
                const extensionStorage = new ExtensionStorage();
                extensionStorage.getStorage('cache', (cache: any) => {
                  if (cache === undefined) {
                    cache = initializeCache(cache);
                  }
                  if (cache) {
                    cache.availableLedgers = remainingLedgers;
                    extensionStorage.setStorage('cache', cache, () => {});
                  }

                  // Update the session //
                  session.availableLedgers = remainingLedgers;

                  // Delete from the injected ledger settings //
                  Settings.deleteInjectedNetwork(ledgerUniqueName);

                  // Send back remaining ledgers //
                  sendResponse({ availableLedgers: remainingLedgers });
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
      const networks =  Settings.checkNetwork(request.body.params)
      sendResponse(networks);
    }
    catch (e) {
      sendResponse({ error: e.message });
    }
  }
  
  public static [JsonRpcMethod.SaveNetwork](request: any, sendResponse: Function) {
    try {
      // If we have a passphrase then we are modifying.
      // There may be accounts attatched, if we match on a unique name, we should update.
      if (request.body.params['passphrase'] !== undefined) {
        this._encryptionWrap = new encryptionWrap(request.body.params['passphrase']);
        this._encryptionWrap.unlock((unlockedValue: any) => {
          if ('error' in unlockedValue) {
            sendResponse(unlockedValue);
          }
          // We have evaluated the passphrase and it was valid.
        });
      }
      const addedLedger = new LedgerTemplate({
        name: request.body.params['name'],
        genesisId: request.body.params['genesisId'],
        genesisHash: request.body.params['genesisHash'],
        symbol: request.body.params['symbol'],
        algodUrl: request.body.params['algodUrl'],
        indexerUrl: request.body.params['indexerUrl'],
        headers: request.body.params['headers'],
      });

      // Specifically get the base ledgers to check and prevent them from being overriden.
      const defaultLedgers = getBaseSupportedLedgers();

      getAvailableLedgersExt((availiableLedgers) => {
        const comboLedgers = [...availiableLedgers];

        // Add the new ledger if it isn't there.
        if (!comboLedgers.some((cledg) => cledg.uniqueName === addedLedger.uniqueName)) {
          comboLedgers.push(addedLedger);

          // Also add the ledger to the injected ledgers in settings
          Settings.addInjectedNetwork(addedLedger);
        }
        // If the new ledger name does exist, we sould update the values as long as it is not a default ledger.
        else {
          const matchingLedger = comboLedgers.find(
            (cledg) => cledg.uniqueName === addedLedger.uniqueName
          );
          if (!defaultLedgers.some((dledg) => dledg.uniqueName === matchingLedger.uniqueName)) {
            Settings.updateInjectedNetwork(addedLedger);
            matchingLedger.genesisId = addedLedger.genesisId;
            matchingLedger.symbol = addedLedger.symbol;
            matchingLedger.genesisHash = addedLedger.genesisHash;
            matchingLedger.algodUrl = addedLedger.algodUrl;
            matchingLedger.indexerUrl = addedLedger.indexerUrl;
            matchingLedger.headers = addedLedger.headers;
          }
        }
        // Update the session and send response before setting cache.
        session.availableLedgers = comboLedgers;
        sendResponse({ availableLedgers: comboLedgers });

        // Updated the cached ledgers.
        const extensionStorage = new ExtensionStorage();
        extensionStorage.getStorage('cache', (cache: any) => {
          if (cache === undefined) {
            cache = initializeCache(cache);
          }
          if (cache) {
            cache.availableLedgers = comboLedgers;
            extensionStorage.setStorage('cache', cache, () => {});
          }
        });
      });
      return true;
    } catch (e) {
      sendResponse({ error: e.message });
    }
  }

  public static [JsonRpcMethod.GetLedgers](request: any, sendResponse: Function) {
    getAvailableLedgersExt((availableLedgers) => {
      sendResponse(availableLedgers);
    });

    return true;
  }
}
