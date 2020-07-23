import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { Settings } from '../config';
import { Ledger, Backend, API } from './types';
import Helper from '../utils/helper';
import encryptionWrap from "../encryptionWrap";
const algosdk = require("algosdk");

const helper = new Helper;

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


    public static [JsonRpcMethod.GetSession](request: any, sendResponse: Function) {
        this._encryptionWrap?.checkStorage((exist: boolean) => {
            if (!exist) {
                sendResponse({exist: false});
            } else {
                if (helper.session)
                    sendResponse({exist: true, session: helper.session});
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
                helper.session = this.safeWallet(newWallet); 
                sendResponse(helper.session);
            } else {
                sendResponse({error: 'Lock failed'});
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
                helper.session = this.safeWallet(response); 
                sendResponse(helper.session);
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
                        helper.session = this.safeWallet(unlockedValue); 
                        sendResponse(helper.session);
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
                        helper.session = this.safeWallet(unlockedValue); 
                        sendResponse(helper.session);
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
                        helper.session = this.safeWallet(unlockedValue); 
                        sendResponse(helper.session);
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
          sendResponse(res);
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
        });
        return true;
    }

    public static [JsonRpcMethod.AssetDetails](request: any, sendResponse: Function) {
        let indexer = this.getIndexer(request.body.params.ledger);
        indexer.lookupAssetByID(request.body.params['asset-id']).do().then((res: any) => {
          sendResponse(res);
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
              "from": address,
              "to": to,
              "fee": params.fee,
              "amount": +amount,
              "firstRound": params.firstRound,
              "lastRound": params.lastRound,
              "genesisID": params.genesisID,
              "genesisHash": params.genesisHash,
              "note": new Uint8Array(Buffer.from(note, "base64"))
            };

            const txHeaders = {
                'Content-Type' : 'application/x-binary'
            }
            let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);

            algod.sendRawTransaction(signedTxn.blob, txHeaders).do().then((resp: any) => {
                sendResponse({txId: resp.txId});
            }).catch((e: any) => {
              console.log('error', e.message);
              sendResponse({error: e.message});
            });
        });

        return true;
    }
}
