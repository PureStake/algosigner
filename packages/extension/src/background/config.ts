import {Ledger} from './messaging/types';

export enum Backend {
    Purestake = "Purestake",
    Algod = "Algod"
}

export class Settings {
    static ledger: Ledger = Ledger.Testnet;
    static backend: Backend = Backend.Algod;
    static backend_settings: {[key: string]: any} = {
        [Backend.Purestake]: {
            [Ledger.Testnet]: "",
            [Ledger.Mainnet]: "",
            api_key: ""
        },
        [Backend.Algod]: {
            [Ledger.Testnet]: {
                token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                server: "http://127.0.0.1",
                port: "4001"
            },
            [Ledger.Mainnet]: {
                token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                server: "http://127.0.0.1",
                port: "4001"
            }
        }
    }
};