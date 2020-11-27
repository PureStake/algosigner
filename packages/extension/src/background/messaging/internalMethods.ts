import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { logging } from '@algosigner/common/logging';
import { ExtensionStorage } from '@algosigner/storage/src/extensionStorage';
import { Task } from './task';
import { API, Cache, Ledger } from './types';
import { Settings } from '../config';
import encryptionWrap from '../encryptionWrap';
import Session from '../utils/session';
import AssetsDetailsHelper from '../utils/assetsDetailsHelper';
import { initializeCache } from '../utils/helper';
import { ValidationStatus } from '../utils/validator';
import { getValidatedTxnWrap } from '../transaction/actions';
import { buildTransaction } from '../utils/transactionBuilder';
/* eslint-disable-next-line */
const algosdk = require('algosdk');

const session = new Session();

export class InternalMethods {
  private static _encryptionWrap: encryptionWrap | undefined;

  public static getAlgod(ledger: Ledger) {
    const params = Settings.getBackendParams(ledger, API.Algod);
    return new algosdk.Algodv2(params.apiKey, params.url, params.port);
  }
  public static getIndexer(ledger: Ledger) {
    const params = Settings.getBackendParams(ledger, API.Indexer);
    return new algosdk.Indexer(params.apiKey, params.url, params.port);
  }

  private static safeWallet(wallet: any) {
    const safeWallet: { TestNet: any[]; MainNet: any[] } = {
      TestNet: [],
      MainNet: [],
    };

    for (var i = 0; i < wallet.TestNet.length; i++) {
      const { address, name } = wallet['TestNet'][i];
      safeWallet.TestNet.push({
        address: address,
        name: name,
      });
    }
    for (var i = 0; i < wallet.MainNet.length; i++) {
      const { address, name } = wallet['MainNet'][i];
      safeWallet.MainNet.push({
        address: address,
        name: name,
      });
    }
    return safeWallet;
  }

