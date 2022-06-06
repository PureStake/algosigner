import { Namespace, Ledger, Alias } from './types';

interface ConfigTemplate {
  name: string;                   // Formatted name, used for titles
  ledgers: any;                   // Object holding supported Ledgers as keys, templated API URL as value
  findAliasedAddresses: Function; // How to process the API response to get the aliased addresses array
  apiTimeout: number;             // Amount in ms to wait for the API to respond
  // @TODO: add caching/expiry
}

const noop = (): void => {
  /* no-op */
};

export class AliasConfig {
  static [Namespace.AlgoSigner_Contacts]: ConfigTemplate = {
    name: 'AlgoSigner Contact',
    ledgers: null,
    findAliasedAddresses: noop,
    apiTimeout: 0,
  };

  static [Namespace.AlgoSigner_Accounts]: ConfigTemplate = {
    name: 'AlgoSigner Account',
    ledgers: null,
    findAliasedAddresses: noop,
    apiTimeout: 0,
  };

  static [Namespace.NFD]: ConfigTemplate = {
    name: 'NFDomains',
    ledgers: {
      [Ledger.TestNet]: 'https://api.testnet.nf.domains/nfd?prefix=${term}&requireAddresses=true',
      [Ledger.MainNet]: 'https://api.nf.domains/nfd?prefix=${term}&requireAddresses=true',
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
    name: 'Algorand Namespace Service',
    ledgers: {
      [Ledger.TestNet]: 'https://testnet.api.algonameservice.com/names?pattern=${term}',
      [Ledger.MainNet]: 'https://api.algonameservice.com/names?pattern=${term}',
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

  public static getMatchingNamespaces(ledger: string): Array<string> {
    const matchingNamespaces: Array<string> = [];
    for (const n in Namespace) {
      if (
        AliasConfig[n] &&
        (AliasConfig[n].ledgers === null || Object.keys(AliasConfig[n].ledgers).includes(ledger))
      ) {
        matchingNamespaces.push(n);
      }
    }
    return matchingNamespaces;
  }
}
