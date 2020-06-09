import {RequestErrors,Transaction} from '@algosigner/common/types';
import {JsonPayload,SupportedAlgod} from '@algosigner/common/messaging/types';

export interface ITask {
    sign(p: Transaction, e: RequestErrors): Promise<JsonPayload>;
    query(m: SupportedAlgod, p: JsonPayload, e: RequestErrors): Promise<JsonPayload>;
}