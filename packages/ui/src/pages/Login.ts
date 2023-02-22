import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext, useRef, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { SessionObject } from '@algosigner/common/types';

import { sendMessage } from 'services/Messaging';

import { StoreContext } from 'services/StoreContext';

import background from 'assets/background.png';
import logo from 'assets/logo-inverted.svg';

const Login: FunctionalComponent = (props: any) => {
  const { redirect } = props;
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLHeadingElement>(null);
  const store: any = useContext(StoreContext);

  const disabled = password.length === 0 || loading;

  const handleEnter = (e) => {
    if (e.keyCode === 13 && !disabled) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setError('');
    const params = {
      passphrase: password,
    };
    sendMessage(JsonRpcMethod.Login, params, function (response: SessionObject | { error }) {
      if ('error' in response) {
        setLoading(false);
        setError('Wrong password!');
      } else {
        const session = response as SessionObject;
        store.setAvailableLedgers(session.availableNetworks);
        store.updateWallet(session.wallet, () => {
          store.setLedger(session.network);
          if (redirect.length > 0) { 
            route(`/${redirect}`);
          } else { 
            route('/wallet');
          }
        });
      }
    });
  };

  useEffect(() => {
    if (inputRef !== null) {
      inputRef.current.focus();
    }
  }, []);

  return html`
    <div
      class="main-view"
      style="flex-direction: column; justify-content: space-between; background:url(${background}); background-size: cover; color: white;"
    >
      <div style="flex: 1">
        <section class="hero has-text-centered mb-6">
          <div class="hero-body">
            <img src=${logo} width="120" class="mb-3" />
          </div>
        </section>

        <section class="section pt-4">
          <input
            id="enterPassword"
            class="input"
            type="password"
            placeholder="Password"
            value=${password}
            onKeyDown=${handleEnter}
            ref=${inputRef}
            onInput=${(e) => setPassword(e.target.value)}
          />

          <p class="mt-5 has-text-centered is-size-7">
            AlgoSigner does not store your password. If you’ve forgotten your password, you’ll need
            to create a new wallet and re-link your accounts.
          </p>
          ${error.length > 0 &&
          html` <p class="mt-4 has-text-danger has-text-centered"> ${error} </p> `}
        </section>
      </div>

      <div class="mx-5 mb-4">
        <button
          id="login"
          class="button is-link is-fullwidth ${loading ? 'is-loading' : ''}"
          disabled=${disabled}
          onClick=${login}
        >
          Login
        </button>
      </div>
    </div>
  `;
};

export default Login;
