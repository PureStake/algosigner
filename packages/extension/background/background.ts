// TODO: this is hardcoded, should use @algosigner/common/types.RequestErrors
enum RequestErrors {
    None,
    NotAuthorized = '[RequestErrors.NotAuthorized] The extension user does not authorize the request.',
    InvalidTransactionParams = '[RequestErrors.InvalidTransactionParams] Invalid transaction parameters.'
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
            "authorization": (
                d: any, 
                port: chrome.runtime.Port
            ) => {
                if(Authorization.isAuthorized(d.origin)){
                    // Do not need to re-authorized, resolve right away
                    port.postMessage(d);
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
                                port:port,
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
                auth.port.postMessage(auth.message);
                chrome.windows.remove(auth.window_id);
                Authorization.pool.push(auth.message.body.params[0]);
                Authorization.request = {};
            },
            "authorization-deny": () => {
                let auth = Authorization.request;
                auth.message.error = RequestErrors.NotAuthorized;
                auth.port.postMessage(auth.message);
                chrome.windows.remove(auth.window_id);
                Authorization.request = {};
            }
        }
    }
}

class Background {
    events: {[key: string]: any} = {};
    static get PortName(): string {return "background"}

    constructor() {
        let ctx = this;

        chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
            if(port.name == 'content') {
                ctx.listenPort(port);
            }
        });

        chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {

            if(request.body.method in Authorization.methods()) {
                Authorization.methods()[request.body.method]();
            } else {
                ctx.events[request.id] = sendResponse;
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    var tab_id = tabs[0].id || 0;
                    chrome.tabs.sendMessage(tab_id,{'source':'extension','body':request});
                });
                return true; // required. This tells Chrome that this response will be resolved asynchronously.
            }
        });
    }
    listenPort(port: chrome.runtime.Port) {
        let ctx = this;
        port.onMessage.addListener((d) => {
            switch(d.source) {
                case 'dapp':
                    if(d.body.method in Authorization.methods()) {
                        // This is an authorization request
                        Authorization.methods()[d.body.method](d,port);
                    } else {
                        // This is a dApp request through the content port. 
                        // TODO: we need to find the current tab origin from here to cross-check that
                        // the provided origin was not injected (as the content-script can be modified).
                        if(Authorization.isAuthorized(d.origin)){
                            // TODO: Do further processing, api request etc.. and respond through the port.
                            port.postMessage(d);
                        } else {
                            d.error = RequestErrors.NotAuthorized;
                            port.postMessage(d);
                        }
                    }
                    break;
                case 'router':
                    // This is a Popup request coming back from the content port.
                    // TODO: this should lead to resolve the Popup promise
                    let eventId = d.id;
                    ctx.events[eventId]();
                    delete ctx.events[eventId];
                    break;
            }
        });
    }
}

new Background();