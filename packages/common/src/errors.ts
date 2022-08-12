export class RequestError {
  // Maximum amount of transactions supported on a single group
  static MAX_GROUP_SIZE = 16;

  message: string;
  code: number;
  name: string;
  data?: any;

  static None = new RequestError('', 0);
  static Undefined = new RequestError(
    '[RequestError.Undefined] An undefined error occurred.',
    4000
  );
  static UserRejected = new RequestError(
    '[RequestError.UserRejected] The extension user does not authorize the request.',
    4001
  );
  static NotAuthorizedByUser = new RequestError(
    '[RequestError.NotAuthorized] The extension user does not authorize the request.',
    4100
  );
  static NoAccountMatch = (address: string, ledger: string): RequestError =>
    new RequestError(
      `No matching account found on AlgoSigner for address: "${address}" on network ${ledger}.`,
      4100
    );
  static UnsupportedAlgod = new RequestError(
    '[RequestError.UnsupportedAlgod] The provided method is not supported.',
    4200
  );
  static UnsupportedLedger = new RequestError(
    '[RequestError.UnsupportedLedger] The provided ledger is not supported.',
    4200
  );
  static NotAuthorizedOnChain = new RequestError(
    'The user does not possess the required private key to sign with this address.',
    4200
  );
  static MultipleTxsRequireGroup = new RequestError(
    'If signing multiple transactions, they need to belong to a same group.',
    4200
  );
  static PendingTransaction = new RequestError('Another query processing', 4201);
  static LedgerMultipleTransactions = new RequestError(
    'Ledger hardware device signing not available for multiple transactions.',
    4201
  );
  static TooManyTransactions = new RequestError(
    `The ledger does not support signing more than ${RequestError.MAX_GROUP_SIZE} transactions at a time.`,
    4201
  );
  static InvalidFields = (data?: any) =>
    new RequestError('Validation failed for transaction due to invalid properties.', 4300, data);
  static InvalidTransactionStructure = (data?: any) =>
    new RequestError('Validation failed for transaction due to invalid structure.', 4300, data);
  static InvalidFormat = new RequestError(
    '[RequestError.InvalidFormat] Please provide an array of either valid transaction objects or nested arrays of valid transaction objects.',
    4300
  );
  static InvalidSigners = new RequestError(
    'Signers array should only be provided for multisigs (at least one signer) or for reference-only transactions belonging to a group (empty array).',
    4300
  );
  static InvalidStructure = new RequestError(
    "The provided transaction object doesn't adhere to the correct structure.",
    4300
  );
  static InvalidMsigStructure = new RequestError(
    "The provided multisig data doesn't adhere to the correct structure.",
    4300
  );
  static IncompleteOrDisorderedGroup = new RequestError(
    'The transaction group is incomplete or presented in a different order than when it was created.',
    4300
  );
  static NonMatchingGroup = new RequestError(
    'All transactions need to belong to the same group.',
    4300
  );
  static NoDifferentLedgers = new RequestError(
    'All transactions need to belong to the same ledger.',
    4300
  );
  static SigningError = (code: number, data?: any) =>
    new RequestError('There was a problem signing the transaction(s).', code, data);

  protected constructor(message: string, code: number, data?: any) {
    this.name = 'AlgoSignerRequestError';
    this.message = message;
    this.code = code;
    this.data = data;

    Error.captureStackTrace(this, RequestError);
  }
}
