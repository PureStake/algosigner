import {OnMessageListener} from './types'; 
import {JsonRpcBody,MessageBody,MessageSource} from '@algosigner/common/messaging/types';

export class MessageApi {
    mc: MessageChannel;
    constructor() {
        this.mc = new MessageChannel();
    }

    listen(handler: OnMessageListener) {
        this.mc.port1.onmessage = handler;
    }

    send(body: JsonRpcBody, source: MessageSource = MessageSource.DApp) {
        let msg: MessageBody = {
            source: source,
            body: body
        }
        window.postMessage(msg, window.location.origin, [this.mc.port2]);
    }
}