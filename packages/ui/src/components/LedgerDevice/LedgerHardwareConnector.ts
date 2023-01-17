import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useContext, useState } from 'preact/hooks';

import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import Authenticate from 'components/Authenticate';
import ReducedHeader from 'components/ReducedHeader';

import { sendMessage } from 'services/Messaging';
import { StoreContext } from 'services/StoreContext';
import { ledgerActions } from './structure/ledgerActions';
import LedgerActionResponse from './structure/ledgerActionsResponse';

const LedgerHardwareConnector: FunctionalComponent = (props: any) => {
  const { ledger } = props;
  const store: any = useContext(StoreContext);
  const [name, setName] = useState<string>('');
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [accountsRetrieved, setAccountsRetrieved] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Array<object>>([
    { ledgerIndex: '-1', publicKey: 'Select...' },
  ]);
  const [selectedAccount, setSelectedAccount] = useState<string>('0');

  const handleAccountChange = async (e) => {
    setSelectedAccount(e.target.value);
  };

  const getAllLedgerAddresses = async () => {
    setLoading(true);
    setAuthError('');
    setError('');

    const ddItems = new Array<object>();
    const storeLedgerAddresses = new Array<string>();

    for (let i = 0; i < store[ledger]?.length; i++) {
      storeLedgerAddresses.push(store[ledger][i].address);
    }

    ledgerActions
      .getAllAddresses()
      .then((lar: LedgerActionResponse) => {
        if ('error' in lar) {
          setError(
            `Unable to obtain list of addresses. Verify the Ledger hardware device is connected and unlocked. ${lar['error']}`
          );
        } else {
          for (let i = 0; i < lar.message?.length; i++) {
            if (!storeLedgerAddresses?.includes(`${lar.message[i].publicAddress}`)) {
              ddItems.push(lar.message[i]);
            }
          }
          setAccounts(ddItems);
          setAccountsRetrieved(true);
        }
      })
      .catch((e) => {
        setError(`Error: ${JSON.stringify(e)}`);
      })
      .finally(() => setLoading(false));
  };

  // The save address requires a connection to the ledger device via a web page
  // This page acts as the extension opened in a new tab
  const saveLedgerAddress = (pwd) => {
    setLoading(true);
    setAuthError('');
    setError('');

    const selectedHexAddress = accounts[selectedAccount]['hex'];

    if (!selectedHexAddress) {
      setError('A public address was not selected.');
    } else {
      const params = {
        passphrase: pwd,
        name: name.trim(),
        ledger: ledger,
        hexAddress: selectedHexAddress,
      };

      sendMessage(JsonRpcMethod.LedgerSaveAccount, params, function (response) {
        setLoading(false);
        setAuthError('');
        setError('');
        if ('error' in response) {
          switch (response['error']) {
            case 'Login Failed':
              setAuthError('Wrong passphrase');
              break;
            default:
              setAskAuth(false);
              setError(
                `Error saving address from the Ledger hardware device. ${response['error']}`
              );
              break;
          }
        } else {
          setAskAuth(false);
          setIsComplete(true);
        }
      });
    }
  };

  return html`
    <${ReducedHeader} />
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <div class="px-4 py-3 has-text-weight-bold is-size-5">
        <p style="overflow: hidden; text-overflow: ellipsis;"
          >Adding Hardware Account for ${ledger}</p
        >
      </div>
      ${isComplete &&
      html`
        <div class="px-4" style="flex: 1;">
          <p data-account-name="${name}">New account ${name} added for ${ledger}.</p>
          <p class="my-3"> You may now close this site and relaunch AlgoSigner.</p>
        </div>
      `}
      ${!isComplete &&
      html`
        <div class="px-4" style="flex: 1;">
          <p>
            Insert and unlock the hardware device, verify the Algorand application is open during
            this process.
          </p>
          ${accountsRetrieved &&
          html` <div class="mt-3">
              <label>Public Address:</label>
              <select
                class="select"
                style="border-color: #8a9fa8;border-radius: 12px; color: #363636; width: -webkit-fill-available;"
                onChange=${handleAccountChange}
              >
                ${accounts.map(
                  (acct) =>
                    html`
                      <option
                        value="${acct['ledgerIndex']}"
                        data-public-address="${acct['publicAddress']}"
                      >
                        ${acct['publicAddress']}
                      </option>
                    `
                )}}
              </select>
            </div>
            <div class="mt-3">
              <label>Account Name:</label>
              <input
                id="accountName"
                class="input"
                placeholder="Account name"
                maxlength="32"
                value=${name}
                onInput=${(e) => setName(e.target.value)}
              />
            </div>`}
          <p class="mt-3 has-text-danger" style="height: 1.5em;">
            ${error !== undefined && error.length > 0 && error}
          </p>
        </div>
        <div style="padding: 1em;">
          ${accountsRetrieved &&
          html`<button
            class="button is-primary is-fullwidth"
            id="nextStep"
            onClick=${() => setAskAuth(true)}
            >Add Address</button
          >`}
          ${!accountsRetrieved &&
          html`<button
            class="button is-primary is-fullwidth ${loading ? 'is-loading' : ''}"
            id="loadAccounts"
            onClick=${() => !loading && getAllLedgerAddresses()}
            >Load Addresses</button
          >`}
        </div>
      `}
    </div>

    ${askAuth &&
    html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <${Authenticate} error=${authError} loading=${loading} nextStep=${saveLedgerAddress} />
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick=${() => setAskAuth(false)}
        />
      </div>
    `}
  `;
};

export default LedgerHardwareConnector;
