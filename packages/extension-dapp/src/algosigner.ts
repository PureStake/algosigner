import {Clerk} from './fn/clerk';
import {Router} from './fn/router';

import {MessageBuilder} from './messaging/builder'; 
import {JsonRpcMethod,JsonRpcResponse} from '@algosigner/common/messaging/types';

// should AlgoSigner be a singleton?
export class AlgoSigner {
    clerk = new Clerk();
    send = this.clerk.send;
    router = new Router();
    connect(): Promise<JsonRpcResponse> {
        return MessageBuilder.promise(
            JsonRpcMethod.Authorization, 
            [window.location.origin]
        );
    }
}