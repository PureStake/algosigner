import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';

import logotype from 'assets/logotype.png';

const Logo: FunctionalComponent = () => {
  return html`
    <div style="flex: 1 1 100%; display: flex;">
      <img src=${logotype} width="130" />
    </div>
  `;
};

export default Logo;
