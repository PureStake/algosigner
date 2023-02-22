import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';
import { Link } from 'preact-router';
import { extensionBrowser } from '@algosigner/common/chrome';

import { StoreContext } from 'services/StoreContext';
import AccountPreview from 'components/AccountPreview';

interface Account {
  address: string;
  mnemonic: string;
  name: string;
}

const Wallet: FunctionalComponent = () => {
  const store: any = useContext(StoreContext);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  return useObserver(() => {
    const network = store.ledger;
    const onCreateAccount = () => {
      extensionBrowser.tabs.create(
        {
          active: true,
          url: extensionBrowser.extension.getURL(`/index.html#/${network}/create-account`),
        }
      );
    };

    return html`
      <div class="main-view" style="flex-direction: column; justify-content: space-between;">
        <div class="px-4 py-4" style="flex: 1; overflow: auto; max-height: 430px;">
          ${
            store[network] &&
            store[network].length !== 0 &&
            store[network].map(
              (x: Account) => html`
                <${AccountPreview} key=${network + x} ledger=${network} account=${x} />
              `
            )
          }
        </div>

        <div class="has-text-centered" style="padding: 0.5em 0.75em;">
          ${
            (store[network] === undefined || store[network].length === 0) &&
            html`
              <div class="mb-4" style="color: #8A9FA8;">
                <p class="has-text-weight-bold is-size-4 mb-4" style="letter-spacing: 1px;">
                  Create or import<br />an account
                </p>
                <i style="color: #C4C4C4;" class="fas fa-4x fa-arrow-down"></i>
              </div>
            `
          }
          <button
            id="addAccount"
            class="button is-link is-fullwidth"
            onClick=${() => {
              setShowAddModal(true);
            }}>
            Add account
          </button>
        </div>
      </div>

      <div class=${`modal ${showAddModal ? 'is-active' : ''}`}>
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <div>
              <div class="button is-fullwidth" id="createAccount" onClick=${onCreateAccount}>
                Create new account
              </div>
            </div>
            <div>
              <${Link} class="button is-fullwidth mt-5" id="importAccount" href=${`/${network}/import-account`}>
                Import existing account
              </${Link}>
            </div>
            <div>
              <${Link} class="button is-fullwidth mt-5" id="linkAccount" href=${`/${network}/link-hardware-account`}>
                Link hardware device account
              </${Link}>
            </div>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${() =>
          setShowAddModal(false)} />
      </div>
    `;
  });
};

export default Wallet;
