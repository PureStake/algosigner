import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useContext, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging';
import { StoreContext } from 'services/StoreContext';

import Authenticate from 'components/Authenticate';

const CONFIRMATION_STRING = 'DELETE FOREVER';

const DeleteWallet: FunctionalComponent = () => {
  const store: any = useContext(StoreContext);
  const [auth, setAuth] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>('');

  const deleteWallet = (pwd: string) => {
    const params = {
      passphrase: pwd,
    };
    setLoading(true);
    setAuthError('');
    sendMessage(JsonRpcMethod.DeleteWallet, params, function (response) {
      if ('error' in response) {
        setLoading(false);
        switch (response.error) {
          case 'Login Failed':
            setAuthError('Wrong passphrase');
            break;
          default:
            setAuth(false);
            alert(`There was an unkown error: ${response.error}`);
            break;
        }
      } else {
        store.updateWallet({});
        route('/');
      }
    });
  };

  return html`
    ${auth &&
    html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <${Authenticate} error=${authError} loading=${loading} nextStep=${deleteWallet} />
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${() => setAuth(false)} />
      </div>
    `}
    <div class="box is-flex pt-2" style="overflow-wrap: break-word; flex-direction: column;">
      <b class="has-text-centered mb-5 is-size-5">You sure?</b>
      <div style="flex: 1;">
        <p>Type "${CONFIRMATION_STRING}"</p>
        <input
          id="setConfirmText"
          class="input my-4"
          value=${confirmText}
          onInput=${(e) => setConfirmText(e.target.value)}
        />
        <p
          >Deleted wallets cannot be recovered, but your accounts can be restored using their
          mnemonic.</p
        >
      </div>

      <button
        id="deleteWalletConfirm"
        class="button is-danger is-fullwidth mt-4"
        disabled=${confirmText !== CONFIRMATION_STRING}
        onClick=${() => setAuth(true)}
      >
        DELETE WALLET
      </button>
    </div>
  `;
};

export default DeleteWallet;
