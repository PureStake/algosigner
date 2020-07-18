import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';

import background from 'assets/background.png';
import logo from 'assets/logo-inverted.svg';

const Authenticate: FunctionalComponent = (props: any) => {
  const { nextStep } = props;
  const [pwd, setPwd] = useState<String>('');

  const disabled : boolean = pwd.length === 0;

  const handleEnter = (e) => {
    if (e.keyCode === 13 && !disabled) {
      nextStep(pwd);
    }
  }

  return html`
    <div class="section has-text-white has-text-centered">
      <img src=${logo} style="width: 150px;" />

      <p>
        AlgoSigner needs your password to continue
      </p>
      <input
        class="input my-5"
        id="enterPassword"
        type="password"
        placeholder="Password"
        value=${pwd}
        onKeyDown=${handleEnter}
        onInput=${(e)=>setPwd(e.target.value)}/>

      <button class="button is-link is-fullwidth mb-6"
        id="nextStep"
        disabled=${disabled}
        onClick=${() => nextStep(pwd)} >
        Continue
      </button>
    </div>
  `
}

export default Authenticate;