import { RequestErrors, Transaction } from '@algosigner/common/types';
import { JsonPayload } from '@algosigner/common/messaging/types';

export interface ITask {
    sign(p: Transaction, e: RequestErrors): Promise<JsonPayload>;
}