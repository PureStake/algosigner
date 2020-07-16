import { Ledger, Backend, API } from './messaging/types';

export class Settings {
    static backend: Backend = Backend.PureStake;
    static backend_settings: {[key: string]: any} = {
        [Backend.PureStake]: {
            [Ledger.Testnet]: {
                [API.Algod] : {
                    url: "https://algosigner.api.purestake.run/testnet/algod",
                    port: ""
                },
                [API.Indexer] : {
                    url: "https://algosigner.api.purestake.run/testnet/indexer",
                    port: ""
                }
            },
            [Ledger.Mainnet]: {
                [API.Algod] : {
                    url: "https://algosigner.api.purestake.run/mainnet/algod",
                    port: ""
                },
                [API.Indexer] : {
                    url: "https://algosigner.api.purestake.run/mainnet/indexer",
                    port: ""
                },
            },
            apiKey: {
                'X-API-key' : 'ZgqaehGkvP6pSNSaoNoy31Nr61BZlhU29E9ERPRU',
            }
        }
    }

    public static getBackendParams(ledger: Ledger, api: API) {
        return {
            url: this.backend_settings[this.backend][ledger][api].url,
            port: this.backend_settings[this.backend][ledger][api].port,
            apiKey: this.backend_settings[this.backend].apiKey
        }
    }
};