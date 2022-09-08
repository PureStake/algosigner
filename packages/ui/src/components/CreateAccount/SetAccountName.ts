import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';

const SetAccountName: FunctionalComponent = (props: any) => {
  const { name, setName, ledger, nextStep } = props;

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <div class="px-4 py-3 has-text-weight-bold is-size-5">
        <p style="overflow: hidden; text-overflow: ellipsis;">Create ${ledger} Account</p>
      </div>
      <div class="px-4" style="flex: 1;">
        <input
          id="setAccountName"
          class="input mb-4"
          placeholder="Account name"
          maxlength="32"
          value=${name}
          onInput=${(e) => setName(e.target.value)}
        />
        <p class="mb-4"
          >After making this screen, you will be provided with the public key and mnemonic for your
          new account.</p
        >
        <p class="mb-4">It will only be shown once.</p>
        <p class="mb-4"
          >Make sure you have a secure location to store these keys. They are the only way to access
          your account in the future.</p
        >
        <b
          >If your mnemonic is lost, you will be locked out of your account
          <span class="has-text-link"> FOREVER</span>.</b
        >
      </div>
      <div style="padding: 1em;">
        <button
          class="button is-primary is-fullwidth"
          id="nextStep"
          disabled=${name.length === 0}
          onClick=${nextStep}
        >
          Continue
        </button>
      </div>
    </div>
  `;
};

export default SetAccountName;
