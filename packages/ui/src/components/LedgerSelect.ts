import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { StoreContext } from 'services/StoreContext';
import { sendMessage } from 'services/Messaging';

const LedgerSelect: FunctionalComponent = () => {
  const store: any = useContext(StoreContext);
  const [active, setActive] = useState<boolean>(false);

  let ddClass: string = 'dropdown is-right';
  if (active) ddClass += ' is-active';

  const flip = () => {
    setActive(!active);
  };

  const setLedger = (ledger) => {
    const params = {
      ledger: ledger,
    };
    sendMessage(JsonRpcMethod.ChangeLedger, params, function () {
      store.setLedger(ledger);
      flip();
      route('/wallet');
    });
  };

  return useObserver(
    () => html`
      <div class=${ddClass}>
        <div class="dropdown-trigger">
          <button
            id="selectLedger"
            class="button"
            onClick=${flip}
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            style="border: none;"
          >
            <span class="icon is-small">
              <i class="fas fa-caret-down" aria-hidden="true"></i>
            </span>
            <span>${store.ledger}</span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-mask" onClick=${flip} />
          <div class="dropdown-content">
            <a id="selectTestNet" onClick=${() => setLedger('TestNet')} class="dropdown-item">
              TestNet
            </a>
            <a id="selectMainNet" onClick=${() => setLedger('MainNet')} class="dropdown-item">
              MainNet
            </a>
          </div>
        </div>
      </div>
    `
  );
};

export default LedgerSelect;
