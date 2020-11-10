import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState } from 'preact/hooks';

import HeaderView from 'components/HeaderView';
import ToClipboard from 'components/ToClipboard';

const AccountKeys: FunctionalComponent = (props: any) => {
  const { account, nextStep, prevStep } = props;
  const [recorded, setRecorded] = useState<boolean>(false);

  let grid: Array<any[]> = [[], [], [], [], []];
  const blocks: Array<any> = account.mnemonic.split(' ').map((word, idx) => {
    if (idx % 5 === 0)
      return html`
        <div class="mb-1" style="position: relative;" id="div_${idx + 1}">
          <div
            class="has-text-link"
            style="position: absolute; text-align: right; left: -1.2em; top: -0.2em; width: 1em; font-size: 0.6em;"
          >
            ${idx + 1}
          </div>
          ${word}
        </div>
      `;

    return html`
      <div class="mb-1" style="position: relative;" id="div_${idx + 1}">
        ${word}
      </div>
    `;
  });

  for (var i = 0; i < blocks.length; i++) {
    grid[i % 5].push(blocks[i]);
  }

  return html`
    <div
      class="main-view"
      style="flex-direction: column; justify-content: space-between;"
    >
      <${HeaderView} action=${prevStep} title="Save your keys!" />
      <div class="px-3" style="flex: 1;">
        <div
          class="mb-4 px-4 py-2"
          style="background: #EFF4F7; border-radius: 5px;"
        >
          <div>
            <b>Public Account address</b>
            <${ToClipboard}
              class="is-pulled-right"
              style="font-size: 0.9em;"
              data=${account.address}
            />
          </div>
          <p
            style="word-break: break-all; font-size: 0.9em"
            id="accountAddress"
          >
            ${account.address}
          </p>
          <div style="display: flow-root;">
            <b>Mnemonic </b>
            <${ToClipboard}
              class="is-pulled-right"
              style="font-size: 0.9em;"
              data=${account.mnemonic}
            />
          </div>
          <div class="columns is-mobile">
            ${grid.map(
              (column) => html`
                <div class="column is-one-fifth">${column}</div>
              `
            )}
          </div>
        </div>
        <p class="mb-4">
          Make sure you have the entire <b>25-word mnemonic</b>, or you will
          <b>lose access to this account forever</b>.
        </p>
        <p>You will <b>not</b> be able to recover it.</p>
      </div>
      <div style="padding: 1em;">
        <label class="checkbox mb-4">
          <input
            type="checkbox"
            class="mr-2"
            id="recordCheckbox"
            name="recordCheckbox"
            value=${recorded}
            onClick=${() => setRecorded(!recorded)}
          />
          I’ve securely recorded my mnemonic
        </label>

        <button
          class="button is-primary is-fullwidth"
          disabled=${!recorded}
          id="nextStep"
          onClick=${nextStep}
        >
          Continue
        </button>
      </div>
    </div>
  `;
};

export default AccountKeys;
