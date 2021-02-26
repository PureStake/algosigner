import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useRef, useEffect } from 'preact/hooks';

import logo from 'assets/logo-inverted.svg';

const Authenticate: FunctionalComponent = (props: any) => {
  const { nextStep, error, loading } = props;
  const [pwd, setPwd] = useState<string>('');
  const inputRef = useRef<HTMLHeadingElement>(null);

  const disabled: boolean = pwd.length === 0;

  const handleEnter = (e) => {
    if (e.keyCode === 13 && !disabled) {
      nextStep(pwd);
    }
  };

  useEffect(() => {
    if (inputRef !== null) {
      inputRef.current.focus();
    }
  }, []);

  return html`
    <div class="section has-text-white has-text-centered py-0">
      <img src=${logo} width="120" class="mb-6" />

      <p> AlgoSigner needs your password to continue </p>
      <input
        class="input my-5"
        id="enterPassword"
        type="password"
        placeholder="Password"
        value=${pwd}
        onKeyDown=${handleEnter}
        ref=${inputRef}
        onInput=${(e) => setPwd(e.target.value)}
      />

      <p class="mb-3 has-text-danger has-text-centered" style="height: 1.5em;">
        ${error && error.length > 0 && error}
      </p>

      <button
        class="button is-link is-fullwidth mb-6 ${loading ? 'is-loading' : ''}"
        id="authButton"
        disabled=${disabled}
        onClick=${() => nextStep(pwd)}
      >
        Continue
      </button>
    </div>
  `;
};

export default Authenticate;
