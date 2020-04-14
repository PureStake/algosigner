import {
    JsonRpcResponse,JSONRPC_VERSION, JsonRpcMethod, JsonRpcParams, JsonRpcBody
} from './types';

export interface IJsonRpc {
    request(p: JsonRpcParams): Promise<JsonRpcResponse>;
}