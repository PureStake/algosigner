import { Ledger } from '../messaging/types';

export default class Session {
  private _wallet: any;
  private _ledger: any;

  public set wallet(v: any) {
    this._wallet = v;
  }

  public get wallet(): any {
    return this._wallet;
  }

  public set ledger(v: any) {
    this._ledger = v;
  }

  public get ledger(): any {
    return this._ledger;
  }

  public get session(): any {
    return {
      wallet: this._wallet,
      ledger: this._ledger,
    };
  }

  public clearSession() {
    this._wallet = undefined;
    this._ledger = undefined;
  }
}
