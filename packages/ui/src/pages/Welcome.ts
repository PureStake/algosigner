import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { Link, route } from 'preact-router';

import { StoreContext } from 'index'

import background from 'assets/background.png';
import logo from 'assets/logo-inverted.svg';
import logotype from 'assets/logotype-inverted.svg';

const Welcome: FunctionalComponent = (props) => {
  const store:any = useContext(StoreContext);

  // If there is a wallet then redirect to login.
  if (store.MainNet !== undefined) {
    route('/login');
  }
  return html`
    <div class="main-view has-text-white"
      style="flex-direction: column; justify-content: space-between; background:url(${background}); background-size: cover;">
      <div style="flex: 1">

        <section class="section pt-4 has-text-centered">
          <img src=${logo} class="py-6" width="120" />

          <h1 class="title is-6 mb-0 has-text-white">
            Welcome to
          </h1>
          <img src=${logotype} width="340" />
        </section>

        <section class="section pt-4">
          <p>
            AlgoSigner is your new way sign and create transactions on the Algorand network.
          </p>
          <p class="mt-4">
            It is also a hot wallet for Algorand currency, and can manage assets on the network.
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