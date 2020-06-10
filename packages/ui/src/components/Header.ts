import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';

import LedgerSelect from './LedgerSelect'

const Header: FunctionalComponent = () => {
  return html`
    <div class="container is-fluid">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <span>
            AlgoSigner
          </span>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <${LedgerSelect} />
        </div>
      </div>
    </div>
    </div>
  `;
};

export default Header;