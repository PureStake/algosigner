import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';

import { StoreContext } from '../index'


const AccountDetails: FunctionalComponent = (props: any) => {
  const store:any = useContext(StoreContext);
  const { account, ledger } = props;

  const deleteAccount = () => {
    store.deleteAccount(ledger, account);
    route('/');
  }

  return html`
    <strong>Address</strong>
    <p>${account.address}</p>

    <strong>Mnemonic</strong>
    <p>${account.mnemonic}</p>

    <div class="panel-block">
      <button
        class="button is-danger is-fullwidth"
        onClick=${deleteAccount}>
        Delete account!
      </button>
    </div>
  `
};

export default AccountDetails;