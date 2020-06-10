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


  const addAccount = (ledger: any) => {
    var keys = algosdk.generateAccount();
    const mnemonic = algosdk.secretKeyToMnemonic(keys.sk);
    const newAccount: Account = {
      address: keys.addr,
      mnemonic: mnemonic
    };
    store.addAccount(ledger, newAccount);
  }

  return useObserver(() => {
    const { ledger } = store;

    return html`
       <div class="panel" style="overflow: auto;">
        ${ store[ledger].map((x: Account) => html`
          <${Link} class="panel-block" href=${`/${ledger}/${x.address}`}>
            ${ x.address }
          </${Link}>
        `)}
        <div class="panel-block">
          <button class="button is-link is-fullwidth" onClick=${() => {addAccount(ledger)}}>
            Create new account
          </button>
        </div>
        <div class="panel-block">
          <${Link} class="button is-link is-fullwidth" href=${`/import-account/${ledger}`}>
            Import existing account
          </${Link}>
        </div>
      </div>
    `
  })
}

export default Wallet