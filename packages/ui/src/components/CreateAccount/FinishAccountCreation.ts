import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';

const FinishAccountCreation: FunctionalComponent = (props: any) => {
  const { name, ledger } = props;

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <div class="px-4 py-3 has-text-weight-bold is-size-5">
        <p class="" style="overflow: hidden; text-overflow: ellipsis;">Created Account</p>
      </div>
      <div class="px-4" style="flex: 1;">
        <p data-account-name="${name}">New account '${name}' added for ${ledger}.</p>
        <p class="my-3">You may now close this site and reopen AlgoSigner.</p>
      </div>
    </div>
  `;
};

export default FinishAccountCreation;
