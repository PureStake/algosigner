import { OnMessageListener } from './types';
import { JsonRpcBody, MessageSource } from '@algosigner/common/messaging/types';
export declare class MessageApi {
    mc: MessageChannel;
    constructor();
    listen(handler: OnMessageListener): void;
    send(body: JsonRpcBody, source?: MessageSource): void;
}
