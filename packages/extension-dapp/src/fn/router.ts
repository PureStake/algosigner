// The Router routes messages sent to the dApp back to the extension.
//
// By default we are routing every message from the Extension to a global handler.
// This handler bounces back a signal to the Extension as simple ACK mechanism, that will 
// ultimately resolve the Promise in the Extension side.
//
// In the future, we obviously want to offer more configuration. 2nd iteration probably adding
// a dApp defined custom global handler, subsequent iterations probably be able of adding
// custom handler for different message types, etc..
import {JsonRpc} from '@algosigner/common/messaging/jsonrpc';
import {JsonRpcMethod} from '@algosigner/common/messaging/types';
import {MessageApi} from '../messaging/api'; 
import {JsonRpcBody,MessageBody,MessageSource} from '@algosigner/common/messaging/types';

export class Router {
    handler: Function;
    constructor() {
        this.handler = this.default;
        window.addEventListener("message",(event) => {
            var d = event.data;
            if("source" in d){
                if(d.source == "extension") {
                    // TODO
                    d.source = 'router';
                    this.handler(d);
                }
            }
        });
    }
    default(d:any){
        // ..amaze the world with something
        this.bounce(d);
    }
    bounce(d:any){
        let api = new MessageApi();
        window.postMessage(d, window.location.origin, [api.mc.port2]);
    }
}