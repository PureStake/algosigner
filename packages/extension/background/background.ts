// TODO: this is hardcoded, should use @algosigner/common/types.RequestErrors
enum RequestErrors {
    None,
    NotAuthorized = '[RequestErrors.NotAuthorized] The extension user does not authorize the request.',
    InvalidTransactionParams = '[RequestErrors.InvalidTransactionParams] Invalid transaction parameters.'
}

class Messaging {
    public static send(d: any,active_tab: boolean = true) {
        if(active_tab) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                var tab_id = tabs[0].id || 0;
                chrome.tabs.sendMessage(tab_id,d);
            });
        } else {
            // TODO all tabs?
        }
    }
}

class Authorization {

    static request: {[key: string]: any} = {};
    static pool: Array<string> = [];

    public static isAuthorized(origin: string): boolean {
        if(Authorization.pool.indexOf(origin) > -1 ){
            return true;
        }
        return false;
    }
    public static methods(): {[key: string]: Function} {
        return {
            "authorization": (d: any) => {
                if(Authorization.isAuthorized(d.origin)){
                    // Do not need to re-authorized, resolve right away
                    Messaging.send(d);
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
            },
            "authorization-allow": () => {
                let auth = Authorization.request;
                let message = auth.message;

                chrome.windows.remove(auth.window_id);
                Authorization.pool.push(auth.message.body.params[0]);
                Authorization.request = {};

                setTimeout(() => {
                    Messaging.send(message);
                },1000);
            },
            "authorization-deny": () => {
                let auth = Authorization.request;
                let message = auth.message;

                auth.message.error = RequestErrors.NotAuthorized;
                chrome.windows.remove(auth.window_id);
                Authorization.request = {};

                setTimeout(() => {
                    Messaging.send(message);
                },1000);
            }
        }
    }
}

class Background {
    
    events: {[key: string]: any} = {};
    static get PortName(): string {return "background"}

    constructor() {

        let ctx = this;
        chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
            let ctx = this;
            let source = request.source; // dapp, extension
            let origin = request.origin;
            let body = request.body;
            switch(source) {
                case 'dapp':
                    if(body.method in Authorization.methods()) {
                        Authorization.methods()[body.method](request);
                    } else {
                        // TODO: we need to find the current tab origin from here to cross-check that
                        // the provided origin was not injected (as the content-script can be modified).
                        if(Authorization.isAuthorized(origin)){
                            // TODO: Do further processing, api request etc.. and respond
                            Messaging.send(request);
                        } else {
                            request.error = RequestErrors.NotAuthorized;
                            Messaging.send(request);
                        }
                    }
                    break;
                case 'extension':
                    if(body.method in Authorization.methods()) {
                        Authorization.methods()[body.method](request);
                    } else {
                        ctx.events[request.body.id] = sendResponse;
                        Messaging.send(request);
                        return true; // required. This tells Chrome that this response will be resolved asynchronously.
                    }
                    break;
                case 'router':
                    if(body.method in Authorization.methods()) {
                        Authorization.methods()[body.method](request);
                    } else {
                        let eventId = body.id;
                        ctx.events[eventId]();
                        delete ctx.events[eventId];
                    }
                    break;
            }
        });
    }
}

new Background();