const algosdk = require("algosdk");
import { Pay } from "@algosigner/common/interfaces/pay";
import { PayTransaction } from "./payTransaction";
import { TransactionType } from "@algosigner/common/types/transaction";


// TEMPORARY - testing with account generation
function getPrivateKey(){
    var account = algosdk.generateAccount();
    return account;
}

///
// Sign transaction and return. 
///
export function signTransaction(txn: object, type: TransactionType){
    console.log(`Transaction in sign transaction method: \n${JSON.stringify(txn)}`);
    let signedTxn: any;

    switch(type){
        case TransactionType.Pay:
            let tmptx = new PayTransaction(txn as Pay);
            let tmpsk = getPrivateKey().sk;
            console.log(`Transaction: ${JSON.stringify(tmptx)}`);
            console.log(`Account sk: ${tmpsk as Uint8Array}`);
            signedTxn = algosdk.signTransaction(tmptx, tmpsk);
            break;
            
        default:
            throw new Error("Type of transaction not specified.");
    }

    return signedTxn;
}

