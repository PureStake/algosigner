import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useContext, useState } from 'preact/hooks';
import { route } from 'preact-router';
import qrcode from 'qrcode-generator';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging'
import { StoreContext } from 'index'

import Authenticate from 'components/Authenticate'

const AccountDetails: FunctionalComponent = (props: any) => {
  const store:any = useContext(StoreContext);
  const [deleting, setDeleting] = useState<boolean>(false);
  const { account, ledger } = props;

  const deleteAccount = (pwd: string) => {
    const params = {
      ledger: ledger,
      address: account.address,
      passphrase: pwd
    };
    sendMessage(JsonRpcMethod.DeleteAccount, params, function(response) {
      if ('error' in response) { 
          alert(response);
      } else {
        store.updateWallet(response);
        route('/wallet');
      }
    });
  };

  var typeNumber:TypeNumber = 4;
  var errorCorrectionLevel: ErrorCorrectionLevel = 'L';
  var qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(account.address);
  qr.make();
  let qrImg = qr.createDataURL(10, 1);

  if (!deleting)
    return html`
      <strong>Address</strong>
      <p id="accountAddress">${account.address}</p>

      <div style="text-align: center;" id="qrCode">
        <img src="${qrImg}"
          style="padding: 0.5em;
            margin: 0.5em;
            border: 1px solid #9095AF;
            border-radius: 10px;"
          width="250"
          height="250"/>
      </div>

      <button
        id="deleteAccount"
        class="button is-danger is-fullwidth"
        onClick=${() => setDeleting(true)}>
        Delete account!
      </button>

    `
  else
    return html`
      <${Authenticate}
        nextStep=${deleteAccount} />
    `
};

export default AccountDetails;