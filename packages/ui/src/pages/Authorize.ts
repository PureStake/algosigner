import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { Link } from 'preact-router';

const Authorize: FunctionalComponent = (props) => {
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

        <div class="mx-5 mb-3">
          <${Link} class="button is-link" href="/set-password">
            Reject
          <//>
          <${Link} class="button is-link" href="/set-password">
            Authorize access
          <//>
        </div>
      </div>
    `
}

export default Authorize;