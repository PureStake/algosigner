import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';

import LedgerSelect from './LedgerSelect'

const Header: FunctionalComponent = () => {
  return html`
    <div class="container is-fluid" style="flex: 0; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #EFF4F7">
      <span>
        AlgoSigner
      </span>
      <div>
        <${LedgerSelect} />
      </div>
    </div>
  `;
};

export default Header;