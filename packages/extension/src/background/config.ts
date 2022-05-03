import logging from '@algosigner/common/logging';
import { LedgerTemplate } from '@algosigner/common/types/ledgers';
import { Namespace } from '@algosigner/common/types';
import { Ledger, Backend, API } from './messaging/types';
import { parseUrlServerAndPort } from './utils/networkUrlParser';

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

  private static setInjectedHeaders(ledger: LedgerTemplate, isCheckOnly?: boolean) {
    if (!this.backend_settings.InjectedNetworks[ledger.name] && !isCheckOnly) {
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
        // Use headers default value, but use it as a token if it is a string
        if (typeof headers === 'string') {
          // Requests directly to a server would not require the X-API-Key
          // This is the case for most users and is now the default for a string only method.
          headers = { 'X-Algo-API-Token': headers };
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

    // Setup port splits for algod and indexer - used in sandbox installs
    const parsedAlgodUrlObj = parseUrlServerAndPort(ledger.algodUrl);
    const parsedIndexerUrlObj = parseUrlServerAndPort(ledger.indexerUrl);

    // Add algod links
    const injectedAlgod = {
      url: parsedAlgodUrlObj.server || `${defaultUrl}/algod`,
      port: parsedAlgodUrlObj.port,
      apiKey: headersAlgod || headers,
      headers: headersAlgod || headers,
    };

    // Add the indexer links
    const injectedIndexer = {
      url: parsedIndexerUrlObj.server || `${defaultUrl}/indexer`,
      port: parsedIndexerUrlObj.port,
      apiKey: headersIndexer || headers,
      headers: headersIndexer || headers,
    };

    if (isCheckOnly) {
      return {
        algod: injectedAlgod,
        indexer: injectedIndexer,
      };
    } else {
      this.backend_settings.InjectedNetworks[ledger.name][API.Algod] = injectedAlgod;
      this.backend_settings.InjectedNetworks[ledger.name][API.Indexer] = injectedIndexer;
      this.backend_settings.InjectedNetworks[ledger.name].headers = headers;
    }
  }

  public static addInjectedNetwork(ledger: LedgerTemplate) {
    // Initialize the injected network with the genesisId and a name that mimics the ledger for reference
    this.backend_settings.InjectedNetworks[ledger.name] = {
      name: ledger.name,
      genesisId: ledger.genesisId || '',
    };

    this.setInjectedHeaders(ledger);
    logging.log(
      `Added Network:\n${JSON.stringify(
        this.backend_settings.InjectedNetworks[ledger.name],
        null,
        1
      )}`,
      2
    );
  }

  public static updateInjectedNetwork(updatedLedger: LedgerTemplate, previousName: string = '') {
    const targetName = updatedLedger.uniqueName;

    if (previousName) {
      this.deleteInjectedNetwork(previousName);
      this.backend_settings.InjectedNetworks[targetName] = {};
    }
    this.backend_settings.InjectedNetworks[targetName].genesisId = updatedLedger.genesisId;
    this.backend_settings.InjectedNetworks[targetName].symbol = updatedLedger.symbol;
    this.backend_settings.InjectedNetworks[targetName].genesisHash =
      updatedLedger.genesisHash;
    this.backend_settings.InjectedNetworks[targetName].algodUrl = updatedLedger.algodUrl;
    this.backend_settings.InjectedNetworks[targetName].indexerUrl =
      updatedLedger.indexerUrl;
    this.setInjectedHeaders(updatedLedger);

    logging.log(
      `Updated Network:\n${JSON.stringify(
        this.backend_settings.InjectedNetworks[targetName],
        null,
        1
      )}`,
      2
    );
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
      port: this.backend_settings.InjectedNetworks[ledger][api].port,
      apiKey: this.backend_settings.InjectedNetworks[ledger][api].apiKey,
      headers: this.backend_settings.InjectedNetworks[ledger][api].headers,
    };
  }

  public static checkNetwork(ledger: LedgerTemplate) {
    const networks = this.setInjectedHeaders(ledger, true);
    return networks;
  }
}

interface ConfigTemplate {
  suffix: string;         // Regex associated with the namespace
  ledgers: Array<string>; // Ledgers supported, null if there's no restriction
  api: string;            // Templated URL to call for uncached aliases
  findAddress: Function;  // How to process the API response to get the aliased address
  // @TODO: add caching/expiry
}

const noop = (): void => { /* no-op */ };

export class AliasConfig {
  static [Namespace.AlgoSigner_Accounts]: ConfigTemplate = {
    suffix: '',
    ledgers: null,
    api: '',
    findAddress: noop,
  };

  static [Namespace.AlgoSigner_Contacts]: ConfigTemplate = {
    suffix: '',
    ledgers: null,
    api: '',
    findAddress: noop,
  };

  static [Namespace.NFD]: ConfigTemplate = {
    suffix: '.algo',
    ledgers: [Ledger.MainNet, Ledger.TestNet],
    api: '',//'https://api.${ledger}.nf.domains/nfd/${term}.algo',
    findAddress: (o) => {
      if (o['caAlgo'] && o['caAlgo'][0]) {
        return o['caAlgo'][0];
      }
      return null;
    },
  };

  static [Namespace.ANS]: ConfigTemplate = {
    suffix: '.algo',
    ledgers: [Ledger.MainNet, Ledger.TestNet],
    api: '',
    findAddress: noop,
  };

  public static getMatchingNamespaces(ledger: string): Array<any> {
    const matchingNamespaces = [];
    for (const n in Namespace) {
      if (AliasConfig[n].ledgers === null || AliasConfig[n].ledgers.includes(ledger)) {
        matchingNamespaces.push(n);
      }
    }
    return matchingNamespaces;
  }
}