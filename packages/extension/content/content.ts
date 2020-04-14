const allowed_public_methods = ['get-account-keys'];
const BUNDLE = 'AlgoSigner.min.js';

/*

    We have 3 isolated contexts - dApp, content and background - and we need to open an async circular communication between them:
    one upstream - from the dApp to the Extension - and one downstream - in the opposite direction.

    == dApp upstream pipe ==

    - (A.1) dApp to Content: dApp user sends a message to Content through a MessageChannel Port1.
    - (B.1) Content to Background: Content sends a message to Background through a chrome.runtime.Port.
    - (B.2) Background to Content: Background sends a message to Content through a chrome.runtime.Port.
    - (A.2) Content to dApp: Content sends a message to dApp through a MessageChannel Port2.

    (A.1) represents 1) a new Promise, 2) a message dispatch and 3) a subscription to (A.2) that will trigger the Promise.resolve. 
    dApp developer has the capacity to handle the Promise as he would do normally (call()->then()->catch()).

    (B.1) and (B.2) represents a persistent connection between Content and Background through the chrome's provided runtime.Port.

    This creates an async circular pipe that starts and ends in the dApp through the Promise: dApp -> A.1 -> B.1 -> B.2 -> A.2 -> dApp.

    == Extension downstream pipe ==

    We created a circular pipe that starts and ends with the dApp. We need now to do the same in the opposite direction: 
    a circular pipe that starts and ends in the Extension, so the Extension-user can propagate events through this pipe down the 
    stream to the dApp.

*/

class Content {

    events: {[key: string]: any} = {};
    static get PortName(): string {return "content"}
    port: chrome.runtime.Port = chrome.runtime.connect({name: Content.PortName});

    constructor() {
        this.listenDOM();
        this.listenPort();
        this.inject();
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
            let eventId: string = event.data.id;
            ctx.events[eventId] = event;
            var d = event.data;
            ctx.port.postMessage({'data': d});
        });
    }

    // Listen to background events sent through the Port pipe and forward them through the original event's MessageChannel.
    // This will end up resolving the original Promise and execute the user-defined handler.
    listenPort() {
        let ctx = this;
        this.port.onMessage.addListener((message) => {
            if('eventId' in message && message.eventId in ctx.events) {
                ctx.events[message.eventId].ports[0].postMessage(message.body);
                delete ctx.events[message.eventId];
            } else {
                // this part is TODO and will be removed from here 
                console.log("Background triggered!");
            }
        });
    }
}

new Content();