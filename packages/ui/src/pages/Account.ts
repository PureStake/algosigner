import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext, useEffect } from 'preact/hooks';
import { Link, route } from 'preact-router';

import { sendMessage } from 'services/Messaging';
import { numFormat } from 'services/common';

import { StoreContext } from 'services/StoreContext';
import TransactionsList from 'components/Account/TransactionsList';
import AssetsList from 'components/Account/AssetsList';
import algo from 'assets/algo.png';

const Account: FunctionalComponent = (props: any) => {
  const store: any = useContext(StoreContext);
  const { url, ledger, address } = props;
  const [account, setAccount] = useState<any>({});
  const [details, setDetails] = useState<any>({});
  const [error, setError] = useState<any>(null);

  const rewardsTooltip =
    details &&
    `Algos: ${numFormat(
      details['amount-without-pending-rewards'] / 1e6,
      6
    )}\nRewards: ${numFormat(details['pending-rewards'] / 1e6, 6)}`;

  useEffect(() => {
    for (let i = store[ledger].length - 1; i >= 0; i--) {
      if (store[ledger][i].address === address) {
        setAccount(store[ledger][i]);
        setDetails(store[ledger][i].details);
        break;
      }
    }
    fetchApi();
  }, []);

  const fetchApi = () => {
    const params = {
      ledger: ledger,
      address: address,
    };
    sendMessage(JsonRpcMethod.AccountDetails, params, function (response) {
      if (response.error) {
        console.error(response.error);
        setError('Error: Account details not accessible.');
      } else {
        setDetails(response);
        store.updateAccountDetails(ledger, response);
      }
    });
  };

  return html`
    <div class="px-4 py-3 has-text-weight-bold ">
      <div id="accountName" class="is-flex is-size-5 mb-1">
        <a class="mr-2" onClick=${() => route('/wallet')}>
          <span id="goBack">
            <i class="fas fa-chevron-left"></i>
          </span>
        </a>
        <p style="width: 305px; overflow-wrap: break-word;">${account.name}</p>
        <button id="showDetails"
          class="button is-outlined is-small is-primary is-pulled-right"
          onClick=${() => route(`${url}/details`)}>
          <span class="icon">
            <i style="vertical-align: middle;" class="fas fa-ellipsis-v"></i>
          </span>
        </button>
      </div>
      <span>
        <img src=${algo} width="18" style="margin-bottom: -1px;" class="mr-1" />
        ${details === null && error && html`<span>${error}</span>`}
        ${
          details &&
          html`
            <span>${numFormat(details.amount / 1e6, 6)} </span>
            <span class="has-text-grey-light">Algos</span>
            <i
              class="far fa-question-circle px-1 has-tooltip-arrow has-tooltip-right has-tooltip-fade"
              data-tooltip="${rewardsTooltip}"
              aria-label="${rewardsTooltip}"
            >
            </i>
          `
        }
      </span>
    </div>
    <div class="px-4">
      <${Link} id="sendTransfer" class="button is-primary is-fullwidth py-2" href=${`${url}/send`}>
        Send
      </${Link}>
    </div>

    <div class="py-2">
      <div class="px-4">
        <span class="has-text-weight-bold is-size-5">Assets</span>
        <${Link} id="addAsset" style="font-size: 0.9em" class="is-pulled-right" href=${`${url}/add-asset`}>
          <span class="icon"><i class="fas fa-plus-circle"></i></span> Add new asset
        </${Link}>
      </div>
      ${
        details &&
        details.assets &&
        details.assets.length > 0 &&
        html`<${AssetsList} assets=${details.assets} ledger=${ledger} address=${address} />`
      }
    </div>

    <${TransactionsList} address=${address} ledger=${ledger}/>
  `;
};

export default Account;
