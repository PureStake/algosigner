const algosdk = require("algosdk");

import {RequestErrors} from '@algosigner/common/types';
import {JsonRpcMethod} from '@algosigner/common/messaging/types';
import { Ledger, API } from './types';
import { getValidatedTxnWrap } from "../transaction/actions";
import { ValidationResponse } from '../utils/validator';
import {InternalMethods} from './internalMethods';
import {MessageApi} from './api';
import encryptionWrap from "../encryptionWrap";
import { Settings } from '../config';
import {extensionBrowser} from '@algosigner/common/chrome';
import {logging} from '@algosigner/common/logging';


export class Task {

    private static requests: {[key: string]: any} = {};
    private static authorized_pool: Array<string> = [];

    public static isAuthorized(origin: string): boolean {
        if(Task.authorized_pool.indexOf(origin) > -1 ){
            return true;
        }
        return false;
    }

    public static build(request: any) {
        let body = request.body;
        let method = body.method;

        // Check if there's a previous request from the same origin
        if (request.originTabID in Task.requests)
            return new Promise((resolve,reject) => {
                request.error = 'Another query processing';
                reject(request);
            });
        else
            Task.requests[request.originTabID] = request;

        let prom = new Promise((resolve,reject) => {
            Task.methods().public[method](
                request,
                resolve,
                reject
            );
        })

        prom.finally(() => {
            delete Task.requests[request.originTabID];
        });

        return prom
    }

    public static clearPool() {
        Task.authorized_pool = [];
    }

