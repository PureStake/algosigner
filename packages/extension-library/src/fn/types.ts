import {Amount, TAccount, Note} from '../types';

export enum RequestErrors {
    None,
    InvalidTransactionParams = '[RequestErrors.InvalidTransactionParams] Invalid transaction parameters.'
}

export type Transaction = {
    readonly amount: Amount;
    readonly from: TAccount;
    readonly note?: Note;
    readonly to: TAccount;
}