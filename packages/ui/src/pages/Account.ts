import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext, useEffect } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';
import { Link } from 'preact-router';

import { StoreContext } from '../index'
import { algodClient } from '../services/algodClient'
import TransactionsList from '../components/TransactionsList'
import AccountDetails from '../components/AccountDetails'


const Account: FunctionalComponent = (props: any) => {
  const store:any = useContext(StoreContext);
  const { url, ledger, address } = props;
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [results, setResults] = useState<any>(null);
  let account;

  for (var i = store[ledger].length - 1; i >= 0; i--) {
    if (store[ledger][i].address === address) {
      account = store[ledger][i];
      break;
    }
  }

  const fetchApi = async () => {
    let res = await algodClient[ledger].accountInformation(address);
    if (res) {
      setResults(res);
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  return html`
    <div class="panel" style="overflow: auto; width: 650px; height: 550px;">
      <p class="panel-heading" style="overflow: hidden; text-overflow: ellipsis;">
        <a class="icon" style="margin-right: 1em;" onClick=${() => window.history.back()}>
          ${'\u2190'}
        </a>
        Account ${account.address}
      </p>
      ${ results && html`
        <div class="panel-block">
          <span>
            Balance: ${results.amount}
          </span>
        </div>
      `}
      <div class="panel-block">
        <button class="button is-outlined is-fullwidth" onClick=${()=>setShowDetails(true)}>
          Show details
        </button>
      </div>
      <div class="panel-block">
        <${Link} class="button is-danger is-fullwidth" href=${`${url}/send`}>
          Send Algos
        </${Link}>
      </div>
      <${TransactionsList} address=${address} ledger=${ledger}/>
    </div>
    <div class=${`modal ${showDetails ? 'is-active' : ''}`}>
      <div class="modal-background"></div>
      <div class="modal-content" style="padding: 0 15px;">
        <div class="box" style="overflow-wrap: break-word;">
          <${AccountDetails} account=${account} ledger=${ledger} />
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" onClick=${()=>setShowDetails(false)} />
    </div>
  `
};

export default Account;