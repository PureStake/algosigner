import {IJsonRpc} from './interfaces'
import {RequestErrors} from '../types';
import {
    JsonRpcResponse,JSONRPC_VERSION, JsonRpcMethod, JsonRpcParams, JsonRpcBody
} from './types';

// In TS, you cannot define static properties on interfaces
// More in https://stackoverflow.com/questions/13955157/how-to-define-static-property-in-typescript-interface

export class JsonRpc /*implements IJsonRpc*/ {
    static getBody(
        method: JsonRpcMethod, 
        params: JsonRpcParams
    ): JsonRpcBody {
        return {
            jsonrpc: JSONRPC_VERSION,
            method: method,
            params: params,
            id: (+new Date).toString(16)
        }
    }
}