// import { generateAccount, secretKeyToMnemonic } from 'algosdk';
import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';
import { Link, route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging'

import { StoreContext } from 'services/StoreContext'

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
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const store:any = useContext(StoreContext);

  useEffect(() => {
    sendMessage(JsonRpcMethod.CreateAccount, {}, function(response) {
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
    const params = {
      ledger: ledger,
      address: account.address || '',
      mnemonic: account.mnemonic || '',
      name: account.name || '',
      passphrase: pwd
    };
    setLoading(true);
    setAuthError('');

    sendMessage(JsonRpcMethod.SaveAccount, params, function(response) {
      if ('error' in response) {
        setLoading(false);
        switch (response.error) {
          case "Login Failed":
            setAuthError('Wrong passphrase');
            break;
          default:
            setAskAuth(false);
            alert(`There was an unkown error: ${response.error}`);
            break;
        }
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
        nextStep=${() => {setAskAuth(true)}} />

    `}
    ${ askAuth && html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content" style="padding: 0 15px;">
          <${Authenticate}
            error=${authError}
            loading=${loading}
            nextStep=${createAccount} />
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${()=>setAskAuth(false)} />
      </div>
    `}
  `
};

export default CreateAccount;