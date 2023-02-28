import { Connection, ConnectionDetails, NetworkTemplate } from '@algosigner/common/types/network';
import { Network } from '@algosigner/common/types/network';
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

  // Returns a copy of Injected networks with just basic information for dApp or display.
  public static getCleansedInjectedNetworks(): Array<NetworkTemplate> {
    const injectedNetworks = [];
    const injectedNetworkNames = Object.keys(this.backend_settings.InjectedNetworks);
    for (let i = 0; i < injectedNetworkNames.length; i++) {
      injectedNetworks.push({
        name: this.backend_settings.InjectedNetworks[injectedNetworkNames[i]].name,
        genesisID: this.backend_settings.InjectedNetworks[injectedNetworkNames[i]].genesisID,
        genesisHash: this.backend_settings.InjectedNetworks[injectedNetworkNames[i]].genesisHash,
      });
    }

    return injectedNetworks;
  }

  public static getConnectionFromTemplate(network: NetworkTemplate): Connection {
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
        // Get individual sub headers if they are available
        if (headers['Algod']) {
          headersAlgod = headers['Algod'];
        }
        if (headers['Indexer']) {
          headersIndexer = headers['Indexer'];
        }
      } catch (e) {
        // Use headers default value, but use it as a token if it is a string
        if (typeof headers === 'string') {
          // Requests directly to a server would not require the X-API-Key
          // This is the case for most users and is now the default for a string only method.
          headers = { 'X-Algo-API-Token': headers };
        }
      }
    }

    // Setup port splits for algod and indexer - used in sandbox installs
    const parsedAlgodUrl = parseUrlServerAndPort(network.algodUrl);
    const parsedIndexerUrl = parseUrlServerAndPort(network.indexerUrl);

    // Add algod connection
    const injectedAlgod: ConnectionDetails = {
      url: parsedAlgodUrl.server,
      port: parsedAlgodUrl.port,
      apiKey: headersAlgod || headers,
      headers: headersAlgod || headers,
    };

    // Add the indexer connection
    const injectedIndexer: ConnectionDetails = {
      url: parsedIndexerUrl.server,
      port: parsedIndexerUrl.port,
      apiKey: headersIndexer || headers,
      headers: headersIndexer || headers,
    };

    return {
      headers: headers,
      algod: injectedAlgod,
      indexer: injectedIndexer,
    };
  }

  public static addInjectedNetwork(network: NetworkTemplate): void {
    const targetName = network.name;

    // Create settings entry and update w/ headers
    this.backend_settings.InjectedNetworks[targetName] = {
      name: targetName,
      genesisID: network.genesisID,
      genesisHash: network.genesisHash,
    };
    const connection = this.getConnectionFromTemplate(network);
    this.backend_settings.InjectedNetworks[targetName][API.Algod] = connection.algod;
    this.backend_settings.InjectedNetworks[targetName][API.Indexer] = connection.indexer;
    this.backend_settings.InjectedNetworks[targetName].headers = connection.headers;
    logging.log(`Added Network ${targetName}:`, LogLevel.Debug);
    logging.log(this.backend_settings.InjectedNetworks[targetName], LogLevel.Debug);
  }

  public static updateInjectedNetwork(updatedNetwork: NetworkTemplate, previousName: string): void {
    if (!this.backend_settings.InjectedNetworks[previousName]) {
      logging.log(`Unable to overwrite Network ${previousName}.`, LogLevel.Debug);
    } else {
      logging.log(`Overwriting Network ${previousName}.`, LogLevel.Debug);
      this.deleteInjectedNetwork(previousName);
      this.addInjectedNetwork(updatedNetwork);
    }
  }

  public static deleteInjectedNetwork(network: string): void {
    delete this.backend_settings.InjectedNetworks[network];
    logging.log(`Deleted Network ${network}:`, LogLevel.Debug);
  }

  public static getBackendParams(network: string, api: API): ConnectionDetails {
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
}
