export class LedgerTemplate {
  name: string;
  readonly isEditable: boolean;
  genesisId?: string;
  genesisHash?: string;
  symbol?: string;
  algodUrl?: string;
  indexerUrl?: string;
  headers?: string;

  public get uniqueName(): string {
    return this.name.toLowerCase();
  }

  constructor({
    name,
    genesisId,
    genesisHash,
    symbol,
    algodUrl,
    indexerUrl,
    headers,
  }: {
    name: string;
    genesisId?: string;
    genesisHash?: string;
    symbol?: string;
    algodUrl?: string;
    indexerUrl?: string;
    headers?: string;
  }) {
    if (!name) {
      throw Error('A name is required for ledgers.');
    }

    this.name = name;
    this.genesisId = genesisId || 'mainnet-v1.0';
    this.genesisHash = genesisHash;
    this.symbol = symbol;
    this.algodUrl = algodUrl;
    this.indexerUrl = indexerUrl;
    this.headers = headers;
    this.isEditable = name !== 'MainNet' && name !== 'TestNet';
  }
}

export function getBaseSupportedLedgers(): Array<LedgerTemplate> {
  // Need to add access to additional ledger types from import
  return [
    new LedgerTemplate({
      name: 'MainNet',
      genesisId: 'mainnet-v1.0',
      genesisHash: 'wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=',
    }),
    new LedgerTemplate({
      name: 'TestNet',
      genesisId: 'testnet-v1.0',
      genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
    }),
  ];
}
