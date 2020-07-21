import { JsonRpcMethod } from '@algosigner/common/messaging/types';

export function sendMessage(method: JsonRpcMethod, params: any, callback: any) {
    chrome.runtime.sendMessage({
        source:'ui',
        body: {
            jsonrpc: '2.0',
            method: method,
            params: params,
            id: (+new Date).toString(16)
        }
    }, callback);
}
