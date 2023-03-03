import algosdk, { MultisigMetadata, Transaction } from 'algosdk';

import { extensionBrowser } from '@algosigner/common/chrome';
import { base64ToByteArray, byteArrayToBase64 } from '@algosigner/common/encoding';
import { RequestError } from '@algosigner/common/errors';
import { logging, LogLevel } from '@algosigner/common/logging';
import { OptsKeys, WalletTransaction } from '@algosigner/common/types';
import { Connection, Network, NetworkSelectionType, NetworkTemplate } from '@algosigner/common/types/network';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { areBuffersEqual } from '@algosigner/common/utils';

import {
  getValidatedTxnWrap,
  getNetworkNameFromGenesisID,
  getNetworkFromMixedGenesis,
} from '../transaction/actions';
import { BaseValidatedTxnWrap } from '../transaction/baseValidatedTxnWrap';
import { ValidationResponse, ValidationStatus } from '../utils/validator';
import encryptionWrap from '../encryptionWrap';
import { Settings } from '../config';

import { MessageApi } from './api';
import { InternalMethods } from './internalMethods';
import { API } from './types';

// Popup properties accounts for additional space needed for the title bar
const titleBarHeight = 28;
const popupProperties = {
  type: 'popup',
  focused: true,
  width: 400,
  height: 660 + titleBarHeight,
};

export class Task {
  private static requests: { [key: string]: any } = {};
  private static authorized_pool: Array<string> = [];
  private static authorized_pool_details: any = {};

  public static isAuthorized(origin: string): boolean {
    return Task.authorized_pool.indexOf(origin) > -1;
  }

  public static isPreAuthorized(
    origin: string,
    genesisID: string,
    requestedAccounts: Array<any>
  ): boolean {
    // Validate the origin is in the authorized pool
    if (Task.authorized_pool.indexOf(origin) === -1) {
      return false;
    }

    // Validate the genesisID is previously authorized
    if (
      !Task.authorized_pool_details[origin] ||
      !(Task.authorized_pool_details[origin]['genesisID'] === genesisID)
    ) {
      return false;
    }

    // Validate the requested accounts exist in the pool detail
    for (let i = 0; i < requestedAccounts.length; i++) {
      if (!Task.authorized_pool_details[origin].accounts.includes(requestedAccounts[i])) {
        return false;
      }
    }

    // We made it through negative checks to accounts are currently authroized
    return true;
  }

  // Checks for the originId authorization in details then call to make sure the account exists in Algosigner.
  private static checkAccountIsImportedAndAuthorized(
    network: string,
    genesisID: string,
    genesisHash: string,
    address: string,
    origin: string
  ): void {
    // Legacy authorized and internal calls will not have an origin in authorized pool details
    if (Task.authorized_pool_details[origin]) {
      // This must be a dApp using enable - verify the ledger and address are authorized
      if (
        Task.authorized_pool_details[origin]['genesisID'] !== genesisID ||
        Task.authorized_pool_details[origin]['ledger'] !== network ||
        (genesisHash && Task.authorized_pool_details[origin]['genesisHash'] !== genesisHash) ||
        !Task.authorized_pool_details[origin]['accounts'].includes(address)
      ) {
        throw RequestError.NoAccountMatch(address, network);
      }
    }
    // Call the normal account check
    InternalMethods.checkAccountIsImported(genesisID, address);
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
    Task.authorized_pool_details = {};
  }

