import {MessageApi} from './api';
import {Task} from './task';
import encryptionWrap from "../encryptionWrap";
import { LockParameters } from  "@algosigner/crypto/dist/secureStorageContext";

// import { Algodv2, Indexer } from 'algosdk';
const algosdk = require("algosdk");

import {RequestErrors} from '@algosigner/common/types';
import {JsonRpcMethod,MessageSource} from '@algosigner/common/messaging/types';

const auth_methods = [
    JsonRpcMethod.Authorization,
    JsonRpcMethod.AuthorizationAllow,
    JsonRpcMethod.AuthorizationDeny
];

class RequestValidation {
    public static isAuthorization(method: JsonRpcMethod) {
        if(auth_methods.indexOf(method) > -1)
            return true;
        return false;
    }
    public static isPublic(method: JsonRpcMethod) {
        if(method in Task.methods().public)
            return true;
        return false;
    }
}

function safeWallet(wallet: any) {
    console.log('WALLET!', wallet);
    let safeWallet : { TestNet: any[], MainNet: any[] } = {
        TestNet: [],
        MainNet: []
    };
    for (var i = 0; i < wallet.TestNet.length; i++) {
        const { address, name } = wallet['TestNet'][i];
        safeWallet.TestNet.push({
            address: address,
            name: wallet.TestNet[i].name
        });
    }
    for (var i = 0; i < wallet.MainNet.length; i++) {
        const { address, name } = wallet['MainNet'][i];
        safeWallet.MainNet.push({
            address: address,
            name: wallet.MainNet[i].name
        });
    }
    return safeWallet;
}

