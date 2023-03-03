export const JSONRPC_VERSION: string = '2.0';

/* eslint-disable no-unused-vars */
export enum JsonRpcMethod {
  // dApp methods
  Heartbeat = 'heartbeat',
  Authorization = 'authorization',
  EnableAuthorization = 'enable-authorization',
  AuthorizationAllow = 'authorization-allow',
  AuthorizationDeny = 'authorization-deny',
  SignAllowWalletTx = 'sign-allow-wallet-tx',
  SignDeny = 'sign-deny',
  SignWalletTransaction = 'sign-wallet-transaction',
  SendTransaction = 'send-transaction',
  PostTransactions = 'post-txns',
  Algod = 'algod',
  Indexer = 'indexer',
  Accounts = 'accounts',

  // UI methods
  CreateWallet = 'create-wallet',
  DeleteWallet = 'delete-wallet',
  CreateAccount = 'create-account',
  SaveAccount = 'save-account',
  ImportAccount = 'import-account',
  DeleteAccount = 'delete-account',
  GetSession = 'get-session',
  Login = 'login',
  Logout = 'logout',
  ClearCache = 'clear-cache',
  AccountDetails = 'account-details',
  Transactions = 'transactions',
  AssetDetails = 'asset-details',
  AssetsAPIList = 'assets-api-list',
  AssetsVerifiedList = 'assets-verified-list',
  SignSendTransaction = 'sign-send-transaction',
  ChangeNetwork = 'change-network',
  SaveNetwork = 'save-network',
  CheckNetwork = 'check-network',
  DeleteNetwork = 'delete-network',
  GetNetworks = 'get-networks',
  GetContacts = 'get-contacts',
  SaveContact = 'save-contact',
  DeleteContact = 'delete-contact',
  GetAliasedAddresses = 'get-aliased-addresses',
  GetNamespaceConfigs = 'get-namespace-configs',
  ToggleNamespaceConfig = 'toggle-namespace-config',
  GetGovernanceAddresses = 'get-governance-addresses',
  GetEnableAccounts = 'get-enable-accounts',

  // Ledger Device Methods
  LedgerSaveAccount = 'ledger-save-account',
  LedgerLinkAddress = 'ledger-link-address',
  LedgerGetSessionTxn = 'ledger-get-session-txn',
  LedgerSendTxnResponse = 'ledger-send-txn-response',
  LedgerSignTransaction = 'ledger-sign-transaction',
}

export type JsonPayload = {
  [key: string]: string | number | boolean | Array<any> | JsonPayload | undefined;
};

export type JsonRpcBody = {
  readonly jsonrpc: string;
  readonly method: JsonRpcMethod;
  readonly params: JsonPayload;
  readonly id: string;
};

export enum MessageSource {
  Extension = 'extension',
  DApp = 'dapp',
  Router = 'router',
  UI = 'ui',
}

export type MessageBody = {
  readonly source: MessageSource;
  readonly body: JsonRpcBody;
};

export type JsonRpcResponse = string;
