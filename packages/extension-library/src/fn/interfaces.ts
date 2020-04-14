import {Transaction,RequestErrors} from './types';
import {JsonRpcResponse} from '../rpc/types';

export interface IClerk {
    send(t: Transaction, e: RequestErrors): Promise<JsonRpcResponse>;
}