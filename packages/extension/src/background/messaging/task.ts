import algosdk from 'algosdk';

import { WalletTransaction } from '@algosigner/common/types';
import { RequestError } from '@algosigner/common/errors';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { Ledger } from '@algosigner/common/types';
import { API } from './types';
import {
  getValidatedTxnWrap,
  getLedgerFromGenesisId,
} from '../transaction/actions';
import { BaseValidatedTxnWrap } from '../transaction/baseValidatedTxnWrap';
import { ValidationResponse, ValidationStatus } from '../utils/validator';
import { InternalMethods } from './internalMethods';
import { MessageApi } from './api';
import encryptionWrap from '../encryptionWrap';
import { Settings } from '../config';
import { extensionBrowser } from '@algosigner/common/chrome';
import { logging } from '@algosigner/common/logging';
import { buildTransaction } from '../utils/transactionBuilder';
import { base64ToByteArray, byteArrayToBase64 } from '@algosigner/common/encoding';
import { removeEmptyFields } from '@algosigner/common/utils';

// Additional space for the title bar
const titleBarHeight = 28;

const authPopupProperties = {
  type: 'popup',
  focused: true,
  width: 400,
  height: 550 + titleBarHeight,
};

const signPopupProperties = {
  type: 'popup',
  focused: true,
  width: 400,
  height: 660 + titleBarHeight,
};

export class Task {
  private static requests: { [key: string]: any } = {};
  private static authorized_pool: Array<string> = [];

  public static isAuthorized(origin: string): boolean {
    return Task.authorized_pool.indexOf(origin) > -1;
  }

