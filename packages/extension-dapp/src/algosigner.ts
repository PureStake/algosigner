import {Clerk} from './fn/clerk';
import {Router} from './fn/router';

import {MessageBuilder} from './messaging/builder'; 
import {JsonRpcMethod,JsonRpcResponse} from '@algosigner/common/messaging/types';

class Wrapper {
    private static instance: Wrapper;
    private clerk: Clerk = new Clerk();
    private router: Router = new Router();
    public send: Function = this.clerk.send;

    public static getInstance(): Wrapper {
        if (!Wrapper.instance) {
            Wrapper.instance = new Wrapper();
        }
        return Wrapper.instance;
    }

    connect(): Promise<JsonRpcResponse> {
        return MessageBuilder.promise(
            JsonRpcMethod.Authorization, 
            [window.location.origin]
        );
    }
}

export const AlgoSigner = Wrapper.getInstance();