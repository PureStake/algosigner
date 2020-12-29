import { IPaymentTx } from "@algosigner/common/interfaces/pay";
import { IAssetConfigTx } from "@algosigner/common/interfaces/acfg";
import { IAssetCreateTx } from "@algosigner/common/interfaces/acfg_create";
import { IAssetDestroyTx } from "@algosigner/common/interfaces/acfg_destroy";
import { IAssetFreezeTx } from "@algosigner/common/interfaces/afrz";
import { IAssetTransferTx } from "@algosigner/common/interfaces/axfer";
import { IAssetAcceptTx } from "@algosigner/common/interfaces/axfer_accept";
import { IAssetClawbackTx } from "@algosigner/common/interfaces/axfer_clawback";
import { IKeyRegistrationTx } from "@algosigner/common/interfaces/keyreg";
import { IApplTx } from "@algosigner/common/interfaces/appl";
import { PayTransaction } from "./payTransaction";
import { AssetConfigTransaction } from "./acfgTransaction";
import { AssetCreateTransaction } from "./acfgCreateTransaction";
import { AssetDestroyTransaction } from "./acfgDestroyTransaction";
import { AssetFreezeTransaction } from "./afrzTransaction";
import { AssetTransferTransaction } from "./axferTransaction";
import { AssetAcceptTransaction } from "./axferAcceptTransaction";
import { AssetClawbackTransaction } from "./axferClawbackTransaction";
import { KeyregTransaction } from "./keyregTransaction";
import { ApplTransaction } from "./applTransaction";
import { TransactionType } from "@algosigner/common/types/transaction";
import { BaseValidatedTxnWrap } from "./baseValidatedTxnWrap";
import logging from "@algosigner/common/logging";

///
// Sign transaction and return. 
///
export function getValidatedTxnWrap(txn: object, type: string) {
    let validatedTxnWrap: BaseValidatedTxnWrap = undefined;
    let error:Error = undefined;

    switch(type.toLowerCase()){
        case TransactionType.Pay:
            validatedTxnWrap = new PayTransaction(txn as IPaymentTx);
            break;
        case TransactionType.Acfg:
            // Validate any of the 3 types of transactions that can occur with acfg
            // Use the first error as the passback error.
            try {
                validatedTxnWrap = new AssetConfigTransaction(txn as IAssetConfigTx);
            }
            catch(e) {
                error = e;
            }
            if(!validatedTxnWrap){
                try {
                    validatedTxnWrap = new AssetCreateTransaction(txn as IAssetCreateTx);
                }
                catch(e) {
                    e.message = [error.message, e.message].join(' ');
                    error = e;
                }
            }
            if(!validatedTxnWrap){
                try {
                    validatedTxnWrap = new AssetDestroyTransaction(txn as IAssetDestroyTx);
                }
                catch(e) {
                    e.message = [error.message, e.message].join(' ');
                    error = e;
                }
            }
            if(!validatedTxnWrap && error){
                throw error;
            }
            break;    
        case TransactionType.Afrz:
            validatedTxnWrap = new AssetFreezeTransaction(txn as IAssetFreezeTx);
            break;
        case TransactionType.Axfer:
            // Validate any of the 3 types of transactions that can occur with axfer
            // Use the first error as the passback error.
            try {
                validatedTxnWrap = new AssetAcceptTransaction(txn as IAssetAcceptTx);
            }
            catch(e) {
                error = e;
            }
            if(!validatedTxnWrap){
                try {
                    validatedTxnWrap = new AssetTransferTransaction(txn as IAssetTransferTx);
                    
                }
                catch(e) {
                    e.message = [error.message, e.message].join(' ');
                    error = e;
                }
            }
            if(!validatedTxnWrap){
                try {
                    validatedTxnWrap = new AssetClawbackTransaction(txn as IAssetClawbackTx);
                }
                catch(e) {
                    e.message = [error.message, e.message].join(' ');
                    error = e;
                }
            }
            if(!validatedTxnWrap && error){
                throw error;
            }
            break;
        case TransactionType.Keyreg:
            validatedTxnWrap = new KeyregTransaction(txn as IKeyRegistrationTx);        
            break;
        case TransactionType.Appl:
            validatedTxnWrap = new ApplTransaction(txn as IApplTx);
            break;
        default:
            throw new Error("Type of transaction not specified or known.");
    }

    return validatedTxnWrap;
}

