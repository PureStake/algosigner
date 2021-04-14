export class NoAccountMatch extends Error {
  constructor(message?: any) {
    message ? super(message) : super('No matching address(es) found on AlgoSigner.');
    this.name = 'NoAccountMatch';
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
