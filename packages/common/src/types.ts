/* eslint-disable no-unused-vars */
export class RequestError {
  message: string;
  code: number;
  name?: string;
  data?: any;

  static None = new RequestError('', 0);
  static UserRejected = new RequestError(
    '[RequestError.UserRejected] The extension user does not authorize the request.',
    4001
  );
  static NotAuthorized = new RequestError(
    '[RequestError.NotAuthorized] The extension user does not authorize the request.',
    4100
  );
  static UnsupportedAlgod = new RequestError(
    '[RequestError.UnsupportedAlgod] The provided method is not supported.',
    4200
  );
  static UnsupportedLedger = new RequestError(
    '[RequestError.UnsupportedLedger] The provided ledger is not supported.',
    4200
  );
  static InvalidFormat = new RequestError(
    '[RequestError.InvalidFormat] Please provide an array of either valid transaction objects or nested arrays of valid transaction objects.',
    4300
  );
  static Undefined = new RequestError(
    '[RequestError.Undefined] An undefined error occurred.',
    4000
  );

  protected constructor(message: string, code: number, name?: string, data?: any) {
    this.message = message;
    this.code = code;
    this.name = name;
    this.data = data;
  }
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
};

export type MultisigTransaction = {
  readonly msig: any;
  readonly txn: Transaction;
};

export type WalletMultisigMetadata = {
  readonly version: number;
  readonly threshold: number;
  readonly addrs: Array<string>;
};

export type WalletTransaction = {
  readonly txn: string;
  readonly signers?: Array<string>;
  readonly message?: string;
  readonly msig?: WalletMultisigMetadata;
  readonly authAddr?: string;
};
