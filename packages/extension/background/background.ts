class Background {
    constructor() {
        let ctx = this;
        chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
            ctx.listenPort(port);
            ctx.listenPopup(port);
        });
    }
    listenPort(port: chrome.runtime.Port) {
        port.onMessage.addListener((message) => {
            let resp = {
                'eventId': message.data.id,
                'body': "[Background] dApp requested something with jsonrpc method: " + message.data.method
            };
            port.postMessage(resp);
        });
    }
    listenPopup(port: chrome.runtime.Port) {
        chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
            port.postMessage({
                method: "sign-txn-and-return", 
                data: "[Private] Extension controller requested something."
            });
        });
    }
}

new Background();