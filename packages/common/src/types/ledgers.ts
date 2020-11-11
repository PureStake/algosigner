export function getSupportedLedgers(): Array<object> {
  // Need to add access to additional ledger types from import
  return [
    { name: 'mainnet', genesisId: 'mainnet-v1.0', genesisHash: '' },
    { name: 'testnet', genesisId: 'testnet-v1.0', genesisHash: '' },
  ];
}
