const algosdk = require("algosdk");
import logging from "@algosigner/common/logging";
import { getSupportedLedgers } from  "@algosigner/common/types/ledgers";
import { MultisigNoMatch, MultisigAlreadySigned, MultisigInvalidMsig } from "../../errors/transactionSign";


///
// Checks if the provided transaction is a multisig transaction
///
export function isMultisig(transaction):boolean {  
    if(transaction.msig && ((transaction.msig.subsig && transaction.msig.v && transaction.msig.thr)
        || (transaction.msig.addrs && transaction.msig.version && transaction.msig.threshold))) {
        // TODO: Need to have a check here for various multisig validity concerns including bad from hash 
        return true;
    }
    return false;
}

///
// Attempt to find an AlgoSign address to sign with in the transaction msig component.
///
export function getSigningAccounts(ledgerAddresses:any, transaction:any):{accounts?: Array<object>, error?:MultisigInvalidMsig|MultisigAlreadySigned|MultisigNoMatch}{  
    var foundAccount = false;
    let multisigAccounts = {accounts: [], error: undefined};

    // Verify that this transaction includes multisig components
    if(!isMultisig(transaction)) {     
        multisigAccounts.error = new MultisigInvalidMsig('Multisig parameters are invalid.');
        // Return immediately - No need to continue if this is the case as the msig component is required
        return multisigAccounts;
    }

    // Cycle the msig accounts to match addresses to those in AlgoSigner
    let subsig_addrs = transaction.msig.subsig || transaction.msig.addrs;
    try {
        if(subsig_addrs && subsig_addrs.length > 0) {
            subsig_addrs.forEach((account) => {
                for (var i = ledgerAddresses.length - 1; i >= 0; i--) {
                    if (ledgerAddresses[i].address === account || ledgerAddresses[i].address === account.pk) {
                        // We found an account so indicate the value as true, used in the case that the only found accounts are already signed
                        foundAccount = true;
                        if(!(account.s)) {
                            // We found an unsigned account that we own, add it to the list of accounts we can now sign
                            multisigAccounts.accounts.push(ledgerAddresses[i]);
                        }
                    }
                }
            });
        }
    }
    catch(e) {
        logging.log(e);
    }

    // If we didn't find an account to return then return an error.
    // This error depends on if we found the address at all or not.
    if(multisigAccounts.accounts.length === 0) {
        if(foundAccount) {
            multisigAccounts.error = new MultisigAlreadySigned('Matching addresses have already signed.');
        }
        else {
            multisigAccounts.error = new MultisigNoMatch('No address match found.');
        }
    }

    return multisigAccounts;
}