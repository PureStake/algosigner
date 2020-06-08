import { RequestErrors } from '@algosigner/common/types';
import { JsonRpcMethod, JsonPayload } from '@algosigner/common/messaging/types';
export declare class MessageBuilder {
    static promise(method: JsonRpcMethod, params: JsonPayload, error?: RequestErrors): Promise<JsonPayload>;
}
