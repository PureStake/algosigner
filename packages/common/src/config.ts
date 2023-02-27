import { Namespace, Network, Alias } from './types';

const MAX_ALIASES_PER_NAMESPACE = 6;

// prettier-ignore
interface ConfigTemplate {
  name: string;                   // Formatted name, used for titles
  networks: any;                  // Object holding supported networks as keys, templated API URL as value
  findAliasedAddresses: Function; // How to process the API response to get the aliased addresses array
  apiTimeout: number;             // Amount in ms to wait for the API to respond
}

const noop = (): void => {
  /* no-op */
};

export class AliasConfig {
  static [Namespace.AlgoSigner_Contacts]: ConfigTemplate = {
    name: 'AlgoSigner Contact',
    networks: null,
    findAliasedAddresses: noop,
    apiTimeout: 0,
  };

  static [Namespace.AlgoSigner_Accounts]: ConfigTemplate = {
    name: 'AlgoSigner Account',
    networks: null,
    findAliasedAddresses: noop,
    apiTimeout: 0,
  };

  static [Namespace.NFD]: ConfigTemplate = {
    name: 'NFDomains',
    networks: {
      [Network.TestNet]:
        'https://api.testnet.nf.domains/nfd?prefix=${term}&requireAddresses=true' +
        `&limit=${MAX_ALIASES_PER_NAMESPACE}`,
      [Network.MainNet]:
        'https://api.nf.domains/nfd?prefix=${term}&requireAddresses=true' +
        `&limit=${MAX_ALIASES_PER_NAMESPACE}`,
    },
    findAliasedAddresses: (response): Array<Alias> =>
      response.map((o) => ({
        name: o['name'],
        address: o['caAlgo'][0],
        namespace: Namespace.NFD,
      })),
    apiTimeout: 2000,
  };

  static [Namespace.ANS]: ConfigTemplate = {
    name: 'Algorand Name Service',
    networks: {
      [Network.TestNet]:
        'https://testnet.api.algonameservice.com/names?pattern=${term}' +
        `&limit=${MAX_ALIASES_PER_NAMESPACE}`,
      [Network.MainNet]:
        'https://api.algonameservice.com/names?pattern=${term}' +
        `&limit=${MAX_ALIASES_PER_NAMESPACE}`,
    },
    findAliasedAddresses: (response): Array<Alias> =>
      response
        .sort((a1, a2) => a1.name.localeCompare(a2.name))
        .map((o) => ({
          name: o['name'],
          address: o['address'],
          namespace: Namespace.ANS,
        })),
    apiTimeout: 2000,
  };

  public static getMatchingNamespaces(network: string): Array<Namespace> {
    const matchingNamespaces: Array<Namespace> = [];
    for (const n in Namespace) {
      if (
        AliasConfig[n] &&
        (AliasConfig[n].networks === null || Object.keys(AliasConfig[n].networks).includes(network))
      ) {
        matchingNamespaces.push(n as Namespace);
      }
    }
    return matchingNamespaces;
  }

  public static getExternalNamespaces(): Array<string> {
    const externalNamespaces: Array<string> = [];
    for (const n in Namespace) {
      if (AliasConfig[n] && AliasConfig[n].apiTimeout > 0) {
        externalNamespaces.push(n);
      }
    }
    return externalNamespaces;
  }
}
