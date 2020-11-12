/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const algosdk = require('algosdk');

export default function createNewAccount() {
  let keys = algosdk.generateAccount();
  let mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
  return [mnemonic, keys.addr];
}
