const allowed_public_methods = ['get-account-keys'];
const BUNDLE = 'AlgoSigner.min.js';

class Content {

    events: {[key: string]: any} = {};
    static get PortName(): string {return "content"}
    port: chrome.runtime.Port = chrome.runtime.connect({name: Content.PortName});
    // enableListener: (this: Window, ev: MessageEvent) => any;

    constructor() {
        this.inject();
        this.listenDOM();
        this.listenPortReponses();
        this.listenPortRequests();
    }

    inject() {
        let url = chrome.runtime.getURL(BUNDLE);
        const el = document.createElement('script');
        el.setAttribute('type', 'text/javascript');
        el.setAttribute('src', url);
        (document.head||document.documentElement).appendChild(el);
    }

    // Listen to user events and forward them to the background
    listenDOM() {
        let ctx = this;
        window.addEventListener("message",(ev) => {
            var d = ev.data;
            if("source" in d){
                if(d.source == "dapp") {
                    let eventId: string = d.body.id;
                    ctx.events[eventId] = ev;
                }
                if(d.source == "dapp" || d.source == "router") {
                    d.origin = window.location.origin;
                    ctx.port.postMessage(d); // {origin, source, body}
                }
            }
        });
    }

    // Listen to responses from the background
    listenPortReponses() {
        let ctx = this;
        this.port.onMessage.addListener((d) => {
            if(d.body.id in ctx.events) {
                ctx.events[d.body.id].ports[0].postMessage(d);
                delete ctx.events[d.body.id];
            }
        });
    }
    // Listen to requests from the background
    listenPortRequests() {
        chrome.runtime.onMessage.addListener((d) => {
            window.postMessage(d, window.location.origin);
        });
    }
}

new Content();