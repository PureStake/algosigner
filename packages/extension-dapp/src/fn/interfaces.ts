import {RequestErrors,Transaction} from '@algosigner/common/types';
import {JsonRpcResponse} from '@algosigner/common/rpc/types';

export interface IClerk {
    send(t: Transaction, e: RequestErrors): Promise<JsonRpcResponse>;
}