import { Ledger, Backend, API } from './types';

export class Config {
    url: string;
    port: string;
    apiKey: any;

    constructor(url: string, port: string, apiKey: any) {
        this.url = url;
        this.port = port;
        this.apiKey = apiKey;
    }
}

export class Settings {
    static backend: Backend = Backend.PureStake;
    static backend_settings: {[key: string]: any} = {
        [Backend.PureStake]: {
            [Ledger.TestNet]: {
                [API.Algod] : {
                    url: "https://algosigner.api.purestake.io/testnet/algod",
                    port: ""
                },
                [API.Indexer] : {
                    url: "https://algosigner.api.purestake.io/testnet/indexer",
                    port: ""
                }
            },
            [Ledger.MainNet]: {
                [API.Algod] : {
                    url: "https://algosigner.api.purestake.io/mainnet/algod",
                    port: ""
                },
                [API.Indexer] : {
                    url: "https://algosigner.api.purestake.io/mainnet/indexer",
                    port: ""
                },
            },
            apiKey: {}
        }
    }

    public static getBackendParams(ledger: Ledger, api: API): Config {
        return new Config(
            this.backend_settings[this.backend][ledger][api].url,
            this.backend_settings[this.backend][ledger][api].port,
            this.backend_settings[this.backend].apiKey
        );
    }
}