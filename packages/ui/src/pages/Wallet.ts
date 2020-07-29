import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';
import { Link } from 'preact-router';

import { StoreContext } from 'index'
import AccountPreview from 'components/AccountPreview'


interface Account {
  address: string;
  mnemonic: string;
  name: string;
}

const Wallet: FunctionalComponent = (props) => {
  const store:any = useContext(StoreContext);
  const [showAddModal, setShowAddModal] = useState<boolean>(false)

  return useObserver(() => {
    const { ledger } = store;

    return html`
      <div class="main-view" style="flex-direction: column; justify-content: space-between;">
        <div class="px-4 py-4" style="flex: 1">
          ${ store[ledger].map((x: Account) => html`
            <${AccountPreview} key=${ledger+x} ledger=${ledger} account=${x} />
          `)}
        </div>

        <div class="has-text-centered" style="padding: 0.5em 0.75em;">
          ${ store[ledger].length === 0 && html`
            <div class="mb-4" style="color: #8A9FA8;">
              <p class="has-text-weight-bold is-size-4 mb-4" style="letter-spacing: 1px;">
                Create or import<br />an account
              </p>
              <i style="color: #C4C4C4;" class="fas fa-4x fa-arrow-down"></i>
            </div>
          `}
          <button
            id="addAccount"
            class="button is-link is-fullwidth"
            onClick=${() => {setShowAddModal(true)}}>
            Add account
          </button>
        </div>
      </div>

      <div class=${`modal ${showAddModal ? 'is-active' : ''}`}>
        <div class="modal-background"></div>
        <div class="modal-content" style="padding: 0 15px;">
          <div class="box">
            <div>
              <${Link} class="button is-fullwidth" id="createAccount" href=${`/${ledger}/create-account`}>
                Create new account
              </${Link}>
            </div>
            <div>
              <${Link} class="button is-fullwidth mt-5" id="importAccount" href=${`/${ledger}/import-account`}>
                Import existing account
              </${Link}>
            </div>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${()=>setShowAddModal(false)} />
      </div>
    `
  })
}

export default Wallet