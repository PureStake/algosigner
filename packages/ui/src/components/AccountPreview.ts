import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging';
import { numFormat } from 'services/common';
import { REFERENCE_ACCOUNT_TOOLTIP } from '@algosigner/common/strings';

const AccountPreview: FunctionalComponent = (props: any) => {
  const { account, ledger } = props;
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const fetchApi = async () => {
    const params = {
      ledger: ledger,
      address: account.address,
    };
    sendMessage(JsonRpcMethod.AccountDetails, params, function (response) {
      if (response.error) {
        console.error(response.error);
        setError('Error: Account details not accessible.');
      } else {
        setResults(response);
      }
    });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return html`
    <div
      class="box py-2 is-shadowless account-preview ${account.isRef ? 'pl-0' : 'pl-5'}"
      onClick=${() => route(`/${ledger}/${account.address}`)}
      id="account_${account.name.replace(/\s/g, '')}"
    >
      <div style="display: flex; justify-content: space-between;">
        ${account.isRef &&
        html`<i
          class="fas fa-unlink is-size-7 mx-1 mt-3 has-tooltip-arrow has-tooltip-bottom has-tooltip-bottom-left has-tooltip-fade"
          style="line-height: 1.1; height: 15px; font-style: unset;"
          data-tooltip="${REFERENCE_ACCOUNT_TOOLTIP}"
        />`}
        <div style="width: 65%; overflow-wrap: break-word; line-height: 1.1;">
          <b>${account.name}</b>
        </div>
        <div class="is-size-7 has-text-right is-flex-grow-1">
          ${results && results.assets && html` <b>${results.assets.length}</b> ASAs<br /> `}
          ${results && html` <b>${numFormat(results.amount / 1e6, 6)}</b> Algos `}
          ${results === null && error && html`<span>${error}</span>`}
          ${results === null && !error && html`<span class="loader is-pulled-right"></span>`}
        </div>
      </div>
    </div>
  `;
};

export default AccountPreview;
