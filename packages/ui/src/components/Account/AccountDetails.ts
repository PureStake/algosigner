import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import qrcode from 'qrcode-generator';

import { StoreContext } from 'index'


const AccountDetails: FunctionalComponent = (props: any) => {
  const store:any = useContext(StoreContext);
  const { account, ledger } = props;

  const deleteAccount = () => {
    store.deleteAccount(ledger, account);
    route('/');
  }

  var typeNumber:TypeNumber = 4;
  var errorCorrectionLevel: ErrorCorrectionLevel = 'L';
  var qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(account.address);
  qr.make();
  let qrImg = qr.createDataURL(10, 1);

  return html`
    <strong>Address</strong>
    <p>${account.address}</p>

    <div style="text-align: center;">
      <img src="${qrImg}"
        style="padding: 0.5em;
          margin: 0.5em;
          border: 1px solid #9095AF;
          border-radius: 10px;"
        width="250"
        height="250"/>
    </div>

    <button
      class="button is-danger is-fullwidth"
      onClick=${deleteAccount}>
      Delete account!
    </button>

  `
};

export default AccountDetails;