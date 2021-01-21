export const JSONRPC_VERSION: string = "2.0";

/* eslint-disable no-unused-vars */
export enum JsonRpcMethod {
    Heartbeat = "heartbeat",
    Authorization = "authorization",
    AuthorizationAllow = "authorization-allow",
    AuthorizationDeny = "authorization-deny",
    SignAllow = "sign-allow", 
    SignAllowMultisig = "sign-allow-multisig", 
    SignDeny = "sign-deny",
    SignTransaction = "sign-transaction",
    SignMultisigTransaction = "sign-multisig-transaction",
    SendTransaction = "send-transaction",
    Algod = "algod",
    Indexer = "indexer",
    Accounts = "accounts",
    // UI methods
    CreateWallet = "create-wallet",
    DeleteWallet = "delete-wallet",
    CreateAccount = "create-account",
    SaveAccount = "save-account",
    ImportAccount = "import-account",
    DeleteAccount = "delete-account",
    GetSession = "get-session",
    Login = "login",
    Logout = "logout",
    AccountDetails = "account-details",
    Transactions = "transactions",
    AssetDetails = "asset-details",
    AssetsAPIList = "assets-api-list",
    AssetsVerifiedList = "assets-verified-list",
    SignSendTransaction = "sign-send-transaction",
    ChangeLedger = "change-ledger",
}

export type JsonPayload = {[key: string]: string | number | JsonPayload | undefined};

export type JsonRpcBody = {
    readonly jsonrpc: string;
    readonly method: JsonRpcMethod;
    readonly params: JsonPayload;
    readonly id: string;
}

export enum MessageSource {
    Extension = "extension",
    DApp = "dapp",
    Router = "router",
    UI = "ui"
}
export type MessageBody = {
    readonly source: MessageSource,
    readonly body: JsonRpcBody
}

export type JsonRpcResponse = string;