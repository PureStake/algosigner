import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging';
import { numFormat } from 'services/common';

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
      if(response.error){
        console.error(response.error);
        setError('Error: Account details not accessible.');

      }
      else {
        setResults(response);
      }
    });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return html`
    <div
      class="box py-2 is-shadowless account-preview"
      onClick=${() => route(`/${ledger}/${account.address}`)}
      id="account_${account.name.replace(/\s/g, '')}"
    >
      <div style="display: flex; justify-content: space-between;">
        <div>
          <b>${account.name}</b>
        </div>
        <div class="is-size-7 has-text-right">
          ${results && results.assets && html` <b>${results.assets.length}</b> ASAs<br /> `}
          ${results && html` <b>${numFormat(results.amount / 1e6, 6)}</b> Algos `}
          ${results === null && error && html`<span>${error}</span>`}
          ${results === null && !error && html` <span class="loader"></span> `}
        </div>
      </div>
    </div>
  `;
};

export default AccountPreview;
