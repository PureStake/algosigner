import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useEffect } from 'preact/hooks';
import { Link } from 'preact-router';

function deny() {
  chrome.runtime.sendMessage({
      source:'extension',
      body:{
          jsonrpc: '2.0',
          method:'authorization-deny',
          params:[],
          id: (+new Date).toString(16)
      }
  });
}

const Authorize: FunctionalComponent = (props) => {
  useEffect(() => {
    window.addEventListener("beforeunload", deny);
    return () => window.removeEventListener("beforeunload", deny);
  }, []);


  const grant = () => {
    window.removeEventListener("beforeunload", deny);
    chrome.runtime.sendMessage({
        source:'extension',
        body:{
            jsonrpc: '2.0',
            method:'authorization-allow',
            params:[],
            id: (+new Date).toString(16)
        }
    });
  }

  return html`
      <div class="main-view" style="flex-direction: column; justify-content: space-between;">
        <div style="flex: 1">
          <section class="hero">
            <div class="hero-body">
              <h1 class="title">
                dApp requested access to your wallet!
              </h1>
            </div>
          </section>

          <section class="section pt-4">
            <h3>
              This will grant the following priviliges
            </h3>
            <p>
              Algosign is your new way sign and create transactions on the Algorand network.
            </p>
            <p class="mt-4">
              AlgoSign is also a hot wallet for Algorand currency, and can manage assets on the network.
            </p>
          </section>
        </div>

        <div class="mx-5 mb-3" style="display: flex;">
          <button class="button is-link is-outlined px-6"
            onClick=${deny}>
            Reject
          </button>
          <button class="button is-primary ml-3"
            style="flex: 1;"
            onClick=${grant}>
            Grant access
          </button>
        </div>
      </div>
    `
}

export default Authorize;