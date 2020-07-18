import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState } from 'preact/hooks';

import HeaderView from 'components/HeaderView'

const AccountKeys: FunctionalComponent = (props: any) => {
  const { account, nextStep, prevStep } = props;

  let grid : Array<any[]> = [[], [], [], [], []];
  const blocks : Array<any> = account.mnemonic.split(" ").map((word, idx) => html`
    <div class="mb-2" style="position: relative;">
      <div class="has-text-link"
        style="position: absolute; text-align: right; left: -1.2em; top: -0.2em; width: 1em; font-size: 0.6em;">
        ${idx+1}
      </div>
      ${word}
    </div>
  `);

  for (var i = 0; i < blocks.length; i++) {
    grid[i%5].push(blocks[i]);
  }

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${HeaderView} action=${prevStep} title="Save your keys!" />
      <div class="px-3" style="flex: 1;">
        <div class="mb-4" style="background: #EFF4F7; padding: 1em">
          <b>Account address</b>
          <p style="word-break: break-all;">${account.address}</p>
          <b>Mnemonic</b>
          <div class="columns is-mobile">
            ${grid.map(column => html`
              <div class="column is-one-fifth">${column}</div>
            `)}
          </div>
        </div>
        <p class="mb-4">Make sure you have the entire 25-word mnemonic, or you will lose access to this account forever.</p>
        <p>You will <b>not</b> be able to recover it.</p>
      </div>
      <div style="padding: 1em;">
        <button class="button is-primary is-fullwidth"
            onClick=${nextStep}>
          Continue
        </button>
      </div>
    </div>
  `;
};

export default AccountKeys;