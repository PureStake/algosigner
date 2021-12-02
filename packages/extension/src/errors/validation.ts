import { RequestError } from '@algosigner/common/types';

export class InvalidTransactionStructure extends RequestError {
  constructor(data?: any) {
    super(
      'Validation failed for transaction due to invalid structure.',
      4300,
      'InvalidTransactionStructure',
      data
    );
    Error.captureStackTrace(this, InvalidTransactionStructure);
  }
}

export class InvalidFields extends RequestError {
  constructor(data?: any) {
    super(
      'Validation failed for transaction due to invalid properties.',
      4300,
      'InvalidFields',
      data
    );
    Error.captureStackTrace(this, InvalidFields);
  }
}
