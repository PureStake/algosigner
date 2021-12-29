import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';

import HeaderView from 'components/HeaderView';

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  a.sort((x, y) => x.localeCompare(y));
  return a;
}

const ConfirmMnemonic: FunctionalComponent = (props: any) => {
  const { account, nextStep, prevStep } = props;
  const [referenceMnemonic, setReferenceMnemonic] = useState<string>('');
  const [wordIndexArray, setWordIndexArray] = useState<Array<number>>([]);
  const [lastWordIndex, setLastWordIndex] = useState<number>(-1);
  const [shuffledMnemonic, setShuffledMnemonic] = useState([]);

  useEffect(() => {
    setShuffledMnemonic(shuffle(account.mnemonic.split(' ')));
    setWordIndexArray(new Array(25).fill(-1));
  }, []);

  const addWord = (e) => {
    const newWordIndex = +e.target.dataset['index'];
    const newIndexArray = wordIndexArray.slice();

    if (newWordIndex === lastWordIndex) {
      const lastUsedIndex = newIndexArray.indexOf(lastWordIndex);
      newIndexArray[lastUsedIndex] = -1;
      setLastWordIndex(lastUsedIndex === 0 ? -1 : newIndexArray[lastUsedIndex - 1]);
    } else {
      const availablePosition = newIndexArray.indexOf(-1);
      newIndexArray[availablePosition] = newWordIndex;
      setLastWordIndex(newWordIndex);
    }

    const newMnemonic = newIndexArray
      .filter((index) => index > -1)
      .map((wordIndex) => shuffledMnemonic[wordIndex])
      .join(' ');

    setReferenceMnemonic(newMnemonic);
    setWordIndexArray(newIndexArray);
  };

  const disabledWord = (wordIndex) => {
    return lastWordIndex !== wordIndex && wordIndexArray.includes(wordIndex);
  };

  // 5x5 grid
  const grid: Array<any[]> = [];

  const buttons: Array<any> = shuffledMnemonic.map(
    (word, index) => html`
      <button
        class="button is-small is-fullwidth mt-3 ${index === lastWordIndex
          ? 'is-light is-link'
          : ''}"
        id="${word}"
        data-index="${index}"
        disabled=${disabledWord(index)}
        onClick=${addWord}
      >
        ${word}
      </button>
    `
  );

  while (buttons.length) {
    grid.push(buttons.splice(0, 5));
  }

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${HeaderView} action=${prevStep} title="Confirm your mnemonic" />
      <div class="px-3" style="flex: 1;">
        <p class="mb-4">Use the buttons below to confirm the mnemonic</p>
        <textarea
          id="enterMnemonic"
          placeholder="Use the buttons below the enter the 25 word mnemonic to add this account to your wallet"
          class="textarea has-fixed-size"
          value=${referenceMnemonic}
          readonly
        ></textarea>
        <div class="columns is-mobile">
          ${grid.map((column) => html`<div class="column is-one-fifth">${column}</div>`)}
        </div>
      </div>
      <div style="padding: 1em;">
        <button
          class="button is-primary is-fullwidth"
          id="nextStep"
          disabled=${referenceMnemonic !== account.mnemonic}
          onClick=${nextStep}
        >
          Continue
        </button>
      </div>
    </div>
  `;
};

export default ConfirmMnemonic;
