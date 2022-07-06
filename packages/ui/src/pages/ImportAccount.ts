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

const NUMBER_OF_WORDS = 25;
const EMPTY_MNEMONIC = new Array<string>(NUMBER_OF_WORDS);

const ImportAccount: FunctionalComponent = (props: any) => {
  const store: any = useContext(StoreContext);
  const { ledger } = props;
  const [mnemonicArray, setMnemonicArray] = useState<Array<string>>(EMPTY_MNEMONIC);
  const [address, setAddress] = useState<string>('');
  const [isRef, setIsRef] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [error, setError] = useState<string>('');

  const disabled =
    name.trim().length === 0 ||
    (!isRef && (mnemonicArray.length !== 25 || mnemonicArray.some((e) => e === ''))) ||
    (isRef && !algosdk.isValidAddress(address));

  const importAccount = (pwd: string) => {
    const params = {
      passphrase: pwd,
      mnemonic: mnemonicArray.join(' '),
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

  const handleMnemonicPaste = (e) => {
    // We get the pasted text and then split it into words
    const clipboardData = e.clipboardData;
    const inputText = clipboardData.getData('text');
    e.preventDefault();
    const inputArray = inputText.split(/[\s\t\r\n,]+/);
    const localMnemonicArray = [...mnemonicArray];

    if (inputArray.length === 1) {
      // If it is a single word then update that word placement in the array
      localMnemonicArray[+e.target.id.toString().replace('mnemonicWord', '')] = inputText;
    } else if (inputArray.length === NUMBER_OF_WORDS) {
      // If it is multiple words then verify there are 25 and split
      for (let i = 0; i < NUMBER_OF_WORDS; i++) {
        localMnemonicArray[i] = inputArray[i].trim();
      }

      // For the case the user is typing the full mnemonic
      // after the split the last element will be empty
      // so we must focus that element now to continue typing
      const element = document.getElementById('mnemonicWord24');
      if (element) {
        element.focus();
      }
    } else {
      // If it is multiple words but they are not 25 then warn, but allow for typing out 25.
      console.log('[WARNING] - Mnemonic words must be a single word or the entire 25 mnemonic.');
      localMnemonicArray[e.target.id.toString().replace('mnemonicWord', '')] = inputText;
    }
    setMnemonicArray(localMnemonicArray);
  };

  const handleAddressInput = (e) => {
    setAddress(e.target.value);
  };

  const handleMnemonicIconClick = (iconNumber) => {
    // Mnemonic boxes are prefixed with "mnemonicWord"
    const wordId = 'mnemonicWord' + iconNumber;
    const element = document.getElementById(wordId);

    // As long as we can locate the element just swap the show/hide icon and text/password
    if (element !== null) {
      if (element['type'] === 'password') {
        element['type'] = 'text';
        element.parentElement?.querySelectorAll('svg')[0]?.setAttribute('data-icon', 'eye');
      } else {
        element['type'] = 'password';
        element.parentElement?.querySelectorAll('svg')[0]?.setAttribute('data-icon', 'eye-slash');
      }
    }
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
                <span>Normal</span>
              </a>
            </li>
            <li class="${isRef ? 'is-active' : ''}">
              <a onClick="${() => setIsRef(true)}">
                <span>Reference</span>
                <span
                  style="border: none;"
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
          <div class="mb-3">
            <p>Insert the 25 word mnemonic of the account</p>
            <p>(Entire mnemonic may be pasted into a single field):</p>
          </div>
          <div class="pr-2" id="mnemonicBlock">
            ${[...mnemonicArray].map(
              (_, index) => html`
                <div class="word-block">
                  <label for="${`mnemonicWord${index}`}">${index + 1}:</label>
                  <input
                    id="${`mnemonicWord${index}`}"
                    type="password"
                    onPaste=${handleMnemonicPaste}
                    value=${mnemonicArray[index]}
                  />
                  <span
                    class="icon mnemonic-visibility"
                    onClick="${() => handleMnemonicIconClick(index)}"
                  >
                    <i class="fas fa-eye-slash" aria-hidden="true" />
                  </span>
                </div>
              `
            )}
          </div>
        `}
      </div>
      ${error &&
      error.length > 0 &&
      html`<p class="pt-2 has-text-danger has-text-centered">${error}</p>`}
      <div class="p-4">
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
