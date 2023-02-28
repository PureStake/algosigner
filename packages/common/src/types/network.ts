/* eslint-disable no-unused-vars */
export enum Network {
  TestNet = 'TestNet',
  MainNet = 'MainNet',
}

export enum NetworkSelectionType {
  NoneProvided,
  OnlyIDProvided,
  BothProvided,
}

export type Connection = {
  headers: {},
  algod: ConnectionDetails,
  indexer: ConnectionDetails,
}

export type ConnectionDetails = {
  url: string,
  port: string,
  apiKey: {},
  headers: {},
}

export class NetworkTemplate {
  name: string;
  readonly isEditable: boolean;
  genesisID?: string;
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
    genesisID,
    genesisHash,
    symbol,
    algodUrl,
    indexerUrl,
    headers,
  }: {
    name: string;
    genesisID?: string;
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
    this.genesisID = genesisID || 'mainnet-v1.0';
    this.genesisHash = genesisHash;
    this.symbol = symbol;
    this.algodUrl = algodUrl;
    this.indexerUrl = indexerUrl;
    this.headers = headers;
    this.isEditable = name !== 'MainNet' && name !== 'TestNet';
  }
}

export function getBaseSupportedNetworks(): Array<NetworkTemplate> {
  // Need to add access to additional network types from import
  return [
    new NetworkTemplate({
      name: Network.MainNet,
      genesisID: 'mainnet-v1.0',
      genesisHash: 'wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=',
    }),
    new NetworkTemplate({
      name: Network.TestNet,
      genesisID: 'testnet-v1.0',
      genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
    }),
  ];
}
