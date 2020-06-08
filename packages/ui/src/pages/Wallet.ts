import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import algosdk from 'algosdk';
import { useObserver } from 'mobx-react-lite';
import { Link } from 'preact-router';

import { StoreContext } from '../index'


interface Account {
  address: string;
  mnemonic: string;
}

const Wallet: FunctionalComponent = (props) => {
  const store:any = useContext(StoreContext);

  const [ledger, setLedger] = useState<any>("testNet") 

  const addAccount = (ledger: any) => {
    var keys = algosdk.generateAccount();
    const mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
    const newAccount: Account = {
      address: keys.addr,
      mnemonic: mnemonic
    };
    store.addAccount(ledger, newAccount);
  }

  return useObserver(() => (
    html`
      <div class="panel" style="overflow: auto; width: 650px; height: 550px;">
        <p class="panel-heading">
          Wallets
        </p>
        <p class="panel-tabs">
          <a class=${ ledger == 'testNet' ? 'is-active' : ''} onClick=${() => setLedger('testNet')}>TestNet</a>
          <a class=${ ledger == 'mainNet' ? 'is-active' : ''}  onClick=${() => setLedger('mainNet')}>MainNet</a>
        </p>
        ${ store[ledger].map((x: Account) => html`
          <${Link} class="panel-block" href=${`/${ledger}/${x.address}`}>
            ${ x.address }
          </${Link}>
        `)}
        <div class="panel-block">
          <button class="button is-link is-outlined is-fullwidth" onClick=${() => {addAccount(ledger)}}>
            Create new account
          </button>
        </div>
        <div class="panel-block">
          <${Link} class="button is-link is-outlined is-fullwidth" href=${`/import-account/${ledger}`}>
            Import existing account
          </${Link}>
        </div>
      </div>
    `
  ))
}

export default Wallet