  public static build(request: any) {
    const body = request.body;
    const method = body.method;

    // Check if there's a previous request from the same origin
    if (request.originTabID in Task.requests)
      return new Promise((resolve, reject) => {
        request.error = RequestError.PendingTransaction;
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

  public static getChainAuthAddress = async (transaction: any): Promise<string> => {
    // The ledger and address will be provided differently from UI and dapp
    const ledger = transaction.ledger || getLedgerFromGenesisId(transaction.genesisID);
    const address = transaction.address || transaction.from;

    const conn = Settings.getBackendParams(ledger, API.Algod);
    const sendPath = `/v2/accounts/${address}`;
    const fetchParams: any = {
      headers: {
        ...conn.headers,
      },
      method: 'GET',
    };
    let url = conn.url;
    if (conn.port.length > 0) url += ':' + conn.port;

    let chainAuthAddr;
    await Task.fetchAPI(`${url}${sendPath}`, fetchParams).then((account) => {
      // Use authAddr or empty string
      chainAuthAddr = account['auth-addr'] || '';
    });
    return chainAuthAddr;
  };

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

  private static async modifyTransactionWrapWithAssetCoreInfo(
    transactionWrap: BaseValidatedTxnWrap
  ) {
    // Adjust decimal places if we are using an axfer transaction

    if (transactionWrap.transaction['type'] === 'axfer') {
      const assetIndex = transactionWrap.transaction['assetIndex'];
      const ledger = getLedgerFromGenesisId(transactionWrap.transaction['genesisID']);
      const conn = Settings.getBackendParams(ledger, API.Algod);
      const sendPath = `/v2/assets/${assetIndex}`;
      const fetchAssets: any = {
        headers: {
          ...conn.headers,
        },
        method: 'GET',
      };

      let url = conn.url;
      if (conn.port.length > 0) url += ':' + conn.port;

      transactionWrap.assetInfo = {
        unitName: '',
        displayAmount: '0',
      };

      await Task.fetchAPI(`${url}${sendPath}`, fetchAssets)
        .then((asset) => {
          const assetInfo: any = Object.assign({}, transactionWrap.assetInfo);
          const params = asset['params'];

          // Get relevant data from asset params
          const decimals = params['decimals'];
          const unitName = params['unit-name'];

          // Update the unit-name for the asset
          if (unitName) {
            assetInfo.unitName = unitName;
          }

          if (transactionWrap.transaction.amount) {
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
            }

            // Set new amount
            assetInfo.displayAmount = displayAmount;
          }

          transactionWrap.assetInfo = assetInfo;
        })
        .catch((e) => {
          logging.log(e.message);
        });
    }
  }

  // Intermediate function for Group of Groups handling
  private static signIndividualGroup = async (request: any) => {
    const groupsToSign: Array<Array<WalletTransaction>> = request.body.params.groupsToSign;
    const currentGroup: number = request.body.params.currentGroup;
    const walletTransactions: Array<WalletTransaction> = groupsToSign[currentGroup];
    const rawTxArray: Array<any> = [];
    const processedTxArray: Array<any> = [];
    const transactionWraps: Array<BaseValidatedTxnWrap> = [];
    const validationErrors: Array<RequestError> = [];
    try {
      // We check if we're above the maximum supported group size
      if (walletTransactions.length > RequestError.MAX_GROUP_SIZE) {
        throw RequestError.TooManyTransactions;
      }

      let index = 0;
      for (const walletTx of walletTransactions) {
        try {
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
            logging.log('Invalid Wallet Transaction Structure');
            throw RequestError.InvalidStructure;
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
            logging.log('Invalid Wallet Transaction Multisig Structure');
            throw RequestError.InvalidMsigStructure;
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
          const processedTx = rawTx._getDictForDisplay();
          processedTxArray[index] = processedTx;
          const wrap = getValidatedTxnWrap(processedTx, processedTx['type']);
          transactionWraps[index] = wrap;
          const genesisID = wrap.transaction.genesisID;

          const signers = walletTransactions[index].signers;
          const msigData = walletTransactions[index].msig;
          const authAddr = walletTransactions[index].authAddr;

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
            } else if (authAddr && signers.length === 1 && authAddr !== signers[0]) {
              // We have an authAddr so if signers is length of 1 then they must be equal
              throw RequestError.InvalidFormat;
            }
          }

          if (authAddr) {
            // Attach to wrap so it can be displayed
            transactionWraps[index].authAddr = authAddr;

            // Check that the authAddr is an address
            const isValidAddress = algosdk.isValidAddress(authAddr);
            if (!isValidAddress) {
              throw RequestError.UnsupportedAlgod;
            }

            // If there is an auth address then we SHOULD validate it is on chain and warn if not present
            const chainAuthAddr = await Task.getChainAuthAddress(processedTx);
            // If there was an auth address on chain then set the auth address for the transaction
            if (authAddr !== chainAuthAddr) {
              // Rekey - Attach warning before signing
              transactionWraps[index].validityObject['authAddr'] = new ValidationResponse({
                status: ValidationStatus.Warning,
                info: 'Value does not match the current authorized signer for this address on chain.',
              });
            }
          }
        } catch (e) {
          validationErrors[index] = e;
        }
        // Always update index
        index++;
      }

      if (
        validationErrors.length ||
        !transactionWraps.length ||
        transactionWraps.some((w) => w === undefined || w === null)
      ) {
        // We don't have transaction wraps or we have an building error, reject the transaction.
        let data = '';
        let code = 4300;

        validationErrors.forEach((error, index) => {
          data = data + `Validation failed for transaction ${index} due to: ${error.message}. `;
          code = error.code && error.code < code ? error.code : code;
        });
        throw RequestError.SigningError(code, data.trim());
      } else if (
        transactionWraps.some(
          (tx) =>
            tx.validityObject &&
            Object.values(tx.validityObject).some(
              (value) => value['status'] === ValidationStatus.Invalid
            )
        )
      ) {
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

        let data = '';
        Object.keys(invalidKeys).forEach((index) => {
          data =
            data +
            `Validation failed for transaction #${index} because of invalid properties [${invalidKeys[
              index
            ].join(', ')}]. `;
        });

        throw RequestError.InvalidFields(data);
      } else {
        // Group validations
        const groupId = transactionWraps[0].transaction.group;

        if (transactionWraps.length > 1) {
          if (
            !transactionWraps.every(
              (wrap) => transactionWraps[0].transaction.genesisID === wrap.transaction.genesisID
            )
          ) {
            throw RequestError.NoDifferentLedgers;
          }

          if (!groupId) {
            throw RequestError.MultipleTxsRequireGroup;
          }

          if (!transactionWraps.every((wrap) => groupId === wrap.transaction.group)) {
            throw RequestError.NonMatchingGroup;
          }
        } else {
          const wrap = transactionWraps[0];
          if (
            (!wrap.msigData && wrap.signers) ||
            (wrap.msigData && wrap.signers && !wrap.signers.length)
          ) {
            throw RequestError.InvalidSigners;
          }
        }

        if (groupId) {
          // Verify group is presented as a whole
          const recreatedGroupTxs = algosdk.assignGroupID(
            rawTxArray.slice().map((tx) => {
              delete tx.group;
              return tx;
            })
          );
          const recalculatedGroupID = byteArrayToBase64(recreatedGroupTxs[0].group);
          if (groupId !== recalculatedGroupID) {
            throw RequestError.IncompleteOrDisorderedGroup;
          }
        }

        for (let i = 0; i < transactionWraps.length; i++) {
          const wrap = transactionWraps[i];
          await Task.modifyTransactionWrapWithAssetCoreInfo(wrap);
        }

        request.body.params.transactionWraps = transactionWraps;

        extensionBrowser.windows.create(
          {
            url: extensionBrowser.runtime.getURL('index.html#/sign-v2-transaction'),
            ...signPopupProperties,
          },
          function (w) {
            if (w) {
              Task.requests[request.originTabID] = {
                window_id: w.id,
                message: request,
              };
              // Send message with tx info
              setTimeout(function () {
                extensionBrowser.runtime.sendMessage(request);
              }, 500);
            }
          }
        );
      }
    } catch (e) {
      let data = '';

      if (groupsToSign.length === 1) {
        data += e.data;
      } else {
        data += `On group ${currentGroup}: [${e.data}]. `;
      }
      logging.log(data);

      request.error = e;
      request.error.data = data;

      // Clean class saved request
      delete Task.requests[request.originTabID];
      MessageApi.send(request);
    }
  };

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
                ...authPopupProperties,
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
        // handle-wallet-transactions
        [JsonRpcMethod.SignWalletTransaction]: async (
          d: any,
          resolve: Function,
          reject: Function
        ) => {
          const transactionsOrGroups: Array<WalletTransaction> | Array<Array<WalletTransaction>> =
            d.body.params.transactionsOrGroups;
          let hasSingleGroup = false;
          let hasMultipleGroups = false;

          if (transactionsOrGroups) {
            // We check to see if it's a simple or nested array of transactions
            hasSingleGroup = (transactionsOrGroups as Array<WalletTransaction>).every(
              (walletTx) =>
                !Array.isArray(walletTx) &&
                typeof walletTx === 'object' &&
                walletTx.txn &&
                walletTx.txn.length
            );
            hasMultipleGroups = (transactionsOrGroups as Array<Array<WalletTransaction>>).every(
              (walletTxArray) =>
                Array.isArray(walletTxArray) &&
                walletTxArray.length &&
                walletTxArray.every(
                  (walletTx) =>
                    walletTx &&
                    !Array.isArray(walletTx) &&
                    typeof walletTx === 'object' &&
                    walletTx.txn &&
                    walletTx.txn.length
                )
            );
          }

          // If none of the formats match up, we throw an error
          if (!transactionsOrGroups || (!hasSingleGroup && !hasMultipleGroups)) {
            logging.log(RequestError.InvalidFormat.message);
            d.error = RequestError.InvalidFormat;
            reject(d);
            return;
          }

          let groupsToSign = [transactionsOrGroups];
          if (hasMultipleGroups) {
            groupsToSign = transactionsOrGroups as Array<Array<WalletTransaction>>;
          }
          d.body.params.groupsToSign = groupsToSign;
          d.body.params.currentGroup = 0;
          d.body.params.signedGroups = [];

          Task.signIndividualGroup(d);
        },
        // send-transaction
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
            d.error = RequestError.UnsupportedLedger;
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

