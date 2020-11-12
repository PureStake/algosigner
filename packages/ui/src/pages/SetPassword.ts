import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import zxcvbn from 'zxcvbn';

import { sendMessage } from 'services/Messaging';

import { StoreContext } from 'services/StoreContext';

import background from 'assets/background.png';
import walletLock from 'assets/wallet-lock.png';

const SetPassword: FunctionalComponent = () => {
  const [pwd, setPwd] = useState<string>('');
  const [confirmPwd, setConfirmPwd] = useState<string>('');
  const [error, setError] = useState<string>('');
  const store: any = useContext(StoreContext);

  const createWallet = () => {
    if (pwd !== confirmPwd) {
      setError("Confirmation doesn't match!");
      return false;
    } else if (pwd.length < 8 || pwd.length > 64) {
      setError('Password needs to be 8-64 characters long!');
      return false;
    }

    const params = {
      passphrase: pwd,
    };

    sendMessage(JsonRpcMethod.CreateWallet, params, function (response) {
      if ('error' in response) {
        setError(response.error);
      } else {
        store.updateWallet(response.wallet);
        store.setLedger(response.ledger);
        route('/wallet');
      }
    });
  };

  return html`
    <div
      class="main-view"
      style="flex-direction: column; justify-content: space-between;"
    >
      <div style="flex: 1">
        <section
          class="has-text-centered py-3"
          style="background:url(${background}); background-size: cover;"
        >
          <img src=${walletLock} width="150" />
        </section>

        <section class="section pt-4 pb-0">
          <p>
            You don’t need a username, this wallet is tied to this browser. If
            you forget your password, your wallet will be lost. Make your
            password strong (at least 8 characters) and easy to remember.
          </p>
          <p class="mt-2">
            We recommend using a sentence that is meaningful, for "example".
            “my_1st_game_was_GALAGA!”
          </p>
          <input
            class="input mt-4"
            placeholder="Password"
            id="setPassword"
            type="password"
            value=${pwd}
            onInput=${(e) => {
              setPwd(e.target.value);
              setError('');
            }}
          />
          <input
            class="input mt-4"
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value=${confirmPwd}
            onInput=${(e) => {
              setConfirmPwd(e.target.value);
              setError('');
            }}
          />
          ${error.length > 0 &&
          html`
            <p class="mt-4 has-text-danger has-text-centered">${error}</p>
          `}
          <div class="mt-3 has-text-centered  fa-sm">
            ${error.length == 0 &&
            html` <div
              style="display:flex; color:rgb(${255 -
              (zxcvbn(pwd).score + 1) * 50},${zxcvbn(pwd).score * 50},50);"
            >
              <div class="mx-2 mt-2 mb-2" style="order: 1; align-self: center;">
                <span>
                  <i class="fas fa-lock fa-2x" aria-hidden="true"></i>
                </span>
              </div>
              ${zxcvbn(pwd).score < 3 &&
              html`<div style="order: 2;">
                ${zxcvbn(pwd).feedback.suggestions.join('\n')}
              </div>`}
              ${zxcvbn(pwd).score > 2 &&
              html`<div style="order: 2;">
                Complexity acceptable. Estimated guesses: ${zxcvbn(pwd).guesses}
              </div>`}
            </div>`}
          </div>
        </section>
      </div>

      <div class="mx-5 mb-3">
        <button
          id="createWallet"
          class="button is-link is-fullwidth"
          disabled=${pwd.length === 0 || confirmPwd.length === 0}
          onClick=${createWallet}
        >
          Create wallet
        </button>
      </div>
    </div>
  `;
};

export default SetPassword;
