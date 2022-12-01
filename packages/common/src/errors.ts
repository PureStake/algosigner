export class RequestError {
  // Maximum amount of transactions supported on a single group
  static MAX_GROUP_SIZE = 16;

  message: string;
  code: number;
  name: string;
  data?: any;

  static None = new RequestError('', 0);
  static Undefined = new RequestError(
    'An undefined error occurred.',
    4000
  );
  static UserRejected = new RequestError(
    'The extension user does not authorize the request.',
    4001
  );
  static EnableRejected = (data: object): RequestError => new RequestError(
    'The extension user does not authorize the request.',
    4001,
    data
  );
  static SiteNotAuthorizedByUser = new RequestError(
    'The extension user has not authorized requests from this website.',
    4100
  );
  static NoMnemonicAvailable = (address: string): RequestError => new RequestError(
    `The user does not possess the required private key to sign with for address: "${address}".`,
    4100
  );
  static NoAccountMatch = (address: string, ledger: string): RequestError =>
    new RequestError(
      `No matching account found on AlgoSigner for address "${address}" on network ${ledger}.`,
      4100
    );
  static UnsupportedLedger = new RequestError(
    'The provided ledger is not supported.',
    4200
  );
  static PendingTransaction = new RequestError('Another query processing', 4201);
  static LedgerMultipleTransactions = new RequestError(
    'Ledger hardware device signing is only available for one transaction at a time.',
    4201
  );
  static TooManyTransactions = new RequestError(
    `AlgoSigner does not support signing more than ${RequestError.MAX_GROUP_SIZE} transactions at a time.`,
    4201
  );
  static AlgoSignerNotInitialized = new RequestError(
    'AlgoSigner was not initialized properly beforehand.',
    4202
  );
  static InvalidFields = (data?: any): RequestError =>
    new RequestError('Validation failed for transaction due to invalid properties.', 4300, data);
  static InvalidTransactionStructure = (data?: any): RequestError =>
    new RequestError('Validation failed for transaction due to invalid structure.', 4300, data);
  static InvalidFormat = new RequestError(
    '[RequestError.InvalidFormat] Please provide an array of either valid transaction objects or nested arrays of valid transaction objects.',
    4300
  );
  static CantMatchMsigSigners = (info: string): RequestError =>
    new RequestError(
      `AlgoSigner does not currently possess one of the requested signers for this multisig transaction: ${info}.`,
      4300,
    );
  static InvalidSignerAddress = (address: string): RequestError =>
    new RequestError(`Signers array contains the invalid address "${address}"`, 4300);
  static MsigSignersMismatch = new RequestError(
    "The 'signers' array contains addresses that aren't subaccounts of the requested multisig account.",
    4300
  );
  static NoMsigSingleSigner = new RequestError(
    "When a single-address 'signers' is provided with no 'msig' alongside it, it must match either the transaction sender or (if provided) the 'authAddr'",
    4300
  );
  static NoMsigMultipleSigners = new RequestError(
    "Multiple (1+) 'signers' should only be used alongside 'msig' transactions to specify which subaccounts to sign with.",
    4300
  );
  static InvalidSignedTxn = new RequestError(
    "The signed transaction provided ('{ stxn:... }') could not be parsed.",
    4300
  );
  static NonMatchingSignedTxn = new RequestError(
    "The signed transaction provided ('{ stxn:... }') doesn't match the corresponding unsigned transaction ('{ txn:... }').",
    4300
  );
  static SignedTxnWithSigners = new RequestError(
    "A signed transaction ('{ stxn:... }') must only be provided for reference transactions ('{ signers: [] }').",
    4300
  );
  static NoTxsToSign = new RequestError(
    "There are no transactions to sign as the provided ones are for reference-only ('{ signers: [] }').",
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
  static InvalidMsigValues = (reason: string): RequestError =>
    new RequestError(`The provided multisig data has invalid values: ${reason}.`, 4300);
  static InvalidMsigAddress = (address: string): RequestError =>
    new RequestError(`The address '${address}' is invalid.`, 4300);
  static MsigAuthAddrMismatch = new RequestError(
    "The provided 'authAddr' doesn't match the requested multisig account.",
    4300
  );
  static InvalidAuthAddress = (address: string): RequestError =>
    new RequestError(`'authAddr' contains the invalid address "${address}"`, 4300);
  static IncompleteOrDisorderedGroup = new RequestError(
    'The transaction group is incomplete or presented in a different order than when it was created.',
    4300
  );
  static MultipleTxsRequireGroup = new RequestError(
    'If signing multiple transactions, they need to belong to a same group.',
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
  static SigningError = (code: number, data?: any): RequestError =>
    new RequestError('There was a problem signing the transaction(s).', code, data);

  protected constructor(message: string, code: number, data?: any) {
    this.name = 'AlgoSignerRequestError';
    this.message = message;
    this.code = code;
    this.data = data;

    Error.captureStackTrace(this, RequestError);
  }
}
