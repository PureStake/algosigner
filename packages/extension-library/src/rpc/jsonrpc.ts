import {IJsonRpc} from './interfaces'
import {RequestErrors} from '../fn/types';
import {
    JsonRpcResponse,JSONRPC_VERSION, JsonRpcMethod, JsonRpcParams, JsonRpcBody
} from './types';

// In TS, you cannot define static properties on interfaces
// More in https://stackoverflow.com/questions/13955157/how-to-define-static-property-in-typescript-interface

export class JsonRpc /*implements IJsonRpc*/ {
    static request(
        method: JsonRpcMethod, 
        params: JsonRpcParams, 
        error: RequestErrors = RequestErrors.None
    ): Promise<JsonRpcResponse> {

        let body: JsonRpcBody = {
            jsonrpc: JSONRPC_VERSION,
            method: method,
            params: params,
            id: (+new Date).toString(16)
            
        }
        return new Promise<JsonRpcResponse>((resolve,reject) => {
            if(error == RequestErrors.None) {
                let channel = new MessageChannel();
                channel.port1.onmessage = (event) => {
                    if (event.data.error) {
                        reject(event.data.error);
                    } else {
                        resolve(event.data);
                    }
                    channel.port1.close();
                    channel.port2.close();
                }
                window.postMessage(body, window.location.origin, [channel.port2]);
            } else {
                throw new Error(error);
            }
        });
    }
}