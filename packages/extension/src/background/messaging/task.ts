import {MessageApi} from './api';
import {InternalMethods} from './internalMethods';

import {RequestErrors} from '@algosigner/common/types';
import {JsonRpcMethod} from '@algosigner/common/messaging/types';

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
                        chrome.windows.create({
                            url: chrome.runtime.getURL("index.html#/authorize"),
                            type: "popup",
                            focused: true,
                            width:480,
                            height:640
                        }, function (w) {
                            if(w) {
                                Task.request = {
                                    window_id: w.id,
                                    message:d
                                };
                                setTimeout(function(){
                                    console.log('SENDING MESSAGE AFTER WINDOW CREATION', d)
                                    chrome.runtime.sendMessage(d);
                                },100);
                            }
                        });
                    }
                },
                // sign-transaction
                [JsonRpcMethod.SignTransaction]: (
                    request: any,
                    resolve: Function, reject: Function
                ) => {
                    // TODO further processing..
                    resolve(request);
                }
            },
            'private': {
                // authorization-allow
                [JsonRpcMethod.AuthorizationAllow]: () => {
                    let auth = Task.request;
                    let message = auth.message;

                    chrome.windows.remove(auth.window_id);
                    Task.authorized_pool.push(message.origin);
                    Task.request = {};

                    setTimeout(() => {
                        // Response needed
                        message.response = {};
                        MessageApi.send(message);
                    }, 1000);
                },
                // authorization-deny
                [JsonRpcMethod.AuthorizationDeny]: () => {
                    let auth = Task.request;
                    let message = auth.message;

                    auth.message.error = RequestErrors.NotAuthorized;
                    chrome.windows.remove(auth.window_id);
                    Task.request = {};

                    setTimeout(() => {
                        MessageApi.send(message);
                    },100);
                },
                // algod
                [JsonRpcMethod.Algod]: () => {
                    let auth = Task.request;
                    let message = auth.message;

                    auth.message.error = RequestErrors.NotAuthorized;
                    chrome.windows.remove(auth.window_id);
                    Task.request = {};

                    setTimeout(() => {
                        MessageApi.send(message);
                    },100);
                }
            },
            'extension' : {
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

// import {Settings,Backend} from '../config';
// import {MessageApi} from './api';
// import Helper from '../utils/helper';

// import {RequestErrors} from '@algosigner/common/types';
// import {JsonRpcMethod} from '@algosigner/common/messaging/types';

// // !Everything below is just theoretical

// let algosdk: any;
// let algod_client: any;
// async function load_sdk() {
//     algosdk = await import(/* webpackChunkName: "algosdk" */'@algosdk');
//     switch(Settings.backend) {
//         case Backend.Purestake:
//                 algod_client = new algosdk.Algod(
//                 Settings.backend_settings[Settings.backend][Settings.ledger],
//                 Settings.backend_settings[Settings.backend].api_key
//             );
//             break;
//         case Backend.Algod:
//                 algod_client = new algosdk.Algod(
//                 Settings.backend_settings[Settings.backend][Settings.ledger].token,
//                 Settings.backend_settings[Settings.backend][Settings.ledger].server,
//                 Settings.backend_settings[Settings.backend][Settings.ledger].port
//             );
//             break;
//     }
// }
// load_sdk();

// export class Task {

//     private static request: {[key: string]: any} = {};
//     private static authorized_pool: Array<string> = [];

//     public static isAuthorized(origin: string): boolean {
//         if(Task.authorized_pool.indexOf(origin) > -1 ){
//             return true;
//         }
//         return false;
//     }

//     public static build(request: any) {
//         let body = request.body;
//         let method = body.method;
//         return new Promise((resolve,reject) => {
//             Task.methods().public[method](request)
//             .then((r: any) => {
//                 request.response = r;
//                 resolve(request);
//             })
//             .catch((e: RequestErrors) => {
//                 request.error = e;
//                 reject(request);
//             });
//         });
//     }

//     public static methods(): {
//         [key: string]: {
//             [JsonRpcMethod: string]: Function
//         }
//     } {
//         return {
//             'public': {
//                 // authorization
//                 [JsonRpcMethod.Authorization]: (d: any) => {
//                     if(Task.isAuthorized(d.origin)){
//                         d.response = {};
//                         MessageApi.send(d);
//                     } else {
//                         chrome.windows.create({
//                             url: chrome.runtime.getURL("authorization.html"),
//                             type: "popup",
//                             focused: true,
//                             width:480,
//                             height:640
//                         }, function (w) {
//                             if(w) {
//                                 Task.request = {
//                                     window_id: w.id,
//                                     message:d
//                                 };
//                                 setTimeout(function(){
//                                     chrome.runtime.sendMessage(d);
//                                 },100);
//                             }
//                         });
//                     }
//                 },
//                 // sign-transaction
//                 // !this impl is just theoretical.
//                 [JsonRpcMethod.SignTransaction]: async (
//                     request: any
//                 ) => {

//                     let params = request.body.params;

//                     // TODO should check length of params' keys and add a limit to
//                     // avoid huge iterations through (maliciously passed) parameters.

//                     // Get Gensesis information, TODO find a way to check this once and persist
//                     let txnParams = await algod_client.getTransactionParams();
//                     let suggestedFee = txnParams.fee;
//                     let genesisID = txnParams.genesisID;
//                     let genesisHash = txnParams.genesishashb64;
//                     let currentRound = txnParams.lastRound;
//                     let minFee = txnParams.minFee;

//                     // Build the transaction object
//                     let txn: {[key: string]: any} = {};
//                     try {

//                         let k;
//                         for(k in params) {
//                             switch(k) {
//                                 case 'note':
//                                     txn[k] = algosdk.encodeObj(params[k]);
//                                     break;
//                                 default:
//                                     txn[k] = params[k];
//                                     break;
//                             }
//                         }

//                         txn.genesisID = genesisID;
//                         txn.genesisHash = genesisHash;
//                         txn.firstRound = currentRound + 1;
//                         txn.lastRound = currentRound + 10;
//                         txn.fee = suggestedFee;

//                     } catch(e) {
//                         throw new Error(RequestErrors.InvalidTransactionParams);
//                     }

//                     // !here we should retrieve from secure storage
//                     let account = algosdk.generateAccount();
//                     let sk = account.sk;
//                     let signedTxn = algosdk.signTransaction(txn,sk);

//                     return signedTxn;
//                 },
//                 // algod query
//                 [JsonRpcMethod.Algod]: async (
//                     request: any
//                 ) => {
//                     let algod_method = request.body.params.method;
//                     let error = false;
//                     let r;
//                     switch(algod_method) 
//                     {
//                         case 'status':
//                             r = await algod_client.status();
//                             break;
//                         default:
//                             error = true;
//                             r = RequestErrors.UnsupportedAlgod;
//                             break;
//                     }
//                     if(error)
//                         throw new Error(r);
//                     return r;
//                 }
//             },
//             'private': {
//                 // authorization-allow
//                 [JsonRpcMethod.AuthorizationAllow]: () => {
//                     let auth = Task.request;
//                     let message = auth.message;

//                     chrome.windows.remove(auth.window_id);
//                     Task.authorized_pool.push(message.origin);
//                     Task.request = {};

//                     setTimeout(() => {
//                         message.response = {};
//                         MessageApi.send(message);
//                     },100);
//                 },
//                 // authorization-deny
//                 [JsonRpcMethod.AuthorizationDeny]: () => {
//                     let auth = Task.request;
//                     let message = auth.message;

//                     auth.message.error = RequestErrors.NotAuthorized;
//                     chrome.windows.remove(auth.window_id);
//                     Task.request = {};

//                     setTimeout(() => {
//                         message.response = {};
//                         MessageApi.send(message);
//                     },100);
//                 }
//             }
//         }
//     }
// }