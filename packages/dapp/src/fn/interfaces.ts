import { RequestError, WalletTransaction } from '@algosigner/common/types';
import { JsonPayload } from '@algosigner/common/messaging/types';

/* eslint-disable no-unused-vars */
export interface ITask {
  signTxn(
    transactionsOrGroups: Array<WalletTransaction>,
    error: RequestError
  ): Promise<JsonPayload>;
}
