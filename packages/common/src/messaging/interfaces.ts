import {
  JsonRpcResponse,
  JSONRPC_VERSION,
  JsonRpcMethod,
  JsonPayload,
  JsonRpcBody,
} from './types';

export interface IJsonRpc {
  request(p: JsonPayload): Promise<JsonRpcResponse>;
}
