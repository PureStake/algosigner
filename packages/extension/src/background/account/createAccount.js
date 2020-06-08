const algosdk = require("algosdk");

export default function createNewAccount(passphrase){
    var keys = algosdk.generateAccount();
    var mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
    return [mnemonic, keys.addr];
}