class Popup {
    static get PortName(): string {return "popup"}
    constructor() {
        let ctx = this;
        document.addEventListener('DOMContentLoaded', function () {
            console.log("popup loaded");

            let el = document.getElementById("demo_button");
            if(el) {
                console.log("popup element is here");

                el.addEventListener("click",ctx.sendMessage);
            }
        });
    }

    sendMessage() {
        console.log("popup sending");
        chrome.runtime.sendMessage({port: "from_extension", method: "sign-txn-and-return"});
    }
}
new Popup();