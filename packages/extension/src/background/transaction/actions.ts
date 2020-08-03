import { IPaymentTx } from "@algosigner/common/interfaces/pay";
import { IAssetConfigTx } from "@algosigner/common/interfaces/acfg";
import { IAssetFreezeTx } from "@algosigner/common/interfaces/afrz";
import { IAssetTransferTx } from "@algosigner/common/interfaces/axfer";
import { IKeyRegistrationTx } from "@algosigner/common/interfaces/keyreg";
import { PayTransaction } from "./payTransaction";
import { AcfgTransaction } from "./acfgTransaction";
import { AfrzTransaction } from "./afrzTransaction";
import { AxferTransaction } from "./axferTransaction";
import { KeyregTransaction } from "./keyregTransaction";
import { TransactionType } from "@algosigner/common/types/transaction";
import { BaseValidatedTxnWrap } from "./baseValidatedTxnWrap";

///
// Sign transaction and return. 
///
export function getValidatedTxnWrap(txn: object, type: string) {
    let validatedTxnWrap: BaseValidatedTxnWrap;

    switch(type.toLowerCase()){
        case TransactionType.Pay:
            validatedTxnWrap = new PayTransaction(txn as IPaymentTx);
            break;
        case TransactionType.Acfg:
            validatedTxnWrap = new AcfgTransaction(txn as IAssetConfigTx);
            break;    
        case TransactionType.Afrz:
            validatedTxnWrap = new AfrzTransaction(txn as IAssetFreezeTx);
            break;
        case TransactionType.Axfer:
            validatedTxnWrap = new AxferTransaction(txn as IAssetTransferTx);
            break;
        case TransactionType.Keyreg:
            validatedTxnWrap = new KeyregTransaction(txn as IKeyRegistrationTx);
            break;
        default:
            throw new Error("Type of transaction not specified or known.");
    }

    return validatedTxnWrap;
}

