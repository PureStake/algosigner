import {ITask} from './interfaces';

import {MessageBuilder} from '../messaging/builder'; 

import {AlgodRequest,Transaction,RequestErrors} from '@algosigner/common/types';
import {JsonRpcMethod,JsonPayload,SupportedAlgod} from '@algosigner/common/messaging/types';
import {Runtime} from '@algosigner/common/runtime/runtime';

export class Task extends Runtime implements ITask {

    static subscriptions: {[key: string]: Function} = {};

    static get inPayloadSign(): Array<string> {
        return ['amount','to']
    }

    connect(): Promise<JsonPayload> {
        return MessageBuilder.promise(
            JsonRpcMethod.Authorization, 
            {}
        );
    }

    accounts(){}

    // TODO needs json and raw payload support and complete argument support
    sign(
        params: Transaction, 
        error: RequestErrors = RequestErrors.None
    ): Promise<JsonPayload> {
        if(!super.requiredArgs(Task.inPayloadSign,Object.keys(params))){
            error = RequestErrors.InvalidTransactionParams;
        }
        return MessageBuilder.promise(
            JsonRpcMethod.SignTransaction, 
            params,
            error
        );
    }

    query(
        method: SupportedAlgod,
        params: JsonPayload,
        error: RequestErrors = RequestErrors.None
    ): Promise<JsonPayload>{

        let request: JsonPayload = {
            method: method,
            params: params
        };

        return MessageBuilder.promise(
            JsonRpcMethod.Algod, 
            request as JsonPayload,
            error
        );
    }

    subscribe(
        eventName: string,
        callback: Function
    ) {
        Task.subscriptions[eventName] = callback;
    }
}