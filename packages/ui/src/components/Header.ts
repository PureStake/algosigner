import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';

import LedgerSelect from './LedgerSelect';

import logotype from 'assets/logotype.png';

const Header: FunctionalComponent = () => {
  return html`
    <div
      class="px-4"
      style="flex: 0; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #EFF4F7"
    >
      <img src=${logotype} width="130" />
      <div>
        <${LedgerSelect} />
      </div>
    </div>
  `;
};

export default Header;
