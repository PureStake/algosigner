import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { mnemonicToSecretKey, signTransaction } from 'algosdk';

import { StoreContext } from '../index'
import { algodClient } from '../services/algodClient'


const SendAlgos: FunctionalComponent = (props: any) => {
  const store:any = useContext(StoreContext);
  const { ledger, address } = props;
  let account;

  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [txId, setTxId] = useState('');

  for (var i = store[ledger].length - 1; i >= 0; i--) {
    if (store[ledger][i].address === address) {
      account = store[ledger][i];
      break;
    }
  }

  const sendTx = async () => {
    setStatus('sending');
    var recoveredAccount = mnemonicToSecretKey(account.mnemonic); 

    let params = await algodClient[ledger].getTransactionParams();
    let endRound = +params.lastRound + 1000;

    let txn = {
        "from": recoveredAccount.addr,
        "to": to,
        "fee": 10,
        "amount": +amount,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": new Uint8Array(0),
    };

    const txHeaders = {
        'Content-Type' : 'application/x-binary'
    }
    let signedTxn = signTransaction(txn, recoveredAccount.sk);

    algodClient[ledger].sendRawTransaction(signedTxn.blob, txHeaders).then((resp) => {
      setTxId(resp.txId)
      setStatus('sent');
    }).catch(e => {
      throw(e)
    });
  };

  const handleInputTo = e => {
    setTo(e.target.value);
  }
  const handleInputAmount = e => {
    setAmount(e.target.value);
  }

  return html`
    <div class="panel" style="overflow: auto; width: 650px; height: 550px;">
      <p class="panel-heading" style="overflow: hidden; text-overflow: ellipsis;">
        <a class="icon" style="margin-right: 1em;" onClick=${() => window.history.back()}>
          ${'\u2190'}
        </a>
        Send from ${account.address}
      </p>
      <div class="panel-block">
        <input
          class="input"
          placeholder="To"
          value=${to}
          onInput=${handleInputTo}/>
      </div>
      <div class="panel-block">
        <input
          class="input"
          placeholder="Amount"
          type="number"
          value=${amount}
          onInput=${handleInputAmount} />
      </div>
      <div class="panel-block">
        <button
          class="button is-link is-outlined is-fullwidth"
          onClick=${() => sendTx()}>
          Send!
        </button>
      </div>
    </div>
    <div class=${`modal ${status.length > 0 ? 'is-active' : ''}`}>
      <div class="modal-background"></div>
      <div class="modal-content" style="padding: 0 15px;">
        <div class="box">
          ${status === 'sending' && html`
            <p>Sending transaction to network! Please wait.</p>
          `}
          ${status === 'sent' && html`
            <p>Transaction sent with id ${txId}</p>
            <button
              class="button is-success is-outlined is-fullwidth"
              onClick=${() => window.history.back()}>
              Back to account!
            </button>
          `}
        </div>
      </div>
    </div>
  `
};

export default SendAlgos;