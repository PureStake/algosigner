export class NoDifferentLedgers extends Error {
  constructor(message?: any) {
    message ? super(message) : super('All transactions need to belong to the same ledger.');
    this.name = 'NoDifferentLedgers';
    Error.captureStackTrace(this, NoDifferentLedgers);
  }
}
