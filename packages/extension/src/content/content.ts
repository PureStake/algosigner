const allowed_public_methods = ['get-account-keys'];
const BUNDLE = 'AlgoSigner.min.js';

class Content {

    events: {[key: string]: any} = {};

    constructor() {
        this.inject();
        this.messageChannelListener();
        this.chromeRuntimeListener();
    }

    inject() {
        let url = chrome.runtime.getURL(BUNDLE);
        const el = document.createElement('script');
        el.setAttribute('type', 'text/javascript');
        el.setAttribute('src', url);
        (document.head||document.documentElement).appendChild(el);
    }

    messageChannelListener() {
        let ctx = this;
        window.addEventListener("message",(ev) => {
            var d = ev.data;
            if("source" in d){
                if(d.source == "dapp") {
                    let eventId: string = d.body.id;
                    ctx.events[eventId] = ev;
                }
                if(d.source == "dapp" || d.source == "router") {
                    chrome.runtime.sendMessage(d); // {source, body}
                }
            }
        });
    }

    chromeRuntimeListener() {
        let ctx = this;
        chrome.runtime.onMessage.addListener((d) => {
            let body = d.body;
            if(body.id in ctx.events) {
                ctx.events[body.id].ports[0].postMessage(d);
                delete ctx.events[body.id];
            } else {
                window.postMessage(d, window.location.origin);
            }
        });
    }
}

new Content();