import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useContext, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging';
import { StoreContext } from 'services/StoreContext';

import Authenticate from 'components/Authenticate';

const WalletDetails: FunctionalComponent = () => {
  const store: any = useContext(StoreContext);
  const [status, setStatus] = useState<string>('details');
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
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
            setStatus('remove');
            alert(`There was an unkown error: ${response.error}`);
            break;
        }
      } else {
        store.updateWallet({});
        route('/');
      }
    });
  };

  switch (status) {
    case 'remove':
      return html`
        <div
          class="box is-flex"
          style="overflow-wrap: break-word; height: 450px; flex-direction: column;"
        >
          <b class="has-text-centered my-5 is-size-5">You sure?</b>
          <div style="flex: 1;">
            <p>Type "REMOVE FOREVER"</p>
            <input
              id="setConfirmText"
              class="input my-4"
              value=${confirmText}
              onInput=${(e) => setConfirmText(e.target.value)}
            />
            <p>
              Deleted wallets cannot be recovered, but your accounts can be
              restored using their mnemonic.
            </p>
          </div>

          <button
            id="removeWalletConfirm"
            class="button is-danger is-fullwidth"
            disabled=${confirmText !== 'REMOVE FOREVER'}
            onClick=${() => setStatus('auth')}
          >
            REMOVE WALLET
          </button>
        </div>
      `;
    case 'auth':
      return html`
        <${Authenticate}
          error=${authError}
          loading=${loading}
          nextStep=${deleteWallet}
        />
      `;
    case 'details':
    default:
      return html`
        <div class="box has-text-centered is-flex"
          style="overflow-wrap: break-word; height: 450px; flex-direction: column;">
          <b class="mb-5">Wallet settings</b>
          <div style="flex: 1;">
          </div>

          <a id="removeWallet"
            class="is-danger"
            onClick=${() => setStatus('remove')}>
            REMOVE WALLET
          </button>
        </div>
      `;
  }
};

export default WalletDetails;
