/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const algosdk = require('algosdk');

import { RequestErrors, WalletTransaction } from '@algosigner/common/types';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { API, Ledger } from './types';
import {
  getValidatedTxnWrap,
  getLedgerFromGenesisId,
  calculateEstimatedFee,
} from '../transaction/actions';
import { BaseValidatedTxnWrap } from '../transaction/baseValidatedTxnWrap';
import { ValidationStatus } from '../utils/validator';
import { InternalMethods } from './internalMethods';
import { MessageApi } from './api';
import encryptionWrap from '../encryptionWrap';
import { Settings } from '../config';
import { extensionBrowser } from '@algosigner/common/chrome';
import { logging } from '@algosigner/common/logging';
import { InvalidTransactionStructure } from '../../errors/validation';
import {
  InvalidStructure,
  InvalidMsigStructure,
  NoDifferentLedgers,
  MultipleTxsRequireGroup,
  NonMatchingGroup,
  IncompleteOrDisorderedGroup,
  InvalidSigners,
} from '../../errors/walletTxSign';
import { buildTransaction } from '../utils/transactionBuilder';
import { getSigningAccounts } from '../utils/multisig';
import { removeEmptyFields } from '@algosigner/common/utils';
import { base64ToByteArray, byteArrayToBase64 } from '@algosigner/common/encoding';

const popupProperties = {
  type: 'popup',
  focused: true,
  width: 400 + 12,
  height: 550 + 34,
};

export class Task {
  private static requests: { [key: string]: any } = {};
  private static authorized_pool: Array<string> = [];

  public static isAuthorized(origin: string): boolean {
    return Task.authorized_pool.indexOf(origin) > -1;
  }

