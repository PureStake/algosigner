import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { StoreContext } from 'services/StoreContext';
import HeaderView from 'components/HeaderView';
import Authenticate from 'components/Authenticate';

import { sendMessage } from 'services/Messaging';
import { REFERENCE_ACCOUNT_TOOLTIP } from '@algosigner/common/strings';
import algosdk from 'algosdk';

const ImportAccount: FunctionalComponent = (props: any) => {
  const store: any = useContext(StoreContext);
  const { ledger } = props;
  const [mnemonic, setMnemonic] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isRef, setIsRef] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [error, setError] = useState<string>('');

  const matches = mnemonic.trim().split(/[\s\t\r\n]+/) || [];
  const disabled =
    name.trim().length === 0 ||
    (!isRef && matches.length !== 25) ||
    (isRef && !algosdk.isValidAddress(address));

  const importAccount = (pwd: string) => {
    const params = {
      passphrase: pwd,
      mnemonic: matches.join(' '),
      address: address,
      isRef: isRef,
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
        store.updateWallet(response, () => {
          route('/wallet');
        });
      }
    });
  };

  const handleMnemonicInput = (e) => {
    setMnemonic(e.target.value);
  };

  const handleAddressInput = (e) => {
    setAddress(e.target.value);
  };

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${HeaderView} action="${() => route('/wallet')}" title="Import ${ledger} account" />
      <div class="px-3" style="flex: 1;">
        <input
          id="accountName"
          class="input mb-2"
          placeholder="Account name"
          maxlength="32"
          value=${name}
          onInput=${(e) => setName(e.target.value)}
        />

        <span>Choose the type of account you want to import:</span>

        <div class="tabs is-toggle is-fullwidth my-2" style="overflow: unset;">
          <ul>
            <li class="${!isRef ? 'is-active' : ''}">
              <a onClick="${() => setIsRef(false)}">
                <span class="icon is-small">
                  <i class="fas fa-user-secret" aria-hidden="true" />
                </span>
                <span>Normal</span>
              </a>
            </li>
            <li class="${isRef ? 'is-active' : ''}">
              <a onClick="${() => setIsRef(true)}">
                <span class="icon is-small">
                  <i class="fas fa-user-alt" aria-hidden="true" />
                </span>
                <span>Reference</span>
                <span
                  style="margin-bottom: -0.25rem;"
                  class="icon is-small has-tooltip-arrow has-tooltip-bottom has-tooltip-bottom-right has-tooltip-fade"
                  data-tooltip="${REFERENCE_ACCOUNT_TOOLTIP}"
                >
                  <i class="fas fa-info-circle" aria-hidden="true" />
                </span>
              </a>
            </li>
          </ul>
        </div>

        ${isRef &&
        html`
          <p class="mt-3"
            >This type of account cannot sign transactions by itself without a private key or being
            rekeyed.</p
          >
          <p class="mb-3">Insert the public address of the account:</p>
          <textarea
            id="enterAddress"
            class="textarea has-fixed-size"
            placeholder="4XNGBX37MAVLC..."
            rows="2"
            onInput=${handleAddressInput}
            value=${address}
          />
        `}
        ${!isRef &&
        html`
          <p class="my-3">Insert the 25 word mnemonic of the account:</p>
          <textarea
            id="enterMnemonic"
            class="textarea has-fixed-size"
            placeholder="apples butter king monkey nuts ..."
            rows="5"
            onInput=${handleMnemonicInput}
            value=${mnemonic}
          />
        `}

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
          <${Authenticate} error=${authError} loading=${loading} nextStep=${importAccount} />
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
