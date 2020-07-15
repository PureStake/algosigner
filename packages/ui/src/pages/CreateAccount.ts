// import { generateAccount, secretKeyToMnemonic } from 'algosdk';
import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';
import { Link, route } from 'preact-router';

import { StoreContext } from 'index'

import SetAccountName from 'components/CreateAccount/SetAccountName'
import AccountKeys from 'components/CreateAccount/AccountKeys'
import ConfirmMnemonic from 'components/CreateAccount/ConfirmMnemonic'
import Authenticate from 'components/Authenticate'

interface Account {
  address: string;
  mnemonic: string;
  name: string;
}

const CreateAccount: FunctionalComponent = (props: any) => {
  const { url, ledger } = props;
  const [name, setName] = useState('');
  const [account, setAccount] = useState<Account>({
    address: '',
    mnemonic: '',
    name: '',
  });
  const [step, setStep] = useState<number>(0);
  const store:any = useContext(StoreContext);

  useEffect(() => {
    chrome.runtime.sendMessage({
        source:'ui',
        body:{
            jsonrpc: '2.0',
            method: 'create-account',
            params: {},
            id: (+new Date).toString(16)
        }
    }, function(response) {
      setAccount({
        mnemonic: response[0],
        address: response[1],
        name: ""
      });
    });
  }, []);

  const nextStep = () => {
    setStep(step + 1);
  }

  const setAccountName = () => {
    let newAcc : Account = Object.assign({}, account)
    newAcc.name = name
    setAccount(newAcc);
    nextStep();
  }

  const prevStep = () => {
    setStep(step - 1);
  }

  const createAccount = (pwd) => {
    chrome.runtime.sendMessage({
        source:'ui',
        body:{
            jsonrpc: '2.0',
            method: 'save-account',
            params: {
              ledger: ledger,
              address: account.address || '',
              mnemonic: account.mnemonic || '',
              name: account.name || '',
              passphrase: pwd
            },
            id: (+new Date).toString(16)
        }
    }, function(response) {
      if ('error' in response){
        alert(response);
      } else {
        store.updateWallet(response);
        route('/wallet');
      }
    });
  };


  return html`
    ${ step===0 && html`
      <${SetAccountName}
        name=${name}
        setName=${setName}
        ledger=${ledger}
        nextStep=${setAccountName} />
    `}
    ${ step===1 && html`
      <${AccountKeys}
        account=${account}
        prevStep=${prevStep}
        nextStep=${nextStep} />
    `}
    ${ step===2 && html`
      <${ConfirmMnemonic}
        account=${account}
        prevStep=${prevStep}
        nextStep=${nextStep} />
    `}
    ${ step===3 && html`
      <${Authenticate}
        nextStep=${createAccount} />
    `}
  `
};

export default CreateAccount;