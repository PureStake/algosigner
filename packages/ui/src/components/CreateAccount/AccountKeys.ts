import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState } from 'preact/hooks';

import HeaderView from 'components/HeaderView'

const AccountKeys: FunctionalComponent = (props: any) => {
  const { account, nextStep, prevStep } = props;

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${HeaderView} action=${prevStep} title="Save your keys!" />
      <div class="px-3" style="flex: 1;">
        <div style="background: #EFF4F7; padding: 1em">
          <b>Account address</b>
          <p style="word-break: break-all;">${account.address}</p>
          <b>Mnemonic</b>
          <p>${account.mnemonic}</p>
        </div>
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