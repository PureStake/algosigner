import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { route } from 'preact-router';
import { sendMessage } from 'services/Messaging';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import HeaderView from 'components/HeaderView';

const LinkHardwareAccount: FunctionalComponent = (props: any) => {
  const { ledger } = props;
  const openConnectionPage = () => {
    // Linking will call the background to open a new page and close the extension.
    sendMessage(JsonRpcMethod.LedgerLinkAddress, { ledger: ledger }, function (response) {
      if ('error' in response) {
        console.log('Link address error:', response.error);
      }
    });
  };

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${HeaderView} action="${() => route('/wallet')}" title="Link ${ledger} account" />
      <div class="px-3" style="flex: 1;">
        <p class="my-3">
          The extension will close and a new tab will be created to connect the Ledger device.
        </p>
      </div>
      <div style="padding: 1em;">
        <button
          class="button is-primary is-fullwidth"
          id="nextStep"
          onClick=${() => {
            openConnectionPage();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  `;
};

export default LinkHardwareAccount;
