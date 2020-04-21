import {Authorization} from './messaging/authorization';
import {MessageApi} from './messaging/api';

import {RequestErrors} from '@algosigner/common/types';
import {JsonRpcMethod,MessageSource} from '@algosigner/common/messaging/types';

class Background {
    
    events: {[key: string]: any} = {};

    constructor() {

        let ctx = this;
        chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
            let ctx = this;
            let source: MessageSource = request.source;
            let origin = request.origin;
            let body = request.body;
            switch(source) {
                case MessageSource.DApp:
                    if(body.method in Authorization.methods().public) {
                        Authorization.methods().public[body.method](request);
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
                case MessageSource.Extension:
                    if(body.method in Authorization.methods().private) {
                        Authorization.methods().private[body.method](request);
                    } else {
                        ctx.events[request.body.id] = sendResponse;
                        MessageApi.send(request);
                        return true; // required. This tells Chrome that this response will be resolved asynchronously.
                    }
                    break;
                case MessageSource.Router:
                    if(Authorization.isAuthorized(origin) && body.id in ctx.events){
                        ctx.events[body.id]();
                        delete ctx.events[body.id];
                    }
                    break;
            }
        });
    }
}

new Background();