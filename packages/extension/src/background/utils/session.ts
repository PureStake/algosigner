export default class Session {
  private _wallet: any;
  private _ledger: any;
  private _availableLedgers: any;
  private _txnRequest: any;

  public set wallet(w: any) {
    this._wallet = w;
  }

  public get wallet(): any {
    return this._wallet;
  }

  public set ledger(l: any) {
    this._ledger = l;
  }

  public get ledger(): any {
    return this._ledger;
  }

  public set txnRequest(r: any) {
    this._txnRequest = r;
  }

  public get txnRequest(): any {
    const r = this._txnRequest;
    return r;
  }

  public get txnObject(): any {
    const r = this._txnRequest;
    return r?.body?.params;
  }

  public set availableLedgers(al: any) {
    this._availableLedgers = al;
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
      txnRequest: this._txnRequest,
    };
  }

  public clearSession(): void {
    this._wallet = undefined;
    this._ledger = undefined;
    this._availableLedgers = undefined;
    this._txnRequest = undefined;
  }
}
