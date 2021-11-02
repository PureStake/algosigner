import { RequestError, Transaction, MultisigTransaction } from '@algosigner/common/types';
import { JsonPayload } from '@algosigner/common/messaging/types';

/* eslint-disable no-unused-vars */
export interface ITask {
  sign(p: Transaction, e: RequestError): Promise<JsonPayload>;
  signMultisig(p: MultisigTransaction, e: RequestError): Promise<JsonPayload>;
}
