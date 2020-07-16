import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { Link, route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging'

import { StoreContext } from 'index'

const Login: FunctionalComponent = (props) => {
  const [pwd, setPwd] = useState<String>('');
  const [error, setError] = useState<String>('');
  const store:any = useContext(StoreContext);

  const login = () => {
    const params = {
      passphrase: pwd
    };
    sendMessage(JsonRpcMethod.Login, params, function(response) {
      if ('error' in response){
        setError('Wrong password!')
      } else {
        store.updateWallet(response)
        route('/wallet');
      }
    });
  };

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <div style="flex: 1">
        <section class="hero is-primary has-text-centered">
          <div class="hero-body">
            <h1 class="title">
              Authenticate
            </h1>
          </div>
        </section>

        <section class="section pt-7">
          <input
            class="input"
            type="password"
            placeholder="Password"
            value=${pwd}
            onInput=${(e)=>setPwd(e.target.value)}/>

          <p class="mt-5 has-text-centered is-size-7">
            AlgoSigner does not store your password. If you’ve forgotten your password, you’ll need to create a new wallet and re-link your accounts.
          </p>
          ${error.length > 0 && html`
            <p class="mt-4 has-text-danger has-text-centered">
              ${error}
            </p>
          `}
        </section>
      </div>

      <div class="mx-5 mb-3">
        <button class="button is-link is-fullwidth"
          disabled=${pwd.length === 0}
          onClick=${login} >
          Login
        </button>
      </div>
    </div>
  `
}

export default Login;