          auth.message.error = RequestError.UserRejected;
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
          let holdResponse = false;

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
                message.error = RequestError.UnsupportedLedger;
                MessageApi.send(message);
              }
              // Find address to send algos from
              for (let i = unlockedValue[ledger].length - 1; i >= 0; i--) {
                if (unlockedValue[ledger][i].address === from) {
                  account = unlockedValue[ledger][i];
                  break;
                }
              }

              // If the account is not a hardware account we need to get the mnemonic
              let recoveredAccount;
              if (!account.isHardware) {
                recoveredAccount = algosdk.mnemonicToSecretKey(account.mnemonic);
              }

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

                if (recoveredAccount) {
                  // We recovered an account from within the saved extension data and can sign with it
                  const txblob = builtTx.signTxn(recoveredAccount.sk);

                  // We are combining the tx id get and sign into one step/object because of legacy,
                  // this may not need to be the case any longer.
                  const signedTxn = {
                    txID: builtTx.txID().toString(),
                    blob: txblob,
                  };

                  const b64Obj = Buffer.from(signedTxn.blob).toString('base64');

                  message.response = {
                    txID: signedTxn.txID,
                    blob: b64Obj,
                  };
                } else if (account.isHardware) {
                  // The account is hardware based. We need to open the extension in tab to connect.
                  // We will need to hold the response to dApps
                  holdResponse = true;

                  // Create an encoded transaction for the ledger sign
                  const encodedTxn = Buffer.from(
                    algosdk.encodeUnsignedTransaction(builtTx)
                  ).toString('base64');
                  message.body.params.encodedTxn = encodedTxn;

                  InternalMethods[JsonRpcMethod.LedgerSignTransaction](message, (response) => {
                    // We only have to worry about possible errors here
                    if ('error' in response) {
                      // Cancel the hold response since errors needs to be returned
                      holdResponse = false;
                      message.error = response.error;
                    }
                  });
                }
              } catch (e) {
                message.error = e.message;
              }

              // Clean class saved request
              delete Task.requests[responseOriginTabID];

              // Hardware signing will defer the response
              if (!holdResponse) {
                MessageApi.send(message);
              }
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
          const { groupsToSign, currentGroup, signedGroups } = message.body.params;
          const singleGroup = groupsToSign.length === 1;
          const walletTransactions: Array<WalletTransaction> = groupsToSign[currentGroup];
          const transactionsWraps: Array<BaseValidatedTxnWrap> =
            message.body.params.transactionWraps;
          const transactionObjs = walletTransactions.map((walletTx) =>
            algosdk.decodeUnsignedTransaction(base64ToByteArray(walletTx.txn))
          );
          let holdResponse = false;

          const signedTxs = [];
          const signErrors = [];

          try {
            const ledger = getLedgerFromGenesisId(transactionObjs[0].genesisID);
            const neededAccounts: Array<string> = [];
            walletTransactions.forEach((w, i) => {
              const msig = w.msig;
              const signers = w.signers;
              const authAddr = w.authAddr;

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
                } else if (authAddr) {
                  neededAccounts.push(authAddr);
                } else {
                  neededAccounts.push(transactionsWraps[i].transaction.from);
                }
              }
            });

            const context = new encryptionWrap(passphrase);
            context.unlock(async (unlockedValue: any) => {
              if ('error' in unlockedValue) {
                sendResponse(unlockedValue);
                return false;
              }

              // We close the current signing window and start retrieving accounts for signing
              extensionBrowser.windows.remove(auth.window_id);
              const recoveredAccounts = [];

              if (unlockedValue[ledger] === undefined) {
                message.error = RequestError.UnsupportedLedger;
                MessageApi.send(message);
              }

              const hardwareAccounts = [];

              // Find addresses to send algos from
              // We store them using the public address as dictionary key
              for (let i = unlockedValue[ledger].length - 1; i >= 0; i--) {
                const account = unlockedValue[ledger][i];
                if (neededAccounts.includes(account.address)) {
                  if (!account.isHardware) {
                    // Check for an address that we were expected but unable to sign with
                    if (!unlockedValue[ledger][i].mnemonic) {
                      throw RequestError.NotAuthorizedByUser;
                    }
                    recoveredAccounts[account.address] = algosdk.mnemonicToSecretKey(
                      unlockedValue[ledger][i].mnemonic
                    );
                  } else {
                    hardwareAccounts.push(account.address);
                  }
                }
              }

              transactionObjs.forEach((tx, index) => {
                const signers = walletTransactions[index].signers;
                const authAddr = walletTransactions[index].authAddr;

                // If it's a reference transaction we return null, otherwise we try sign
                if (signers && !signers.length) {
                  signedTxs[index] = null;
                } else {
                  try {
                    const txID = tx.txID().toString();
                    const wrap = transactionsWraps[index];
                    const msigData = wrap.msigData;
                    let signedBlob;

                    if (msigData) {
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
                        signedBlob = algosdk.mergeMultisigTransactions(partiallySignedBlobs);
                      } else {
                        signedBlob = partiallySignedBlobs[0];
                      }
                      const b64Obj = byteArrayToBase64(signedBlob);

                      signedTxs[index] = {
                        txID: txID,
                        blob: b64Obj,
                      };
                    } else {
                      const address = authAddr || wrap.transaction.from;
                      if (recoveredAccounts[address]) {
                        signedBlob = tx.signTxn(recoveredAccounts[address].sk);
                        const b64Obj = byteArrayToBase64(signedBlob);

                        signedTxs[index] = {
                          txID: txID,
                          blob: b64Obj,
                        };
                      } else if (hardwareAccounts.some((a) => a === address)) {
                        // Limit to single group transactions
                        if (!singleGroup || transactionObjs.length > 1) {
                          throw RequestError.LedgerMultipleTransactions;
                        }

                        // Now that we know it is a single group adjust the transaction property to be the current wrap
                        // This will be where the transaction presented to the user in the first Ledger popup.
                        // This can probably be removed in favor of mapping to the current transaction
                        message.body.params.transaction = wrap;

                        // Set the ledgerGroup in the message to the current group
                        // Since the signing will move into the next signs we need to know what group we were supposed to sign
                        message.body.params.ledgerGroup = parseInt(currentGroup);

                        // The account is hardware based. We need to open the extension in tab to connect.
                        // We will need to hold the response to dApps
                        holdResponse = true;

                        InternalMethods[JsonRpcMethod.LedgerSignTransaction](
                          message,
                          (response) => {
                            // We only have to worry about possible errors here
                            if ('error' in response) {
                              // Cancel the hold response since errors needs to be returned
                              holdResponse = false;
                              message.error = response.error;
                            }
                          }
                        );
                      }
                    }
                  } catch (e) {
                    logging.log(`Signing failed. ${e.message}`);
                    signErrors[index] = e.message;
                  }
                }
              });

              // We check if there were errors signing this group
              if (signErrors.length) {
                let data = '';
                if (transactionObjs.length > 1) {
                  signErrors.forEach((error, index) => {
                    data += `On transaction ${index}, the error was: ${error}. `;
                  });
                } else {
                  data += signErrors[0];
                }
                if (!singleGroup) {
                  data = `On group ${currentGroup}: [${data.trim()}]. `;
                }
                message.error = RequestError.SigningError(4000, data);
                logging.log(data);
              } else {
                signedGroups[currentGroup] = signedTxs;
              }

              // In case of signing error, we abort everything.
              if (message.error) {
                // Clean class saved request
                delete Task.requests[responseOriginTabID];
                MessageApi.send(message);
                return;
              }

              // We check if there are more groups to sign
              message.body.params.currentGroup = currentGroup + 1;
              message.body.params.signedGroups = signedGroups;
              if (message.body.params.currentGroup < groupsToSign.length) {
                try {
                  Task.signIndividualGroup(message);
                } catch (e) {
                  let errorMessage = 'There was a problem validating the transaction(s). ';

                  if (singleGroup) {
                    errorMessage += e.message;
                  } else {
                    errorMessage += `On group ${currentGroup}: [${e.message}].`;
                  }
                  logging.log(errorMessage);
                  const error = new Error(errorMessage);
                  sendResponse(error);
                  return;
                }
              } else {
                let response;
                if (signedGroups.length === 1) {
                  response = signedGroups[0];
                } else {
                  response = signedGroups;
                }
                message.response = response;
                // Clean class saved request
                delete Task.requests[responseOriginTabID];

                // Hardware signing will defer the response
                if (!holdResponse) {
                  MessageApi.send(message);
                }
              }
            });
          } catch {
            // On error we should remove the task
            delete Task.requests[responseOriginTabID];
            return false;
          }
          return true;
        },
        // sign-deny
        /* eslint-disable-next-line no-unused-vars */
        [JsonRpcMethod.SignDeny]: (request: any, sendResponse: Function) => {
          const { responseOriginTabID } = request.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;

          auth.message.error = RequestError.UserRejected;
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
        [JsonRpcMethod.Logout]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.Logout](request, sendResponse);
        },
        [JsonRpcMethod.ClearCache]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.ClearCache](request, sendResponse);
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
        [JsonRpcMethod.CheckNetwork]: (request: any, sendResponse: Function) => {
          InternalMethods[JsonRpcMethod.CheckNetwork](request, async (networks) => {
            const algodClient = new algosdk.Algodv2(
              networks.algod.apiKey,
              networks.algod.url,
              networks.algod.port
            );
            const indexerClient = new algosdk.Indexer(
              networks.indexer.apiKey,
              networks.indexer.url,
              networks.indexer.port
            );

            const responseAlgod = {};
            const responseIndexer = {};

            (async () => {
              await algodClient
                .status()
                .do()
                .then((response) => {
                  responseAlgod['message'] = response['message'] || response;
                })
                .catch((error) => {
                  responseAlgod['error'] = error.message || error;
                });
            })().then(() => {
              (async () => {
                await indexerClient
                  .searchForTransactions()
                  .limit(1)
                  .do()
                  .then((response) => {
                    responseAlgod['message'] = response['message'] || response;
                  })
                  .catch((error) => {
                    responseAlgod['error'] = error.message || error;
                  });
              })().then(() => {
                sendResponse({ algod: responseAlgod, indexer: responseIndexer });
              });
            });
          });
          return true;
        },
        [JsonRpcMethod.DeleteNetwork]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.DeleteNetwork](request, sendResponse);
        },
        [JsonRpcMethod.GetLedgers]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.GetLedgers](request, sendResponse);
        },
        [JsonRpcMethod.LedgerLinkAddress]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.LedgerLinkAddress](request, sendResponse);
        },
        [JsonRpcMethod.LedgerGetSessionTxn]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.LedgerGetSessionTxn](request, sendResponse);
        },
        [JsonRpcMethod.LedgerSendTxnResponse]: (request: any, sendResponse: Function) => {
          InternalMethods[JsonRpcMethod.LedgerSendTxnResponse](request, function (response) {
            logging.log(
              `Task method - LedgerSendTxnResponse - Returning: ${JSON.stringify(response)}`,
              2
            );

            // Message indicates that this response will go to the DApp
            if ('message' in response) {
              // Send the response back to the origniating page
              MessageApi.send(response.message);
              // Also pass back the blob response to the caller
              sendResponse(response.message.response);
            } else {
              // Send repsonse to the calling function
              sendResponse(response);
            }
          });
          return true;
        },
        [JsonRpcMethod.LedgerSaveAccount]: (request: any, sendResponse: Function) => {
          try {
            return InternalMethods[JsonRpcMethod.LedgerSaveAccount](request, sendResponse);
          } catch {
            sendResponse({ error: 'Account parameters invalid.' });
            return false;
          }
        },
        [JsonRpcMethod.GetContacts]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.GetContacts](request, sendResponse);
        },
        [JsonRpcMethod.SaveContact]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.SaveContact](request, sendResponse);
        },
        [JsonRpcMethod.DeleteContact]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.DeleteContact](request, sendResponse);
        },
        [JsonRpcMethod.GetAliasedAddresses]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.GetAliasedAddresses](request, sendResponse);
        },
        [JsonRpcMethod.GetNamespaceConfigs]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.GetNamespaceConfigs](request, sendResponse);
        },
        [JsonRpcMethod.ToggleNamespaceConfig]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.ToggleNamespaceConfig](request, sendResponse);
        },
        [JsonRpcMethod.GetGovernanceAddresses]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.GetGovernanceAddresses](request, sendResponse);
        },
      },
    };
  }
}
