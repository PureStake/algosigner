import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging'

import { StoreContext } from 'index'

import HeaderView from 'components/HeaderView'
import Authenticate from 'components/Authenticate'


const SendAlgos: FunctionalComponent = (props: any) => {
  const store:any = useContext(StoreContext);
  const { matches, path, url, ledger, address } = props;

  const [showAuthenticate, setShowAuthenticate] = useState(false);
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [txId, setTxId] = useState('');

  let account;

  for (var i = store[ledger].length - 1; i >= 0; i--) {
    if (store[ledger][i].address === address) {
      account = store[ledger][i];
      break;
    }
  }

  const sendTx = async (pwd: string) => {
    setStatus('sending');
    const params = {
      ledger: ledger,
      address: account.address,
      amount: amount,
      note: note,
      to: to,
      passphrase: pwd
    };
    sendMessage(JsonRpcMethod.SignSendTransaction, params, function(response) {
      setTxId(response.txId);
      setStatus('sent');
    })
  };

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${HeaderView}
        action="${() => route(`/${matches.ledger}/${matches.address}`)}"
        title="Send SendAlgos" />

      <div class="px-4" style="flex: 1">
        <input class="input mb-4"
          placeholder="Amount"
          type="number"
          value=${amount}
          onInput=${(e) => setAmount(e.target.value)} />
        
        <b>From</b>
        <div class="box py-2"
          style="overflow: hidden; text-overflow: ellipsis; background: #EFF4F7; box-shadow: none; height: 55px;">
          <h6 class="title is-6">${ account.name }</h6>
          <h6 class="subtitle is-6">${ account.address }</h6>
        </div>

        <input
          class="input mb-4"
          placeholder="To address"
          value=${to}
          onInput=${(e) => setTo(e.target.value)}/>
        <input
          class="input"
          placeholder="Note"
          value=${note}
          onInput=${(e) => setNote(e.target.value)}/>
      </div>
      <div class="px-4 py-4">
        <button
          class="button is-link is-outlined is-fullwidth"
          onClick=${() => setShowAuthenticate(true)}>
          Send!
        </button>
      </div>
    </div>

    <div class=${`modal ${showAuthenticate ? 'is-active' : ''}`}>
      <div class="modal-background"></div>
      <div class="modal-content" style="padding: 0 15px;">
        <${Authenticate}
          nextStep=${sendTx} />
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