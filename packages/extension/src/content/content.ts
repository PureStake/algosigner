const allowed_public_methods = ['get-account-keys'];
const BUNDLE = 'AlgoSigner.min.js';
import { extensionBrowser } from '@algosigner/common/chrome';

class Content {
  events: { [key: string]: any } = {};

  constructor() {
    this.inject();
    this.messageChannelListener();
    this.chromeRuntimeListener();
  }

  inject() {
    let url = extensionBrowser.runtime.getURL(BUNDLE);
    const el = document.createElement('script');
    el.setAttribute('type', 'text/javascript');
    el.setAttribute('src', url);
    (document.head || document.documentElement).appendChild(el);
  }

  // Messages coming from AlgoSigner injected library.
  // They are sent to background using chrome.runtime.
  messageChannelListener() {
    let ctx = this;
    window.addEventListener('message', (ev) => {
      var d = ev.data;
      try {
        if (typeof d === 'string') {
          let result = JSON.parse(d);
          let type = Object.prototype.toString.call(result);
          if (type === '[object Object]' || type === '[object Array]') {
            // We can display message output here, but as a string object it doesn't match our format and is likely from other sources
          }
        } else {
          if (
            Object.prototype.toString.call(d) === '[object Object]' &&
            'source' in d
          ) {
            if (d.source == 'dapp') {
              let eventId: string = d.body.id;
              ctx.events[eventId] = ev;
            }
            if (d.source == 'dapp' || d.source == 'router') {
              extensionBrowser.runtime.sendMessage(d); // {source, body}
            }
          }
        }
      } catch {
        //console.log(`Unable to determine source from message. \n${d}`);
      }
    });
  }

  // Messages coming from background.
  // They are sent to the AlgoSigner injected library.
  chromeRuntimeListener() {
    let ctx = this;
    extensionBrowser.runtime.onMessage.addListener((d) => {
      if (
        Object.prototype.toString.call(d) === '[object Object]' &&
        'body' in d
      ) {
        let body = d.body;
        if (body.id in ctx.events) {
          ctx.events[body.id].ports[0].postMessage(d);
          delete ctx.events[body.id];
        } else {
          window.postMessage(d, window.location.origin);
        }
      }
    });
  }
}

new Content();
