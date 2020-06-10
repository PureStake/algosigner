import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';

import { StoreContext } from '../index'

const LedgerSelect: FunctionalComponent = (props: any) => {
  const store:any = useContext(StoreContext);
  const [active, setActive] = useState<boolean>(false);

  let ddClass: string = "dropdown is-right";
  if (active)
    ddClass += " is-active";

  const flip = () => {
    setActive(!active);
  }

  const setLedger = (ledger) => {
    store.setLedger(ledger);
    flip();
  }

  return useObserver(() => (html`
    <div class=${ddClass}>
      <div class="dropdown-trigger">
        <button
          class="button"
          onClick=${flip}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          style="border: none;">
          <span>${store.ledger}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a
            onClick=${()=>setLedger('TestNet')}
            class="dropdown-item">
            TestNet
          </a>
          <a
            onClick=${()=>setLedger('MainNet')}
            class="dropdown-item">
            MainNet
          </a>
        </div>
      </div>
    </div>
  `));
};

export default LedgerSelect;