// The Router routes messages sent to the dApp back to the extension.
//
// By default we are routing every message from the Extension to a global handler.
// This handler bounces back a signal to the Extension as simple ACK mechanism, that will
// ultimately resolve the Promise in the Extension side.
//
// In the future, we obviously want to offer more configuration. 2nd iteration probably adding
// a dApp defined custom global handler, subsequent iterations probably be able of adding
// custom handler for different message types, etc..
import { MessageApi } from '../messaging/api';
import { Task } from './task';

export class Router {
  /* eslint-disable-next-line @typescript-eslint/ban-types */
  handler: Function;
  constructor() {
    this.handler = this.default;
    window.addEventListener('message', (event) => {
      const d = event.data;

      try {
        if (typeof d === 'string') {
          const result = JSON.parse(d);
          const type = Object.prototype.toString.call(result);
          if (type === '[object Object]' || type === '[object Array]') {
            // We can display message output here, but as a string object it doesn't match our format and is likely from other sources
          }
        } else {
          if (
            Object.prototype.toString.call(d) === '[object Object]' &&
            'source' in d
          ) {
            if (d.source == 'extension') {
              d.source = 'router';
              d.origin = window.location.origin;
              this.handler(d);
            }
          }
        }
      } catch {
        //console.log(`Unable to determine source from message. \nEvent:${JSON.stringify(event)}`);
      }
    });
  }
  default(d: any) {
    if (d.body.method in Task.subscriptions) {
      Task.subscriptions[d.body.method]();
    }
    this.bounce(d);
  }
  bounce(d: any) {
    const api = new MessageApi();
    window.postMessage(d, window.location.origin, [api.mc.port2]);
  }
}
