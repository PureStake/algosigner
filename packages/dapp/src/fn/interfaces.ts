import { RequestErrors, Transaction, MultisigTransaction } from '@algosigner/common/types';
import { JsonPayload } from '@algosigner/common/messaging/types';

export interface ITask {
    sign(p: Transaction, e: RequestErrors): Promise<JsonPayload>;
    signMultisig(p: MultisigTransaction, e: RequestErrors): Promise<JsonPayload>;
}