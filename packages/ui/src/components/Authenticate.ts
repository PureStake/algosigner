import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';


const Authenticate: FunctionalComponent = (props: any) => {
  const { nextStep } = props;
  const [pwd, setPwd] = useState<String>('');
  const [error, setError] = useState<String>('');


  return html`
    <div class="main-view"
      style="flex-direction: column; justify-content: space-between; background:url('assets/background.svg');">
      <div style="flex: 1">
        <section class="hero is-primary has-text-centered">
          <div class="hero-body">
            <h1 class="title">
              Authenticate
            </h1>
          </div>
        </section>

        <section class="section pt-7">
          <input
            class="input"
            type="password"
            placeholder="Password"
            value=${pwd}
            onInput=${(e)=>setPwd(e.target.value)}/>

          <p class="mt-5 has-text-centered is-size-7">
            AlgoSigner does not store your password. If you’ve forgotten your password, you’ll need to create a new wallet and re-link your accounts.
          </p>
          ${error.length > 0 && html`
            <p class="mt-4 has-text-danger has-text-centered">
              ${error}
            </p>
          `}
        </section>
      </div>

      <div class="mx-5 mb-3">
        <button class="button is-link is-fullwidth"
          disabled=${pwd.length === 0}
          onClick=${() => nextStep(pwd)} >
          Continue
        </button>
      </div>
    </div>
  `
}

export default Authenticate;