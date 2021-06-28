export default class Session {
  private _wallet: any;
  private _ledger: any;
  private _availableLedgers: any;
  private _txnWrap: any;

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

  public set txnWrap(w: any) {
    this._txnWrap = w;
  }

  public get txnWrap(): any {
    const w = this._txnWrap;
    return w;
  }

  public set availableLedgers(v: any) {
    this._availableLedgers = v;
  }

  public get availableLedgers(): any {
    if (this._availableLedgers) {
      return this._availableLedgers;
    } else {
      return [];
    }
  }

  public get session(): any {
    return {
      wallet: this._wallet,
      ledger: this._ledger,
      availableLedgers: this._availableLedgers || [],
      txnWrap: this._txnWrap,
    };
  }

  public clearSession(): void {
    this._wallet = undefined;
    this._ledger = undefined;
    this._availableLedgers = undefined;
    this._txnWrap = undefined;
  }
}
