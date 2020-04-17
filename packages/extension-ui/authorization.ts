document.addEventListener('DOMContentLoaded', function () {

    let allow = document.getElementById("allow");
    let deny = document.getElementById("deny");
    if(allow && deny) {
        allow.addEventListener("click",() => {
            chrome.runtime.sendMessage({
                source:'extension',
                body:{
                    jsonrpc: '2.0',
                    method:'authorization-allow',
                    params:[],
                    id: (+new Date).toString(16)
                }
            });
        },false);
        deny.addEventListener("click",() => {
            chrome.runtime.sendMessage({
                source:'extension',
                body:{
                    jsonrpc: '2.0',
                    method:'authorization-deny',
                    params:[],
                    id: (+new Date).toString(16)
                }
            });
        },false);
    }

    chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
        if(request.body.method == 'authorization') {
            let origin = document.getElementById("origin");
            if(origin) {
                origin.textContent = request.body.params[0];
            }
        }
    });
});