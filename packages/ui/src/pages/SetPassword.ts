import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { Link, route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging'

import { StoreContext } from 'index'

const SetPassword: FunctionalComponent = (props) => {
  const [pwd, setPwd] = useState<String>('');
  const [confirmPwd, setConfirmPwd] = useState<String>('');
  const [error, setError] = useState<String>('');
  const store:any = useContext(StoreContext);

  const createWallet = () => {
    if (pwd !== confirmPwd){
      setError("Confirmation doesn't match!");
      return false;
    } else if (pwd.length < 8){
      setError("Password needs at least 8 characters!");
      return false;
    }

    const params = {
      passphrase: pwd
    };
    sendMessage(JsonRpcMethod.CreateWallet, params, function(response) {
      if ('error' in response){
        alert(response);
      } else {
        store.updateWallet(response);
        route('/wallet');
      }
    });
  };

  return html`
      <div class="main-view" style="flex-direction: column; justify-content: space-between;">
        <div style="flex: 1">
          <section class="hero is-primary has-text-centered">
            <div class="hero-body py-5">
              <h1 class="title">
                Create a Memorable Password
              </h1>
            </div>
          </section>

          <section class="section pt-4">
            <p>
              You don’t need a username, this wallet is tied to this browser. If you forget your password, your wallet will be lost. Make your password strong (at least 8 characters) and easy to remember.
            </p>
            <p class="mt-4">
              We recommend using a sentence that is meaningful, for "example". “my_1st_game_was_GALAGA!”
            </p>
            <input
              class="input mt-4"
              placeholder="Password"
              type="password"
              value=${pwd}
              onInput=${(e)=>setPwd(e.target.value)}/>
            <input
              class="input mt-4"
              type="password"
              placeholder="Confirm password"
              value=${confirmPwd}
              onInput=${(e)=>setConfirmPwd(e.target.value)}/>

            ${ error.length > 0 && html`
              <p class="mt-4 has-text-danger has-text-centered">
                ${error}
              </p>
            `}
          </section>
        </div>

        <div class="mx-5 mb-3">
          <button
            class="button is-link is-fullwidth"
            disabled=${pwd.length === 0 || confirmPwd.length === 0}
            onClick=${createWallet}>
            Create wallet
          </button>
        </div>
      </div>
    `
}

export default SetPassword;