///
// Mapping interface of allowable fields for pay transactions.
///
export interface Pay {
    type: string,
    to: string,
    fee: number,
    amount: number, 
    firstRound: number,
    lastRound: number,
    genesisID: string, 
    genesisHash: string,
    closeRemainderTo: string,
    note: Uint8Array
}