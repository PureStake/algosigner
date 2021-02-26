import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useContext, useState } from 'preact/hooks';
import { route } from 'preact-router';
import qrcode from 'qrcode-generator';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging';
import { StoreContext } from 'services/StoreContext';

import Authenticate from 'components/Authenticate';
import ToClipboard from 'components/ToClipboard';

const AccountDetails: FunctionalComponent = (props: any) => {
  const { account, ledger } = props;
  const store: any = useContext(StoreContext);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  const deleteAccount = (pwd: string) => {
    const params = {
      ledger: ledger,
      address: account.address,
      passphrase: pwd,
    };
    setLoading(true);
    setAuthError('');
    sendMessage(JsonRpcMethod.DeleteAccount, params, function (response) {
      if ('error' in response) {
        setLoading(false);
        switch (response.error) {
          case 'Login Failed':
            setAuthError('Wrong passphrase');
            break;
          default:
            setDeleting(false);
            alert(`There was an unkown error: ${response.error}`);
            break;
        }
      } else {
        store.updateWallet(response, () => {
          route('/wallet');
        });
      }
    });
  };

  const typeNumber: TypeNumber = 4;
  const errorCorrectionLevel: ErrorCorrectionLevel = 'L';
  const qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(account.address);
  qr.make();
  const qrImg = qr.createDataURL(10, 1);

  if (!deleting)
    return html`
      <div class="box" style="overflow-wrap: break-word;">
        <strong>Address</strong> (<${ToClipboard} data=${account.address} />)
        <p id="accountAddress">${account.address}</p>

        <div style="text-align: center;" id="qrCode">
          <img
            src="${qrImg}"
            id="accountQR"
            style="padding: 0.5em;
              margin: 0.5em;
              border: 1px solid #9095AF;
              border-radius: 10px;"
            width="250"
            height="250"
          />
        </div>

        <button
          id="deleteAccount"
          class="button is-danger is-fullwidth"
          onClick=${() => setDeleting(true)}
        >
          Delete account!
        </button>
      </div>
    `;
  else
    return html`
      <${Authenticate} error=${authError} loading=${loading} nextStep=${deleteAccount} />
    `;
};

export default AccountDetails;
