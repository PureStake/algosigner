import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging'

import { StoreContext } from 'services/StoreContext'

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
        <div class="control has-icons-right mb-4">
          <input class="input pr-6"
            id="amountAlgos"
            placeholder="0.0"
            type="number"
            value=${amount}
            onInput=${(e) => setAmount(e.target.value)} />
          <span class="icon is-right mr-2 mt-2 has-text-grey">Algos</span>
        </div>
        
        <b>From</b>
        <div class="box py-2 mt-2 mb-0 is-flex"
          style="background: #EFF4F7; box-shadow: none; justify-content: space-between; align-items: center;">
          <div>
            <h6 class="title is-6">${ account.name }</h6>
            <h6 class="subtitle is-6">${account.address.slice(0, 8)}.....${account.address.slice(-8)}</h6>
          </div>
          <b class="has-text-link">YOU</b>
        </div>

        <div class="has-text-centered has-text-weight-bold my-2">
          <span><i class="fas fa-arrow-down mr-3"></i></span>
          <span>Payment</span>
        </div>

        <textarea
          placeholder="To address"
          class="textarea mb-4"
          style="resize: none;"
          id="to-address"
          value=${to}
          rows="2"
          onInput=${(e) => setTo(e.target.value)}/>
        <textarea
          placeholder="Note"
          class="textarea mb-4"
          style="resize: none;"
          id="note"
          value=${note}
          rows="2"
          onInput=${(e) => setNote(e.target.value)}/>

      </div>
      <div class="px-4 py-4">
        <button
          id="submitSendAlgos"
          class="button is-primary is-fullwidth"
          disabled=${to.length === 0 || +amount <= 0}
          onClick=${() => setAskAuth(true)}>
          Send!
        </button>
      </div>
    </div>

    ${askAuth && html`
      <div class="modal is-active">
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
              class="button is-primary is-fullwidth mt-4"
              onClick=${() => route(`/${matches.ledger}/${matches.address}`)}>
              Back to account!
            </button>
          </div>
        </div>
      </div>
    `}

    ${ error !== undefined && error.length > 0 && html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content" style="padding: 0 15px;">
          <div class="box">
            <p class="has-text-danger has-text-weight-bold mb-2">
              Transaction failed with the following error:
            </p>
            <p id="tx-error">${error}</p>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${()=>setError('')} />
      </div>
    `}

  `
};

export default SendAlgos;