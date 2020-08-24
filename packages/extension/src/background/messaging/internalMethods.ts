import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { Settings } from '../config';
import { Ledger, Backend, API } from './types';
import { ExtensionStorage } from "@algosigner/storage/src/extensionStorage";
import { Task } from './task';
import Session from '../utils/session';
import encryptionWrap from "../encryptionWrap";
import { getValidatedTxnWrap } from "../transaction/actions";
import { ValidationResponse } from '../utils/validator';
import {logging} from '@algosigner/common/logging';
const algosdk = require("algosdk");

const session = new Session;

export class InternalMethods {
    private static _encryptionWrap: encryptionWrap|undefined;

    private static getAlgod(ledger: Ledger) {
        const params = Settings.getBackendParams(ledger, API.Algod);
        return new algosdk.Algodv2(params.apiKey, params.url, params.port);
    }
    private static getIndexer(ledger: Ledger) {
        const params = Settings.getBackendParams(ledger, API.Indexer);
        return new algosdk.Indexer(params.apiKey, params.url, params.port);
    }

    private static safeWallet(wallet: any) {
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

    public static getHelperSession() {
        return session.session;
    }


    public static [JsonRpcMethod.GetSession](request: any, sendResponse: Function) {
        this._encryptionWrap = new encryptionWrap("");

        this._encryptionWrap?.checkStorage((exist: boolean) => {
            if (!exist) {
                sendResponse({exist: false});
            } else {
                if (session.wallet)
                    sendResponse({exist: true, session: session.session});
                else
                    sendResponse({exist: true});
            }
        });
        return true;
    }

    public static [JsonRpcMethod.CreateWallet](request: any, sendResponse: Function) {
        this._encryptionWrap = new encryptionWrap(request.body.params.passphrase);
        const newWallet = {
            TestNet: [],
            MainNet: []
        };
        this._encryptionWrap?.lock(JSON.stringify(newWallet),
            (isSuccessful: any) => {
            if (isSuccessful) {
                session.wallet = this.safeWallet(newWallet),
                session.ledger = Ledger.MainNet
                sendResponse(session.session);
            } else {
                sendResponse({error: 'Lock failed'});
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
                    if (res){
                        session.clearSession();
                        Task.clearPool();
                        sendResponse({response: res});
                    } else {
                        sendResponse({error: 'Storage could not be cleared'});
                    }
                })
            }
        });
        return true;
    }

    public static [JsonRpcMethod.Login](request: any, sendResponse: Function) {
        this._encryptionWrap = new encryptionWrap(request.body.params.passphrase);
        this._encryptionWrap.unlock((response: any) => {
            if ('error' in response){
                sendResponse(response);
            } else {
                session.wallet = this.safeWallet(response),
                session.ledger = Ledger.MainNet,
                sendResponse(session.session);
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
                let newAccount = {
                    address: address,
                    mnemonic: mnemonic,
                    name: name
                }
                unlockedValue[ledger].push(newAccount);
                this._encryptionWrap?.lock(JSON.stringify(unlockedValue),
                (isSuccessful: any) => {
                    if (isSuccessful) {
                        session.wallet = this.safeWallet(unlockedValue); 
                        sendResponse(session.wallet);
                    } else {
                        sendResponse({error: 'Lock failed'});
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
                this._encryptionWrap?.lock(JSON.stringify(unlockedValue),                                                                                               
                (isSuccessful: any) => {
                    if (isSuccessful) {
                        session.wallet = this.safeWallet(unlockedValue); 
                        sendResponse(session.wallet);
                    } else {
                        sendResponse({error: 'Lock failed'});
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
          var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic); 
          var newAccount = {
            address: recoveredAccount.addr,
            mnemonic: mnemonic,
            name: name
          };
        } catch (error) {
          sendResponse({error: error.message});
          return false;
        }

        this._encryptionWrap.unlock((unlockedValue: any) => {
            if ('error' in unlockedValue) {
                sendResponse(unlockedValue);
            } else {
                unlockedValue[ledger].push(newAccount);
                this._encryptionWrap?.lock(JSON.stringify(unlockedValue),
                (isSuccessful: any) => {
                    if(isSuccessful) {
                        session.wallet = this.safeWallet(unlockedValue); 
                        sendResponse(session.wallet);
                    } else {
                        sendResponse({error: 'Lock failed'});
                    }
                });
            }
        });
        return true;
    }


    public static [JsonRpcMethod.AccountDetails](request: any, sendResponse: Function) {
        const { ledger, address } = request.body.params;
        const algod = this.getAlgod(ledger);
        algod.accountInformation(address).do().then((res: any) => {
            // Check for asset details saved in storage if needed
            if ('assets' in res && res.assets.length > 0){
                new ExtensionStorage().getStorage('assets', (savedAssets: any) => {
                    if (savedAssets) {
                        for (var i = res.assets.length - 1; i >= 0; i--) {
                            const assetId = res.assets[i]['asset-id'];
                            if (assetId in savedAssets[ledger])
                                res.assets[i] = {
                                    ...res.assets[i],
                                    ...savedAssets[ledger][assetId]
                                };
                        }
                    }
                    res.assets.sort((a, b) => a['asset-id'] - b['asset-id']);
                    sendResponse(res);
                });
            } else {
                sendResponse(res);
            }
        }).catch((e: any) => {
            sendResponse({error: e.message});
        });
        return true;
    }

    public static [JsonRpcMethod.Transactions](request: any, sendResponse: Function) {
        let indexer = this.getIndexer(request.body.params.ledger);
        let txs = indexer.lookupAccountTransactions(request.body.params.address);
        if (request.body.params.limit)
            txs.limit(request.body.params.limit);
        if (request.body.params['next-token'])
            txs.nextToken(request.body.params['next-token']);
        txs.do().then((res: any) => {
            sendResponse(res);
        }).catch((e: any) => {
            sendResponse({error: e.message});
        });
        return true;
    }

    public static [JsonRpcMethod.AssetDetails](request: any, sendResponse: Function) {
        const assetId = request.body.params['asset-id'];
        const { ledger } = request.body.params;
        let indexer = this.getIndexer(ledger);
        indexer.lookupAssetByID(assetId).do().then((res: any) => {
            sendResponse(res);
            // Save asset details in storage if needed
            let extensionStorage = new ExtensionStorage();
            extensionStorage.getStorage('assets', (savedAssets: any) => {
                //console.log('assets', savedAssets)
                let assets = savedAssets || {
                    TestNet: {},
                    MainNet: {}
                };
                if (!(assetId in assets[ledger])) {
                    assets[ledger][assetId] = res.asset.params;
                    extensionStorage.setStorage('assets', assets, null);
                }
            });
        }).catch((e: any) => {
            sendResponse({error: e.message});
        });
        return true;
    }

    public static [JsonRpcMethod.SignSendTransaction](request: any, sendResponse: Function) {
        const { ledger, address, to, amount, note, passphrase } = request.body.params;
        this._encryptionWrap = new encryptionWrap(request.body.params.passphrase);
        var algod = this.getAlgod(ledger);

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

            var recoveredAccount = algosdk.mnemonicToSecretKey(account.mnemonic); 
            let params = await algod.getTransactionParams().do();

            let txn = {
              "type": "pay",
              "from": address,
              "to": to,
              "fee": params.fee,
              "amount": +amount,
              "firstRound": params.firstRound,
              "lastRound": params.lastRound,
              "genesisID": params.genesisID,
              "genesisHash": params.genesisHash,
              "note": new Uint8Array(Buffer.from(note))
            };

            const txHeaders = {
                'Content-Type' : 'application/x-binary'
            }

            var transactionWrap = undefined;
            try {
                transactionWrap = getValidatedTxnWrap(txn, txn["type"]);
            }
            catch(e) {
                logging.log(`Validation failed. ${e}`);
                sendResponse({error: `Validation failed. ${e}`});
                return;
            }
            if(!transactionWrap) {     
                // We don't have a transaction wrap. We have an unknow error or extra fields, reject the transaction.               
                logging.log('A transaction has failed because of an inability to build the specified transaction type.');
                sendResponse({error: 'A transaction has failed because of an inability to build the specified transaction type.'});
                return;
            }
            else if(transactionWrap.validityObject && Object.values(transactionWrap.validityObject).some(value => value === ValidationResponse.Invalid)) {
                // We have a transaction that contains fields which are deemed invalid. We should reject the transaction.
                sendResponse({error: 'Invalid fields'});
                return;
            }
            else if(transactionWrap.validityObject && (Object.values(transactionWrap.validityObject).some(value => value === ValidationResponse.Warning ))
                || (Object.values(transactionWrap.validityObject).some(value => value === ValidationResponse.Dangerous))) {
                // We have a transaction which does not contain invalid fields, but does contain fields that are dangerous 
                // or ones we've flagged as needing to be reviewed. We can use a modified popup to allow the normal flow, but require extra scrutiny.
                let signedTxn;
                try {
                    signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
                } catch(e) {
                    sendResponse({error: e.message});
                    return;
                }

                algod.sendRawTransaction(signedTxn.blob, txHeaders).do().then((resp: any) => {
                    sendResponse({txId: resp.txId});
                }).catch((e: any) => {
                    if (e.body.message.includes('overspend'))
                        sendResponse({error: "Overspending"});
                    else
                        sendResponse({error: e.body.message});
                });
            } else {
                let signedTxn;
                try {
                    signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
                } catch(e) {
                    sendResponse({error: e.message});
                    return;
                }

                algod.sendRawTransaction(signedTxn.blob, txHeaders).do().then((resp: any) => {
                    sendResponse({txId: resp.txId});
                }).catch((e: any) => {
                    if (e.body.message.includes('overspend'))
                        sendResponse({error: "Overspending"});
                    else
                        sendResponse({error: e.body.message});
                });
            }

        });

        return true;
    }    
    
    public static [JsonRpcMethod.ChangeLedger](request: any, sendResponse: Function) {
        session.ledger = request.body.params['ledger']
        sendResponse({ledger: session.ledger});
    }
}
