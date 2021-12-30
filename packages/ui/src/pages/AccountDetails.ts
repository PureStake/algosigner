import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useContext, useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import qrcode from 'qrcode-generator';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging';
import { StoreContext } from 'services/StoreContext';

import Authenticate from 'components/Authenticate';
import ToClipboard from 'components/ToClipboard';

const AccountDetails: FunctionalComponent = (props: any) => {
  const { ledger, address } = props;
  const store: any = useContext(StoreContext);
  const [details, setDetails] = useState<any>({});
  const [modal, setModal] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  const deleteAccount = (pwd: string) => {
    const params = {
      ledger: ledger,
      address: address,
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
            setModal('');
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

  useEffect(() => {
    for (let i = store[ledger].length - 1; i >= 0; i--) {
      if (store[ledger][i].address === address) {
        setDetails(store[ledger][i].details);
        break;
      }
    }
  }, []);

  const typeNumber: TypeNumber = 4;
  const errorCorrectionLevel: ErrorCorrectionLevel = 'L';
  const qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(address);
  qr.make();
  const qrImg = qr.createDataURL(10, 1);

  return html`
    <div class="px-4 py-3">
      <div id="accountName" class="is-flex mb-1">
        <a
          class="mr-2 is-size-5"
          style="height: fit-content;"
          onClick=${() => route(`/${ledger}/${address}`)}
        >
          <span id="goBack">
            <i class="fas fa-chevron-left"></i>
          </span>
        </a>
        <p style="width: 350px; overflow-wrap: break-word;">
          <span class="has-text-weight-bold is-size-5">Address:</span>
          <br />
          <span id="accountAddress">${address}</span>
          <span class="ml-1">(<${ToClipboard} data=${address} />)</span>
        </p>
      </div>
    </div>
    <div class="px-4 is-flex-grow-1">
      ${details &&
      details['apps-local-state'] &&
      details['apps-local-state'].length > 0 &&
      html`
        <span class="has-text-weight-bold is-size-5">Opted-in Apps</span>
        <div class="is-flex is-flex-direction-column">
          ${details['apps-local-state'].map(
            (ca) => html`
              <span class="py-2" style="border-top: 1px solid rgba(138, 159, 168, 0.2);">
                ${ca.id}
              </span>
            `
          )}
        </div>
      `}
      ${details &&
      details['created-assets'] &&
      details['created-assets'].length > 0 &&
      html`
        <span class="has-text-weight-bold is-size-5">Created Assets</span>
        <div class="is-flex is-flex-direction-column">
          ${details['created-assets'].map(
            (cas) => html`
              <span class="py-2" style="border-top: 1px solid rgba(138, 159, 168, 0.2);">
                ${cas.params.name &&
                cas.params.name.length > 0 &&
                html`
                  ${cas.params.name}
                  <small class="has-text-grey-light is-pulled-right">${cas.index}</small>
                `}
                ${(!cas.params.name || cas.params.name.length === 0) && html`${cas.index}`}
              </span>
            `
          )}
        </div>
      `}
      ${details &&
      details['created-apps'] &&
      details['created-apps'].length > 0 &&
      html`
        <span class="has-text-weight-bold is-size-5">Created Apps</span>
        <div class="is-flex is-flex-direction-column">
          ${details['created-apps'].map(
            (cap) => html`
              <span class="py-2" style="border-top: 1px solid rgba(138, 159, 168, 0.2);">
                ${cap.params.name &&
                cap.params.name.length > 0 &&
                html`
                  ${cap.params.name}
                  <small class="has-text-grey-light is-pulled-right">${cap.index}</small>
                `}
                ${(!cap.params.name || cap.params.name.length === 0) && html`${cap.index}`}
              </span>
            `
          )}
        </div>
      `}
    </div>
    <div class="px-4 is-flex">
      <button id="accountQR" class="button is-link is-flex-grow-1" onClick=${() => setModal('qr')}>
        Show QR
      </button>
      <button
        id="deleteAccount"
        class="button is-danger is-flex-grow-1 ml-1"
        onClick=${() => setModal('delete')}
      >
        Delete account!
      </button>
    </div>
    ${modal &&
    html`
      <div class="modal is-active">
        <div class="modal-background" onClick=${() => setModal('')}></div>
        <div class="modal-content">
          ${modal === 'qr' &&
          html`
            <div class="box" style="overflow-wrap: break-word;">
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
            </div>
          `}
          ${modal === 'delete' &&
          html`
            <${Authenticate} error=${authError} loading=${loading} nextStep=${deleteAccount} />
          `}
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${() => setModal('')} />
      </div>
    `}
  `;
};

export default AccountDetails;
