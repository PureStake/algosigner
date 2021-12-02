import { RequestError } from '@algosigner/common/types';

export class InvalidStructure extends RequestError {
  constructor() {
    super(
      "The provided transaction object doesn't adhere to the correct structure.",
      4300,
      'InvalidStructure'
    );
    Error.captureStackTrace(this, InvalidStructure);
  }
}

export class InvalidMsigStructure extends RequestError {
  constructor() {
    super(
      "The provided multisig data doesn't adhere to the correct structure.",
      4300,
      'InvalidMsigStructure'
    );
    Error.captureStackTrace(this, InvalidMsigStructure);
  }
}

export class NoDifferentLedgers extends RequestError {
  constructor() {
    super('All transactions need to belong to the same ledger.', 4300, 'NoDifferentLedgers');
    Error.captureStackTrace(this, NoDifferentLedgers);
  }
}

export class MultipleTxsRequireGroup extends RequestError {
  constructor() {
    super(
      'If signing multiple transactions, they need to belong to a same group.',
      4200,
      'MultipleTxsRequireGroup'
    );
    Error.captureStackTrace(this, MultipleTxsRequireGroup);
  }
}

export class NonMatchingGroup extends RequestError {
  constructor() {
    super('All transactions need to belong to the same group.', 4300, 'NonMatchingGroup');
    Error.captureStackTrace(this, NonMatchingGroup);
  }
}

export class IncompleteOrDisorderedGroup extends RequestError {
  constructor() {
    super(
      'The transaction group is incomplete or presented in a different order than when it was created.',
      4300,
      'IncompleteOrDisorderedGroup'
    );
    Error.captureStackTrace(this, IncompleteOrDisorderedGroup);
  }
}

export class InvalidSigners extends RequestError {
  constructor() {
    super(
      'Signers array should only be provided for multisigs (at least one signer) or for reference-only transactions belonging to a group (empty array).',
      4300,
      'InvalidSigners'
    );
    Error.captureStackTrace(this, InvalidSigners);
  }
}

export class TooManyTransactions extends RequestError {
  // Maximum amount of transactions supported on a single group
  static MAX_GROUP_SIZE = 16;
  constructor() {
    super(
      `The ledger does not support signing more than ${TooManyTransactions.MAX_GROUP_SIZE} transactions at a time.`,
      4201,
      'TooManyTransactions'
    );
    Error.captureStackTrace(this, TooManyTransactions);
  }
}

export class LedgerMultipleTransactions extends RequestError {
  constructor() {
    super(
      'Ledger hardware device signing not available for multiple transactions.',
      4201,
      'LedgerMultipleTransactions'
    );
    Error.captureStackTrace(this, LedgerMultipleTransactions);
  }
}

export class SigningError extends RequestError {
  constructor(code: number, data?: any) {
    super(
      'There was a problem signing the transaction(s).',
      code,
      'SigningError',
      data
    );
    Error.captureStackTrace(this, SigningError);
  }
}