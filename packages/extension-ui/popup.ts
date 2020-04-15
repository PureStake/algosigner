class Popup {
    static get PortName(): string {return "popup"}
    constructor() {
        let ctx = this;
        document.addEventListener('DOMContentLoaded', function () {
            console.log("popup loaded");

            let el = document.getElementById("demo_button");
            if(el) {
                console.log("popup element is here");

                el.addEventListener("click",() => {
                    ctx.foo();
                },false);
            }
        });
    }

    foo() {
        this.send()
        .then(function(){
            console.log("Resolved in the popup!");
        })
        .catch(function(e){
            console.log("Catched in the popup!");
        });
    }

    send() {
        console.log("D");

        return new Promise((resolve,reject) => {
            function responseCb(response: any) {
                resolve(response);
            }
            let requestId = (+new Date).toString(16);
            chrome.runtime.sendMessage({id: requestId, method: "foo-bar"}, responseCb);
        });

        // console.log("popup sending");
        // chrome.runtime.sendMessage({port: "from_extension", method: "sign-txn-and-return"});
    }
}
new Popup();