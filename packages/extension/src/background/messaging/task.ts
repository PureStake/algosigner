const algosdk = require("algosdk");

import {RequestErrors} from '@algosigner/common/types';
import {JsonRpcMethod} from '@algosigner/common/messaging/types';
import { Ledger, API } from './types';
import {InternalMethods} from './internalMethods';
import {MessageApi} from './api';
import encryptionWrap from "../encryptionWrap";
import { Settings } from '../config';
import {extensionBrowser} from '@algosigner/common/chrome';

export class Task {

    private static request: {[key: string]: any} = {};
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
        return new Promise((resolve,reject) => {
            Task.methods().public[method](
                request,
                resolve,
                reject
            );
        });
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
                                Task.request = {
                                    window_id: w.id,
                                    message:d
                                };
                                setTimeout(function(){
                                    console.log('SENDING MESSAGE AFTER WINDOW CREATION', d)
                                    extensionBrowser.runtime.sendMessage(d);
                                }, 300);
                            }
                        });
                    }
                },
                // sign-transaction
                [JsonRpcMethod.SignTransaction]: (
                    d: any,
                    resolve: Function, reject: Function
                ) => {
                    extensionBrowser.windows.create({
                        url: extensionBrowser.runtime.getURL("index.html#/sign-transaction"),
                        type: "popup",
                        focused: true,
                        width: 400 + 12,
                        height: 550 + 34
                    }, function (w) {
                        if(w) {
                            Task.request = {
                                window_id: w.id,
                                message: d
                            };
                            // Send message with tx info
                            setTimeout(function(){
                                extensionBrowser.runtime.sendMessage(d);
                            }, 300);
                        }
                    });
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
                    d.response = InternalMethods.getHelperSession()[d.body.params.ledger];
                    resolve(d);
                },
            },
            'private': {
                // authorization-allow
                [JsonRpcMethod.AuthorizationAllow]: () => {
                    let auth = Task.request;
                    let message = auth.message;

                    extensionBrowser.windows.remove(auth.window_id);
                    Task.authorized_pool.push(message.origin);
                    Task.request = {};

                    setTimeout(() => {
                        // Response needed
                        message.response = {};
                        MessageApi.send(message);
                    }, 100);
                },
                // authorization-deny
                [JsonRpcMethod.AuthorizationDeny]: () => {
                    let auth = Task.request;
                    let message = auth.message;

                    auth.message.error = RequestErrors.NotAuthorized;
                    extensionBrowser.windows.remove(auth.window_id);
                    Task.request = {};

                    setTimeout(() => {
                        MessageApi.send(message);
                    }, 100);
                },
            },
            'extension' : {
                // sign-allow
                [JsonRpcMethod.SignAllow]: (request: any, sendResponse: Function) => {
                    let auth = Task.request;
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
                    const { passphrase } = request.body.params;

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
                        let params = await algod.getTransactionParams().do();

                        let txn = {
                            "from": from,
                            "to": to,
                            "fee": fee,
                            "amount": +amount,
                            "firstRound": firstRound,
                            "lastRound": lastRound,
                            "genesisID": genesisID,
                            "genesisHash": genesisHash,
                            "note": new Uint8Array(0)
                        };

                        let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);

                        // Clean class saved request
                        Task.request = {};

                        console.log('signedTxn.blob', signedTxn.blob);
                        console.log('signedTxn.blob', algosdk.decodeObj(signedTxn.blob));

                        message.response = {
                            txID: signedTxn.txID,
                            blob: btoa(String.fromCharCode(...signedTxn.blob))
                        };
                        MessageApi.send(message);
                    });
                    return true;
                },
                [JsonRpcMethod.SignDeny]: (request: any, sendResponse: Function) => {
                    let auth = Task.request;
                    let message = auth.message;

                    auth.message.error = RequestErrors.NotAuthorized;
                    extensionBrowser.windows.remove(auth.window_id);
                    Task.request = {};

                    setTimeout(() => {
                        MessageApi.send(message);
                    }, 100);
                },
                [JsonRpcMethod.CreateWallet]: (request: any, sendResponse: Function) => {
                    return InternalMethods[JsonRpcMethod.CreateWallet](request, sendResponse)
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
                }
            }
        }
    }
}