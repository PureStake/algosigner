//const algosdk = require("algosdk");
import { PaymentTx } from "@algosigner/common/interfaces/pay";
import { AssetConfigTx } from "@algosigner/common/interfaces/acfg";
import { AssetFreezeTx } from "@algosigner/common/interfaces/afrz";
import { AssetTransferTx } from "@algosigner/common/interfaces/axfer";
import { KeyRegistrationTx } from "@algosigner/common/interfaces/keyreg";
import { PayTransaction } from "./payTransaction";
import { AcfgTransaction } from "./acfgTransaction";
import { AfrzTransaction } from "./afrzTransaction";
import { AxferTransaction } from "./axferTransaction";
import { KeyregTransaction } from "./keyregTransaction";
import { TransactionType } from "@algosigner/common/types/transaction";

///
// Sign transaction and return. 
///
export function validateTransaction(txn: object, type: string) {
    let validatedTxn: any;

    switch(type.toLowerCase()){
        case TransactionType.Pay:
            validatedTxn = new PayTransaction(txn as PaymentTx);
            break;
        case TransactionType.Acfg:
            validatedTxn = new AcfgTransaction(txn as AssetConfigTx);
            break;    
        case TransactionType.Afrz:
            validatedTxn = new AfrzTransaction(txn as AssetFreezeTx);
            break;
        case TransactionType.Axfer:
            validatedTxn = new AxferTransaction(txn as AssetTransferTx);
            break;
        case TransactionType.Keyreg:
            validatedTxn = new KeyregTransaction(txn as KeyRegistrationTx);
            break;
        default:
            throw new Error("Type of transaction not specified or known.");
    }

    if(validatedTxn){
         return true; 
    }
    else {
         return false;
    }
}

