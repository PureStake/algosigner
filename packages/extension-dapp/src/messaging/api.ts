import {OnMessageListener} from './types'; 
import {JsonRpcBody} from '@algosigner/common/messaging/types';

export class MessageApi {
    mc: MessageChannel;
    constructor() {
        this.mc = new MessageChannel();
    }

    listen(handler: OnMessageListener) {
        this.mc.port1.onmessage = handler;
    }

    send(body: JsonRpcBody) {
        window.postMessage(body, window.location.origin, [this.mc.port2]);
    }
}