import { JsonRpcResponse, JsonPayload } from './types';
export interface IJsonRpc {
    request(p: JsonPayload): Promise<JsonRpcResponse>;
}
