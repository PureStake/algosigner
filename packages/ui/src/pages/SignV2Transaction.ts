import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { isFromExtension } from '@algosigner/common/utils';

import TxAcfg from 'components/SignTransaction/TxAcfg';
import TxPay from 'components/SignTransaction/TxPay';
import TxAlert from 'components/SignTransaction/TxAlert';
import TxKeyreg from 'components/SignTransaction/TxKeyreg';
import TxAxfer from 'components/SignTransaction/TxAxfer';
import TxAfrz from 'components/SignTransaction/TxAfrz';
import TxAppl from 'components/SignTransaction/TxAppl';
import Authenticate from 'components/Authenticate';
import { sendMessage } from 'services/Messaging';
import { StoreContext } from 'services/StoreContext';
import logotype from 'assets/logotype.png';
import { getBaseSupportedLedgers } from '@algosigner/common/types/ledgers';

function deny() {
  const params = {
    responseOriginTabID: responseOriginTabID,
  };
  sendMessage(JsonRpcMethod.SignDeny, params, function () {
    // No callback
  });
}

let responseOriginTabID = 0;

const SignV2Transaction: FunctionalComponent = () => {
  const store: any = useContext(StoreContext);
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [request, setRequest] = useState<any>({});
  const [ledger, setLedger] = useState<string>('');
  const [accounts] = useState<Array<string>>([]);
  // const [approvals, setApprovals] = useState<Array<boolean>>([]);
  const [tab, setTab] = useState<number>(0);
  let transactionWraps: Array<any> = [];

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender: any) => {
      // Check if a message has already been recieved
      if (Object.keys(request).length === 0) return false;

      // Check if the message is coming from the background script
      if (
        isFromExtension(sender.origin) &&
        request.body.method == JsonRpcMethod.SignV2Transaction
      ) {
        setRequest(request);
        responseOriginTabID = request.originTabID;
      }
    });

    window.addEventListener('beforeunload', deny);
    return () => window.removeEventListener('beforeunload', deny);
  }, []);

  const sign = (pwd: string) => {
    const params = {
      passphrase: pwd,
      responseOriginTabID: responseOriginTabID,
    };
    setLoading(true);
    setAuthError('');
    window.removeEventListener('beforeunload', deny);

    sendMessage(JsonRpcMethod.SignAllow, params, function (response) {
      if ('error' in response) {
        window.addEventListener('beforeunload', deny);
        setLoading(false);
        switch (response.error) {
          case 'Login Failed':
            setAuthError('Wrong passphrase');
            break;
          default:
            setAskAuth(false);
            break;
        }
      }
    });
  };

  // const findAccounts = (ledger) => {
  //   console.log(ledger);
  //   console.log(accounts);
  //   const newAccounts = [...accounts];
  //   for (let i = store[ledger].length - 1; i >= 0; i--) {
  //     transactionWraps.forEach((wrap, index) => {
  //       if (store[ledger][i].address === wrap.transaction.from) {
  //         if (newAccounts[index] === undefined) {
  //           newAccounts[index] = store[ledger][i].name;
  //         }
  //       }
  //     });
  //   }
  //   console.log(newAccounts);
  //   setAccounts(newAccounts);
  // };

  const getWrapUI = (wrap, account) => {
    return html`
      <section id="txAlerts" class="section py-0">
        ${wrap.validityObject && html`<${TxAlert} vo=${wrap.validityObject} />`}
      </section>
      <section class="section py-0">
        ${wrap.transaction.type === 'pay' &&
        html`
          <${TxPay}
            tx=${wrap.transaction}
            vo=${wrap.validityObject}
            fee=${wrap.estimatedFee}
            account=${account}
            ledger=${ledger}
          />
        `}
        ${wrap.transaction.type === 'keyreg' &&
        html`
          <${TxKeyreg}
            tx=${wrap.transaction}
            vo=${wrap.validityObject}
            fee=${wrap.estimatedFee}
            account=${account}
            ledger=${ledger}
          />
        `}
        ${wrap.transaction.type === 'acfg' &&
        html`
          <${TxAcfg}
            tx=${wrap.transaction}
            vo=${wrap.validityObject}
            dt=${wrap.txDerivedTypeText}
            fee=${wrap.estimatedFee}
            account=${account}
            ledger=${ledger}
          />
        `}
        ${wrap.transaction.type === 'axfer' &&
        html`
          <${TxAxfer}
            tx=${wrap.transaction}
            vo=${wrap.validityObject}
            dt=${wrap.txDerivedTypeText}
            fee=${wrap.estimatedFee}
            da=${wrap.displayAmount}
            un=${wrap.unitName}
            account=${account}
            ledger=${ledger}
          />
        `}
        ${wrap.transaction.type === 'afrz' &&
        html`
          <${TxAfrz}
            tx=${wrap.transaction}
            vo=${wrap.validityObject}
            fee=${wrap.estimatedFee}
            account=${account}
            ledger=${ledger}
          />
        `}
        ${wrap.transaction.type === 'appl' &&
        html`
          <${TxAppl}
            tx=${wrap.transaction}
            vo=${wrap.validityObject}
            fee=${wrap.estimatedFee}
            account=${account}
            ledger=${ledger}
          />
        `}
      </section>
    `;
  };

  if (request.body) {
    transactionWraps = request.body.params;
    // Search for account
    let txLedger;
    getBaseSupportedLedgers().forEach((l) => {
      if (transactionWraps[0].transaction.genesisID === l['genesisId']) {
        txLedger = l['name'];
        console.log(`found ledger ${txLedger}`);
        setLedger(txLedger);
        // findAccounts(txLedger);
      }
    });

    // Add on any injected ledgers
    if (txLedger === undefined || accounts.some((acc) => acc === undefined)) {
      let sessionLedgers;
      store.getAvailableLedgers((availableLedgers) => {
        if (!availableLedgers.error) {
          sessionLedgers = availableLedgers;
          sessionLedgers.forEach((l) => {
            if (transactionWraps[0].transaction.genesisID === l['genesisId']) {
              txLedger = l['name'];
            }
          });

          setLedger(txLedger);
          // findAccounts(txLedger);
        }
      });
    } else {
      setLedger(txLedger);
    }
  }

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <div class="px-4 mt-2" style="flex: 0; border-bottom: 1px solid #EFF4F7">
        <img src=${logotype} width="130" />
      </div>
      ${request.body &&
      html`
        <section class="hero">
          <div class="hero-body py-3">
            ${request.favIconUrl &&
            html` <img src=${request.favIconUrl} width="48" style="float:left" /> `}
            <h1 class="title is-size-4" style="margin-left: 58px;">
              <!-- prettier-ignore -->
              <span>${request.originTitle} wants to sign transactions for </span>
              <span style="color:${ledger.toLowerCase() == 'mainnet' ? '#f16522' : '#222b60'};">
                ${ledger}
              </span>
            </h1>
          </div>
        </section>
      `}
      ${request.body &&
      transactionWraps.length > 1 &&
      html`
        <div class="tabs is-centered mb-0">
          <ul>
            ${transactionWraps.map(
              (_, index) => html`
                <li class=${tab === index ? 'is-active' : ''} onClick=${() => setTab(index)}>
                  <a>Transaction ${index + 1}</a>
                </li>
              `
            )}
          </ul>
        </div>
        <div style="flex: 1; overflow:auto; max-height: 300px;">
          ${getWrapUI(transactionWraps[tab], accounts[tab])}
        </div>
      `}
      ${request.body &&
      transactionWraps.length === 1 &&
      html`
        <div style="flex: 1; overflow:auto; max-height: 400px;">
          ${getWrapUI(transactionWraps[0], accounts[0])}
        </div>
      `}

      <div class="mx-5 mb-3" style="display: flex;">
        <button id="rejectTx" class="button is-danger is-outlined px-6" onClick=${deny}>
          Reject
        </button>
        <button
          id="approveTx"
          class="button is-primary ml-3"
          style="flex: 1;"
          onClick=${() => {
            setAskAuth(true);
          }}
        >
          Sign!
        </button>
      </div>
    </div>

    ${askAuth &&
    html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <${Authenticate} error=${authError} loading=${loading} nextStep=${sign} />
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick=${() => setAskAuth(false)}
        />
      </div>
    `}
  `;
};

export default SignV2Transaction;