    public static methods(): {
        [key: string]: {
            [JsonRpcMethod: string]: Function
        }
    } {
        return {
            'public': {
                // authorization
                [JsonRpcMethod.Authorization]: (d: any) => {
                    // Delete any previous request made from the Tab that it's
                    // trying to connect.
                    delete Task.requests[d.originTabID];

                    // If access was already granted, authorize connection.
                    if(Task.isAuthorized(d.origin)){
                        d.response = {};
                        MessageApi.send(d);
                    } else {
                        extensionBrowser.windows.create({
                            url: extensionBrowser.runtime.getURL("index.html#/authorize"),
                            type: "popup",
                            focused: true,
                            width: 400 + 12,
                            height: 550 + 34
                        }, function (w: any) {
                            if(w) {
                                Task.requests[d.originTabID] = {
                                    window_id: w.id,
                                    message:d
                                };
                                setTimeout(function(){
                                    extensionBrowser.runtime.sendMessage(d);
                                }, 500);
                            }
                        });
                    }
                },
                // sign-transaction
                [JsonRpcMethod.SignTransaction]: (
                    d: any,
                    resolve: Function, reject: Function
                ) => {

                    var transactionWrap = undefined;
                    try {
                        transactionWrap = getValidatedTxnWrap(d.body.params, d.body.params["type"]);
                    }
                    catch(e) {
                        logging.log(`Validation failed. ${e}`);
                    }

                    if(!transactionWrap) {     
                        // We don't have a transaction wrap. We have an unknow error or extra fields, reject the transaction.               
                        logging.log('A transaction has failed because of an inability to build the specified transaction type.');
                        reject('Validation failed for transaction. Please verify the properties are valid.');
                    }
                    else if(transactionWrap.validityObject && Object.values(transactionWrap.validityObject).some(value => value  === ValidationResponse.Invalid)) {
                        // We have a transaction that contains fields which are deemed invalid. We should reject the transaction.
                        // We can use a modified popup that allows users to review the transaction and invalid fields and close the transaction.
                        reject('Validation failed for transaction because of invalid properties.');
                    }
                    else if(transactionWrap.validityObject && (Object.values(transactionWrap.validityObject).some(value => value === ValidationResponse.Warning ))
                        || (Object.values(transactionWrap.validityObject).some(value => value === ValidationResponse.Dangerous))) {
                        d.body.params = transactionWrap.transaction;
                        // We have a transaction which does not contain invalid fields, but does contain fields that are dangerous 
                        // or ones we've flagged as needing to be reviewed. We can use a modified popup to allow the normal flow, but require extra scrutiny. 
                        extensionBrowser.windows.create({
                            url: extensionBrowser.runtime.getURL("index.html#/sign-transaction"),
                            type: "popup",
                            focused: true,
                            width: 400 + 12,
                            height: 550 + 34
                        }, function (w) {
                            if(w) {
                                Task.requests[d.originTabID] = {
                                    window_id: w.id,
                                    message: d
                                };
                                // Send message with tx info
                                setTimeout(function(){
                                    extensionBrowser.runtime.sendMessage(d);
                                }, 500);
                            }
                        });
                    }
                    else {
                        d.body.params = transactionWrap.transaction;
                        // We have a transaction which appears to be valid. Show the popup as normal.
                        extensionBrowser.windows.create({
                            url: extensionBrowser.runtime.getURL("index.html#/sign-transaction"),
                            type: "popup",
                            focused: true,
                            width: 400 + 12,
                            height: 550 + 34
                        }, function (w) {
                            if(w) {
                                Task.requests[d.originTabID] = {
                                    window_id: w.id,
                                    message: d
                                };
                                // Send message with tx info
                                setTimeout(function(){
                                    extensionBrowser.runtime.sendMessage(d);
                                }, 500);
                            }
                        });
                    }
                },
                // algod
                [JsonRpcMethod.SendTransaction]: (
                    d: any,
                    resolve: Function, reject: Function
                ) => {
                    const { params } = d.body;
                    const conn = Settings.getBackendParams(params.ledger, API.Algod);
                    const sendPath = '/v2/transactions';
                    let fetchParams : any = {
                        headers: {
                            ...conn.apiKey,
                            'Content-Type': 'application/x-binary',
                        },
                        method: 'POST',
                    };
                    const tx = atob(params.tx).split("").map(x => x.charCodeAt(0));
                    fetchParams.body = new Uint8Array(tx);


                    let url = conn.url;
                    if (conn.port.length > 0)
                        url += ':' + conn.port;


                    fetch(`${url}${sendPath}`, fetchParams)
                    .then(async (response) => {
                        d.response = await response.json();
                        resolve(d);
                    }).catch((error) => {
                        d.error = error.message;
                        reject(d);
                    })
                },
                // algod
                [JsonRpcMethod.Algod]: (
                    d: any,
                    resolve: Function, reject: Function
                ) => {
                    const { params } = d.body;
                    const conn = Settings.getBackendParams(params.ledger, API.Algod);

                    const contentType = params.contentType ? params.contentType : '';

                    let fetchParams : any = {
                        headers: {
                            ...conn.apiKey,
                            'Content-Type': contentType,
                        },
                        method: params.method || 'GET',
                    };
                    if (params.body)
                        fetchParams.body = params.body;

                    let url = conn.url;
                    if (conn.port.length > 0)
                        url += ':' + conn.port;

                    fetch(`${url}${params.path}`, fetchParams)
                    .then(async (response) => {
                        d.response = await response.json();
                        resolve(d);
                    }).catch((error) => {
                        d.error = error.message;
                        reject(d);
                    })
                },
                // Indexer
                [JsonRpcMethod.Indexer]: (
                    d: any,
                    resolve: Function, reject: Function
                ) => {
                    const { params } = d.body;
                    const conn = Settings.getBackendParams(params.ledger, API.Indexer);

                    const contentType = params.contentType ? params.contentType : '';

                    let fetchParams : any = {
                        headers: {
                            ...conn.apiKey,
                            'Content-Type': contentType,
                        },
                        method: params.method || 'GET',
                    };
                    if (params.body)
                        fetchParams.body = params.body;

                    let url = conn.url;
                    if (conn.port.length > 0)
                        url += ':' + conn.port;

                    fetch(`${url}${params.path}`, fetchParams)
                    .then(async (response) => {
                        d.response = await response.json();
                        resolve(d);
                    }).catch((error) => {
                        d.error = error.message;
                        reject(d);
                    })
                },
                // Accounts
                [JsonRpcMethod.Accounts]: (
                    d: any,
                    resolve: Function, reject: Function
                ) => {
                    const session = InternalMethods.getHelperSession();
                    const accounts = session.wallet[d.body.params.ledger];
                    let res = [];
                    for (var i = 0; i < accounts.length; i++) {
                        res.push({
                            address: accounts[i].address
                        });
                    }
                    d.response = res;
                    resolve(d);
                },
            },
            'private': {
                // authorization-allow
                [JsonRpcMethod.AuthorizationAllow]: (d) => {
                    const { responseOriginTabID } = d.body.params;
                    let auth = Task.requests[responseOriginTabID];
                    let message = auth.message;

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
                    let auth = Task.requests[responseOriginTabID];
                    let message = auth.message;

                    auth.message.error = RequestErrors.NotAuthorized;
                    extensionBrowser.windows.remove(auth.window_id);
                    delete Task.requests[responseOriginTabID];

                    setTimeout(() => {
                        MessageApi.send(message);
                    }, 100);
                },
            },
            'extension' : {
                // sign-allow
                [JsonRpcMethod.SignAllow]: (request: any, sendResponse: Function) => {
                    const { passphrase, responseOriginTabID } = request.body.params;
                    let auth = Task.requests[responseOriginTabID];
                    let message = auth.message;

                    const { from,
                        to,
                        fee,
                        amount,
                        firstRound,
                        lastRound,
                        genesisID,
                        genesisHash,
                        note } = message.body.params;

                    let ledger
                    switch (genesisID) {
                        case "mainnet-v1.0":
                            ledger = Ledger.MainNet
                            break;
                        case "testnet-v1.0":
                            ledger = Ledger.TestNet
                            break;
                    }

                    const params = Settings.getBackendParams(ledger, API.Algod);
                    const algod = new algosdk.Algodv2(params.apiKey, params.url, params.port);

                    let context = new encryptionWrap(passphrase);
                    context.unlock(async (unlockedValue: any) => {
                        if ('error' in unlockedValue) {
                            sendResponse(unlockedValue);
                            return false;
                        }

                        extensionBrowser.windows.remove(auth.window_id);

                        let account;

                        // Find address to send algos from
                        for (var i = unlockedValue[ledger].length - 1; i >= 0; i--) {
                            if (unlockedValue[ledger][i].address === from) {
                                account = unlockedValue[ledger][i];
                                break;
                            }
                        }

                        var recoveredAccount = algosdk.mnemonicToSecretKey(account.mnemonic); 

                        let txn = {...message.body.params};

                        if ('note' in txn) {
                            txn.note = Buffer.from(txn.note, "base64");
                        }

                        let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);

                        // Clean class saved request
                        delete Task.requests[responseOriginTabID];
                        let b64Obj = Buffer.from(signedTxn.blob).toString('base64');

                        message.response = {
                            txID: signedTxn.txID,
                            blob: b64Obj
                        };
                        MessageApi.send(message);
                    });
                    return true;
                },
                [JsonRpcMethod.SignDeny]: (request: any, sendResponse: Function) => {
                    const { responseOriginTabID } = request.body.params;
                    let auth = Task.requests[responseOriginTabID];
                    let message = auth.message;

                    auth.message.error = RequestErrors.NotAuthorized;
                    extensionBrowser.windows.remove(auth.window_id);
                    delete Task.requests[responseOriginTabID];

                    setTimeout(() => {
                        MessageApi.send(message);
                    }, 100);
                },
                [JsonRpcMethod.CreateWallet]: (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.CreateWallet](request, sendResponse)
                },
                [JsonRpcMethod.DeleteWallet]: (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.DeleteWallet](request, sendResponse)
                },
                [JsonRpcMethod.CreateAccount]: (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.CreateAccount](request, sendResponse)
                },
                [JsonRpcMethod.Login]: (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.Login](request, sendResponse)
                },
                [JsonRpcMethod.GetSession]: (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.GetSession](request, sendResponse)
                },
                [JsonRpcMethod.SaveAccount]:  (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.SaveAccount](request, sendResponse)
                },
                [JsonRpcMethod.ImportAccount]: (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.ImportAccount](request, sendResponse)
                },
                [JsonRpcMethod.DeleteAccount]: (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.DeleteAccount](request, sendResponse)
                },
                [JsonRpcMethod.Transactions]: (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.Transactions](request, sendResponse)
                },
                [JsonRpcMethod.AccountDetails]: (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.AccountDetails](request, sendResponse)
                },
                [JsonRpcMethod.AssetDetails]: (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.AssetDetails](request, sendResponse)
                },
                [JsonRpcMethod.SignSendTransaction]: (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.SignSendTransaction](request, sendResponse)
                },
                [JsonRpcMethod.ChangeLedger]: (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.ChangeLedger](request, sendResponse)
                }
            }
        }
    }
}