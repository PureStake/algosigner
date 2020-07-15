import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { route } from 'preact-router';

import { StoreContext } from '../index'
import HeaderView from 'components/HeaderView'
import Authenticate from 'components/Authenticate'

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
  const [step, setStep] = useState<number>(0);

  const nextStep = () => {
    setStep(step + 1);
  };

  const importAccount = (pwd) => {
    chrome.runtime.sendMessage({
        source:'ui',
        body:{
            jsonrpc: '2.0',
            method: 'import-account',
            params: {
              passphrase: pwd,
              mnemonic: mnemonic,
              name: name,
              ledger: ledger
            },
            id: (+new Date).toString(16)
        }
    }, function(response) {
      console.log('IMPORT', response);
      if ('error' in response) { 
          alert(response);
      } else {
        store.updateWallet(response);
        route('/wallet');
      }
    });
    // try {
    //   var recoveredAccount = mnemonicToSecretKey(mnemonic); 
    //   const newAccount: Account = {
    //     address: recoveredAccount.addr,
    //     mnemonic: mnemonic,
    //     name: name
    //   };
    //   store.addAccount(ledger, newAccount);
    // } catch (error) {
    //   alert(error);
    // }
  }

  const handleInput = e => {
    setMnemonic(e.target.value);
  }

  if (step === 0)
    return html`
      <div class="main-view" style="flex-direction: column; justify-content: space-between;">
        <${HeaderView} action="${() => route('/wallet')}"
          title="Import a ${ledger} account!" />
        <div class="px-3" style="flex: 1;">
          <input
            class="input"
            placeholder="Account name"
            value=${name}
            onInput=${(e)=>setName(e.target.value)}/>

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
            onClick=${nextStep}>
            Continue
          </button>
        </div>
      </div>
    `
  else
    return html`
      <${Authenticate}
        nextStep=${importAccount} />
    `
};

export default ImportAccount;