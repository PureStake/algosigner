import { RequestError } from '@algosigner/common/types';

export class NoAccountMatch extends RequestError {
  constructor(address: string, ledger: string) {
    super(
      `No matching account found on AlgoSigner for address: "${address}" on network ${ledger}.`,
      4100,
      'NoAccountMatch'
    );
    Error.captureStackTrace(this, NoAccountMatch);
  }
}

export class MultisigNoMatch extends Error {
  constructor(message?: any) {
    message ? super(message) : super();
    this.name = 'NoMultisigMatch';
    Error.captureStackTrace(this, MultisigNoMatch);
  }
}

export class MultisigAlreadySigned extends Error {
  constructor(message?: any) {
    message ? super(message) : super();
    this.name = 'MultisigAlreadySigned';
    Error.captureStackTrace(this, MultisigAlreadySigned);
  }
}

export class MultisigInvalidMsig extends Error {
  constructor(message?: any) {
    message ? super(message) : super();
    this.name = 'MultisigInvalidMsig';
    Error.captureStackTrace(this, MultisigInvalidMsig);
  }
}

export class PendingTransaction extends RequestError {
  constructor() {
    super('Another query processing', 4200, 'PendingTransaction');
    Error.captureStackTrace(this, PendingTransaction);
  }
}

export class LedgerError extends RequestError {
  constructor(message?: any) {
    super(message ? message : 'Another query processing', 4000, 'LedgerError');
    Error.captureStackTrace(this, LedgerError);
  }
}
