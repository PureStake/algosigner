export class MessageApi {
    public static send(d: any,active_tab: boolean = true) {
        if(active_tab) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                var tab_id = tabs[0].id || 0;
                chrome.tabs.sendMessage(tab_id,d);
            });
        } else {
            // TODO all tabs?
        }
    }
}