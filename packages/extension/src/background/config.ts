import { NetworkTemplate } from '@algosigner/common/types/network';
import { Network } from '@algosigner/common/types';
import { logging, LogLevel } from '@algosigner/common/logging';
import { Backend, API } from './messaging/types';
import { parseUrlServerAndPort } from './utils/networkUrlParser';

export class Settings {
  static backend: Backend = Backend.PureStake;
  static backend_settings: { [key: string]: any } = {
    [Backend.PureStake]: {
      [Network.TestNet]: {
        [API.Algod]: {
          url: 'https://algosigner.api.purestake.io/testnet/algod',
          port: '',
        },
        [API.Indexer]: {
          url: 'https://algosigner.api.purestake.io/testnet/indexer',
          port: '',
        },
      },
      [Network.MainNet]: {
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

  public static deleteInjectedNetwork(networkUniqueName: string) {
    delete this.backend_settings.InjectedNetworks[networkUniqueName];
  }

  // Returns a copy of Injected networks with just basic information for dApp or display.
  public static getCleansedInjectedNetworks() {
    const injectedNetworks = [];
    const injectedNetworkKeys = Object.keys(this.backend_settings.InjectedNetworks);
    for (var i = 0; i < injectedNetworkKeys.length; i++) {
      injectedNetworks.push({
        name: this.backend_settings.InjectedNetworks[injectedNetworkKeys[i]].name,
        genesisID: this.backend_settings.InjectedNetworks[injectedNetworkKeys[i]].genesisID,
        genesisHash: this.backend_settings.InjectedNetworks[injectedNetworkKeys[i]].genesisID,
      });
    }

    return injectedNetworks;
  }

  private static setInjectedHeaders(network: NetworkTemplate, isCheckOnly?: boolean) {
    if (!this.backend_settings.InjectedNetworks[network.name] && !isCheckOnly) {
      console.log('Error: Network headers can not be updated. Network not available.');
      return;
    }

    // Initialize headers for apiKey and individuals if there
    let headers = {};
    let headersAlgod = undefined;
    let headersIndexer = undefined;
    if (network['headers']) {
      // Set the headers to the base level first, this allows a string key to be used
      headers = network['headers'];

      // Then try to parse the headers, in the case it is a string object.
      try {
        headers = JSON.parse(network['headers']);
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

    // Add the algod links defaulting the url to one based on the genesisID
    let defaultUrl = 'https://algosigner.api.purestake.io/mainnet';
    if (network.genesisID && network.genesisID.indexOf('testnet') > -1) {
      defaultUrl = 'https://algosigner.api.purestake.io/testnet';
    }

    // Setup port splits for algod and indexer - used in sandbox installs
    const parsedAlgodUrlObj = parseUrlServerAndPort(network.algodUrl);
    const parsedIndexerUrlObj = parseUrlServerAndPort(network.indexerUrl);

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
      this.backend_settings.InjectedNetworks[network.name][API.Algod] = injectedAlgod;
      this.backend_settings.InjectedNetworks[network.name][API.Indexer] = injectedIndexer;
      this.backend_settings.InjectedNetworks[network.name].headers = headers;
    }
  }

  public static addInjectedNetwork(network: NetworkTemplate) {
    // Initialize the injected network with the genesisID and a name that mimics the network for reference
    this.backend_settings.InjectedNetworks[network.name] = {
      name: network.name,
      genesisID: network.genesisID || '',
    };

    this.setInjectedHeaders(network);
    logging.log(
      `Added Network:\n${JSON.stringify(
        this.backend_settings.InjectedNetworks[network.name],
        null,
        1
      )}`,
      LogLevel.Debug
    );
  }

  public static updateInjectedNetwork(updatedNetwork: NetworkTemplate, previousName: string = '') {
    const targetName = updatedNetwork.uniqueName;

    if (previousName) {
      this.deleteInjectedNetwork(previousName);
      this.backend_settings.InjectedNetworks[targetName] = {};
    }
    this.backend_settings.InjectedNetworks[targetName].genesisID = updatedNetwork.genesisID;
    this.backend_settings.InjectedNetworks[targetName].symbol = updatedNetwork.symbol;
    this.backend_settings.InjectedNetworks[targetName].genesisHash =
      updatedNetwork.genesisHash;
    this.backend_settings.InjectedNetworks[targetName].algodUrl = updatedNetwork.algodUrl;
    this.backend_settings.InjectedNetworks[targetName].indexerUrl =
      updatedNetwork.indexerUrl;
    this.setInjectedHeaders(updatedNetwork);

    logging.log(
      `Updated Network:\n${JSON.stringify(
        this.backend_settings.InjectedNetworks[targetName],
        null,
        1
      )}`,
      LogLevel.Debug
    );
  }

  public static getBackendParams(network: string, api: API) {
    // If we are using the PureStake backend we can return the url, port, and apiKey
    if (this.backend_settings[this.backend][network]) {
      return {
        url: this.backend_settings[this.backend][network][api].url,
        port: this.backend_settings[this.backend][network][api].port,
        apiKey: this.backend_settings[this.backend].apiKey,
        headers: {},
      };
    }

    // Here we have to grab data from injected networks instead of the backend
    return {
      url: this.backend_settings.InjectedNetworks[network][api].url,
      port: this.backend_settings.InjectedNetworks[network][api].port,
      apiKey: this.backend_settings.InjectedNetworks[network][api].apiKey,
      headers: this.backend_settings.InjectedNetworks[network][api].headers,
    };
  }

  public static checkNetwork(network: NetworkTemplate) {
    const networks = this.setInjectedHeaders(network, true);
    return networks;
  }
}
