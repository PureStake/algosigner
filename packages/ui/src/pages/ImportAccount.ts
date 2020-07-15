import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { route } from 'preact-router';

import { StoreContext } from '../index'
import HeaderView from 'components/HeaderView'

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
    // try {
    //   var recoveredAccount = mnemonicToSecretKey(mnemonic); 
    //   const newAccount: Account = {
    //     address: recoveredAccount.addr,
    //     mnemonic: mnemonic,
    //     name: name
    //   };
    //   store.addAccount(ledger, newAccount);
    //   route('/');
    // } catch (error) {
    //   alert(error);
    // }
  }

  const handleInput = e => {
    setMnemonic(e.target.value);
  }

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${HeaderView} action="${() => route('/wallet')}"
        title="Import a ${ledger} account!" />
      <div class="px-3" style="flex: 1;">
        <p>Insert the 25 word mnemonic of the acccount you want to import:</p>

        <textarea
          class="textarea"
          placeholder="apples butter king monkey nuts ..."
          rows="5"
          onInput=${handleInput}
          value=${mnemonic}/>
      </div>
      <div style="padding: 1em;">
        <button class="button is-link is-outlined is-fullwidth"
          onClick=${importAccount}>
          Import!
        </button>
      </div>
    </div>
  `
};

export default ImportAccount;