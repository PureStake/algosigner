import { SupportedAlgod } from './messaging/types';
export declare enum RequestErrors {
    None = 0,
    NotAuthorized = "[RequestErrors.NotAuthorized] The extension user does not authorize the request.",
    InvalidTransactionParams = "[RequestErrors.InvalidTransactionParams] Invalid transaction parameters.",
    UnsupportedAlgod = "[RequestErrors.UnsupportedAlgod] The provided method is not supported.",
    UnsupportedLedger = "[RequestErrors.UnsupportedLedger] The provided ledger is not supported.",
    Undefined = "[RequestErrors.Undefined] An undefined error occurred."
}
export declare type Field<T> = string | number;
export declare type TAccount = Field<string>;
export declare type Note = Field<string>;
export declare type Amount = Field<number>;
export declare type Transaction = {
    readonly amount: Amount;
    readonly from: TAccount;
    readonly note?: Note;
    readonly to: TAccount;
};
export declare type AlgodRequest = {
    readonly method: SupportedAlgod;
    readonly params: {
        [key: string]: string | number | undefined;
    };
};