  public static getChainAuthAddress = async (transaction: any): Promise<string> => {
    // The ledger and address will be provided differently from UI and dapp
    const network = transaction.network || getNetworkNameFromGenesisID(transaction.genesisID);
    const address = transaction.address || transaction.from;

    const conn = Settings.getBackendParams(network, API.Algod);
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
      const network = getNetworkNameFromGenesisID(transactionWrap.transaction['genesisID']);
      const conn = Settings.getBackendParams(network, API.Algod);
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
    const rawTxArray: Array<Transaction> = [];
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
            (walletTx.stxn != null && typeof walletTx.stxn !== 'string') ||
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
            throw RequestError.InvalidWalletTxnStructure;
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
          const rawTx: Transaction = algosdk.decodeUnsignedTransaction(
            base64ToByteArray(walletTx.txn)
          );
          rawTxArray[index] = rawTx;
          const processedTx = rawTx._getDictForDisplay();
          processedTxArray[index] = processedTx;
          const wrap = getValidatedTxnWrap(processedTx, processedTx['type']);
          transactionWraps[index] = wrap;

          if (
            wrap.validityObject &&
            Object.values(wrap.validityObject).some(
              (value) => value['status'] === ValidationStatus.Invalid
            )
          ) {
            // We have a transaction that contains fields which are deemed invalid. We should reject the transaction.
            const invalidKeys = [];
            Object.entries(wrap.validityObject).forEach(([key, value]) => {
              if (value['status'] === ValidationStatus.Invalid) {
                invalidKeys.push(`${key}: ${value['info']}`);
              }
            });
            throw RequestError.InvalidFields(invalidKeys);
          }

          const network = getNetworkFromMixedGenesis(
            wrap.transaction.genesisID,
            wrap.transaction.genesisHash
          );
          const signers: Array<string> = walletTransactions[index].signers;
          const signedTxn: string = walletTransactions[index].stxn;
          const msigData: MultisigMetadata = walletTransactions[index].msig;
          const authAddr: string = walletTransactions[index].authAddr;

          let msigAddress: string;
          if (signers) wrap.signers = signers;

          // We validate the authAddress if available
          if (authAddr) {
            if (!algosdk.isValidAddress(authAddr)) {
              throw RequestError.InvalidAuthAddress(authAddr);
            }
            Task.checkAccountIsImportedAndAuthorized(
              network.name,
              network.genesisID,
              network.genesisHash,
              authAddr,
              request.origin
            );
          }

          // If we have msigData, we validate the addresses and fetch the resulting msig address
          if (msigData) {
            try {
              wrap.msigData = msigData;
              msigAddress = algosdk.multisigAddress(msigData);
              if (authAddr && authAddr !== msigAddress) {
                throw RequestError.MsigAuthAddrMismatch;
              }
              msigData.addrs.forEach((addr) => {
                if (!algosdk.isValidAddress(addr)) {
                  throw RequestError.InvalidMsigAddress(addr);
                }
              });
            } catch (e) {
              throw RequestError.InvalidMsigValues(e.message);
            }
          }

          // We check if signers were specificied for this txn
          if (signers) {
            if (signers.length) {
              // We have some specific signers, so we must validate them
              // First we check if there's a stxn provided
              if (signedTxn) {
                throw RequestError.SignedTxnWithSigners;
              }
              // Then, we check all signers are valid accounts existing in AlgoSigner
              signers.forEach((address) => {
                if (!algosdk.isValidAddress(address)) {
                  throw RequestError.InvalidSignerAddress(address);
                }
              });

              // We validate signers depending on the amount of them
              if (signers.length > 1) {
                // We have more than 1 signer, they're for 'msig' use
                if (!msigData) {
                  // If no msig info was found, we reject
                  throw RequestError.NoMsigMultipleSigners;
                }
              } else {
                // We have exactly 1 signer. If there's no 'msig', additional validations
                if (!msigData) {
                  // If we have an authAddr the signer must match it
                  if (authAddr && authAddr !== signers[0]) {
                    throw RequestError.NoMsigSingleSigner;
                  }
                  // Otherwise, it should at least match the sender
                  if (!authAddr && signers[0] !== processedTx.from) {
                    throw RequestError.NoMsigSingleSigner;
                  }
                }
              }
              if (msigData) {
                // Msig was provided alongside signers, we validate joint use cases
                // Signers must be a subset of the multisig addresses
                if (!signers.every((s) => msigData.addrs.includes(s))) {
                  throw RequestError.MsigSignersMismatch;
                }
                // We make sure we have the available accounts for signing
                signers.forEach((address) => {
                  try {
                    Task.checkAccountIsImportedAndAuthorized(
                      network.name,
                      network.genesisID,
                      network.genesisHash,
                      address,
                      request.origin
                    );
                  } catch (e) {
                    throw RequestError.CantMatchMsigSigners(e.message);
                  }
                });
              }
            } else {
              // Empty signer was provided, we check for a 'stxn'
              if (signedTxn) {
                // We check if the provided stxn matches the txn received
                const unsignedTxnBytes = rawTx.toByte();
                let signedTxnBytes;
                try {
                  signedTxnBytes = algosdk
                    .decodeSignedTransaction(base64ToByteArray(signedTxn))
                    .txn.toByte();
                } catch (e) {
                  // We reject if we can't convert from b64 to a valid txn
                  throw RequestError.InvalidSignedTxn;
                }
                if (!areBuffersEqual(signedTxnBytes, unsignedTxnBytes)) {
                  // We reject if the transactions don't match
                  throw RequestError.NonMatchingSignedTxn;
                }
              }
            }
          } else {
            // There's no signers field, we validate the sender if there's no msig
            if (!msigData) {
              Task.checkAccountIsImportedAndAuthorized(
                network.name,
                network.genesisID,
                network.genesisHash,
                wrap.transaction.from,
                request.origin
              );
            }
          }

          if (authAddr) {
            // Attach to wrap so it can be displayed
            transactionWraps[index].authAddr = authAddr;

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
        // We don't have transaction wraps or we have a validation error, reject the transaction.
        const data = [];
        let code = 4300;

        // We format the validation errors for better readability and clarity
        validationErrors.forEach((error, index) => {
          // Store the error message in the corresponding array position
          data[index] = error.message;
          // Take the lowest error code as they're _more_ generic the higher they go
          code = error.code < code ? error.code : code;
        });

        throw RequestError.SigningValidationError(code, data);
      } else {
        /**
         * Group validations
         */
        const providedGroupId: string = transactionWraps[0].transaction.group;

        if (transactionWraps.length > 1) {
          if (
            !transactionWraps.every(
              (wrap) =>
                transactionWraps[0].transaction.genesisID === wrap.transaction.genesisID ||
                transactionWraps[0].transaction.genesisHash === wrap.transaction.genesisHash
            )
          ) {
            throw RequestError.NoDifferentNetworks;
          }

          if (!providedGroupId || !transactionWraps.every((wrap) => wrap.transaction.group)) {
            throw RequestError.MultipleTxsRequireGroup;
          }

          if (!transactionWraps.every((wrap) => providedGroupId === wrap.transaction.group)) {
            throw RequestError.MismatchingGroup;
          }
        }

        if (providedGroupId) {
          // Verify group is presented as a whole
          const recreatedGroupTxs = algosdk.assignGroupID(
            rawTxArray.slice().map((tx) => {
              delete tx.group;
              return tx;
            })
          );
          const recalculatedGroupID = byteArrayToBase64(recreatedGroupTxs[0].group);
          if (providedGroupId !== recalculatedGroupID) {
            throw RequestError.IncompleteOrDisorderedGroup;
          }
        }

        // If we only receive reference transactions, we reject
        if (
          !transactionWraps.some((wrap) => !wrap.signers || (wrap.signers && wrap.signers.length))
        ) {
          throw RequestError.NoTxsToSign;
        }

        for (let i = 0; i < transactionWraps.length; i++) {
          const wrap = transactionWraps[i];
          await Task.modifyTransactionWrapWithAssetCoreInfo(wrap);
        }

        request.body.params.transactionWraps = transactionWraps;

        extensionBrowser.windows.create(
          {
            url: extensionBrowser.runtime.getURL('index.html#/sign-v2-transaction'),
            ...popupProperties,
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
      const errorResponse = { ...e };

      if (groupsToSign.length > 1) {
        errorResponse.message = `On group ${currentGroup}: ${e.message}`;
      }

      logging.log(errorResponse);
      request.error = errorResponse;

      // Clean class saved request
      delete Task.requests[request.originTabID];
      MessageApi.send(request);
      return;
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
        // Enable function as defined in ARC-006
        [JsonRpcMethod.EnableAuthorization]: (d: any) => {
          const { accounts: requestedAccounts } = d.body.params;
          let { genesisID, genesisHash } = d.body.params;
          logging.log('Enable params:', LogLevel.Debug);
          logging.log(d.body.params, LogLevel.Debug);

          // Delete any previous request made from the Tab that it's trying to connect.
          delete Task.requests[d.originTabID];

          // Set a flag for a specified network
          let specifiedNetworkType: NetworkSelectionType = NetworkSelectionType.NoneProvided;
          if (genesisID && genesisHash) {
            specifiedNetworkType = NetworkSelectionType.BothProvided;
          } else if (genesisID) {
            specifiedNetworkType = NetworkSelectionType.OnlyIDProvided;
          }
          d.body.params.specifiedNetworkType = specifiedNetworkType;

          // Get ledger/hash/id from the genesisID and/or hash
          const network: NetworkTemplate = getNetworkFromMixedGenesis(genesisID, genesisHash);
          logging.log('Network from genesis info', LogLevel.Debug);
          logging.log(network, LogLevel.Debug);

          // Validate that the genesis id and hash if provided match the resulting one
          // This is because a dapp may request an id and hash from different ledgers
          if (
            (genesisID && genesisID !== network.genesisID) ||
            (genesisHash && genesisHash !== network.genesisHash)
          ) {
            d.error = RequestError.UnsupportedNetwork;
            setTimeout(() => {
              MessageApi.send(d);
            }, 500);
            return;
          }

          // We've validated the ledger information
          // So we can set the ledger, genesisID, and genesisHash
          const ledger = network.name;
          genesisID = network.genesisID;
          genesisHash = network.genesisHash;

          // Then reflect those changes for the page
          d.body.params.ledger = ledger;
          d.body.params.genesisID = genesisID;
          d.body.params.genesisHash = genesisHash;

          // If we already have the ledger authorized for this origin then check the shared accounts
          if (Task.isAuthorized(d.origin)) {
            // First check that we actually still have the addresses requested
            try {
              requestedAccounts.forEach((account) => {
                InternalMethods.checkAccountIsImported(genesisID, account);
              });

              // If the ledger and ALL accounts are available then respond with the cached data
              if (Task.isPreAuthorized(d.origin, genesisID, requestedAccounts)) {
                // We have the accounts and may include additional, but just make sure the order is maintained
                const sharedAccounts = [];
                requestedAccounts.forEach((account) => {
                  // Make sure we don't include accounts that have been deleted
                  InternalMethods.checkAccountIsImported(genesisID, account);
                  sharedAccounts.push(account);
                });
                Task.authorized_pool_details[d.origin]['accounts'].forEach((account) => {
                  if (!sharedAccounts.includes(account)) {
                    // Make sure we don't include accounts that have been deleted
                    InternalMethods.checkAccountIsImported(genesisID, account);
                    sharedAccounts.push(account);
                  }
                });

                // Now we can set the response, but don't need to update the cache
                d.response = {
                  genesisID: genesisID,
                  genesisHash: genesisHash,
                  accounts: sharedAccounts,
                };
                MessageApi.send(d);
                return;
              }
            } catch {
              // Failure means we won't auto authorize, but we can sink the error as we are re-prompting
            }
          }

          // We haven't immediately failed and don't have preAuthorization so we need to prompt accounts.
          const promptedAccounts = [];

          // Add any requested accounts so they can be in the proper order to start
          if (requestedAccounts) {
            for (let i = 0; i < requestedAccounts.length; i++) {
              // We initially push accounts as missing and don't have them selected
              // If we also own the address it will be modified to not missing and selected by default
              const requestedAddress = requestedAccounts[i];
              promptedAccounts.push({
                address: requestedAddress,
                missing: true,
                requested: true,
              });
            }
          }

          // Add the prompted accounts to the params that will go to the page
          d.body.params['promptedAccounts'] = promptedAccounts;

          extensionBrowser.windows.create(
            {
              url: extensionBrowser.runtime.getURL('index.html#/enable'),
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
        },
        // sign-wallet-transaction
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
            logging.log(RequestError.InvalidSignTxnsFormat.message);
            d.error = RequestError.InvalidSignTxnsFormat;
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

          await Task.signIndividualGroup(d);
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
          const tx = base64ToByteArray(params.tx);
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
        // post-txns
        [JsonRpcMethod.PostTransactions]: (d: any, resolve: Function, reject: Function) => {
          // Separate stxns by groups
          const { stxns } = d.body.params;
          let groupsToSend: string[][];
          // These arrays are nested, reflecting the content of the groups
          const evaluationErrors = [],
            responseIDs = [],
            fetchBodies = [],
            fetchPromises = [],
            fetchErrors = [];
          let fetchResponses = [];
          // We check if it's a valid array and if it's nested
          if (Array.isArray(stxns) && stxns.length) {
            groupsToSend = Array.isArray(stxns[0]) ? stxns : [stxns];
          } else {
            throw RequestError.InvalidPostTxnsFormat;
          }

          groupsToSend.forEach((group, index) => {
            let txnBinaries: Array<Uint8Array>,
              decodedTxns: Array<Transaction>,
              txnIDs: Array<any> = [];
            try {
              // Decode txns and validate group matches
              txnBinaries = group.map((txn) => base64ToByteArray(txn));
              decodedTxns = txnBinaries.map((bin) => algosdk.decodeSignedTransaction(bin).txn);
              if (decodedTxns.length > 1 || decodedTxns[0].group) {
                // Fetch group ID from provided txns
                let providedGroupID: Uint8Array;
                for (const dtx of decodedTxns) {
                  if (!dtx.group) {
                    throw RequestError.MultipleTxsRequireGroup;
                  } else {
                    if (providedGroupID) {
                      if (!areBuffersEqual(dtx.group, providedGroupID)) {
                        throw RequestError.MismatchingGroup;
                      }
                    } else {
                      providedGroupID = dtx.group;
                    }
                  }
                }
                // Recalculate Group ID based on transactions provided to make sure they match
                const cleanTxns = decodedTxns.slice().map((tx) => {
                  delete tx.group;
                  return tx;
                });
                const computedGroupID: Buffer = algosdk.computeGroupID(cleanTxns);
                if (!areBuffersEqual(providedGroupID, computedGroupID)) {
                  throw RequestError.IncompleteOrDisorderedGroup;
                }
              }

              // Calculate txIDs for response and create merged binaries
              txnIDs = decodedTxns.map((tx) => tx.txID());
              const totalLength = txnBinaries
                .map((bin) => bin.byteLength)
                .reduce((pv, cv) => pv + cv, 0);
              const mergedBinaries: Uint8Array = new Uint8Array(totalLength);
              for (let i = 0; i < txnBinaries.length; i++) {
                const bin = txnBinaries[i];
                const position = i > 0 ? txnBinaries[i - 1].byteLength : 0;
                mergedBinaries.set(bin, position);
              }
              fetchBodies[index] = new Uint8Array(mergedBinaries);
              responseIDs[index] = txnIDs;
            } catch (e) {
              evaluationErrors[index] = e;
            }
          });

          if (evaluationErrors.length) {
            let reasons = new Array(groupsToSend.length);
            evaluationErrors.forEach((e, i) => (reasons[i] = e ? e.message : null));
            if (groupsToSend.length === 1) {
              reasons = reasons[0];
            }
            d.error = RequestError.PostValidationFailed(reasons);
            resolve(d);
          } else {
            const genesisID = Task.authorized_pool_details[d.origin]['genesisID'];
            const genesisHash = Task.authorized_pool_details[d.origin]['genesisHash'];
            const network = getNetworkFromMixedGenesis(genesisID, genesisHash).name;
            const conn = Settings.getBackendParams(network, API.Algod);
            const sendPath = '/v2/transactions';
            const fetchParams: any = {
              headers: {
                ...conn.headers,
                'Content-Type': 'application/x-binary',
              },
              method: 'POST',
            };

            let url = conn.url;
            if (conn.port.length > 0) url += ':' + conn.port;

            fetchBodies.forEach((body, index) => {
              fetchParams.body = body;
              fetchPromises[index] = Task.fetchAPI(`${url}${sendPath}`, fetchParams);
            });

            Promise.allSettled(fetchPromises).then((results) => {
              const algod = InternalMethods.getAlgod(network);
              const confirmationPromises = [];
              results.forEach((res, index) => {
                if (res.status === 'fulfilled') {
                  const txID = res.value.txId;
                  confirmationPromises[index] = algosdk.waitForConfirmation(algod, txID, 2);
                } else {
                  logging.log('Failed post response:', LogLevel.Debug);
                  logging.log(res, LogLevel.Debug);
                  fetchErrors[index] = res.reason;
                  fetchResponses[index] = null;
                }
              });

              Promise.all(confirmationPromises).then((confirmations) => {
                // We add values to both arrays to preserve indexes across all possible return arrays
                confirmations.forEach((c, index) => {
                  if (c && 'confirmed-round' in c) {
                    fetchResponses[index] = responseIDs[index];
                    fetchErrors[index] = null;
                  } else {
                    fetchErrors[index] = RequestError.PostConfirmationFailed;
                    fetchResponses[index] = null;
                  }
                });

                if (groupsToSend.length === 1) {
                  fetchResponses = fetchResponses.length ? fetchResponses[0] : [];
                }

                // Check if there's any non-null errors
                if (fetchErrors.filter(Boolean).length) {
                  const successTxnIDs = fetchResponses;
                  if (groupsToSend.length > 1) {
                    const reasons = new Array(groupsToSend.length);
                    fetchErrors.forEach((e, i) => (reasons[i] = e ? e.message : null));
                    d.error = RequestError.PartiallySuccessfulPost(successTxnIDs, reasons);
                  } else {
                    const reason = fetchErrors[0].message;
                    d.error = RequestError.FailedPost(reason);
                  }
                  resolve(d);
                } else {
                  d.response = { txnIDs: fetchResponses };
                  resolve(d);
                }
              });
            });
          }
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
        [JsonRpcMethod.Accounts]: (d: any, resolve: Function, reject: Function) => {
          const session = InternalMethods.getSessionObject();
          // If we don't have a ledger requested, respond with an error giving available ledgers
          if (!d.body.params?.ledger) {
            const baseNetworks = Object.keys(Network);
            const injectedNetworks = Settings.getCleansedInjectedNetworks();
            d.error = RequestError.NoLedgerProvided(
              baseNetworks.toString(),
              JSON.stringify(injectedNetworks)
            );
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
          const { responseOriginTabID, isEnable, accounts, genesisID, genesisHash, ledger: network } =
            d.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;

          extensionBrowser.windows.remove(auth.window_id);
          Task.authorized_pool.push(message.origin);
          delete Task.requests[responseOriginTabID];

          setTimeout(() => {
            // Response needed
            message.response = {};
            // We need to send the authorized accounts and genesis info back if this is an enable call
            if (isEnable) {
              // Check that the requested accounts have been approved
              const rejectedAccounts = [];
              const sharedAccounts = [];
              for (const i in accounts) {
                if (
                  (accounts[i]['requested'] && !accounts[i]['selected']) ||
                  accounts[i]['missing']
                ) {
                  rejectedAccounts.push(accounts[i]['address']);
                } else if (accounts[i]['selected']) {
                  sharedAccounts.push(accounts[i]['address']);
                }
              }
              if (rejectedAccounts.length > 0) {
                message.error = RequestError.EnableRejected({ accounts: rejectedAccounts });
              } else {
                message.response = {
                  genesisID: genesisID,
                  genesisHash: genesisHash,
                  accounts: sharedAccounts,
                };

                const poolDetails = { ...message.response, ledger: network };

                // Add to the authorized pool details.
                // This will be checked to restrict access for enable function users
                Task.authorized_pool_details[`${message.origin}`] = poolDetails;
              }
            }
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
        // sign-allow-wallet-tx
        [JsonRpcMethod.SignAllowWalletTx]: (request: any, sendResponse: Function) => {
          const { passphrase, responseOriginTabID } = request.body.params;
          const auth = Task.requests[responseOriginTabID];
          const message = auth.message;
          const { groupsToSign, currentGroup, signedGroups, opts } = message.body.params;
          const singleGroup = groupsToSign.length === 1;
          const walletTransactions: Array<WalletTransaction> = groupsToSign[currentGroup];
          const transactionsWraps: Array<BaseValidatedTxnWrap> =
            message.body.params.transactionWraps;
          const transactionObjs = walletTransactions.map((walletTx) =>
            algosdk.decodeUnsignedTransaction(base64ToByteArray(walletTx.txn))
          );
          let holdResponse = false;

          const signedTxs = [];
          const signErrors: Array<string> = [];

          try {
            const network = getNetworkNameFromGenesisID(transactionObjs[0].genesisID);
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

              if (unlockedValue[network] === undefined) {
                delete Task.requests[responseOriginTabID];
                message.error = RequestError.UnsupportedNetwork;
                MessageApi.send(message);
                return;
              }

              const hardwareAccounts = [];

              // Find addresses to send algos from
              // We store them using the public address as dictionary key
              let addressWithNoMnemonic = '';
              for (let i = unlockedValue[network].length - 1; i >= 0; i--) {
                const account = unlockedValue[network][i];
                if (neededAccounts.includes(account.address)) {
                  if (!account.isHardware) {
                    // Check for an address that we were expected but unable to sign with
                    if (!unlockedValue[network][i].mnemonic) {
                      addressWithNoMnemonic = account.address;
                      break;
                    }
                    recoveredAccounts[account.address] = algosdk.mnemonicToSecretKey(
                      unlockedValue[network][i].mnemonic
                    );
                  } else {
                    hardwareAccounts.push(account.address);
                  }
                }
              }

              if (addressWithNoMnemonic.length) {
                delete Task.requests[responseOriginTabID];
                message.error = RequestError.NoMnemonicAvailable(addressWithNoMnemonic);
                MessageApi.send(message);
                return;
              }

              if (hardwareAccounts.length) {
                message.body.params.ledgerIndexes = [];
                message.body.params.currentLedgerTransaction = 0;
              }

              transactionObjs.forEach((txn: Transaction, index) => {
                const signers: Array<string> = walletTransactions[index].signers;
                const signedTxn = walletTransactions[index].stxn;
                const authAddr = walletTransactions[index].authAddr;
                const msigData: MultisigMetadata = walletTransactions[index].msig;
                const txID = txn.txID().toString();
                const wrap = transactionsWraps[index];

                // Check if it's a reference transaction
                if (signers && !signers.length) {
                  // It's a reference transaction, return the 'stxn'
                  if (signedTxn) {
                    // We return the provided stxn since it's a reference transaction
                    signedTxs[index] = {
                      txID: txID,
                      blob: signedTxn,
                    };
                  } else {
                    // No signed transaction was provided, we return null
                    signedTxs[index] = null;
                  }
                } else {
                  // It's NOT a reference transaction, we sign normally
                  try {
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
                              txn,
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
                        signedBlob = txn.signTxn(recoveredAccounts[address].sk);
                        const b64Obj = byteArrayToBase64(signedBlob);

                        signedTxs[index] = {
                          txID: txID,
                          blob: b64Obj,
                        };
                      } else if (hardwareAccounts.some((a) => a === address)) {
                        // Limit to single group transactions
                        if (!singleGroup) {
                          throw RequestError.LedgerMultipleGroups;
                        }

                        // Now that we know it is a single group we map to the appropiate index
                        message.body.params.ledgerIndexes.push(index);

                        // The account is hardware based. We need to open the extension in tab to connect.
                        // We will need to hold the response to dApps
                        holdResponse = true;
                      }
                    }
                  } catch (e) {
                    logging.log(`Signing failed. ${e.message}`);
                    signErrors[index] = e.message;
                  }
                }
              });

              if (opts && opts[OptsKeys.ARC01Return]) {
                signedTxs.forEach(
                  (maybeTxn: any, index: number) =>
                    (signedTxs[index] = maybeTxn !== null ? maybeTxn.blob : null)
                );
              }

              // We check if there were errors signing this group
              if (signErrors.length) {
                const data = [];
                signErrors.forEach((error, index) => {
                  data[index] = error;
                });

                const responseError = RequestError.ApplySignatureError(data);
                if (!singleGroup) {
                  responseError.message = `On group ${currentGroup}: ${responseError.message}`;
                }

                message.error = responseError;
                logging.log(responseError);
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
              message.body.params.signedGroups = signedGroups;
              if (message.body.params.currentGroup + 1 < groupsToSign.length) {
                // More groups to sign, continue prompting user
                message.body.params.currentGroup = currentGroup + 1;
                await Task.signIndividualGroup(message);
              } else {
                // No more groups to sign, build final user-facing response
                if (opts && opts[OptsKeys.sendTxns]) {
                  message.body.params.stxns = message.body.params.signedGroups;
                } else {
                  message.response = signedGroups.length === 1 ? signedGroups[0] : signedGroups;
                }
                // Clean class saved request
                delete Task.requests[responseOriginTabID];

                // Hardware signing will defer the response
                if (!holdResponse) {
                  if (opts && opts[OptsKeys.sendTxns]) {
                    Task.methods().public[JsonRpcMethod.PostTransactions](message, MessageApi.send);
                  } else {
                    MessageApi.send(message);
                    return;
                  }
                } else {
                  InternalMethods[JsonRpcMethod.LedgerSignTransaction](message, (response) => {
                    // We only have to worry about possible errors here
                    if ('error' in response) {
                      // Cancel the hold response since errors needs to be returned
                      holdResponse = false;
                      message.error = response.error;
                    }
                  });
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
        [JsonRpcMethod.ChangeNetwork]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.ChangeNetwork](request, sendResponse);
        },
        [JsonRpcMethod.SaveNetwork]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.SaveNetwork](request, sendResponse);
        },
        [JsonRpcMethod.CheckNetwork]: (request: any, sendResponse: Function) => {
          InternalMethods[JsonRpcMethod.CheckNetwork](request, async (connection: Connection) => {
            const algodClient = new algosdk.Algodv2(
              connection.algod.apiKey,
              connection.algod.url,
              connection.algod.port
            );
            const indexerClient = new algosdk.Indexer(
              connection.indexer.apiKey,
              connection.indexer.url,
              connection.indexer.port
            );

            const defaultError = { error: 'Unable to connect'};
            const statusReponse = {};

            const algodPromise = algodClient
              .getTransactionParams()
              .do()
              .then((response) => {
                statusReponse['algod'] = response ? response : defaultError;
              })
              .catch((error) => {
                statusReponse['algod'] = { error: error.message || error };
              });

            const indexerPromise = indexerClient
              .makeHealthCheck()
              .do()
              .then((response) => {
                statusReponse['indexer'] = response ? response : defaultError;
              })
              .catch((error) => {
                statusReponse['indexer'] = { error: error.message || error };
              });
            await Promise.all([algodPromise, indexerPromise]);
            sendResponse(statusReponse);
          });
          return true;
        },
        [JsonRpcMethod.DeleteNetwork]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.DeleteNetwork](request, sendResponse);
        },
        [JsonRpcMethod.GetNetworks]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.GetNetworks](request, sendResponse);
        },
        [JsonRpcMethod.LedgerLinkAddress]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.LedgerLinkAddress](request, sendResponse);
        },
        [JsonRpcMethod.LedgerGetSessionTxn]: (request: any, sendResponse: Function) => {
          return InternalMethods[JsonRpcMethod.LedgerGetSessionTxn](request, sendResponse);
        },
        [JsonRpcMethod.LedgerSendTxnResponse]: (request: any, sendResponse: Function) => {
          InternalMethods[JsonRpcMethod.LedgerSendTxnResponse](
            request,
            function (internalResponse) {
              logging.log('Internal response from LedgerSendTxnResponse:', LogLevel.Debug);
              logging.log(internalResponse, LogLevel.Debug);

              // Message indicates that this response will go to the DApp
              if ('message' in internalResponse) {
                const message = internalResponse.message;
                const {
                  ledgerIndexes,
                  currentLedgerTransaction,
                  currentGroup,
                  signedGroups,
                  opts,
                } = message.body.params;
                const signedTxnIndex = ledgerIndexes[currentLedgerTransaction];
                const b64Response = message.response;

                // We add the signed txn to the final response
                signedGroups[currentGroup][signedTxnIndex] =
                  opts && opts[OptsKeys.ARC01Return]
                    ? b64Response
                    : {
                        blob: b64Response,
                      };

                // We determine if there's more txns to sign before sending a response back
                if (currentLedgerTransaction + 1 < ledgerIndexes.length) {
                  message.body.params.currentLedgerTransaction++;
                  sendResponse(internalResponse);
                } else {
                  // If there's no more ledger transactions to sign, we prepare to return a response
                  // First we clear the cached ledger info
                  message.body.params.ledgerIndexes = undefined;
                  message.body.params.currentLedgerTransaction = undefined;

                  // Then we send an informative response to the UI
                  const displayResponse = signedGroups[currentGroup].filter((_, index) =>
                    ledgerIndexes.includes(index)
                  );
                  sendResponse(displayResponse);

                  // Lastly we prepare & send the dApp response
                  if (opts && opts[OptsKeys.sendTxns]) {
                    message.body.params.stxns = signedGroups;
                    Task.methods().public[JsonRpcMethod.PostTransactions](message, MessageApi.send);
                  } else {
                    // Send the response back to the originating page
                    message.response = signedGroups.length === 1 ? signedGroups[0] : signedGroups;
                    MessageApi.send(message);
                    return;
                  }
                }
              } else {
                // Send response to the calling function
                sendResponse(internalResponse);
              }
            }
          );
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
        [JsonRpcMethod.GetEnableAccounts]: (request: any, sendResponse: Function) => {
          const { promptedAccounts, ledger: network } = request.body.params;

          // Setup new prompted accounts which will be the return values
          const newPromptedAccounts = [];

          // Add any requested accounts so they can be in the proper order to start
          if (promptedAccounts) {
            for (let i = 0; i < promptedAccounts.length; i++) {
              // This call is a ledger change so we already have requested values included in the accounts
              if (promptedAccounts[i].requested) {
                newPromptedAccounts.push({
                  address: promptedAccounts[i]['address'],
                  missing: true,
                  requested: true,
                });
              }
            }
          }

          // Get an internal session and get wallet accounts for the new chosen ledger
          const session = InternalMethods.getSessionObject();
          const walletAccounts = session.wallet && session.wallet[network];

          // We only need to add accounts if we actually have them
          if (walletAccounts) {
            // Add all the walletAccounts we have for the ledger
            for (let i = 0; i < walletAccounts.length; i++) {
              const walletAccount = walletAccounts[i].address;
              const accountIndex = newPromptedAccounts.findIndex(
                (e) => e.address === walletAccount
              );

              if (accountIndex > -1) {
                // If we have the account then mark it as valid
                newPromptedAccounts[accountIndex]['missing'] = false;
                newPromptedAccounts[accountIndex]['selected'] = true;
              } else {
                // If we are missing the address then this is an account that the dApp did not request
                // but we can push the value an the additional choices from the user before returning
                newPromptedAccounts.push({
                  address: walletAccount,
                  requested: false,
                  selected: false,
                });
              }
            }
          }

          // Replace the prompted accounts on params response
          const response = {
            ...request.body.params,
            promptedAccounts: newPromptedAccounts,
          };
          sendResponse(response);
        },
      },
    };
  }
}
