import {RequestErrors} from '@algosigner/common/types';
import {JsonRpcMethod,JsonRpcResponse,JsonRpcParams} from '@algosigner/common/messaging/types';

import {JsonRpc} from '@algosigner/common/messaging/jsonrpc';

import {MessageApi} from './api'; 
import {OnMessageHandler} from './handler'; 

export class MessageBuilder {
    static promise(
        method: JsonRpcMethod,
        params: JsonRpcParams,
        error: RequestErrors = RequestErrors.None
    ): Promise<JsonRpcResponse> {

        return new Promise<JsonRpcResponse>((resolve,reject) => {
            if(error == RequestErrors.None) {
                let api = new MessageApi();
                api.listen(OnMessageHandler.promise(resolve,reject));
                api.send(JsonRpc.getBody(
                    method, 
                    Object.values(params)
                ));
            } else {
                reject(error);
            }
        });

    }
}