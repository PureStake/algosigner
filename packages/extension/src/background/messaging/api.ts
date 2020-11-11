import { PLATFORM } from '../utils/environment';
import { OnMessageHandler } from './handler';
import { extensionBrowser } from '@algosigner/common/chrome';

export class MessageApi {
  public static listen() {
    switch (PLATFORM) {
      case 'chrome':
        extensionBrowser.runtime.onMessage.addListener(
          (request, sender, sendResponse) => {
            return OnMessageHandler.handle(request, sender, sendResponse);
          }
        );
        break;
    }
  }
  public static send(d: any) {
    var tab_id = d.originTabID || 0;
    extensionBrowser.tabs.sendMessage(tab_id, d);
  }
}
