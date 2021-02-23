export default class Session {
  private _wallet: any;
  private _ledger: any;
  private _availableLedgers: any;

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
    };
  }

  public clearSession() {
    this._wallet = undefined;
    this._ledger = undefined;
    this._availableLedgers = undefined;
  }
}
