import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import SetAccountName from 'components/CreateAccount/SetAccountName';
import AccountKeys from 'components/CreateAccount/AccountKeys';
import ConfirmMnemonic from 'components/CreateAccount/ConfirmMnemonic';
import FinishAccountCreation from 'components/CreateAccount/FinishAccountCreation';

import { sendMessage } from 'services/Messaging';
import { StoreContext } from 'services/StoreContext';
import Authenticate from 'components/Authenticate';
import ReducedHeader from 'components/ReducedHeader';

interface Account {
  address: string;
  mnemonic: string;
  name: string;
}

const CreateAccount: FunctionalComponent = (props: any) => {
  const { ledger } = props;
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
  const store: any = useContext(StoreContext);

  useEffect(() => {
    sendMessage(JsonRpcMethod.CreateAccount, {}, function (response) {
      setAccount({
        mnemonic: response[0],
        address: response[1],
        name: '',
      });
    });
  }, []);

  const nextStep = () => {
    setStep(step + 1);
  };

  const setAccountName = () => {
    const newAcc: Account = Object.assign({}, account);
    newAcc.name = name;
    setAccount(newAcc);
    nextStep();
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const createAccount = (pwd) => {
    const params = {
      ledger: ledger,
      address: account.address || '',
      mnemonic: account.mnemonic || '',
      name: account.name || '',
      passphrase: pwd,
    };
    setLoading(true);
    setAuthError('');

    sendMessage(JsonRpcMethod.SaveAccount, params, function (response) {
      if ('error' in response) {
        setLoading(false);
        switch (response.error) {
          case 'Login Failed':
            setAuthError('Wrong passphrase');
            break;
          default:
            setAskAuth(false);
            alert(`There was an unkown error: ${response.error}`);
            break;
        }
      } else {
        store.updateWallet(response, () => {
          setAskAuth(false);
          nextStep();
        });
      }
    });
  };

  return html`
    <${ReducedHeader} />
    ${step === 0 &&
    html`
      <${SetAccountName}
        name=${name}
        setName=${setName}
        ledger=${ledger}
        nextStep=${setAccountName}
      />
    `}
    ${step === 1 &&
    html` <${AccountKeys} account=${account} prevStep=${prevStep} nextStep=${nextStep} /> `}
    ${step === 2 &&
    html`
      <${ConfirmMnemonic}
        account=${account}
        prevStep=${prevStep}
        nextStep=${() => {
          setAskAuth(true);
        }}
      />
    `}
    ${askAuth &&
    html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <${Authenticate} error=${authError} loading=${loading} nextStep=${createAccount} />
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick=${() => setAskAuth(false)}
        />
      </div>
    `}
    ${step === 3 && html`<${FinishAccountCreation} name=${name} ledger=${ledger} /> `}
  `;
};

export default CreateAccount;
