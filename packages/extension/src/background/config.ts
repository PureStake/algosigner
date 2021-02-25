import { LedgerTemplate } from '@algosigner/common/types/ledgers';
import { Ledger, Backend, API } from './messaging/types';

export class Settings {
  static backend: Backend = Backend.PureStake;
  static backend_settings: { [key: string]: any } = {
    [Backend.PureStake]: {
      [Ledger.TestNet]: {
        [API.Algod]: {
          url: 'https://algosigner.api.purestake.io/testnet/algod',
          port: '',
        },
        [API.Indexer]: {
          url: 'https://algosigner.api.purestake.io/testnet/indexer',
          port: '',
        },
      },
      [Ledger.MainNet]: {
        [API.Algod]: {
          url: 'https://algosigner.api.purestake.io/mainnet/algod',
          port: '',
        },
        [API.Indexer]: {
          url: 'https://algosigner.api.purestake.io/mainnet/indexer',
          port: '',
        },
      },
      apiKey: {},
    },
    InjectedNetworks: {},
  };

  public static deleteInjectedNetwork(ledgerUniqueName: string) {
    delete this.backend_settings.InjectedNetworks[ledgerUniqueName];
  }

  // Returns a copy of Injected networks with just basic information for dApp or display.
  public static getCleansedInjectedNetworks() {
    const injectedNetworks = [];
    const injectedNetworkKeys = Object.keys(this.backend_settings.InjectedNetworks);
    for (var i = 0; i < injectedNetworkKeys.length; i++) {
      injectedNetworks.push({
        name: this.backend_settings.InjectedNetworks[injectedNetworkKeys[i]].name,
        genesisId: this.backend_settings.InjectedNetworks[injectedNetworkKeys[i]].genesisId,
      });
    }

    return injectedNetworks;
  }

  private static setInjectedHeaders(ledger: LedgerTemplate) {
    if (!this.backend_settings.InjectedNetworks[ledger.name]) {
      console.log('Error: Ledger headers can not be updated. Ledger not available.');
      return;
    }

    // Initialize headers for apiKey and individuals if there
    let headers = {};
    let headersAlgod = undefined;
    let headersIndexer = undefined;
    if (ledger['headers']) {
      // Set the headers to the base level first, this allows a string key to be used
      headers = ledger['headers'];

      // Then try to parse the headers, in the case it is a string object.
      try {
        headers = JSON.parse(ledger['headers']);
      } catch (e) {
        // Use headers default value, but use it as a token if if is a string
        if (typeof headers === 'string') {
          headers = { 'X-API-Key': headers };
          // Requests directly to a server would not require the X-API-Key
          //headers = {"X-Algo-API-Token": headers};
        }
      }

      // Get individual sub headers if they are available
      if (headers['Algod']) {
        headersAlgod = headers['Algod'];
      }
      if (headers['Indexer']) {
        headersIndexer = headers['Indexer'];
      }
    }

    // Add the algod links defaulting the url to one based on the genesisId
    let defaultUrl = 'https://algosigner.api.purestake.io/mainnet';
    if (ledger.genesisId && ledger.genesisId.indexOf('testnet') > -1) {
      defaultUrl = 'https://algosigner.api.purestake.io/testnet';
    }
    this.backend_settings.InjectedNetworks[ledger.name][API.Algod] = {
      url: ledger.algodUrl || `${defaultUrl}/algod`,
      port: '',
      apiKey: headersAlgod || headers,
      headers: headersAlgod || headers,
    };

    // Add the indexer links
    this.backend_settings.InjectedNetworks[ledger.name][API.Indexer] = {
      url: ledger.indexerUrl || `${defaultUrl}/indexer`,
      port: '',
      apiKey: headersIndexer || headers,
      headers: headersIndexer || headers,
    };

    this.backend_settings.InjectedNetworks[ledger.name].headers = headers;
  }

  public static addInjectedNetwork(ledger: LedgerTemplate) {
    // Initialize the injected network with the genesisId and a name that mimics the ledger for reference
    this.backend_settings.InjectedNetworks[ledger.name] = {
      name: ledger.name,
      genesisId: ledger.genesisId || '',
    };

    this.setInjectedHeaders(ledger);
  }

  public static updateInjectedNetwork(updatedLedger: LedgerTemplate) {
    this.backend_settings.InjectedNetworks[updatedLedger.name].genesisId = updatedLedger.genesisId;
    this.backend_settings.InjectedNetworks[updatedLedger.name].symbol = updatedLedger.symbol;
    this.backend_settings.InjectedNetworks[updatedLedger.name].genesisHash =
      updatedLedger.genesisHash;
    this.backend_settings.InjectedNetworks[updatedLedger.name].algodUrl = updatedLedger.algodUrl;
    this.backend_settings.InjectedNetworks[updatedLedger.name].indexerUrl =
      updatedLedger.indexerUrl;
    this.setInjectedHeaders(updatedLedger);
  }

  public static getBackendParams(ledger: string, api: API) {
    // If we are using the PureStake backend we can return the url, port, and apiKey
    if (this.backend_settings[this.backend][ledger]) {
      return {
        url: this.backend_settings[this.backend][ledger][api].url,
        port: this.backend_settings[this.backend][ledger][api].port,
        apiKey: this.backend_settings[this.backend].apiKey,
        headers: {},
      };
    }

    // Here we have to grab data from injected networks instead of the backend
    return {
      url: this.backend_settings.InjectedNetworks[ledger][api].url,
      port: '',
      apiKey: this.backend_settings.InjectedNetworks[ledger][api].apiKey,
      headers: this.backend_settings.InjectedNetworks[ledger][api].headers,
    };
  }
}
