import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { Link, route } from 'preact-router';

import { StoreContext } from 'index'

const Welcome: FunctionalComponent = (props) => {
  const store:any = useContext(StoreContext);

  if (store.password) {
    route('/login');
  }
  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <div style="flex: 1">
        <section class="hero is-primary has-text-centered">
          <div class="hero-body">
            <h3 class="subtitle">
              Welcome to
            </h3>
            <h1 class="title">
              Algosigner
            </h1>
          </div>
        </section>

        <section class="section pt-4">
          <p>
            Algosign is your new way sign and create transactions on the Algorand network.
          </p>
          <p class="mt-4">
            AlgoSign is also a hot wallet for Algorand currency, and can manage assets on the network.
          </p>
        </section>
      </div>

      <div class="mx-5 mb-3">
        <${Link} class="button is-link is-fullwidth" href="/set-password">
          Get started
        <//>
      </div>
    </div>
  `
}

export default Welcome;