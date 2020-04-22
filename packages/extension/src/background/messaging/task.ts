import {MessageApi} from './api';

import {RequestErrors} from '@algosigner/common/types';
import {JsonRpcMethod} from '@algosigner/common/messaging/types';

export class Task {

    static request: {[key: string]: any} = {};
    static authorized_pool: Array<string> = [];

    public static isAuthorized(origin: string): boolean {
        if(Task.authorized_pool.indexOf(origin) > -1 ){
            return true;
        }
        return false;
    }

    public static build(request: any) {
        let body = request.body;
        let method = body.method;
        return new Promise((resolve,reject) => {
            Task.methods().public[method](
                request,
                resolve,
                reject
            );
        });
    }

    public static methods(): {
        [key: string]: {
            [JsonRpcMethod: string]: Function
        }
    } {
        return {
            'public': {
                // authorization
                [JsonRpcMethod.Authorization]: (d: any) => {
                    if(Task.isAuthorized(d.origin)){
                        MessageApi.send(d);
                    } else {
                        chrome.windows.create({
                            url: chrome.runtime.getURL("authorization.html"),
                            type: "popup",
                            focused: true,
                            width:480,
                            height:640
                        }, function (w) {
                            if(w) {
                                Task.request = {
                                    window_id: w.id,
                                    message:d
                                };
                                setTimeout(function(){
                                    chrome.runtime.sendMessage(d);
                                },100);
                            }
                        });
                    }
                },
                // sign-transaction
                [JsonRpcMethod.SignTransaction]: (
                    request: any,
                    resolve: Function, reject: Function
                ) => {
                    // TODO further processing..
                    resolve(request);
                }
            },
            'private': {
                // authorization-allow
                [JsonRpcMethod.AuthorizationAllow]: () => {
                    let auth = Task.request;
                    let message = auth.message;

                    chrome.windows.remove(auth.window_id);
                    Task.authorized_pool.push(auth.message.body.params[0]);
                    Task.request = {};

                    setTimeout(() => {
                        MessageApi.send(message);
                    },1000);
                },
                // authorization-deny
                [JsonRpcMethod.AuthorizationDeny]: () => {
                    let auth = Task.request;
                    let message = auth.message;

                    auth.message.error = RequestErrors.NotAuthorized;
                    chrome.windows.remove(auth.window_id);
                    Task.request = {};

                    setTimeout(() => {
                        MessageApi.send(message);
                    },1000);
                }
            }
        }
    }
}