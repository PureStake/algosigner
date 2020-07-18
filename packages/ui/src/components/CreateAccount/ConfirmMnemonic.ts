import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';

import HeaderView from 'components/HeaderView'

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const ConfirmMnemonic: FunctionalComponent = (props: any) => {
  const { account, nextStep, prevStep } = props;
  const [testMnemonic, setTestMnemonic] = useState<string>('');
  const [shuffledMnemonic, setShuffledMnemonic] = useState([]);

  useEffect(() => {
    // setShuffledMnemonic(shuffle(account.mnemonic.split(" ")));
    setShuffledMnemonic(account.mnemonic.split(" "));
  }, []);

  const addWord = (e) => {
    if (testMnemonic.length === 0)
      setTestMnemonic(e.target.name);
    else
      setTestMnemonic(testMnemonic + ' ' + e.target.name);
  };

  // 5x5 grid
  let grid : Array<any[]> = [];

  let buttons : Array<any> = shuffledMnemonic.map(word => html`
    <button class="button is-small is-fullwidth mt-3"
      name="${word}"
      disabled=${testMnemonic.includes(word)}
      onClick=${addWord}>
      ${word}
    </button>
  `);
  // let buttons : Array<any> = shuffledMnemonic.map(word => html`<code>is-three-quarters-mobile</code><br />`);

  while (buttons.length) {
    grid.push(buttons.splice(0, 5));
  }

  const notEqual = testMnemonic != account.mnemonic;
  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${HeaderView} action=${prevStep}
        title="Confirm your mnemonic" />
      <div class="px-3" style="flex: 1;">
        <p class="mb-4">Use the buttons below to confirm the mnemonic</p>
        <textarea placeholder="Use the buttons below the enter the 25 word mnemonic to add this account to your wallet" class="textarea" value=${testMnemonic} readonly></textarea>
        <div class="columns is-mobile">
          ${grid.map(column => html`<div class="column is-one-fifth">${column}</div>`)}
        </div>
      </div>
      <div style="padding: 1em;">
        <button class="button is-primary is-fullwidth"
          disabled=${notEqual}
          onClick=${nextStep}>
          Continue
        </button>
      </div>
    </div>
  `;
};

export default ConfirmMnemonic;