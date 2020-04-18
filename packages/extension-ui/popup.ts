class Popup {
    static get PortName(): string {return "popup"}
    constructor() {
        let ctx = this;
        document.addEventListener('DOMContentLoaded', function () {
            let el = document.getElementById("demo_button");
            if(el) {
                el.addEventListener("click",() => {
                    ctx.myAction();
                },false);
            }
        });
    }

    myAction() {
        this.send()
        .then(function(){
            console.log("Resolved in the popup!");
        })
        .catch(function(e){
            console.log("Catched in the popup!");
        });
    }

    send() {
        return new Promise((resolve,reject) => {
            function responseCb(response: any) {
                resolve(response);
            }
            let requestId = (+new Date).toString(16);
            chrome.runtime.sendMessage({
                source:'extension',
                body:{
                    jsonrpc: '2.0',
                    method:'method-example-from-extension',
                    params:[],
                    id: (+new Date).toString(16)
                }
            }, responseCb);
        });
    }
}
new Popup();