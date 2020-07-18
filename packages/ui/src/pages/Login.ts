import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { Link, route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging'

import { StoreContext } from 'index'

import background from 'assets/background.png';
import logo from 'assets/logo-inverted.svg';

const Login: FunctionalComponent = (props) => {
  const [pwd, setPwd] = useState<String>('');
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<String>('');
  const store:any = useContext(StoreContext);

  const disabled = pwd.length === 0 || loading;

  const handleEnter = (e) => {
    if (e.keyCode === 13 && !disabled) {
      login();
    }
  }

  const login = () => {
    setLoading(true);
    setError('');
    const params = {
      passphrase: pwd
    };
    sendMessage(JsonRpcMethod.Login, params, function(response) {
      if ('error' in response){
        setLoading(false);
        setError('Wrong password!');
      } else {
        store.updateWallet(response);
        route('/wallet');
      }
    });
  };

  return html`
    <div class="main-view"
      style="flex-direction: column; justify-content: space-between; background:url(${background}); background-size: cover; color: white;">
      <div style="flex: 1">
        <section class="hero has-text-centered mb-6">
          <div class="hero-body">
            <img src=${logo} width="120" class="mb-3" />
          </div>
        </section>

        <section class="section pt-4">
          <input
            class="input"
            type="password"
            placeholder="Password"
            value=${pwd}
            onKeyDown=${handleEnter}
            onInput=${(e)=>setPwd(e.target.value)}/>

          <p class="mt-5 has-text-centered is-size-7">
            AlgoSigner does not store your password. If you’ve forgotten your password, you’ll need to create a new wallet and re-link your accounts.
          </p>
          ${ error.length > 0 && html`
            <p class="mt-4 has-text-danger has-text-centered">
              ${error}
            </p>
          `}
        </section>
      </div>

      <div class="mx-5 mb-3">
        <button
          class="button is-link is-fullwidth ${loading ? 'is-loading':''}"
          disabled=${disabled}
          onClick=${login}>
          Login
        </button>
      </div>
    </div>
  `
}

export default Login;