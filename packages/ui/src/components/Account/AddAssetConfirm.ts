import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging';

import Authenticate from 'components/Authenticate';

const AddAssetConfirm: FunctionalComponent = (props: any) => {
  const { asset, ledger, address, accountsAssetsIDs } = props;
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [txId, setTxId] = useState('');

  const disabled = accountsAssetsIDs.includes(asset['asset_id']);

  const addAsset = (pwd: string) => {
    const params = {
      ledger: ledger,
      passphrase: pwd,
      address: address,
      txnParams: {
        type: 'axfer',
        assetIndex: asset['asset_id'],
        from: address,
        to: address,
        amount: 0,
      },
    };

    setLoading(true);
    setAuthError('');
    sendMessage(JsonRpcMethod.SignSendTransaction, params, function (response) {
      if (response && 'error' in response) {
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
        setAskAuth(false);
        setTxId(response.txId);
      }
    });
  };

  return html`
    ${!askAuth &&
    txId.length === 0 &&
    !error &&
    html`
      <div class="box" style="overflow-wrap: break-word;">
        <div class="has-text-centered mb-2">
          <b>Adding Asset</b>
          <br />
          <span class="has-text-grey-light">${asset['asset_id']}</span>
        </div>

        ${asset.name &&
        html`
          <div>
            <b>Asset name</b>
            <span class="is-pulled-right"><b>${asset.name}</b></span>
          </div>
        `}
        ${asset.name && asset['unit_name'] && html` <hr class="my-2" /> `}
        ${asset['unit_name'] &&
        asset['unit_name'].length > 0 &&
        html`
          <div>
            <b>Unit name</b>
            <span class="is-pulled-right"><b>${asset['unit_name']}</b></span>
          </div>
        `}

        <div class="has-text-centered mt-3">
          <a
            href=${`https://goalseeker.purestake.io/algorand/${ledger.toLowerCase()}/asset/${
              asset['asset_id']
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            See asset details in GoalSeeker
          </a>
        </div>

        <p class="has-text-centered has-text-grey-light my-3">
          Adding an asset requires sending a transaction with a minimum transaction fee.
        </p>

        <button
          id="addAsset"
          class="button is-primary is-fullwidth"
          onClick=${() => setAskAuth(true)}
          disabled=${disabled}
        >
          ${disabled ? 'You already added this asset' : 'Add asset!'}
        </button>
      </div>
    `}
    ${txId.length > 0 &&
    html`
      <div class="box has-text-centered">
        <b>Transaction sent!</b>
        <div class="mt-3">
          <a
            href=${`https://goalseeker.purestake.io/algorand/${ledger.toLowerCase()}/transaction/${txId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            See transaction details in GoalSeeker
          </a>
        </div>
        <button
          id="backToWallet"
          class="button is-primary is-fullwidth mt-4"
          onClick=${() => route(`/${ledger}/${address}`)}
        >
          Back to account!
        </button>
      </div>
    `}
    ${error !== undefined &&
    error.length > 0 &&
    html`
      <div class="box">
        <p class="has-text-danger has-text-weight-bold mb-2">
          Transaction failed with the following error:
        </p>
        <p id="tx-error">${error}</p>
      </div>
    `}
    ${askAuth &&
    html` <${Authenticate} error=${authError} loading=${loading} nextStep=${addAsset} /> `}
  `;
};

export default AddAssetConfirm;
