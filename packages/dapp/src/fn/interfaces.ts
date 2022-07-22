import { WalletTransaction } from '@algosigner/common/types';
import { RequestError } from '@algosigner/common/errors';
import { JsonPayload } from '@algosigner/common/messaging/types';

/* eslint-disable no-unused-vars */
export interface ITask {
  signTxn(
    transactionsOrGroups: Array<WalletTransaction>,
    error: RequestError
  ): Promise<JsonPayload>;
}
