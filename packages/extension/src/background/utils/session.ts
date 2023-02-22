import { Network, SafeAccount, SessionObject } from "@algosigner/common/types";
import { NetworkTemplate } from "@algosigner/common/types/network";

export default class Session {
  private _wallet: Record<string, Array<SafeAccount>>;
  private _network: Network;
  private _availableNetworks: Array<NetworkTemplate>;
  private _txnRequest: any;

  public set wallet(w: Record<string, Array<SafeAccount>>) {
    this._wallet = w;
  }

  public get wallet(): Record<string, Array<SafeAccount>> {
    return this._wallet;
  }

  public set network(n: Network) {
    this._network = n;
  }

  public get network(): Network {
    return this._network;
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

  public set availableNetworks(an: Array<NetworkTemplate>) {
    this._availableNetworks = an;
  }

  public get availableNetworks(): Array<NetworkTemplate> {
    if (this._availableNetworks) {
      return this._availableNetworks;
    } else {
      return [];
    }
  }

  public asObject(): SessionObject {
    return {
      wallet: this._wallet,
      network: this._network,
      availableNetworks: this._availableNetworks || [],
      txnRequest: this._txnRequest,
    };
  }

  public clearSession(): void {
    this._wallet = undefined;
    this._network = undefined;
    this._availableNetworks = undefined;
    this._txnRequest = undefined;
  }
}
