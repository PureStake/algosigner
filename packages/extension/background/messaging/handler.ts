import {MessageApi} from './api';
import {Authorization} from './authorization';

import {RequestErrors} from '@algosigner/common/types';
import {JsonRpcMethod,MessageSource} from '@algosigner/common/messaging/types';

export class OnMessageHandler {
    static events: {[key: string]: any} = {};
    static handle(request: any,sender: any,sendResponse: any) {

        let source: MessageSource = request.source;
        let origin = request.origin;
        let body = request.body;
        let method = body.method;
        let id = body.id;

        switch(source) {
            // Requests from dapp to extension
            case MessageSource.DApp:
                if(method in Authorization.methods().public) {
                    Authorization.methods().public[method](request);
                } else {
                    if(Authorization.isAuthorized(origin)){
                        // TODO: Do further processing, api request etc.. and respond
                        MessageApi.send(request);
                    } else {
                        request.error = RequestErrors.NotAuthorized;
                        MessageApi.send(request);
                    }
                }
                break;
            // Requests from extension to dapp
            case MessageSource.Extension:
                if(method in Authorization.methods().private) {
                    Authorization.methods().private[method](request);
                } else {
                    OnMessageHandler.events[id] = sendResponse;
                    MessageApi.send(request);
                    // Tell Chrome that this response will be resolved asynchronously.
                    return true;
                }
                break;
            // A response for a extension to dapp request
            case MessageSource.Router:
                if(Authorization.isAuthorized(origin) && id in OnMessageHandler.events){
                    OnMessageHandler.events[id]();
                    setTimeout(function(){
                        delete OnMessageHandler.events[id];
                    },1000);
                }
                break;
        }
    }
}