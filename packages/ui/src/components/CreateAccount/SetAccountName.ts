import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useObserver } from 'mobx-react-lite';
import { route } from 'preact-router';

import HeaderView from 'components/HeaderView'

const SetAccountName: FunctionalComponent = (props: any) => {
  const { name, setName, ledger, account, nextStep } = props;

  // TODO: Add check if name is already in use
  // let ddClass: string = "dropdown is-right";
  //   ddClass += " is-active";

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${HeaderView} action="${() => route('/wallet')}"
        title="Create ${ledger} Account" />
      <div class="px-3" style="flex: 1;">
        <input
          class="input mb-4"
          placeholder="Account name"
          value=${name}
          onInput=${(e)=>setName(e.target.value)}/>
        <p class="mb-4">After making this screen, you will be provided with the public key and mnemonic for your new account.</p>
        <p class="mb-4">It will only be shown once.</p>
        <p class="mb-4">Make sure you have a secure location to store these keys. They are the only way to access your account in the future.</p>
        <b>If your mnemonic is lost, you will be locked out of your account <span class="has-text-link">FOREVER</span>.</b>
      </div>
      <div style="padding: 1em;">
        <button class="button is-primary is-fullwidth"
          disabled=${name.length === 0}
          onClick=${nextStep}>
          Continue
        </button>
      </div>
    </div>
  `;
};

export default SetAccountName;