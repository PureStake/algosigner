import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext, useEffect } from 'preact/hooks';

import { algodClient } from '../services/algodClient'


const TransactionsList: FunctionalComponent = (props: any) => {
  const { address, ledger } = props;

  const [results, setResults] = useState([]);
  const [showTx, setShowTx] = useState<any>(null);

  const fetchApi = async () => {
    let txs = await algodClient[ledger].transactionByAddress(address);
    if (txs) {
      setResults(txs.transactions);
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  if (!results)
    return null;

  return html`
    ${ results.map((tx: any) => html`
      <a class="panel-block"
        style="justify-content: space-between;"
        onClick=${() => setShowTx(tx)}>
        <span style="max-width: 70%; overflow: hidden; text-overflow: ellipsis;">
          ${ tx.tx }
        </span>
        ${ tx.payment && html`
          <small>
            ${ tx.payment.amount} MAlgos
          </small>
        `}
      </a>
    `)}
    <div class=${`modal ${showTx ? 'is-active' : ''}`}>
      <div class="modal-background"></div>
      <div class="modal-content" style="padding: 0 15px;">
        ${ showTx && html`
          <div class="box" style="overflow-wrap: break-word;">
            <p><strong>TxID:</strong> ${showTx.tx}</p>
            <p><strong>Type:</strong> ${showTx.type}</p>
            <p><strong>From:</strong> ${showTx.from}</p>
            ${ showTx.type==='pay' && html`
              <p><strong>To:</strong> ${showTx.payment.to}</p>
              <p><strong>Amount:</strong> ${showTx.payment.amount} MAlgos</p>
            `}
            <p><strong>Block:</strong> ${showTx.round}</p>
            <a href=${`https://goalseeker.purestake.io/algorand/testnet/transaction/${showTx.tx}`} target="_blank" rel="noopener noreferrer">
              See details in GoalSeeker
            </a>
          </div>
        `}
      </div>
      <button class="modal-close is-large" aria-label="close" onClick=${()=>setShowTx(null)} />
    </div>
  `
};

export default TransactionsList;