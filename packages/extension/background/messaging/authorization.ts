import {MessageApi} from './api';

import {RequestErrors} from '@algosigner/common/types';
import {JsonRpcMethod} from '@algosigner/common/messaging/types';

export class Authorization {

    static request: {[key: string]: any} = {};
    static pool: Array<string> = [];

    public static isAuthorized(origin: string): boolean {
        if(Authorization.pool.indexOf(origin) > -1 ){
            return true;
        }
        return false;
    }
    public static methods(): {
        [key: string]: {
            [JsonRpcMethod: string]: Function
        }
    } {
        return {
            'public': {
                [JsonRpcMethod.Authorization]: (d: any) => {
                    if(Authorization.isAuthorized(d.origin)){
                        // Do not need to re-authorized, resolve right away
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
                                Authorization.request = {
                                    window_id: w.id,
                                    message:d
                                };
                                setTimeout(function(){
                                    chrome.runtime.sendMessage(d);
                                },100);
                            }
                        });
                    }
                }
            },
            'private': {
                [JsonRpcMethod.AuthorizationAllow]: () => {
                    let auth = Authorization.request;
                    let message = auth.message;

                    chrome.windows.remove(auth.window_id);
                    Authorization.pool.push(auth.message.body.params[0]);
                    Authorization.request = {};

                    setTimeout(() => {
                        MessageApi.send(message);
                    },1000);
                },
                [JsonRpcMethod.AuthorizationDeny]: () => {
                    let auth = Authorization.request;
                    let message = auth.message;

                    auth.message.error = RequestErrors.NotAuthorized;
                    chrome.windows.remove(auth.window_id);
                    Authorization.request = {};

                    setTimeout(() => {
                        MessageApi.send(message);
                    },1000);
                }
            }
        }
    }
}