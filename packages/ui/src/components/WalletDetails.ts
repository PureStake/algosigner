import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useContext, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging'
import { StoreContext } from 'index'

import Authenticate from 'components/Authenticate'

const WalletDetails: FunctionalComponent = () => {
  const store:any = useContext(StoreContext);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  const deleteWallet = (pwd: string) => {
    const params = {
      passphrase: pwd
    };
    setLoading(true);
    setAuthError('');
    sendMessage(JsonRpcMethod.DeleteWallet, params, function(response) {
      if ('error' in response) { 
        setLoading(false);
        switch (response.error) {
          case "Login Failed":
            setAuthError('Wrong passphrase');
            break;
          default:
            setDeleting(false);
            alert(`There was an unkown error: ${response.error}`);
            break;
        }
      } else {
        store.updateWallet({});
        route('/');
      }
    });
  };

  if (!deleting)
    return html`
      <div class="box has-text-centered is-flex"
        style="overflow-wrap: break-word; height: 450px; flex-direction: column;">
        <b class="mb-5">Wallet settings</b>
        <div style="flex: 1;">

        </div>

        <a id="deleteWallet"
          class="is-danger"
          onClick=${() => setDeleting(true)}>
          REMOVE WALLET
        </button>
      </div>
    `
  else
    return html`
      <${Authenticate}
        error=${authError}
        loading=${loading}
        nextStep=${deleteWallet} />
    `
};

export default WalletDetails;