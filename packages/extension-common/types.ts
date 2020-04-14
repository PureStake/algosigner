export enum RequestErrors {
    None,
    InvalidTransactionParams = '[RequestErrors.InvalidTransactionParams] Invalid transaction parameters.'
}

export type Field<T> = string | number;

export type TAccount = Field<string>;
export type Note = Field<string>;
export type Amount = Field<number>;

export type Transaction = {
    readonly amount: Amount;
    readonly from: TAccount;
    readonly note?: Note;
    readonly to: TAccount;
}