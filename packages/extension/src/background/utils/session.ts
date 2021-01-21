import { Ledger } from '@algosigner/common/messaging/types';

export default class Session {
  private _wallet: any;
  private _ledger: Ledger;

  public set wallet(v: any) {
    this._wallet = v;
  }

  public get wallet(): any {
    return this._wallet;
  }

  public set ledger(v: Ledger) {
    this._ledger = v;
  }

  public get ledger(): Ledger {
    return this._ledger;
  }

  public get session(): any {
    return {
      wallet: this._wallet,
      ledger: this._ledger,
    };
  }

  public clearSession(): void {
    this._wallet = undefined;
    this._ledger = undefined;
  }
}
