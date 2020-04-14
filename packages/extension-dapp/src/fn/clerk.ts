import {IClerk} from './interfaces';

import {Transaction,RequestErrors} from '@algosigner/common/types';
import {Runtime} from '@algosigner/common/runtime/runtime';
import {JsonRpc} from '@algosigner/common/rpc/jsonrpc'
import {JsonRpcMethod,JsonRpcResponse} from '@algosigner/common/rpc/types';

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