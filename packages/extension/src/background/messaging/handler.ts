import {MessageApi} from './api';
import {Task} from './task';

import {RequestErrors} from '@algosigner/common/types';
import {JsonRpcMethod,MessageSource} from '@algosigner/common/messaging/types';

const auth_methods = [
    JsonRpcMethod.Authorization,
    JsonRpcMethod.AuthorizationAllow,
    JsonRpcMethod.AuthorizationDeny
];

class RequestValidation {
    public static isAuthorization(method: JsonRpcMethod) {
        if(auth_methods.indexOf(method) > -1)
            return true;
        return false;
    }
    public static isPublic(method: JsonRpcMethod) {
        if(method in Task.methods().public)
            return true;
        return false;
    }
}

export class OnMessageHandler extends RequestValidation {
    static events: {[key: string]: any} = {};
    static handle(request: any,sender: any,sendResponse: any) {
        
        try {
            request.origin = new URL(sender.url).origin;
        } catch(e) {
            request.error = RequestErrors.NotAuthorized;
            MessageApi.send(request);
            return;
        }

        const source: MessageSource = request.source;
        const body = request.body;
        const method = body.method;
        const id = body.id;

        switch(source) {
            // Message from dapp to extension
            case MessageSource.DApp:
                if(OnMessageHandler.isAuthorization(method) 
                    && OnMessageHandler.isPublic(method)) {
                    // Is a public authorization message, dapp is asking to connect
                    Task.methods().public[method](request);
                } else {
                    // Other requests from dapp fall here
                    if(Task.isAuthorized(request.origin)){
                        // If the origin is authorized, build a promise
                        Task.build(request)
                        .then(function(d){
                            MessageApi.send(d);
                        })
                        .catch(function(e){
                            request.error = e;
                            MessageApi.send(request);
                        });
                    } else {
                        // Origin is not authorized
                        request.error = RequestErrors.NotAuthorized;
                        MessageApi.send(request);
                    }
                }
                break;
            // Message from extension to dapp
            case MessageSource.Extension:
                if(OnMessageHandler.isAuthorization(method) 
                    && !OnMessageHandler.isPublic(method)) {
                    // Is a protected authorization message, allowing or denying auth
                    Task.methods().private[method](request);
                } else {
                    OnMessageHandler.events[id] = sendResponse;
                    MessageApi.send(request);
                    // Tell Chrome that this response will be resolved asynchronously.
                    return true;
                }
                break;
            // A response message for a extension to dapp request
            case MessageSource.Router:
                if(Task.isAuthorized(request.origin) && id in OnMessageHandler.events){
                    OnMessageHandler.events[id]();
                    setTimeout(function(){
                        delete OnMessageHandler.events[id];
                    },1000);
                }
                break;
        }
    }
}