const allowed_public_methods = ['get-account-keys'];
const BUNDLE = 'AlgoSigner.min.js';

class Content {

    events: {[key: string]: any} = {};
    static get PortName(): string {return "content"}
    port: chrome.runtime.Port = chrome.runtime.connect({name: Content.PortName});

    constructor() {
        this.listenDOM();
        this.listenPortReponses();
        this.listenPortRequests();
        this.inject();
        let ctx = this;
        // chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
        //     if(port.name == 'background') {
        //         ctx.listenPortRequests(port);
        //     }
        // });
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
        window.addEventListener("message",(event) => {
            var d = event.data;
            console.log("-CONTENT");
            console.log(JSON.stringify(d));
            if("source" in d){
                if(d.source == "dapp") {
                    let eventId: string = d.body.id;
                    ctx.events[eventId] = event;
                }
                if(d.source == "dapp" || d.source == "router") {
                    ctx.port.postMessage(d);
                }
            }
        });
    }

    // Listen to responses from the background
    listenPortReponses() {
        let ctx = this;
        this.port.onMessage.addListener((message) => {
            if('eventId' in message && message.eventId in ctx.events) {
                ctx.events[message.eventId].ports[0].postMessage(message.body);
                delete ctx.events[message.eventId];
            }
        });
    }
    // Listen to requests from the background
    listenPortRequests() {
        chrome.runtime.onMessage.addListener((message) => {
            window.postMessage(message, window.location.origin);
        });
    }
}

new Content();