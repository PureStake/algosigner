// Key and value must match in this enum so we
// can compare its existance with i.e. "Testnet" in SupportedLedger
export enum Ledger {
    Testnet = "TestNet",
    Mainnet = "MainNet"
}

export enum Backend {
    PureStake = "PureStake",
    Algod = "Algod"
}
export enum API {
    Algod = "Algod",
    Indexer = "Indexer"
}