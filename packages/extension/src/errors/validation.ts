export class InvalidTransactionStructure extends Error {
  constructor(message?: any) {
    message ? super(message) : super();
    this.name = 'InvalidTransactionStructure';
    Error.captureStackTrace(this, InvalidTransactionStructure);
  }
}
