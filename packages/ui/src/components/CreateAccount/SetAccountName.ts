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
        title="Create a ${ledger} account!" />
      <div class="px-3" style="flex: 1;">
        <input
          class="input"
          placeholder="Account name"
          value=${name}
          onInput=${(e)=>setName(e.target.value)}/>
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

export default SetAccountName;