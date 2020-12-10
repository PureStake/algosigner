import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging';

import TxAcfg from 'components/TransactionDetail/TxAcfg';
import TxPay from 'components/TransactionDetail/TxPay';
import TxKeyreg from 'components/TransactionDetail/TxKeyreg';
import TxAxfer from 'components/TransactionDetail/TxAxfer';
import TxAfrz from 'components/TransactionDetail/TxAfrz';
import TxAppl from 'components/TransactionDetail/TxAppl';

const TransactionsList: FunctionalComponent = (props: any) => {
  const { address, ledger } = props;

  const [date, setDate] = useState<any>(new Date());
  const [results, setResults] = useState<any>([]);
  const [pending, setPending] = useState<any>([]);
  const [showTx, setShowTx] = useState<any>(null);
  const [nextToken, setNextToken] = useState<any>(null);

  const fetchApi = async () => {
    const params = {
      'ledger': ledger,
      'address': address,
      'next-token': nextToken,
      'limit': 20,
    };
    sendMessage(JsonRpcMethod.Transactions, params, function (response) {
      // If there are already transactions, just append the new ones
      if (results.length > 0) {
        setResults(results.concat(response.transactions));
      } else { 
        setResults(response.transactions);
        setPending(response.pending);
      }

      if (response['next-token']) setNextToken(response['next-token']);
      else setNextToken(null);
    });
  };

  const handleClick = (tx) => {
    switch (tx['tx-type']) {
      case 'pay':
        setShowTx(html`<${TxPay} tx=${tx} ledger=${ledger} />`);
        break;
      case 'keyreg':
        setShowTx(html`<${TxKeyreg} tx=${tx} ledger=${ledger} />`);
        break;
      case 'acfg':
        setShowTx(html`<${TxAcfg} tx=${tx} ledger=${ledger} />`);
        break;
      case 'axfer':
        setShowTx(html`<${TxAxfer} tx=${tx} ledger=${ledger} />`);
        break;
      case 'afrz':
        setShowTx(html`<${TxAfrz} tx=${tx} ledger=${ledger} />`);
        break;
      case 'appl':
        setShowTx(html`<${TxAppl} tx=${tx} ledger=${ledger} />`);
        break;
    }
  };

  useEffect(() => {
    setDate(new Date());
    fetchApi();
  }, []);

  if (!results) return null;

  const loadMore = () => {
    fetchApi();
  };

  const getTxInfo = (tx, date) => {
    function getTime(date, roundTime) {
      const MINUTESTHRESHOLD = 60000;
      const HOURSTHRESHOLD = 3600000;

      const roundDate = new Date(roundTime * 1000);
      const diffTime = date - roundDate.getTime();

      if (diffTime < 86400000) {
        let time, label;
        if (diffTime < MINUTESTHRESHOLD) {
          time = diffTime / 1000;
          label = 'sec';
        } else if (diffTime < HOURSTHRESHOLD) {
          time = diffTime / MINUTESTHRESHOLD;
          label = 'min';
        } else {
          time = diffTime / HOURSTHRESHOLD;
          label = 'hour';
        }
        time = Math.floor(time);
        if (time > 1) return time + ' ' + label + 's ago';
        else return time + ' ' + label + ' ago';
      } else {
        return roundDate.toDateString();
      }
    }

    let title, subtitle, info;
    switch (tx['tx-type']) {
      case 'pay':
        info = tx['payment-transaction'].amount / 1e6 + ' Algos';
        if (tx.sender === address) {
          subtitle = 'To';
          title = tx['payment-transaction'].receiver;
        } else {
          subtitle = 'From';
          title = tx.sender;
        }
        break;
      case 'keyreg':
        title = 'Key registration';
        break;
      case 'acfg':
        subtitle = 'Asset config';
        title = tx['asset-config-transaction'].params.name;
        break;
      case 'axfer':
        info = tx['asset-transfer-transaction']['amount'];
        //TODO Close-to txs
        // Clawback if there is a sender in the transfer object
        if (tx['asset-transfer-transaction'].sender) {
          if (tx['asset-transfer-transaction'].receiver === address) {
            subtitle = 'ASA From (clawback)';
            title = tx['asset-transfer-transaction']['sender'];
          } else {
            subtitle = 'ASA To (clawback)';
            title = tx['asset-transfer-transaction']['receiver'];
          }
        } else {
          if (tx['asset-transfer-transaction'].receiver === address) {
            subtitle = 'ASA From';
            title = tx['sender'];
          } else {
            subtitle = 'ASA To';
            title = tx['asset-transfer-transaction']['receiver'];
          }
        }
        break;
      case 'afrz':
        title = tx['asset-freeze-transaction']['asset-id'];
        if (tx['asset-freeze-transaction']['new-freeze-status']) {
          subtitle = 'Asset freezed';
        } else {
          subtitle = 'Asset unfreezed';
        }
        break;
      case 'appl':
        if ('application-id' in tx['application-transaction']) {
          subtitle =
            tx['application-transaction']['application-id'] || 'application';
          title = tx['application-transaction']['on-completion'];
        } else {
          subtitle = 'appl';
          title = 'Application Transaction';
        }
        break;
    }

    return html`
      <div
        style="display: flex; justify-content: space-between;"
        data-transaction-id="${tx.id}"
      >
        <div style="max-width: 60%; white-space: nowrap;">
          <h2 class="subtitle is-size-7 is-uppercase has-text-grey-light">
            ${subtitle}
          </h2>
          <h1
            style="text-overflow: ellipsis; overflow: hidden;"
            class="title is-size-6"
          >
            ${title}
          </h1>
        </div>
        <div class="has-text-right">
          <h2 class="subtitle is-size-7 has-text-grey-light is-uppercase">
            ${getTime(date, tx['round-time'])}
          </h2>
          <h1 class="title is-size-6">${info}</h1>
        </div>
      </div>
    `;
  };


  const getPendingTxInfo = (tx) => {
    let title;
    switch (tx['type']) {
      case 'pay':
        title = 'Payment';
        break;
      case 'keyreg':
        title = 'Key Registration';
        break;
      case 'acfg':
        title = 'Asset Config';
        break;
      case 'axfer':
        title = 'Asset Transfer';
        break;
      case 'afrz':
        title = 'Asset Freeze';
        break;
      case 'appl':
        title = 'Application Transaction';
        break;
    }

    return html`
      <div style="display: flex; justify-content: space-between;">
        <div style="white-space: nowrap;">
          <h2 class="subtitle is-size-7 is-uppercase has-text-grey-light">Pending transaction</h2>
          <h1 style="text-overflow: ellipsis; overflow: hidden;" class="title is-size-6">
            ${title}
          </h1>
        </div>
      </div>
    `;
  };

  return html`
    <div class="py-2">
      <span class="px-4 has-text-weight-bold is-size-5">Transactions</span>
      ${pending.map(
        (tx: any) => html`
          <div
            class="py-3 px-4"
            style="border-top: 1px solid rgba(138, 159, 168, 0.2);"
          >
            ${getPendingTxInfo(tx)}
          </div>
        `
      )}
      ${results &&
      results.map(
        (tx: any) => html`
          <div
            class="py-3 px-4"
            style="border-top: 1px solid rgba(138, 159, 168, 0.2); cursor: pointer;"
            onClick=${() => handleClick(tx)}
          >
            ${getTxInfo(tx, date)}
          </div>
        `
      )}
      ${nextToken &&
      html`
        <div
          class="py-3 px-4 has-text-centered"
          style="border-top: 1px solid rgba(138, 159, 168, 0.2);"
        >
          <a onClick=${loadMore}> Load more transactions </a>
        </div>
      `}
    </div>

    <div class=${`modal ${showTx ? 'is-active' : ''}`}>
      <div class="modal-background"></div>
      <div class="modal-content">${showTx}</div>
      <button class="modal-close is-large" aria-label="close" onClick=${() => setShowTx(null)} />
    </div>
  `;
};

export default TransactionsList;
