import { Ledger, Namespace } from './types';

interface ConfigTemplate {
  name: string;           // Formatted name, used for titles
  suffix: string;         // Regex associated with the namespace
  ledgers: Array<string>; // Ledgers supported, null if there's no restriction
  api: string;            // Templated URL to call for uncached aliases
  findAddress: Function;  // How to process the API response to get the aliased address
  // @TODO: add caching/expiry
}

const noop = (): void => {
  /* no-op */
};

export class AliasConfig {
  static [Namespace.AlgoSigner_Contacts]: ConfigTemplate = {
    name: 'AlgoSigner - Contacts',
    suffix: '',
    ledgers: null,
    api: '',
    findAddress: noop,
  };

  static [Namespace.AlgoSigner_Accounts]: ConfigTemplate = {
    name: 'AlgoSigner - Accounts',
    suffix: '',
    ledgers: null,
    api: '',
    findAddress: noop,
  };

  public static getMatchingNamespaces(ledger: Ledger): Array<any> {
    const matchingNamespaces = [];
    for (const n in Namespace) {
      if (AliasConfig[n].ledgers === null || AliasConfig[n].ledgers.includes(ledger)) {
        matchingNamespaces.push(n);
      }
    }
    return matchingNamespaces;
  }
}
