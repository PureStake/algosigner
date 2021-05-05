import { JSONRPC_VERSION, JsonRpcMethod, JsonPayload, JsonRpcBody } from './types';

// In TS, you cannot define static properties on interfaces
// More in https://stackoverflow.com/questions/13955157/how-to-define-static-property-in-typescript-interface

export class JsonRpc /*implements IJsonRpc*/ {
  static getBody(method: JsonRpcMethod, params: JsonPayload): JsonRpcBody {
    return {
      jsonrpc: JSONRPC_VERSION,
      method: method,
      params: params,
      id: 'xxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
        return ((Math.random() * 16) | 0).toString(16);
      }),
    };
  }
}
