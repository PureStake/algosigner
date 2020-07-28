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

    accounts(
        params: JsonPayload,
        error: RequestErrors = RequestErrors.None
    ): Promise<JsonPayload>{
        return MessageBuilder.promise(
            JsonRpcMethod.Accounts, 
            params as JsonPayload,
            error
        );
    }

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

    send(
        params: Transaction, 
        error: RequestErrors = RequestErrors.None
    ): Promise<JsonPayload> {
        return MessageBuilder.promise(
            JsonRpcMethod.SendTransaction, 
            params,
            error
        );
    }

    algod(
        params: JsonPayload,
        error: RequestErrors = RequestErrors.None
    ): Promise<JsonPayload>{
        return MessageBuilder.promise(
            JsonRpcMethod.Algod, 
            params,
            error
        );
    }

    indexer(
        params: JsonPayload,
        error: RequestErrors = RequestErrors.None
    ): Promise<JsonPayload>{
        return MessageBuilder.promise(
            JsonRpcMethod.Indexer, 
            params,
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