  // Checks if an address is a valid user account for a given ledger.
  public static checkValidAccount(address: string, ledger: Ledger) {
    for (let i = session.wallet[ledger].length - 1; i >= 0; i--) {
      if (session.wallet[ledger][i].address === address) return true;
    }
    return false;
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

  public static getHelperSession() {
    return session.session;
  }

  public static [JsonRpcMethod.GetSession](
    request: any,
    sendResponse: Function
  ) {
    this._encryptionWrap = new encryptionWrap('');

    this._encryptionWrap?.checkStorage((exist: boolean) => {
      if (!exist) {
        sendResponse({ exist: false });
      } else {
        if (session.wallet)
          sendResponse({ exist: true, session: session.session });
        else sendResponse({ exist: true });
      }
    });
    return true;
  }

  public static [JsonRpcMethod.CreateWallet](
    request: any,
    sendResponse: Function
  ) {
    this._encryptionWrap = new encryptionWrap(request.body.params.passphrase);
    const newWallet = {
      TestNet: [],
      MainNet: [],
    };
    this._encryptionWrap?.lock(
      JSON.stringify(newWallet),
      (isSuccessful: any) => {
        if (isSuccessful) {
          (session.wallet = this.safeWallet(newWallet)),
            (session.ledger = Ledger.MainNet);
          sendResponse(session.session);
        } else {
          sendResponse({ error: 'Lock failed' });
        }
      }
    );
    return true;
  }

  public static [JsonRpcMethod.DeleteWallet](
    request: any,
    sendResponse: Function
  ) {
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
        // Load Accounts details from Cache
        new ExtensionStorage().getStorage('cache', (storedCache: any) => {
          const cache: Cache = initializeCache(storedCache);
          const cachedLedgers = Object.keys(cache.accounts);

          console.log('cached', cachedLedgers);
          for (let j = cachedLedgers.length - 1; j >= 0; j--) {
            const ledger = cachedLedgers[j];
            console.log('cached', cachedLedgers);
            for (let i = wallet[ledger].length - 1; i >= 0; i--) {
              if (wallet[ledger][i].address in cache.accounts[ledger]) {
                wallet[ledger][i].details =
                  cache.accounts[ledger][wallet[ledger][i].address];
              }
            }
          }

          (session.wallet = wallet),
            (session.ledger = Ledger.MainNet),
            sendResponse(session.session);
        });
      }
    });
    return true;
  }

  public static [JsonRpcMethod.CreateAccount](
    request: any,
    sendResponse: Function
  ) {
    const keys = algosdk.generateAccount();
    const mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
    sendResponse([mnemonic, keys.addr]);
  }

  public static [JsonRpcMethod.SaveAccount](
    request: any,
    sendResponse: Function
  ) {
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
        unlockedValue[ledger].push(newAccount);
        this._encryptionWrap?.lock(
          JSON.stringify(unlockedValue),
          (isSuccessful: any) => {
            if (isSuccessful) {
              session.wallet = this.safeWallet(unlockedValue);
              sendResponse(session.wallet);
            } else {
              sendResponse({ error: 'Lock failed' });
            }
          }
        );
      }
    });
    return true;
  }

  public static [JsonRpcMethod.DeleteAccount](
    request: any,
    sendResponse: Function
  ) {
    const { ledger, address, passphrase } = request.body.params;
    this._encryptionWrap = new encryptionWrap(passphrase);

    this._encryptionWrap.unlock((unlockedValue: any) => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
      } else {
        // Find address to delete
        for (let i = unlockedValue[ledger].length - 1; i >= 0; i--) {
          if (unlockedValue[ledger][i].address === address) {
            unlockedValue[ledger].splice(i, 1);
            break;
          }
        }
        this._encryptionWrap?.lock(
          JSON.stringify(unlockedValue),
          (isSuccessful: any) => {
            if (isSuccessful) {
              session.wallet = this.safeWallet(unlockedValue);
              sendResponse(session.wallet);
            } else {
              sendResponse({ error: 'Lock failed' });
            }
          }
        );
      }
    });
    return true;
  }

  public static [JsonRpcMethod.ImportAccount](
    request: any,
    sendResponse: Function
  ) {
    const { mnemonic, name, ledger } = request.body.params;
    this._encryptionWrap = new encryptionWrap(request.body.params.passphrase);

    try {
      const recoveredAccountAddress = algosdk.mnemonicToSecretKey(mnemonic).addr;
      const existingAccounts = session.wallet[ledger];
      for (let i = 0; i < existingAccounts.length; i++) {
        if (existingAccounts[i].address === recoveredAccountAddress) {
          throw new Error(`Account already exists in ${ledger} wallet.`);
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
        unlockedValue[ledger].push(newAccount);
        this._encryptionWrap?.lock(
          JSON.stringify(unlockedValue),
          (isSuccessful: any) => {
            if (isSuccessful) {
              this.loadAccountAssetsDetails(newAccount.address, ledger);
              session.wallet = this.safeWallet(unlockedValue);
              sendResponse(session.wallet);
            } else {
              sendResponse({ error: 'Lock failed' });
            }
          }
        );
      }
    });
    return true;
  }

  public static [JsonRpcMethod.AccountDetails](
    request: any,
    sendResponse: Function
  ) {
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

            if (missingAssets.length > 0)
              AssetsDetailsHelper.add(missingAssets, ledger);

            res.assets.sort((a, b) => a['asset-id'] - b['asset-id']);
          }

          sendResponse(res);

          // Save account updated account details in cache
          cache.accounts[ledger][address] = res;
          extensionStorage.setStorage('cache', cache, null);

          // Add details to session
          const wallet = session.wallet;
          for (var i = wallet[ledger].length - 1; i >= 0; i--) {
            if (wallet[ledger][i].address === address) {
              wallet[ledger][i].details = res;
            }
          }
        });
      })
      .catch((e: any) => {
        sendResponse({ error: e.message });
      });
    return true;
  }

  public static [JsonRpcMethod.Transactions](
    request: any,
    sendResponse: Function
  ) {
    const indexer = this.getIndexer(request.body.params.ledger);
    const txs = indexer.lookupAccountTransactions(request.body.params.address);
    if (request.body.params.limit) txs.limit(request.body.params.limit);
    if (request.body.params['next-token'])
      txs.nextToken(request.body.params['next-token']);
    txs
      .do()
      .then((res: any) => {
        sendResponse(res);
      })
      .catch((e: any) => {
        sendResponse({ error: e.message });
      });
    return true;
  }

  public static [JsonRpcMethod.AssetDetails](
    request: any,
    sendResponse: Function
  ) {
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

  public static [JsonRpcMethod.AssetsAPIList](
    request: any,
    sendResponse: Function
  ) {
    function searchAssets(assets, indexer, nextToken, filter) {
      const req = indexer.searchForAssets().limit(30).name(filter);
      if (nextToken) req.nextToken(nextToken);
      req
        .do()
        .then((res: any) => {
          const newAssets = assets.concat(res.assets);
          for (let i = newAssets.length - 1; i >= 0; i--) {
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
    if (
      filter.length > 0 &&
      !isNaN(filter) &&
      (!nextToken || nextToken.length === 0)
    ) {
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

  public static [JsonRpcMethod.AssetsVerifiedList](
    request: any,
    sendResponse: Function
  ) {
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

  public static [JsonRpcMethod.SignSendTransaction](
    request: any,
    sendResponse: Function
  ) {
    const { ledger, address, passphrase, txnParams } = request.body.params;
    this._encryptionWrap = new encryptionWrap(request.body.params.passphrase);
    const algod = this.getAlgod(ledger);

    this._encryptionWrap.unlock(async (unlockedValue: any) => {
      if ('error' in unlockedValue) {
        sendResponse(unlockedValue);
        return false;
      }
      let account;

      // Find address to send algos from
      for (let i = unlockedValue[ledger].length - 1; i >= 0; i--) {
        if (unlockedValue[ledger][i].address === address) {
          account = unlockedValue[ledger][i];
          break;
        }
      }

      const recoveredAccount = algosdk.mnemonicToSecretKey(account.mnemonic);
      const params = await algod.getTransactionParams().do();
      const txn = {
        ...txnParams,
        fee: params.fee,
        firstRound: params.firstRound,
        lastRound: params.lastRound,
        genesisID: params.genesisID,
        genesisHash: params.genesisHash,
      };

      if ('note' in txn) txn.note = new Uint8Array(Buffer.from(txn.note));

      const txHeaders = {
        'Content-Type': 'application/x-binary',
      };

      let transactionWrap = undefined;
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
        sendResponse({
          error:
            'One or more fields are not valid. Please check and try again.',
        });
        return;
      } else if (
        (transactionWrap.validityObject &&
          Object.values(transactionWrap.validityObject).some(
            (value) => value['status'] === ValidationStatus.Warning
          )) ||
        Object.values(transactionWrap.validityObject).some(
          (value) => value['status'] === ValidationStatus.Dangerous
        )
      ) {
        // We have a transaction which does not contain invalid fields, but does contain fields that are dangerous
        // or ones we've flagged as needing to be reviewed. We can use a modified popup to allow the normal flow, but require extra scrutiny.
        let signedTxn;
        try {
          const builtTx = buildTransaction(txn);
          signedTxn = {
            txID: builtTx.txID().toString(),
            blob: builtTx.signTxn(recoveredAccount.sk),
          };
        } catch (e) {
          sendResponse({ error: e.message });
          return;
        }

        algod
          .sendRawTransaction(signedTxn.blob, txHeaders)
          .do()
          .then((resp: any) => {
            sendResponse({ txId: resp.txId });
          })
          .catch((e: any) => {
            if (e.body.message.includes('overspend'))
              sendResponse({
                error:
                  "Overspending. Your account doesn't have sufficient funds.",
              });
            else sendResponse({ error: e.body.message });
          });
      } else {
        let signedTxn;
        try {
          const builtTx = buildTransaction(txn);
          signedTxn = {
            txID: builtTx.txID().toString(),
            blob: builtTx.signTxn(recoveredAccount.sk),
          };
        } catch (e) {
          sendResponse({ error: e.message });
          return;
        }

        algod
          .sendRawTransaction(signedTxn.blob, txHeaders)
          .do()
          .then((resp: any) => {
            sendResponse({ txId: resp.txId });
          })
          .catch((e: any) => {
            if (e.body.message.includes('overspend'))
              sendResponse({
                error:
                  "Overspending. Your account doesn't have sufficient funds.",
              });
            else sendResponse({ error: e.body.message });
          });
      }
    });

    return true;
  }

  public static [JsonRpcMethod.ChangeLedger](
    request: any,
    sendResponse: Function
  ) {
    session.ledger = request.body.params['ledger'];
    sendResponse({ ledger: session.ledger });
  }
}
