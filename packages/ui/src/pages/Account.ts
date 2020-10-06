import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext, useEffect } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';
import { Link, route } from 'preact-router';

import { sendMessage } from 'services/Messaging'
import { numFormat } from 'services/common';

import { StoreContext } from 'services/StoreContext'
import TransactionsList from 'components/Account/TransactionsList'
import AssetsList from 'components/Account/AssetsList'
import AccountDetails from 'components/Account/AccountDetails'
import algo from 'assets/algo.png';


const Account: FunctionalComponent = (props: any) => {
  const store:any = useContext(StoreContext);
  const { url, ledger, address } = props;
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [showAssets, setShowAssets] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  let account;

  for (var i = store[ledger].length - 1; i >= 0; i--) {
    if (store[ledger][i].address === address) {
      account = store[ledger][i];
      break;
    }
  }

  const fetchApi = async () => {
    const params = {
      ledger: ledger,
      address: address
    };
    sendMessage(JsonRpcMethod.AccountDetails, params, function(response) {
      setResults(response);
    });
  }

  useEffect(() => {
    fetchApi();
  }, []);

  return html`
    <div class="px-4 py-3 has-text-weight-bold ">
      <div id="accountName" class="is-flex is-size-5 mb-1">
        <a class="mr-2" onClick=${() => route('/wallet')}>
          <span>
            <i class="fas fa-chevron-left"></i>
          </span>
        </a>
        <p style="width: 305px;">${account.name} Account</p>
        <button id="showDetails"
          class="button is-outlined is-small is-primary is-pulled-right"
          onClick=${()=>setShowDetails(true)}>
          <span class="icon">
            <i class="fas fa-ellipsis-v"></i>
          </span>
        </button>
      </p>
      <span>
        <img src=${algo} width="18" style="margin-bottom: -1px;" class="mr-1" />
        ${ results && html`${numFormat(results.amount/1e6, 6)} <span class="has-text-grey-light">Algos</span>` }
      </span>
    </div>
    <div class="px-4">
      <${Link} id="sendAlgos" class="button is-primary is-fullwidth py-2" href=${`${url}/send`}>
        Send Algos
      </${Link}>
    </div>

    ${ results && results.assets.length > 0 && html`
      <${AssetsList} assets=${results.assets} ledger=${ledger}/>
    `}

    <${TransactionsList} address=${address} ledger=${ledger}/>

    ${ showDetails && html`
      <div class="modal is-active">
        <div class="modal-background" onClick=${()=>setShowDetails(false)}></div>
        <div class="modal-content" style="padding: 0 15px; max-height: calc(100vh - 95px);">
          <${AccountDetails} account=${account} ledger=${ledger} />
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${()=>setShowDetails(false)} />
      </div>
    `}
  `
};

export default Account;