import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext, useEffect } from 'preact/hooks';
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
  const wordsNumber = 25;
  const { ledger } = props;
  const [mnemonicArray, setMnemonicArray] = useState<Array<string>>(new Array<string>(wordsNumber));
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
    // Trim mnemonic words
    for (let i = 0; i < mnemonicArray.length; i++) {
      mnemonicArray[i] = mnemonicArray[i].trim();     
    }

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

  const handleMnemonicInput = (e) => {
    const localMnemonicArray = mnemonicArray;
    const inputText = e.target.value.toString();
    const inputArray = inputText.split(/[\s\t\r\n,]+/);
    
    // If it is a single word then update that word placement in the array
    if (inputArray.length === 1) {
      localMnemonicArray[e.target.id.toString().replace('mnemonicWord', '')] = inputText;
    }
    // If it is multiple words then verify there are 25 and split
    else if (inputArray.length === wordsNumber) {
        for(let i = 0; i < wordsNumber; i++) {
          localMnemonicArray[i.toString()] = inputArray[i];
        }

        // For the case the user is typing the full mnemonic 
        // after the split the last element will be empty
        // so we must focust that element now to continue typing
        const element = document.getElementById('mnemonicWord24');
        if (element) {
          element.focus();
        }

    }
    // If it is multiple words but they are not 25 then warn, but allow for typing out 25.   
    else {
      console.log('[WARNING] - Mnemonic words must be a single word or the entire 25 mnemonic.')
      localMnemonicArray[e.target.id.toString().replace('mnemonicWord', '')] = inputText;
    }

    setMnemonicArray([]);
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
        element.parentElement?.querySelectorAll('svg')[0]?.setAttribute('data-icon','eye');
      }
      else {
        element['type'] = 'password';
        element.parentElement?.querySelectorAll('svg')[0]?.setAttribute('data-icon','eye-slash');
      }  
    }
  }

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
        <p class="my-3">
          <div>
            Insert the 25 word mnemonic of the account
          </div>
          <div>
            (Entire mnemonic may be pasted into a single field):
          </div>
        </p>
        <div id="mnemonicBlock" style="display: flex; flex-wrap: wrap; text-align: right; padding-right: 30px;">
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord0" style="margin-right: 5px;">1:</label>           
            <input id="mnemonicWord0" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[0]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('0')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord1" style="margin-right: 5px;">2:</label>           
            <input id="mnemonicWord1" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[1]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('1')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord2" style="margin-right: 5px;">3:</label>           
            <input id="mnemonicWord2" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[2]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('2')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord3" style="margin-right: 5px;">4:</label>           
            <input id="mnemonicWord3" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[3]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('3')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord4" style="margin-right: 5px;">5:</label>           
            <input id="mnemonicWord4" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[4]} />    
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('4')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord5" style="margin-right: 5px;">6:</label>           
            <input id="mnemonicWord5" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[5]} />  
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('5')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord6" style="margin-right: 5px;">7:</label>           
            <input id="mnemonicWord6" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[6]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('6')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord7" style="margin-right: 5px;">8:</label>           
            <input id="mnemonicWord7" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[7]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('7')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord8" style="margin-right: 5px;">9:</label>           
            <input id="mnemonicWord8" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[8]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('8')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord9" style="margin-right: 5px;">10:</label>           
            <input id="mnemonicWord9" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[9]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('9')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord10" style="margin-right: 5px;">11:</label>           
            <input id="mnemonicWord10" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[10]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('10')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord11" style="margin-right: 5px;">12:</label>           
            <input id="mnemonicWord11" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[11]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('11')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord12" style="margin-right: 5px;">13:</label>           
            <input id="mnemonicWord12" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[12]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('12')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord13" style="margin-right: 5px;">14:</label>           
            <input id="mnemonicWord13" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[13]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('13')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord14" style="margin-right: 5px;">15:</label>           
            <input id="mnemonicWord14" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[14]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('14')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord15" style="margin-right: 5px;">16:</label>           
            <input id="mnemonicWord15" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[15]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('15')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord16" style="margin-right: 5px;">17:</label>           
            <input id="mnemonicWord16" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[16]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('16')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord17" style="margin-right: 5px;">18:</label>           
            <input id="mnemonicWord17" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[17]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('17')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord18" style="margin-right: 5px;">19:</label>           
            <input id="mnemonicWord18" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[18]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('18')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord19" style="margin-right: 5px;">20:</label>           
            <input id="mnemonicWord19" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[19]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('19')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord20" style="margin-right: 5px;">21:</label>           
            <input id="mnemonicWord20" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[20]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('20')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord21" style="margin-right: 5px;">22:</label>           
            <input id="mnemonicWord21" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[21]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('21')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord22" style="margin-right: 5px;">23:</label>           
            <input id="mnemonicWord22" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[22]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('22')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord23" style="margin-right: 5px;">24:</label>           
            <input id="mnemonicWord23" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[23]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('23')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>    
          <div style="display: block; width: 33%;">
            <label for="mnemonicWord24" style="margin-right: 5px;">25:</label>           
            <input id="mnemonicWord24" type="password" style="width: 55%" onInput=${handleMnemonicInput} value=${mnemonicArray[24]} />
            <span class="icon ml-1" onClick="${() => handleMnemonicIconClick('24')}">
              <i class="fas fa-eye-slash" aria-hidden="true" />
            </span>
          </div>
        </div>
        `}
       
        <p class="pt-2 has-text-danger">
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
