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

interface Account {
  address: string;
  mnemonic: string;
  name: string;
}

const CreateAccount: FunctionalComponent = (props: any) => {
  const { url, ledger } = props;
  const [name, setName] = useState('');
  const [account, setAccount] = useState<Account | null>(null);
  const [step, setStep] = useState<number>(0);
  const store:any = useContext(StoreContext);

  useEffect(() => {
    // var keys = generateAccount();
    // const mnemonic = secretKeyToMnemonic(keys.sk);
    // setAccount({
    //   address: keys.addr,
    //   mnemonic: mnemonic,
    //   name: ""
    // });
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

  const createAccount = () => {
    console.log(account);
    store.addAccount(ledger, account);
    route('/wallet');
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
        nextStep=${createAccount} />
    `}
  `
};

export default CreateAccount;