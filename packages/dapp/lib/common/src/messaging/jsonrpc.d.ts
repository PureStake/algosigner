import { JsonRpcMethod, JsonPayload, JsonRpcBody } from './types';
export declare class JsonRpc {
    static getBody(method: JsonRpcMethod, params: JsonPayload): JsonRpcBody;
}
