import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { mnemonicToSecretKey } from 'algosdk';
import { route } from 'preact-router';

import { StoreContext } from '../index'

interface Account {
  address: string;
  mnemonic: string;
  name: string;
}

const ImportAccount: FunctionalComponent = (props: any) => {
  const store:any = useContext(StoreContext);
  const { ledger } = props;
  const [mnemonic, setMnemonic] = useState<string>('');
  const [name, setName] = useState<string>('');

  const importAccount = () => {
    try {
      var recoveredAccount = mnemonicToSecretKey(mnemonic); 
      const newAccount: Account = {
        address: recoveredAccount.addr,
        mnemonic: mnemonic,
        name: name
      };
      store.addAccount(ledger, newAccount);
      route('/');
    } catch (error) {
      alert(error);
    }
  }

  const handleInput = e => {
    setMnemonic(e.target.value);
  }

  return html`
    <div class="panel" style="overflow: auto; width: 650px; height: 550px;">
      <p class="panel-heading">
        <a style="margin-right: 1em;" onClick=${() => window.history.back()}>
          ${'\u2190'}
        </a>
        Import a ${ledger} account
      </p>
      <div class="panel-block">
        <input
          class="input"
          placeholder="Account name"
          value=${name}
          onInput=${(e)=>setName(e.target.value)}/>
      </div>
      <div class="panel-block">
        <p>Insert the 25 word mnemonic of the acccount you want to import:</p>
      </div>
      <div class="panel-block">
        <textarea
          class="textarea"
          placeholder="apples butter king monkey nuts ..."
          rows="5"
          onInput=${handleInput}
          value=${mnemonic}/>
      </div>
      <div class="panel-block">
        <button class="button is-link is-outlined is-fullwidth"
          onClick=${importAccount}>
          Import!
        </button>
      </div>
    </div>
  `
};

export default ImportAccount;