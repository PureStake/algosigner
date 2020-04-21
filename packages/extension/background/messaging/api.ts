import {PLATFORM} from '../utils/environment';
import {OnMessageHandler} from './handler';

export class MessageApi {
    public static listen() {
        switch(PLATFORM) {
            case 'chrome':
                    chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
                        return OnMessageHandler.handle(request,sender,sendResponse);
                    });
                break;
        }
    }
    public static send(d: any,active_tab: boolean = true) {
        switch(PLATFORM) {
            case 'chrome':
                if(active_tab) {
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                        var tab_id = tabs[0].id || 0;
                        chrome.tabs.sendMessage(tab_id,d);
                    });
                } else {
                    // TODO all tabs?
                }
                break;
        }
    }
}