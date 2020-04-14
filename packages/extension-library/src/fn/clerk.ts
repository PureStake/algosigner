import {IClerk} from './interfaces';
import {Runtime} from '../runtime/runtime';
import {JsonRpc} from '../rpc/jsonrpc'
import {Transaction,RequestErrors} from './types';
import {JsonRpcMethod,JsonRpcResponse} from '../rpc/types';

export class Clerk extends Runtime implements IClerk {
    static get sendReqArgs(): Array<string> {
        return ['amount','from','to']
    }
    send(params: Transaction, error: RequestErrors = RequestErrors.None): Promise<JsonRpcResponse> {
        if(!super.requiredArgs(Clerk.sendReqArgs,Object.keys(params))){
            error = RequestErrors.InvalidTransactionParams;
        }
        return JsonRpc.request(
            JsonRpcMethod.SignTransaction, 
            Object.values(params),
            error
        );
    }
}