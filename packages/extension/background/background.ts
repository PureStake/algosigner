class Background {

    events: {[key: string]: any} = {};
    static get PortName(): string {return "background"}
    // port: chrome.runtime.Port;

    constructor() {
        let ctx = this;
        // this.port = chrome.tabs.connect(active_tab,{name: Background.PortName});

        chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
            if(port.name == 'content') {
                ctx.listenPort(port);
            }
        });
        chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
            let eventId = request.id;
            ctx.events[eventId] = sendResponse;
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                var tab_id = tabs[0].id || 0;
                chrome.tabs.sendMessage(tab_id,{'id':eventId,'source':'extension','body':request });
            });
            return true; // required. This tells Chrome that this response will be resolved asynchronously.
        });
    }
    listenPort(port: chrome.runtime.Port) {
        let ctx = this;
        port.onMessage.addListener((d) => {
            console.log("-BACKGROUND");
            console.log(JSON.stringify(d));
            if("source" in d) {
                switch(d.source) {
                    case 'dapp':
                        console.log("-->dapp");
                        
                        // This is a dApp request through the content port. 
                        // TODO: Do further processing, api request etc.. and respond through the port.
                        let resp = {
                            'eventId': d.body.id,
                            'body': "[Background] dApp requested something with jsonrpc method: " + d.body.method
                        };
                        port.postMessage(resp);
                        break;
                    case 'router':
                        console.log("-->router");

                        console.log(JSON.stringify(d));
                        // This is a Popup request coming back from the content port.
                        // TODO: this should lead to resolve the Popup promise
                        let eventId = d.id;
                        ctx.events[eventId]();
                        delete ctx.events[eventId];
                        break;
                }
            }
        });
    }
    // foo(){
    //     let ctx = this;
    //     chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
    //         let eventId = request.id;
    //         ctx.events[eventId] = sendResponse;
    //         ctx.port.postMessage({'id':eventId,'source':'extension','body':request});
    //         return true; // required. This tells Chrome that this response will be resolved asynchronously.
    //     });
    // }
    // listenPopup(port: chrome.runtime.Port) {
    //     chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
    //         port.postMessage({
    //             method: "sign-txn-and-return", 
    //             data: "[Private] Extension controller requested something."
    //         });
    //     });
    // }
}

new Background();