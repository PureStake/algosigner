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

  const [askAuth, setAskAuth] = useState(false);
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [txId, setTxId] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [error, setError] = useState<string>('');

  let account;

  for (var i = store[ledger].length - 1; i >= 0; i--) {
    if (store[ledger][i].address === address) {
      account = store[ledger][i];
      break;
    }
  }

  const sendTx = async (pwd: string) => {
    setLoading(true);
    setAuthError('');
    setError('');

    const params = {
      ledger: ledger,
      address: account.address,
      amount: +amount*1e6,
      note: note,
      to: to,
      passphrase: pwd
    };
    sendMessage(JsonRpcMethod.SignSendTransaction, params, function(response) {
      if ('error' in response) { 
        setLoading(false);
        switch (response.error) {
          case "Login Failed":
            setAuthError('Wrong passphrase');
            break;
          default:
            setError(response.error);
            setAskAuth(false);
            break;
        }
      } else {
        console.log('setting txid', response.txId)
        setAskAuth(false);
        setTxId(response.txId);
      }
    })
  };

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${HeaderView}
        action="${() => route(`/${matches.ledger}/${matches.address}`)}"
        title="Send Algos" />

      <div class="px-4" style="flex: 1">
        <input class="input mb-4"
          id="amountAlgos"
          placeholder="Algos"
          type="number"
          value=${amount}
          onInput=${(e) => setAmount(e.target.value)} />
        
        <b>From</b>
        <div class="box py-2"
          style="overflow: hidden; text-overflow: ellipsis; background: #EFF4F7; box-shadow: none;">
          <h6 class="title is-6">${ account.name }</h6>
          <h6 class="subtitle is-6">${ account.address }</h6>
        </div>

        <textarea
          placeholder="To address"
          class="textarea mb-4"
          id="to-address"
          value=${to}
          rows="2"
          onInput=${(e) => setTo(e.target.value)}/>
        <textarea
          placeholder="Note"
          class="textarea mb-4"
          id="note"
          value=${note}
          rows="2"
          onInput=${(e) => setNote(e.target.value)}/>

        <p class="mt-3 has-text-danger">
          ${error!==undefined && error.length > 0 && error}
        </p>

      </div>
      <div class="px-4 py-4">
        <button
          id="submitSendAlgos"
          class="button is-link is-outlined is-fullwidth"
          onClick=${() => setAskAuth(true)}>
          Send!
        </button>
      </div>
    </div>

    ${askAuth && html`
      <div class="modal is-active"}>
        <div class="modal-background"></div>
        <div class="modal-content" style="padding: 0 15px;">
          <${Authenticate}
            error=${authError}
            loading=${loading}
            nextStep=${sendTx} />
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${()=>setAskAuth(false)} />
      </div>
    `}

    ${txId.length > 0 && html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content" style="padding: 0 15px;">
          <div class="box">
            <p>Transaction sent with ID</p>
            <p id="txId" style="word-break: break-all;">${txId}</p>
            <button
              id="backToWallet"
              class="button is-success is-outlined is-fullwidth mt-4"
              onClick=${() => route(`/${matches.ledger}/${matches.address}`)}>
              Back to wallet!
            </button>
          </div>
        </div>
      </div>
    `}

  `
};

export default SendAlgos;