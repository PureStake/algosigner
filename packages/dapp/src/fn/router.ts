  
// The Router routes messages sent to the dApp back to the extension.
//
// By default we are routing every message from the Extension to a global handler.
// This handler bounces back a signal to the Extension as simple ACK mechanism, that will 
// ultimately resolve the Promise in the Extension side.
//
// In the future, we obviously want to offer more configuration. 2nd iteration probably adding
// a dApp defined custom global handler, subsequent iterations probably be able of adding
// custom handler for different message types, etc..
import {MessageApi} from '../messaging/api'; 
import {Task} from './task';

export class Router {
    handler: Function;
    constructor() {
        this.handler = this.default;
        window.addEventListener("message",(event) => {
            var d = event.data;
            try {
                JSON.parse(d);  
            }
            catch {
                console.log(`Message not in JSON format. Unable to determine source from message. \n${d}`);
            }              
            if("source" in d){
                if(d.source == "extension") {
                    d.source = 'router';
                    d.origin = window.location.origin;
                    this.handler(d);
                }
            }

        });
    }
    default(d:any){
        if(d.body.method in Task.subscriptions) {
            Task.subscriptions[d.body.method]();
        }
        this.bounce(d);
    }
    bounce(d:any){
        let api = new MessageApi();
        window.postMessage(d, window.location.origin, [api.mc.port2]);
    }
}