export class OnMessageHandler extends RequestValidation {
    static events: {[key: string]: any} = {};
    static handle(request: any,sender: any,sendResponse: any) {
        console.log('HANDLIG MESSAGE', request, sender, sendResponse);
        // console.log('ID', chrome.runtime.id);
        
        try {
            request.origin = new URL(sender.url).origin;
        } catch(e) {
            request.error = RequestErrors.NotAuthorized;
            MessageApi.send(request);
            return;
        }

        const source: MessageSource = request.source;
        const body = request.body;
        const method = body.method;
        const id = body.id;

        switch(source) {
            // Message from dapp to extension
            case MessageSource.DApp:
                if(OnMessageHandler.isAuthorization(method) 
                    && OnMessageHandler.isPublic(method)) {
                    // Is a public authorization message, dapp is asking to connect
                    Task.methods().public[method](request);
                } else {
                    // Other requests from dapp fall here
                    if(Task.isAuthorized(request.origin)){
                        // If the origin is authorized, build a promise
                        Task.build(request)
                        .then(function(d){
                            MessageApi.send(d);
                        })
                        .catch(function(d){
                            MessageApi.send(d);
                        });
                    } else {
                        // Origin is not authorized
                        request.error = RequestErrors.NotAuthorized;
                        MessageApi.send(request);
                    }
                }
                break;
            // Message from extension to dapp
            case MessageSource.Extension:
                if(OnMessageHandler.isAuthorization(method) 
                    && !OnMessageHandler.isPublic(method)) {
                    // Is a protected authorization message, allowing or denying auth
                    Task.methods().private[method](request);
                } else {
                    OnMessageHandler.events[id] = sendResponse;
                    MessageApi.send(request);
                    // Tell Chrome that this response will be resolved asynchronously.
                    return true;
                }
                break;
            // A response message for a extension to dapp request
            case MessageSource.Router:
                if(Task.isAuthorized(request.origin) && id in OnMessageHandler.events){
                    OnMessageHandler.events[id]();
                    setTimeout(function(){
                        delete OnMessageHandler.events[id];
                    },1000);
                }
                break;

            case MessageSource.UI:
                let algoD, indexer;
                const headers = {
                    'X-API-key' : 'ZgqaehGkvP6pSNSaoNoy31Nr61BZlhU29E9ERPRU',
                };
                const testnetIndexerServer = "https://algosigner.api.purestake.run/testnet/indexer";
                const mainnetServer = "https://algosigner.api.purestake.run/mainnet/algod";
                const mainnetIndexerServer = "https://algosigner.api.purestake.run/mainnet/indexer";
                const testnetServer = "https://algosigner.api.purestake.run/testnet/algod";

                if (body.ledger === 'testnet'){
                    algoD = new algosdk.Algodv2(headers, testnetServer, '', );
                    indexer = new algosdk.Indexer(headers, testnetIndexerServer, '');
                } else {
                    algoD = new algosdk.Algodv2(headers, mainnetServer, '');
                    indexer = new algosdk.Indexer(headers, mainnetIndexerServer, '');
                }
                if (method === "account"){
                    algoD.accountInformation(body.address).do().then((res: any) => {
                      sendResponse(res);
                    });
                    return true;
                } else if (method === "transactions"){
                    indexer.lookupAccountTransactions(body.params.address).limit(body.params.limit).do().then((res: any) => {
                      sendResponse(res);
                    });
                    return true;
                } else if (method === "asset-details"){
                    indexer.lookupAssetByID(body.params['asset-id']).do().then((res: any) => {
                      sendResponse(res);
                    });
                    return true;
                } else if (method == "create-account"){
                    var keys = algosdk.generateAccount();
                    var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
                    sendResponse([mnemonic, keys.addr]);
                } else if (method == "save-account"){
                    const { mnemonic, name, ledger, address } = body.params;
                    const unlockParam : LockParameters = {
                        passphrase: encryptionWrap.stringToUint8ArrayBuffer(body.params.passphrase)
                    };

                    encryptionWrap.unlock(unlockParam, (unlockedValue: any) => {
                        if ('error' in unlockedValue) {
                            sendResponse(unlockedValue);
                        } else {
                            let newAccount = {
                                address: address,
                                mnemonic: mnemonic,
                                name: name
                            }
                            unlockedValue[ledger].push(newAccount);
                            encryptionWrap.lock({
                                passphrase: encryptionWrap.stringToUint8ArrayBuffer(body.params.passphrase), 
                                encryptObject: encryptionWrap.stringToUint8ArrayBuffer(JSON.stringify(unlockedValue))
                            },
                            (isSuccessful: any) => {
                                if(isSuccessful){
                                    sendResponse(safeWallet(unlockedValue));
                                } else {
                                    sendResponse({error: 'Lock failed'});
                                }
                            });
                        }
                    });
                    return true;
                } else if (method == "import-account"){
                    const { mnemonic, name, ledger } = body.params;
                    const unlockParam : LockParameters = {
                        passphrase: encryptionWrap.stringToUint8ArrayBuffer(body.params.passphrase)
                    };

                    try {
                      var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic); 
                      var newAccount = {
                        address: recoveredAccount.addr,
                        mnemonic: mnemonic,
                        name: name
                      };
                    } catch (error) {
                      sendResponse({error: 'Invalid mnemonic'});
                      return false;
                    }

                    encryptionWrap.unlock(unlockParam, (unlockedValue: any) => {
                        if ('error' in unlockedValue) {
                            sendResponse(unlockedValue);
                        } else {
                            unlockedValue[ledger].push(newAccount);
                            encryptionWrap.lock({
                                passphrase: encryptionWrap.stringToUint8ArrayBuffer(body.params.passphrase), 
                                encryptObject: encryptionWrap.stringToUint8ArrayBuffer(JSON.stringify(unlockedValue))
                            },
                            (isSuccessful: any) => {
                                if(isSuccessful){
                                    sendResponse(safeWallet(unlockedValue));
                                } else {
                                    sendResponse({error: 'Lock failed'});
                                }
                            });
                        }
                    });
                    return true;
                } else if (method == "login"){
                    const unlockParam : LockParameters = {
                        passphrase: encryptionWrap.stringToUint8ArrayBuffer(body.params.passphrase)
                    };
                    encryptionWrap.unlock(unlockParam, (response: any) => {
                        if ('error' in response){
                            console.log('SENDING LOGIN', response)
                            sendResponse(response);
                        } else {
                            sendResponse(safeWallet(response));
                        }

                    });
                    return true;
                } else if (method == "create-wallet"){
                    const lockParam : LockParameters = {
                        passphrase: encryptionWrap.stringToUint8ArrayBuffer(body.params.passphrase)
                    };
                    const newWallet = {
                        TestNet: [],
                        MainNet: []
                    };
                    encryptionWrap.lock({
                        passphrase: encryptionWrap.stringToUint8ArrayBuffer(body.params.passphrase), 
                        encryptObject: encryptionWrap.stringToUint8ArrayBuffer(JSON.stringify(newWallet))
                    }, (isSuccessful: any) => {
                        if(isSuccessful){
                            sendResponse(newWallet);
                        } else {
                            sendResponse({error: 'Lock failed'});
                        }
                    });
                    return true;
                }

                break;
        }
    }
}