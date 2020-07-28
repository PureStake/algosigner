import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';

import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import Authenticate from 'components/Authenticate'
import { sendMessage } from 'services/Messaging'

function deny() {
  sendMessage(JsonRpcMethod.SignDeny, {}, function() {});
}

const SignTransaction: FunctionalComponent = (props) => {
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [tx, setTx] = useState<string>('');

  chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
      if(request.body.method == JsonRpcMethod.SignTransaction) {
        let txParams = request.body.params;
        delete txParams.__;
        delete txParams.__b;
          setTx(JSON.stringify(txParams, null, 2));
      }
  });

  useEffect(() => {
    window.addEventListener("beforeunload", deny);
    return () => window.removeEventListener("beforeunload", deny);
  }, []);


  const sign = (pwd: string) => {
    const params = {
      passphrase: pwd,
    };
    setLoading(true);
    setAuthError('');
    setError('');
    window.removeEventListener("beforeunload", deny);


    sendMessage(JsonRpcMethod.SignAllow, params, function(response) {
      if ('error' in response) { 
        window.addEventListener("beforeunload", deny);
        setLoading(false);
        switch (response.error) {
          case "Login Failed":
            setAuthError('Wrong passphrase');
            break;
          default:
            setError(response.error);
            setAskAuth(false);
            break;
        }
      }
    });
  }


  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <div style="flex: 1">
        <section class="hero">
          <div class="hero-body">
            <h1 class="title">
              dApp wants to sign a transaction!
            </h1>
          </div>
        </section>

        <section class="section pt-4">
          <pre>
            <code>${tx}</code>
          </pre>
        </section>
      </div>

      <div class="mx-5 mb-3" style="display: flex;">
        <button class="button is-link is-outlined px-6"
          onClick=${deny}>
          Reject
        </button>
        <button class="button is-primary ml-3"
          style="flex: 1;"
          onClick=${() => {setAskAuth(true)}}>
          Sign!
        </button>
      </div>
    </div>

    ${ askAuth && html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content" style="padding: 0 15px;">
          <${Authenticate}
            error=${authError}
            loading=${loading}
            nextStep=${sign} />
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${()=>setAskAuth(false)} />
      </div>
    `}
  `
}

export default SignTransaction;