  private static fetchAPI(url, params) {
    return new Promise((resolve, reject) => {
      fetch(url, params)
        .then((response) => {
          return response.json().then((json) => {
            if (response.ok) {
              return json;
            } else {
              return Promise.reject(json);
            }
          });
        })
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          const res: Object = {
            message: error.message,
            data: error.data,
          };
          reject(res);
        });
    });
  }

  public static build(request: any) {
    const body = request.body;
    const method = body.method;

    // Check if there's a previous request from the same origin
    if (request.originTabID in Task.requests)
      return new Promise((resolve, reject) => {
        request.error = {
          message: 'Another query processing',
        };
        reject(request);
      });
    else Task.requests[request.originTabID] = request;

    return new Promise((resolve, reject) => {
      Task.methods().public[method](request, resolve, reject);
    }).finally(() => {
      delete Task.requests[request.originTabID];
    });
  }

  public static clearPool() {
    Task.authorized_pool = [];
  }

  private static modifyTransactionWrapWithAssetCoreInfo(transactionWrap, callback) {
    // Adjust decimal places if we are using an axfer transaction
    if (transactionWrap.transaction['type'] === 'axfer') {
      const assetIndex = transactionWrap.transaction['assetIndex'];
      const ledger = getLedgerFromGenesisId(transactionWrap.transaction['genesisID']);
      const conn = Settings.getBackendParams(ledger, API.Indexer);
      const sendPath = `/v2/assets/${assetIndex}`;
      const fetchAssets: any = {
        headers: {
          ...conn.headers,
        },
        method: 'GET',
      };

      let url = conn.url;
      if (conn.port.length > 0) url += ':' + conn.port;
      Task.fetchAPI(`${url}${sendPath}`, fetchAssets)
        .then((assets) => {
          const params = assets['asset']['params'];

          // Get relevant data from asset params
          const decimals = params['decimals'];
          const unitName = params['unit-name'];

          // Update the unit-name for the asset
          if (unitName) {
            transactionWrap.unitName = unitName;
          }

          // Get the display amount as a string to prevent screen deformation of large ints
          let displayAmount = String(transactionWrap.transaction.amount);

          // If we have decimals, then we need to set the display amount with them in mind
          if (decimals && decimals > 0) {
            // Append missing zeros, if needed
            if (displayAmount.length < decimals) {
              displayAmount = displayAmount.padStart(decimals, '0');
            }
            const offsetAmount = Math.abs(decimals - displayAmount.length);

            // Apply decimal transition
            displayAmount = `${displayAmount.substr(0, offsetAmount)}.${displayAmount.substr(
              offsetAmount
            )}`;

            // If we start with a decimal now after padding and applying, add a 0 to the beginning for legibility
            if (displayAmount.startsWith('.')) {
              displayAmount = '0'.concat(displayAmount);
            }

            // Set new amount
            transactionWrap.displayAmount = displayAmount;
          }
          callback && callback(transactionWrap);
        })
        .catch((ex) => {
          // Could not get asset information for a transfer - attach error note
          transactionWrap['error'] = ex['message'];
          callback && callback(transactionWrap);
        });
    } else {
      callback && callback(transactionWrap);
    }
  }

  public static methods(): {
    [key: string]: {
      [JsonRpcMethod: string]: Function;
    };
  } {
    return {
      public: {
        // authorization
        [JsonRpcMethod.Authorization]: (d: any) => {
          // Delete any previous request made from the Tab that it's
          // trying to connect.
          delete Task.requests[d.originTabID];

          // If access was already granted, authorize connection.
          if (Task.isAuthorized(d.origin)) {
            d.response = {};
            MessageApi.send(d);
          } else {
            extensionBrowser.windows.create(
              {
                url: extensionBrowser.runtime.getURL('index.html#/authorize'),
                ...popupProperties,
              },
              function (w: any) {
                if (w) {
                  Task.requests[d.originTabID] = {
                    window_id: w.id,
                    message: d,
                  };
                  setTimeout(function () {
                    extensionBrowser.runtime.sendMessage(d);
                  }, 500);
                }
              }
            );
          }
        },
        // sign-transaction
        [JsonRpcMethod.SignTransaction]: (d: any, resolve: Function, reject: Function) => {
          let transactionWrap = undefined;
          let validationError = undefined;
          try {
            const txn = d.body.params;
            transactionWrap = getValidatedTxnWrap(txn, txn['type']);
            InternalMethods.checkValidAccount(
              transactionWrap.transaction.genesisID,
              transactionWrap.transaction.from
            );
          } catch (e) {
            logging.log(`Validation failed. ${e.message}`);
            validationError = e;
          }
          if (
            !transactionWrap &&
            validationError &&
            validationError instanceof InvalidTransactionStructure
          ) {
            // We don't have a transaction wrap, but we have a validation error.
            d.error = {
              message: validationError.message,
            };
            reject(d);
            return;
          } else if (!transactionWrap || validationError) {
            // We don't have a transaction wrap. We have an unknow error or extra fields, reject the transaction.
            logging.log(
              'A transaction has failed because of an inability to build the specified transaction type.'
            );
            d.error = {
              message:
                (validationError && validationError.message) ||
                'Validation failed for transaction. Please verify the properties are valid.',
            };
            reject(d);
          } else if (
            transactionWrap.validityObject &&
            Object.values(transactionWrap.validityObject).some(
              (value) => value['status'] === ValidationStatus.Invalid
            )
          ) {
            // We have a transaction that contains fields which are deemed invalid. We should reject the transaction.
            // We can use a modified popup that allows users to review the transaction and invalid fields and close the transaction.
            const invalidKeys = [];
            Object.entries(transactionWrap.validityObject).forEach(([key, value]) => {
              if (value['status'] === ValidationStatus.Invalid) {
                invalidKeys.push(`${key}`);
              }
            });
            d.error = {
              message: `Validation failed for transaction because of invalid properties [${invalidKeys.join(
                ','
              )}].`,
            };
            reject(d);
          } else {
            // Get Ledger params
            const conn = Settings.getBackendParams(
              getLedgerFromGenesisId(transactionWrap.transaction.genesisID),
              API.Algod
            );
            const sendPath = '/v2/transactions/params';
            const fetchParams: any = {
              headers: {
                ...conn.headers,
              },
              method: 'GET',
            };

            let url = conn.url;
            if (conn.port.length > 0) url += ':' + conn.port;

            Task.fetchAPI(`${url}${sendPath}`, fetchParams).then((params) => {
              calculateEstimatedFee(transactionWrap, params);

              Task.modifyTransactionWrapWithAssetCoreInfo(transactionWrap, (transactionWrap) => {
                if (transactionWrap.error) {
                  // There was an error building the asset info. Outright reject / allow with warning.
                  //reject(d);
                  //return;
                }

                d.body.params = transactionWrap;

                extensionBrowser.windows.create(
                  {
                    url: extensionBrowser.runtime.getURL('index.html#/sign-transaction'),
                    ...popupProperties,
                  },
                  function (w) {
                    if (w) {
                      Task.requests[d.originTabID] = {
                        window_id: w.id,
                        message: d,
                      };
                      // Send message with tx info
                      setTimeout(function () {
                        extensionBrowser.runtime.sendMessage(d);
                      }, 500);
                    }
                  }
                );
              });
            });
          }
        },
        [JsonRpcMethod.SignMultisigTransaction]: (d: any, resolve: Function, reject: Function) => {
          // TODO: Possible support for blob transfer on previously signed transactions

          let transactionWrap = undefined;
          let validationError = undefined;
          try {
            transactionWrap = getValidatedTxnWrap(d.body.params.txn, d.body.params.txn['type']);
          } catch (e) {
            logging.log(`Validation failed. ${e}`);
            validationError = e;
          }
          if (
            !transactionWrap &&
            validationError &&
            validationError instanceof InvalidTransactionStructure
          ) {
            // We don't have a transaction wrap, but we have a validation error.
            d.error = {
              message: validationError.message,
            };
            reject(d);
            return;
          } else if (!transactionWrap) {
            // We don't have a transaction wrap. We have an unknow error or extra fields, reject the transaction.
            logging.log(
              'A transaction has failed because of an inability to build the specified transaction type.'
            );
            d.error = {
              message:
                validationError ||
                'Validation failed for transaction. Please verify the properties are valid.',
            };
            reject(d);
          } else if (
            transactionWrap.validityObject &&
            Object.values(transactionWrap.validityObject).some(
              (value) => value['status'] === ValidationStatus.Invalid
            )
          ) {
            // We have a transaction that contains fields which are deemed invalid. We should reject the transaction.
            // We can use a modified popup that allows users to review the transaction and invalid fields and close the transaction.
            const invalidKeys = [];
            Object.entries(transactionWrap.validityObject).forEach(([key, value]) => {
              if (value['status'] === ValidationStatus.Invalid) {
                invalidKeys.push(`${key}`);
              }
            });
            d.error = {
              message: `Validation failed for transaction because of invalid properties [${invalidKeys.join(
                ','
              )}].`,
            };
            reject(d);
          } else {
            // Get Ledger params
            const conn = Settings.getBackendParams(
              getLedgerFromGenesisId(transactionWrap.transaction.genesisID),
              API.Algod
            );
            const sendPath = '/v2/transactions/params';
            const fetchParams: any = {
              headers: {
                ...conn.headers,
              },
              method: 'GET',
            };

            let url = conn.url;
            if (conn.port.length > 0) url += ':' + conn.port;

            Task.fetchAPI(`${url}${sendPath}`, fetchParams).then((params) => {
              calculateEstimatedFee(transactionWrap, params);

              Task.modifyTransactionWrapWithAssetCoreInfo(transactionWrap, (transactionWrap) => {
                if (transactionWrap.error) {
                  // There was an error building the asset info. Outright reject / allow with warning.
                  //reject(d);
                  //return;
                }

                d.body.params.validityObject = transactionWrap.validityObject;
                d.body.params.txn = transactionWrap.transaction;
                d.body.params.estimatedFee = transactionWrap.estimatedFee;

                const msig_txn = { msig: d.body.params.msig, txn: d.body.params.txn };
                const session = InternalMethods.getHelperSession();
                const ledger = getLedgerFromGenesisId(transactionWrap.transaction.genesisID);
                const accounts = session.wallet[ledger];
                const multisigAccounts = getSigningAccounts(accounts, msig_txn);

                if (multisigAccounts.error) {
                  d.error = multisigAccounts.error.message;
                  reject(d);
                } else {
                  if (multisigAccounts.accounts && multisigAccounts.accounts.length > 0) {
                    d.body.params.account = multisigAccounts.accounts[0]['address'];
                    d.body.params.name = multisigAccounts.accounts[0]['name'];
                  }

                  extensionBrowser.windows.create(
                    {
                      url: extensionBrowser.runtime.getURL('index.html#/sign-multisig-transaction'),
                      ...popupProperties,
                    },
                    function (w) {
                      if (w) {
                        Task.requests[d.originTabID] = {
                          window_id: w.id,
                          message: d,
                        };
                        // Send message with tx info
                        setTimeout(function () {
                          extensionBrowser.runtime.sendMessage(d);
                        }, 500);
                      }
                    }
                  );
                }
              });
            });
          }
        },
        // sign-wallet-transaction
        [JsonRpcMethod.SignWalletTransaction]: (d: any, resolve: Function, reject: Function) => {
          const walletTransactions: Array<WalletTransaction> = d.body.params.transactions;
          const rawTxArray: Array<any> = [];
          const processedTxArray: Array<any> = [];
          const transactionWraps: Array<BaseValidatedTxnWrap> = [];
          const validationErrors: Array<Error> = [];

          walletTransactions.forEach((walletTx, index) => {
            try {
              console.log(`Processing transaction #${index}:`);
              console.log(walletTransactions[index]);
              // Runtime type checking
              if (
                // prettier-ignore
                (walletTx.authAddr != null && typeof walletTx.authAddr !== 'string') ||
                (walletTx.message != null && typeof walletTx.message !== 'string') ||
                (!walletTx.txn || typeof walletTx.txn !== 'string') ||
                (walletTx.signers != null && 
                  (
                    !Array.isArray(walletTx.signers) || 
                    (Array.isArray(walletTx.signers) && (walletTx.signers as Array<any>).some((s)=>typeof s !== 'string'))
                  )
                ) ||
                (walletTx.msig && typeof walletTx.msig !== 'object')
              ) {
                console.log('invalid wallet');
                throw new InvalidStructure();
              } else if (
                // prettier-ignore
                walletTx.msig && (
                  (!walletTx.msig.threshold || typeof walletTx.msig.threshold !== 'number') ||
                  (!walletTx.msig.version || typeof walletTx.msig.version !== 'number') ||
                  (
                    !walletTx.msig.addrs || 
                    !Array.isArray(walletTx.msig.addrs) || 
                    (Array.isArray(walletTx.msig.addrs) && (walletTx.msig.addrs as Array<any>).some((s)=>typeof s !== 'string'))
                  )
                )
              ) {
                console.log('invalid msig');
                throw new InvalidMsigStructure();
              }

              /**
               * In order to process the transaction and make it compatible with our validator, we:
               * 0) Decode from base64 to Uint8Array msgpack
               * 1) Use the 'decodeUnsignedTransaction' method of the SDK to parse the msgpack
               * 2) Use the '_getDictForDisplay' to change the format of the fields that are different from ours
               * 3) Remove empty fields to get rid of conversion issues like empty note byte arrays
               */
              const rawTx = algosdk.decodeUnsignedTransaction(base64ToByteArray(walletTx.txn));
              rawTxArray[index] = rawTx;
              const processedTx = removeEmptyFields(rawTx._getDictForDisplay());
              processedTxArray[index] = processedTx;
              console.log(processedTx);
              const wrap = getValidatedTxnWrap(processedTx, processedTx['type'], false);
              transactionWraps[index] = wrap;
              const genesisID = wrap.transaction.genesisID;
              console.log(wrap);

              const signers = walletTransactions[index].signers;
              const msigData = walletTransactions[index].msig;
              wrap.msigData = msigData;
              wrap.signers = signers;
              if (msigData) {
                if (signers && signers.length) {
                  signers.forEach((address) => {
                    InternalMethods.checkValidAccount(genesisID, address);
                  });
                }
                wrap.msigData = msigData;
              } else {
                if (!signers) {
                  InternalMethods.checkValidAccount(genesisID, wrap.transaction.from);
                }
              }

              return wrap;
            } catch (e) {
              validationErrors[index] = e;
            }
          });

          console.log('Raw, processed, wraps and errors');
          console.log(rawTxArray);
          console.log(processedTxArray);
          console.log(transactionWraps);
          console.log(validationErrors);

          if (
            validationErrors.length ||
            !transactionWraps.length ||
            transactionWraps.some((w) => w === undefined)
          ) {
            console.log('Errors or missing wraps');
            // We don't have transaction wraps or we have an building error, reject the transaction.
            let errorMessage = 'There was a problem validating the transaction(s): ';
            let validationMessages = '';

            validationErrors.forEach((err, index) => {
              validationMessages =
                validationMessages +
                `\nValidation failed for transaction ${index} due to: ${err.message}`;
            });
            errorMessage +=
              (validationMessages.length && validationMessages) ||
              'Please verify the properties are valid.';
            logging.log(errorMessage);
            d.error = {
              message: errorMessage,
            };
            reject(d);
            return;
          } else if (
            transactionWraps.some(
              (tx) =>
                tx.validityObject &&
                Object.values(tx.validityObject).some(
                  (value) => value['status'] === ValidationStatus.Invalid
                )
            )
          ) {
            console.log('Invalid fields');
            // We have a transaction that contains fields which are deemed invalid. We should reject the transaction.
            // We can use a modified popup that allows users to review the transaction and invalid fields and close the transaction.
            const invalidKeys = {};
            transactionWraps.forEach((tx, index) => {
              invalidKeys[index] = [];
              Object.entries(tx.validityObject).forEach(([key, value]) => {
                if (value['status'] === ValidationStatus.Invalid) {
                  invalidKeys[index].push(`${key}: ${value['info']}`);
                }
              });
              if (!invalidKeys[index].length) delete invalidKeys[index];
            });

            let errorMessage = '';

            Object.keys(invalidKeys).forEach((index) => {
              errorMessage =
                errorMessage +
                `Validation failed for transaction #${index} because of invalid properties [${invalidKeys[
                  index
                ].join(', ')}]. `;
            });

            d.error = {
              message: errorMessage,
            };
            reject(d);
            return;
          } else {
            console.log('Last bracket');
            // Group validations
            if (transactionWraps.length > 1) {
              if (
                !transactionWraps.every(
                  (wrap) => transactionWraps[0].transaction.genesisID === wrap.transaction.genesisID
                )
              ) {
                const e = new NoDifferentLedgers();
                logging.log(`Validation failed. ${e}`);
                d.error = e;
                reject(d);
                return;
              }

              const groupId = transactionWraps[0].transaction.group;
              if (!groupId) {
                const e = new MultipleTxsRequireGroup();
                logging.log(`Validation failed. ${e}`);
                d.error = e;
                reject(d);
                return;
              }

              if (!transactionWraps.every((wrap) => groupId === wrap.transaction.group)) {
                const e = new NonMatchingGroup();
                logging.log(`Validation failed. ${e}`);
                d.error = e;
                reject(d);
                return;
              }

              const recreatedGroupTxs = algosdk.assignGroupID(
                rawTxArray.slice().map((tx) => {
                  delete tx.group;
                  return tx;
                })
              );
              const recalculatedGroupID = byteArrayToBase64(recreatedGroupTxs[0].group);
              if (groupId !== recalculatedGroupID) {
                const e = new IncompleteOrDisorderedGroup();
                logging.log(`Validation failed. ${e}`);
                d.error = e;
                reject(d);
                return;
              }
            } else {
              const wrap = transactionWraps[0];
              if (
                (!wrap.msigData && wrap.signers) ||
                (wrap.msigData && wrap.signers && !wrap.signers.length)
              ) {
                const e = new InvalidSigners();
                logging.log(`Validation failed. ${e}`);
                d.error = e;
                reject(d);
                return;
              }
            }

            console.log(d.body.params);
            d.body.params.transactionWraps = transactionWraps;

            extensionBrowser.windows.create(
              {
                url: extensionBrowser.runtime.getURL('index.html#/sign-v2-transaction'),
                ...popupProperties,
                height: popupProperties.height + (transactionWraps.length > 1 ? 80 : 0),
              },
              function (w) {
                if (w) {
                  Task.requests[d.originTabID] = {
                    window_id: w.id,
                    message: d,
                  };
                  // Send message with tx info
                  setTimeout(function () {
                    extensionBrowser.runtime.sendMessage(d);
                  }, 500);
                }
              }
            );
          }
        },
        // algod
        [JsonRpcMethod.SendTransaction]: (d: any, resolve: Function, reject: Function) => {
          const { params } = d.body;
          const conn = Settings.getBackendParams(params.ledger, API.Algod);
          const sendPath = '/v2/transactions';
          const fetchParams: any = {
            headers: {
              ...conn.headers,
              'Content-Type': 'application/x-binary',
            },
            method: 'POST',
          };
          const tx = atob(params.tx)
            .split('')
            .map((x) => x.charCodeAt(0));
          fetchParams.body = new Uint8Array(tx);

          let url = conn.url;
          if (conn.port.length > 0) url += ':' + conn.port;

          Task.fetchAPI(`${url}${sendPath}`, fetchParams)
            .then((response) => {
              d.response = response;
              resolve(d);
            })
            .catch((error) => {
              d.error = error;
              reject(d);
            });
        },
        // algod
        [JsonRpcMethod.Algod]: (d: any, resolve: Function, reject: Function) => {
          const { params } = d.body;
          const conn = Settings.getBackendParams(params.ledger, API.Algod);

          const contentType = params.contentType ? params.contentType : '';

          const fetchParams: any = {
            headers: {
              ...conn.headers,
              'Content-Type': contentType,
            },
            method: params.method || 'GET',
          };
          if (params.body) fetchParams.body = params.body;

          let url = conn.url;
          if (conn.port.length > 0) url += ':' + conn.port;

          Task.fetchAPI(`${url}${params.path}`, fetchParams)
            .then((response) => {
              d.response = response;
              resolve(d);
            })
            .catch((error) => {
              d.error = error;
              reject(d);
            });
        },
        // Indexer
        [JsonRpcMethod.Indexer]: (d: any, resolve: Function, reject: Function) => {
          const { params } = d.body;
          const conn = Settings.getBackendParams(params.ledger, API.Indexer);

          const contentType = params.contentType ? params.contentType : '';

          const fetchParams: any = {
            headers: {
              ...conn.headers,
              'Content-Type': contentType,
            },
            method: params.method || 'GET',
          };
          if (params.body) fetchParams.body = params.body;

          let url = conn.url;
          if (conn.port.length > 0) url += ':' + conn.port;

          Task.fetchAPI(`${url}${params.path}`, fetchParams)
            .then((response) => {
              d.response = response;
              resolve(d);
            })
            .catch((error) => {
              d.error = error;
              reject(d);
            });
        },
        // Accounts
        /* eslint-disable-next-line no-unused-vars */
        [JsonRpcMethod.Accounts]: (d: any, resolve: Function, reject: Function) => {
          const session = InternalMethods.getHelperSession();
          // If we don't have a ledger requested, respond with an error giving available ledgers
          if (!d.body.params.ledger) {
            const baseNetworks = Object.keys(Ledger);
            const injectedNetworks = Settings.getCleansedInjectedNetworks();
            d.error = {
              message: `Ledger not provided. Please use a base ledger: [${baseNetworks}] or an available custom one ${JSON.stringify(
                injectedNetworks
              )}.`,
            };
            reject(d);
            return;
          }

          const accounts = session.wallet[d.body.params.ledger];
          // If we have requested a ledger but don't have it, respond with an error
          if (accounts === undefined) {
            d.error = {
              message: RequestErrors.UnsupportedLedger,
            };
            reject(d);
            return;
          }

          const res = [];
          for (let i = 0; i < accounts.length; i++) {
            res.push({
              address: accounts[i].address,
            });
          }
          d.response = res;
          resolve(d);
        },
      },
      private: {
        // authorization-allow
        [JsonRpcMethod.AuthorizationAllow]: (d) => {
          const { responseOriginTabID } = d.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;

          extensionBrowser.windows.remove(auth.window_id);
          Task.authorized_pool.push(message.origin);
          delete Task.requests[responseOriginTabID];

          setTimeout(() => {
            // Response needed
            message.response = {};
            MessageApi.send(message);
          }, 100);
        },
        // authorization-deny
        [JsonRpcMethod.AuthorizationDeny]: (d) => {
          const { responseOriginTabID } = d.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;

          auth.message.error = {
            message: RequestErrors.NotAuthorized,
          };
          extensionBrowser.windows.remove(auth.window_id);
          delete Task.requests[responseOriginTabID];

          setTimeout(() => {
            MessageApi.send(message);
          }, 100);
        },
      },
      extension: {
        // sign-allow
        [JsonRpcMethod.SignAllow]: (request: any, sendResponse: Function) => {
          const { passphrase, responseOriginTabID } = request.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;

          const {
            from,
            // to,
            // fee,
            // amount,
            // firstRound,
            // lastRound,
            genesisID,
            // genesisHash,
            // note,
          } = message.body.params.transaction;

          try {
            const ledger = getLedgerFromGenesisId(genesisID);

            const context = new encryptionWrap(passphrase);
            context.unlock(async (unlockedValue: any) => {
              if ('error' in unlockedValue) {
                sendResponse(unlockedValue);
                return false;
              }

              extensionBrowser.windows.remove(auth.window_id);

              let account;

              if (unlockedValue[ledger] === undefined) {
                message.error = RequestErrors.UnsupportedLedger;
                MessageApi.send(message);
              }
              // Find address to send algos from
              for (let i = unlockedValue[ledger].length - 1; i >= 0; i--) {
                if (unlockedValue[ledger][i].address === from) {
                  account = unlockedValue[ledger][i];
                  break;
                }
              }

              const recoveredAccount = algosdk.mnemonicToSecretKey(account.mnemonic);

              const txn = { ...message.body.params.transaction };

              removeEmptyFields(txn);

              // Modify base64 encoded fields
              if ('note' in txn && txn.note !== undefined) {
                txn.note = new Uint8Array(Buffer.from(txn.note));
              }
              // Application transactions only
              if (txn && txn.type == 'appl') {
                if ('appApprovalProgram' in txn) {
                  try {
                    txn.appApprovalProgram = Uint8Array.from(
                      Buffer.from(txn.appApprovalProgram, 'base64')
                    );
                  } catch {
                    message.error =
                      'Error trying to parse appApprovalProgram into a Uint8Array value.';
                  }
                }
                if ('appClearProgram' in txn) {
                  try {
                    txn.appClearProgram = Uint8Array.from(
                      Buffer.from(txn.appClearProgram, 'base64')
                    );
                  } catch {
                    message.error =
                      'Error trying to parse appClearProgram into a Uint8Array value.';
                  }
                }
                if ('appArgs' in txn) {
                  try {
                    const tempArgs = [];
                    txn.appArgs.forEach((element) => {
                      logging.log(element);
                      tempArgs.push(Uint8Array.from(Buffer.from(element, 'base64')));
                    });
                    txn.appArgs = tempArgs;
                  } catch {
                    message.error = 'Error trying to parse appArgs into Uint8Array values.';
                  }
                }
              }

              try {
                // This step transitions a raw object into a transaction style object
                const builtTx = buildTransaction(txn);
                // We are combining the tx id get and sign into one step/object because of legacy,
                // this may not need to be the case any longer.
                const signedTxn = {
                  txID: builtTx.txID().toString(),
                  blob: builtTx.signTxn(recoveredAccount.sk),
                };
                const b64Obj = Buffer.from(signedTxn.blob).toString('base64');

                message.response = {
                  txID: signedTxn.txID,
                  blob: b64Obj,
                };
              } catch (e) {
                message.error = e.message;
              }

              // Clean class saved request
              delete Task.requests[responseOriginTabID];
              MessageApi.send(message);
            });
          } catch {
            // On error we should remove the task
            delete Task.requests[responseOriginTabID];
            return false;
          }
          return true;
        },
        // sign-allow-multisig
        [JsonRpcMethod.SignAllowMultisig]: (request: any, sendResponse: Function) => {
          const { passphrase, responseOriginTabID } = request.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;

          // Map the full multisig transaction here
          const msig_txn = { msig: message.body.params.msig, txn: message.body.params.txn };

          try {
            // Use MainNet if specified - default to TestNet
            const ledger = getLedgerFromGenesisId(msig_txn.txn.genesisID);

            // Create an encryption wrap to get the needed signing account information
            const context = new encryptionWrap(passphrase);
            context.unlock(async (unlockedValue: any) => {
              if ('error' in unlockedValue) {
                sendResponse(unlockedValue);
                return false;
              }

              extensionBrowser.windows.remove(auth.window_id);

              // Verify this is a multisig sign occurs in the getSigningAccounts
              // This get may receive a .error in return if an appropriate account is not found
              let account;
              const multisigAccounts = getSigningAccounts(unlockedValue[ledger], msig_txn);
              if (multisigAccounts.error) {
                message.error = multisigAccounts.error.message;
              } else {
                // TODO: Currently we are grabbing the first non-signed account. This may change.
                account = multisigAccounts.accounts[0];
              }

              if (account) {
                // We can now use the found account match to get the sign key
                const recoveredAccount = algosdk.mnemonicToSecretKey(account.mnemonic);

                // Use the received txn component of the transaction, but remove undefined and null values
                Object.keys({ ...msig_txn.txn }).forEach((key) => {
                  if (msig_txn.txn[key] === undefined || msig_txn.txn[key] === null) {
                    delete msig_txn.txn[key];
                  }
                });

                // Modify base64 encoded fields
                if ('note' in msig_txn.txn && msig_txn.txn.note !== undefined) {
                  msig_txn.txn.note = new Uint8Array(Buffer.from(msig_txn.txn.note));
                }
                // Application transactions only
                if (msig_txn.txn && msig_txn.txn.type == 'appl') {
                  if ('appApprovalProgram' in msig_txn.txn) {
                    try {
                      msig_txn.txn.appApprovalProgram = Uint8Array.from(
                        Buffer.from(msig_txn.txn.appApprovalProgram, 'base64')
                      );
                    } catch {
                      message.error =
                        'Error trying to parse appApprovalProgram into a Uint8Array value.';
                    }
                  }
                  if ('appClearProgram' in msig_txn.txn) {
                    try {
                      msig_txn.txn.appClearProgram = Uint8Array.from(
                        Buffer.from(msig_txn.txn.appClearProgram, 'base64')
                      );
                    } catch {
                      message.error =
                        'Error trying to parse appClearProgram into a Uint8Array value.';
                    }
                  }
                  if ('appArgs' in msig_txn.txn) {
                    try {
                      const tempArgs = [];
                      msig_txn.txn.appArgs.forEach((element) => {
                        tempArgs.push(Uint8Array.from(Buffer.from(element, 'base64')));
                      });
                      msig_txn.txn.appArgs = tempArgs;
                    } catch {
                      message.error = 'Error trying to parse appArgs into Uint8Array values.';
                    }
                  }
                }

                try {
                  // This step transitions a raw object into a transaction style object
                  const builtTx = buildTransaction(msig_txn.txn);

                  // Building preimg - This allows the pks to be passed, but still use the default multisig sign with addrs
                  const version = msig_txn.msig.v || msig_txn.msig.version;
                  const threshold = msig_txn.msig.thr || msig_txn.msig.threshold;
                  const addrs =
                    msig_txn.msig.addrs ||
                    msig_txn.msig.subsig.map((subsig) => {
                      return subsig.pk;
                    });
                  const preimg = {
                    version: version,
                    threshold: threshold,
                    addrs: addrs,
                  };

                  let signedTxn;
                  const appendEnabled = false; // TODO: This disables append functionality until blob objects are allowed and validated.
                  // Check for existing signatures. Append if there are any.
                  if (appendEnabled && msig_txn.msig.subsig.some((subsig) => subsig.s)) {
                    // TODO: This should use a sent multisig blob if provided. This is a future enhancement as validation doesn't allow it currently.
                    // It is subject to change and is built as scaffolding for future functionality.
                    const encodedBlob = message.body.params.txn;
                    const decodedBlob = Buffer.from(encodedBlob, 'base64');
                    signedTxn = algosdk.appendSignMultisigTransaction(
                      decodedBlob,
                      preimg,
                      recoveredAccount.sk
                    );
                  } else {
                    // If this is the first signature then do a normal sign
                    signedTxn = algosdk.signMultisigTransaction(
                      builtTx,
                      preimg,
                      recoveredAccount.sk
                    );
                  }

                  // Converting the blob to an encoded string for transfer back to dApp
                  const b64Obj = Buffer.from(signedTxn.blob).toString('base64');

                  message.response = {
                    txID: signedTxn.txID,
                    blob: b64Obj,
                  };
                } catch (e) {
                  message.error = e.message;
                }
              }
              // Clean class saved request
              delete Task.requests[responseOriginTabID];
              MessageApi.send(message);
            });
          } catch {
            // On error we should remove the task
            delete Task.requests[responseOriginTabID];
            return false;
          }
          return true;
        },
        // sign-allow-wallet-tx
        [JsonRpcMethod.SignAllowWalletTx]: (request: any, sendResponse: Function) => {
          const { passphrase, responseOriginTabID } = request.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;
          const walletTransactions: Array<WalletTransaction> = message.body.params.transactions;
          const transactionsWraps: Array<BaseValidatedTxnWrap> =
            message.body.params.transactionWraps;
          const transactionObjs = walletTransactions.map((walletTx) =>
            algosdk.decodeUnsignedTransaction(base64ToByteArray(walletTx.txn))
          );

          const signedTxs = [];
          const signErrors = [];
          console.log('Signing');
          console.log(transactionObjs);

          try {
            const ledger = getLedgerFromGenesisId(transactionObjs[0].genesisID);
            const neededAccounts: Array<string> = [];
            walletTransactions.forEach((w, i) => {
              const msig = w.msig;
              const signers = w.signers;
              // If signers are provided as an empty array, it means it's a reference transaction (not to be signed)
              if (!(signers && !signers.length)) {
                // If multisig is provided, we search for the provided signers
                // Otherwise, we search for all the multisig addresses we have
                if (msig) {
                  if (signers) {
                    signers.forEach((a) => {
                      if (!neededAccounts.includes(a)) {
                        neededAccounts.push(a);
                      }
                    });
                  } else {
                    msig.addrs.forEach((a) => {
                      if (!neededAccounts.includes(a)) {
                        neededAccounts.push(a);
                      }
                    });
                  }
                } else {
                  neededAccounts.push(transactionsWraps[i].transaction.from);
                }
              }
            });
            console.log(`Needed accounts (${neededAccounts.length}): ${neededAccounts}`);

            const context = new encryptionWrap(passphrase);
            context.unlock(async (unlockedValue: any) => {
              if ('error' in unlockedValue) {
                sendResponse(unlockedValue);
                return false;
              }
              extensionBrowser.windows.remove(auth.window_id);

              const recoveredAccounts = [];

              if (unlockedValue[ledger] === undefined) {
                message.error = RequestErrors.UnsupportedLedger;
                MessageApi.send(message);
              }
              // Find addresses to send algos from
              // We store them using the public address as dictionary key
              for (let i = unlockedValue[ledger].length - 1; i >= 0; i--) {
                const address = unlockedValue[ledger][i].address;
                if (neededAccounts.includes(address)) {
                  recoveredAccounts[address] = algosdk.mnemonicToSecretKey(
                    unlockedValue[ledger][i].mnemonic
                  );
                }
              }

              transactionObjs.forEach((tx, index) => {
                console.log(`Trying to sign tx ${index}`);
                console.log(tx);
                const signers = walletTransactions[index].signers;
                // If it's a reference transaction we return null, otherwise we try sign
                if (signers && !signers.length) {
                  console.log("It's a reference transaction");
                  signedTxs[index] = null;
                } else {
                  try {
                    const txID = tx.txID().toString();
                    const wrap = transactionsWraps[index];
                    const msigData = wrap.msigData;
                    let signedBlob;

                    if (msigData) {
                      console.log("We're dealing with multisig");
                      const partiallySignedBlobs = [];
                      // We use the provided signers or all of the available addresses on the Multisig metadata
                      const signingAddresses = (signers ? signers : msigData.addrs).filter(
                        (a) => recoveredAccounts[a]
                      );
                      signingAddresses.forEach((address) => {
                        if (recoveredAccounts[address]) {
                          partiallySignedBlobs.push(
                            algosdk.signMultisigTransaction(
                              tx,
                              msigData,
                              recoveredAccounts[address].sk
                            ).blob
                          );
                        }
                      });
                      if (partiallySignedBlobs.length > 1) {
                        // If there's more than one partially signed transaction, we merge the signatures by hand
                        const signatures = [];
                        partiallySignedBlobs.forEach((partial) => {
                          const decoded = algosdk.decodeSignedTransaction(partial);
                          const signed = decoded.msig.subsig.find((s) => !!s.s);
                          console.log(algosdk.encodeAddress(signed.pk));
                          console.log(decoded.msig.subsig);
                          signatures[algosdk.encodeAddress(signed.pk)] = signed.s;
                        });
                        const mergedTx = algosdk.decodeObj(partiallySignedBlobs[0]);
                        mergedTx.msig.subsig.forEach((subsig) => {
                          if (!subsig.s) {
                            const lookupSig = signatures[algosdk.encodeAddress(subsig.pk)];
                            if (lookupSig) {
                              subsig.s = lookupSig;
                            }
                          }
                        });
                        signedBlob = algosdk.encodeObj(mergedTx);
                      } else {
                        signedBlob = partiallySignedBlobs[0];
                      }
                    } else {
                      console.log("We're dealing with a regular transaction");
                      const address = wrap.transaction.from;
                      signedBlob = tx.signTxn(recoveredAccounts[address].sk);
                    }
                    const b64Obj = byteArrayToBase64(signedBlob);

                    signedTxs[index] = {
                      txID: txID,
                      blob: b64Obj,
                    };
                  } catch (e) {
                    logging.log(`Signing failed. ${e.message}`);
                    signErrors[index] = e.message;
                  }
                }
              });

              if (signErrors.length) {
                message.error = 'There was a problem signing the transaction(s): ';
                if (transactionObjs.length > 1) {
                  signErrors.forEach((error, index) => {
                    message.error += `\nOn transaction ${index + 1}, the error was: ${error}`;
                  });
                } else {
                  message.error += signErrors[0];
                }
              } else {
                message.response = signedTxs;
              }
              // Clean class saved request
              delete Task.requests[responseOriginTabID];
              MessageApi.send(message);
            });
          } catch {
            // On error we should remove the task
            delete Task.requests[responseOriginTabID];
            return false;
          }
          return true;
        },
        /* eslint-disable-next-line no-unused-vars */
        [JsonRpcMethod.SignDeny]: (request: any, sendResponse: Function) => {
          const { responseOriginTabID } = request.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;

          auth.message.error = {
            message: RequestErrors.NotAuthorized,
          };
          extensionBrowser.windows.remove(auth.window_id);
          delete Task.requests[responseOriginTabID];

          setTimeout(() => {
            MessageApi.send(message);
          }, 100);
        },
        [JsonRpcMethod.CreateWallet]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.CreateWallet](request, sendResponse);
        },
        [JsonRpcMethod.DeleteWallet]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.DeleteWallet](request, sendResponse);
        },
        [JsonRpcMethod.CreateAccount]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.CreateAccount](request, sendResponse);
        },
        [JsonRpcMethod.Login]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.Login](request, sendResponse);
        },
        /* eslint-disable-next-line no-unused-vars */
        [JsonRpcMethod.Logout]: (request: any, sendResponse: Function) => {
          InternalMethods.clearSession();
          Task.clearPool();
          sendResponse(true);
        },
        [JsonRpcMethod.GetSession]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.GetSession](request, sendResponse);
        },
        [JsonRpcMethod.SaveAccount]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.SaveAccount](request, sendResponse);
        },
        [JsonRpcMethod.ImportAccount]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.ImportAccount](request, sendResponse);
        },
        [JsonRpcMethod.DeleteAccount]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.DeleteAccount](request, sendResponse);
        },
        [JsonRpcMethod.Transactions]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.Transactions](request, sendResponse);
        },
        [JsonRpcMethod.AccountDetails]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.AccountDetails](request, sendResponse);
        },
        [JsonRpcMethod.AssetDetails]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.AssetDetails](request, sendResponse);
        },
        [JsonRpcMethod.AssetsAPIList]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.AssetsAPIList](request, sendResponse);
        },
        [JsonRpcMethod.AssetsVerifiedList]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.AssetsVerifiedList](request, sendResponse);
        },
        [JsonRpcMethod.SignSendTransaction]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.SignSendTransaction](request, sendResponse);
        },
        [JsonRpcMethod.ChangeLedger]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.ChangeLedger](request, sendResponse);
        },
        [JsonRpcMethod.SaveNetwork]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.SaveNetwork](request, sendResponse);
        },
        [JsonRpcMethod.DeleteNetwork]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.DeleteNetwork](request, sendResponse);
        },
        [JsonRpcMethod.GetLedgers]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.GetLedgers](request, sendResponse);
        },
      },
    };
  }
}
