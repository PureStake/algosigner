export class RequestError {
  // Maximum amount of transactions supported on a single group
  static MAX_GROUP_SIZE = 16;

  message: string;
  code: number;
  name: string;
  data?: any;

  static None = new RequestError('', 0);
  static Undefined = new RequestError('An undefined error occurred.', 4000);
  static UserRejected = new RequestError(
    'The extension user does not authorize the request.',
    4001
  );
  static SiteNotAuthorizedByUser = new RequestError(
    'The extension user has not authorized requests from this website.',
    4100
  );
  static NoMnemonicAvailable = (address: string): RequestError =>
    new RequestError(
      `The user does not possess the required private key to sign with for address: "${address}".`,
      4100
    );
  static NoAccountMatch = (address: string, ledger: string): RequestError =>
    new RequestError(
      `No matching account found on AlgoSigner for address "${address}" on network ${ledger}.`,
      4100
    );
  static UnsupportedLedger = new RequestError('The provided ledger is not supported.', 4200);
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
  static InvalidSignTxnsFormat = new RequestError(
    'Please provide an array of either valid transaction objects or nested arrays of valid transaction objects.',
    4300
  );
  static InvalidPostTxnsFormat = new RequestError(
    'Please provide either an array of signed transactions or an array of groups of signed transactions.',
    4300
  );
  static PostValidationFailed = (reason: any): RequestError =>
    new RequestError(
      // @TODO: reword second sentence
      "There was a problem validating the transaction(s). The reasons are provided inside the 'data' property.",
      4300,
      reason
    );
  static CantMatchMsigSigners = (info: string): RequestError =>
    new RequestError(
      `AlgoSigner does not currently possess one of the requested signers for this multisig transaction: ${info}.`,
      4300
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
    'The provided group ID does not match the provided transactions. This usually means the transaction group is incomplete or presented in a different order than when it was created.',
    4300
  );
  static MultipleTxsRequireGroup = new RequestError(
    'If signing multiple transactions, they need to belong to a same group.',
    4300
  );
  static MismatchingGroup = new RequestError(
    'All transactions provided in a same group need to have matching group IDs.',
    4300
  );
  static NoDifferentLedgers = new RequestError(
    'All transactions need to belong to the same ledger.',
    4300
  );
  static PartiallySuccessfulPost = (successTxnIDs: string[], data: any): PostError =>
    new PostError(
      successTxnIDs,
      "Some of the groups of transactions were unable to be posted. The reason for each unsuccessful group is in it's corresponding position inside the 'data' array.",
      4400,
      data
    );
  static PostConfirmationFailed = new RequestError(
    'The transaction(s) were succesfully sent to the network, but there was an issue while waiting for confirmation. Please verify that they were commited to the network before trying again.',
    4400
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

class PostError extends RequestError {
  successTxnIDs: string[];

  public constructor(successTxnIDs: string[], message: string, code: number, data?: any) {
    super(message, code, data);
    this.successTxnIDs = successTxnIDs;
  }
}
