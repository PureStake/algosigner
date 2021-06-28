import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState } from 'preact/hooks';
import { sendMessage } from 'services/Messaging';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import Authenticate from 'components/Authenticate';
import { ledgerActions } from './structure/ledgerActions';

const LedgerHardwareConnector: FunctionalComponent = (props: any) => {
  const { ledger } = props;
  const [name, setName] = useState<string>('');
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [error, setError] = useState<string>('');

  // The save address requires a connection to the ledger device via a web page
  // This page acts as the extension opened in a new tab
  const saveLedgerAddress = (pwd) => {
    setLoading(true);
    setAuthError('');
    setError('');

    // Obtain a leger address from the device
    ledgerActions.getAddress().then((response) => {
      // If we have an error display as normal, otherwise add the address to the saved profile
      if ('error' in response) {
        setLoading(false);
        setAskAuth(false);
        setError(`Error getting address from the Ledger hardware device. ${response['error']}`);
      } else {
        const params = {
          passphrase: pwd,
          name: name.trim(),
          ledger: ledger,
          hexAddress: response.message,
        };

        sendMessage(JsonRpcMethod.LedgerSaveAccount, params, function (response) {
          setLoading(false);
          setAuthError('');
          setError('');
          if ('error' in response) {
            switch (response['error']) {
              case 'Login Failed':
                setAuthError('Wrong passphrase');
                break;
              default:
                setAskAuth(false);
                setError(
                  `Error saving address from the Ledger hardware device. ${response['error']}`
                );
                break;
            }
          } else {
            setAskAuth(false);
            setIsComplete(true);
          }
        });
      }
    });
  };

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <div class="px-4 py-3 has-text-weight-bold is-size-5">
        <p style="overflow: hidden; text-overflow: ellipsis;"
          >Link ${ledger} account to AlgoSigner</p
        >
      </div>

      ${isComplete &&
      html`
        <div class="px-3" style="flex: 1;">
          <p class="my-3"> New account ${name} added for ${ledger}. </p>
          <p class="my-3"> You may now close this site and relaunch AlgoSigner.</p>
        </div>
      `}
      ${isComplete === false &&
      html`
        <div class="px-3" style="flex: 1;">
          <input
            id="accountName"
            class="input"
            placeholder="Account name"
            value=${name}
            onInput=${(e) => setName(e.target.value)}
          />

          <p class="my-3">
            Insert the hardware device and verify the Algorand application is open.
          </p>
          <p class="mt-3 has-text-danger" style="height: 1.5em;">
            ${error !== undefined && error.length > 0 && error}
          </p>
        </div>
        <div style="padding: 1em;">
          <button
            class="button is-primary is-fullwidth"
            id="nextStep"
            onClick=${() => {
              setAskAuth(true);
            }}
          >
            Add Address
          </button>
        </div>
      `}
    </div>

    ${askAuth &&
    html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <${Authenticate} error=${authError} loading=${loading} nextStep=${saveLedgerAddress} />
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

export default LedgerHardwareConnector;
