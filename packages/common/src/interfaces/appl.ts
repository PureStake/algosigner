///
// Mapping interface of allowable fields for appl transactions.
///
export interface IApplTx {
    type: string,               //"appl"
    apid: number,               //uint64	    "apid"	    ID of the application being configured or empty if creating.
    apan: number,               //uint64	    "apan"	    Defines what additional actions occur with the transaction. See the OnComplete section of the TEAL spec for details.
    apat?: string,              //Address	    "apat"	    List of accounts in addition to the sender that may be accessed from the application's approval-program and clear-state-program.
    apap?: string,              //Address	    "apap"	    Logic executed for every application transaction, except when on-completion is set to "clear". It can read and write global state for the application, as well as account-specific local state. Approval programs may reject the transaction.
    apaa?: any,                 //byte[]	    "apaa"	    Transaction specific arguments accessed from the application's approval-program and clear-state-program.
    apsu?: string,              //Address	    "apsu"	    Logic executed for application transactions with on-completion set to "clear". It can read and write global state for the application, as well as account-specific local state. Clear state programs cannot reject the transaction.
    apfa?: string,              //Address	    "apfa"	    Lists the applications in addition to the application-id whose global states may be accessed by this application's approval-program and clear-state-program. The access is read-only.
    apas?: string,              //Address	    "apas"	    Lists the assets whose AssetParams may be accessed by this application's approval-program and clear-state-program. The access is read-only.
    apgs?: any,                 //StateSchema	"apgs"	    Holds the maximum number of global state values defined within a StateSchema object.
    apls?: any,                 //StateSchema	"apls"	    Holds the maximum number of local state values defined within a StateSchema object.
}