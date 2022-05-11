import { Ledger, Namespace } from './types';

interface ConfigTemplate {
  name: string;                   // Formatted name, used for titles
  ledgers: Array<string> | null;  // Ledgers supported, null if there's no restriction
  api: string;                    // Templated URL to call for uncached aliases
  findAliasedAddresses: Function; // How to process the API response to get the aliased address
  // @TODO: add caching/expiry
}

const noop = (): void => {
  /* no-op */
};

export class AliasConfig {
  static [Namespace.AlgoSigner_Contacts]: ConfigTemplate = {
    name: 'AlgoSigner Contact',
    ledgers: null,
    api: '',
    findAliasedAddresses: noop,
  };

  static [Namespace.AlgoSigner_Accounts]: ConfigTemplate = {
    name: 'AlgoSigner Account',
    ledgers: null,
    api: '',
    findAliasedAddresses: noop,
  };

  public static getMatchingNamespaces(ledger: string): Array<any> {
    const matchingNamespaces: Array<string> = [];
    for (const n in Namespace) {
      if (AliasConfig[n].ledgers === null || AliasConfig[n].ledgers.includes(ledger)) {
        matchingNamespaces.push(n);
      }
    }
    return matchingNamespaces;
  }
}
