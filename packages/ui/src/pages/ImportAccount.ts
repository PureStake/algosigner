import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { StoreContext } from 'services/StoreContext';
import HeaderView from 'components/HeaderView';
import Authenticate from 'components/Authenticate';

import { sendMessage } from 'services/Messaging';

const ImportAccount: FunctionalComponent = (props: any) => {
  const store: any = useContext(StoreContext);
  const { ledger } = props;
  const [mnemonic, setMnemonic] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [error, setError] = useState<string>('');

  const matches = mnemonic.trim().split(/[\s\t\r\n]+/) || [];
  const disabled = name.trim().length === 0 || matches.length !== 25;

  const importAccount = (pwd: string) => {
    const params = {
      passphrase: pwd,
      mnemonic: matches.join(' '),
      name: name.trim(),
      ledger: ledger,
    };
    setLoading(true);
    setAuthError('');
    setError('');

    sendMessage(JsonRpcMethod.ImportAccount, params, function (response) {
      if ('error' in response) {
        setLoading(false);
        switch (response.error) {
          case 'Login Failed':
            setAuthError('Wrong passphrase');
            break;
          default:
            setError(response.error);
            setAskAuth(false);
            break;
        }
      } else {
        store.updateWallet(response);
        route('/wallet');
      }
    });
  };

  const handleInput = (e) => {
    setMnemonic(e.target.value);
  };

  return html`
    <div
      class="main-view"
      style="flex-direction: column; justify-content: space-between;"
    >
      <${HeaderView}
        action="${() => route('/wallet')}"
        title="Import ${ledger} account"
      />
      <div class="px-3" style="flex: 1;">
        <input
          id="accountName"
          class="input"
          placeholder="Account name"
          value=${name}
          onInput=${(e) => setName(e.target.value)}
        />

        <p class="my-3">
          Insert the 25 word mnemonic of the acccount you want to import
        </p>

        <textarea
          id="enterMnemonic"
          class="textarea"
          placeholder="apples butter king monkey nuts ..."
          rows="5"
          onInput=${handleInput}
          value=${mnemonic}
        />

        <p class="mt-3 has-text-danger" style="height: 1.5em;">
          ${error !== undefined && error.length > 0 && error}
        </p>
      </div>
      <div style="padding: 1em;">
        <button
          class="button is-primary is-fullwidth"
          id="nextStep"
          disabled=${disabled}
          onClick=${() => {
            setAskAuth(true);
          }}
        >
          Continue
        </button>
      </div>
    </div>

    ${askAuth &&
    html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <${Authenticate}
            error=${authError}
            loading=${loading}
            nextStep=${importAccount}
          />
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick=${() => setAskAuth(false)}
        />
      </div>
    `}
  `;
};

export default ImportAccount;
