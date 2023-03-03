import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { isFromExtension } from '@algosigner/common/utils';

import TxAcfg from 'components/SignTransaction/TxAcfg';
import TxPay from 'components/SignTransaction/TxPay';
import TxKeyreg from 'components/SignTransaction/TxKeyreg';
import TxAxfer from 'components/SignTransaction/TxAxfer';
import TxAfrz from 'components/SignTransaction/TxAfrz';
import TxAppl from 'components/SignTransaction/TxAppl';
import Authenticate from 'components/Authenticate';
import { sendMessage } from 'services/Messaging';
import { StoreContext } from 'services/StoreContext';
import logotype from 'assets/logotype.png';
import { getBaseSupportedNetworks } from '@algosigner/common/types/network';

function deny() {
  const params = {
    responseOriginTabID: responseOriginTabID,
  };
  sendMessage(JsonRpcMethod.SignDeny, params, function () {
    // No callback
  });
}

let responseOriginTabID = 0;

const SignWalletTransaction: FunctionalComponent = () => {
  const store: any = useContext(StoreContext);
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [request, setRequest] = useState<any>({});
  const [network, setNetwork] = useState<string>('');
  const [activeTx, setActiveTx] = useState<number>(0);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [approvals, setApprovals] = useState<Array<boolean>>([]);
  const [accountNames, setAccountNames] = useState<Array<string>>([]);
  const [contacts, setContacts] = useState<Array<any>>([]);
  let transactionWraps: Array<any> = [];
  let currentGroup: number = 0;
  let totalGroups: number = 0;

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender: any) => {
      // Check if a message has already been recieved
      if (Object.keys(request).length === 0) return false;

      // Check if the message is coming from the background script
      if (
        isFromExtension(sender.origin) &&
        request.body.method == JsonRpcMethod.SignWalletTransaction
      ) {
        setRequest(request);
        responseOriginTabID = request.originTabID;
      }
    });

    window.addEventListener('beforeunload', deny);
    return () => window.removeEventListener('beforeunload', deny);
  }, []);

  useEffect(() => {
    sendMessage(JsonRpcMethod.GetContacts, {}, function (response) {
      setLoading(false);
      if (!('error' in response)) {
        setContacts(response);
      }
    });
  }, []);

  const sign = (pwd: string) => {
    const params = {
      passphrase: pwd,
      responseOriginTabID: responseOriginTabID,
    };
    setLoading(true);
    setAuthError('');
    window.removeEventListener('beforeunload', deny);

    sendMessage(JsonRpcMethod.SignAllowWalletTx, params, function (response) {
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

  const findAccountNames = (network) => {
    const newAccountNames = accountNames.slice();
    if (store.wallet[network] && store.wallet[network].length) {
      for (let i = 0; i < store.wallet[network].length; i++) {
        transactionWraps.forEach((wrap, index) => {
          const lookupAddress = store.wallet[network][i].address;
          const lookupName = store.wallet[network][i].name;
          const msigData = wrap.msigData;
          const signers = wrap.signers;
          if (signers && !signers.length) {
            newAccountNames[index] = "Reference Transaction (won't be signed)";
          } else {
            if (
              msigData &&
              msigData.addrs.includes(lookupAddress) &&
              (!signers || signers.includes(lookupAddress))
            ) {
              if (newAccountNames[index]) {
                newAccountNames[index] = `${newAccountNames[index]}, ${lookupName}`;
              } else {
                newAccountNames[index] = lookupName;
              }
            } else if (lookupAddress === wrap.transaction.from) {
              newAccountNames[index] = lookupName;
            }
          }
        });
      }
      setAccountNames(newAccountNames);
    } else {
      setTimeout(() => {
        findAccountNames(network);
      }, 100);
    }
  };

  const flipDropdown = () => {
    setDropdown(!dropdown);
  };

  const toggleApproval = () => {
    const newApprovals = approvals.slice();
    newApprovals[activeTx] = !newApprovals[activeTx];
    if (!approvals[activeTx]) {
      for (let i = 0; i < newApprovals.length; i++) {
        if (!newApprovals[i]) {
          setActiveTx(i);
          break;
        }
      }
    }
    setApprovals(newApprovals);
  };

  const getApproval = (index) => {
    return approvals[index]
      ? html`
          <span class="icon is-small" style="color: #32CD32;">
            <i class="far fa-check-circle" aria-hidden="true"></i>
          </span>
        `
      : html`
          <span class="icon is-small">
            <i class="far fa-circle" aria-hidden="true"></i>
          </span>
        `;
  };

  if (request.body && !transactionWraps.length) {
    const params = request.body.params;
    transactionWraps = params.transactionWraps;
    currentGroup = params.currentGroup + 1;
    totalGroups = params.groupsToSign ? params.groupsToSign.length : 1;

    // Initialize per-tx variables
    if (!approvals.length && transactionWraps.length) {
      setApprovals(new Array(transactionWraps.length).fill(false));
    }
    if (!accountNames.length && transactionWraps.length) {
      setAccountNames(new Array(transactionWraps.length).fill(''));
    }

    if (!network) {
      // Search for network and find accounts
      let txnNetwork;
      getBaseSupportedNetworks().forEach((n) => {
        if (transactionWraps[0].transaction.genesisID === n['genesisID']) {
          txnNetwork = n['name'];
          setNetwork(txnNetwork);
          findAccountNames(txnNetwork);
        }
      });

      // Add on any injected networks
      if (txnNetwork === undefined) {
        let sessionNetworks;
        store.getAvailableNetworks((availableNetworks) => {
          if (!availableNetworks.error) {
            sessionNetworks = availableNetworks;
            sessionNetworks.forEach((n) => {
              if (transactionWraps[0].transaction.genesisID === n['genesisID']) {
                txnNetwork = n['name'];
              }
            });

            setNetwork(txnNetwork);
            findAccountNames(txnNetwork);
          }
        });
      } else {
        setNetwork(txnNetwork);
      }
    }
  }

  const isSignDisabled = transactionWraps.length > 1 && !approvals.every(Boolean);

  const approvedAmount = approvals.filter((a) => a).length;
  const approvedPercent = (approvedAmount * 100) / transactionWraps.length;

  const getWrapUI = (wrap, account) => {
    const to = wrap.transaction.to;
    const contact = to ? contacts.find((c) => c.address === to) : null;
    return html`
      <div style="overflow:visible; height: 360px; flex-basis: 75%;">
        ${wrap.transaction.type === 'pay' &&
        html`
          <${TxPay}
            tx=${wrap.transaction}
            vo=${wrap.validityObject}
            estFee=${wrap.estimatedFee}
            account=${account}
            network=${network}
            msig=${wrap.msigData}
            contact=${contact}
            authAddr=${wrap.authAddr}
          />
        `}
        ${wrap.transaction.type === 'keyreg' &&
        html`
          <${TxKeyreg}
            tx=${wrap.transaction}
            vo=${wrap.validityObject}
            estFee=${wrap.estimatedFee}
            account=${account}
            network=${network}
            msig=${wrap.msigData}
            authAddr=${wrap.authAddr}
          />
        `}
        ${wrap.transaction.type === 'acfg' &&
        html`
          <${TxAcfg}
            tx=${wrap.transaction}
            vo=${wrap.validityObject}
            dt=${wrap.txDerivedTypeText}
            estFee=${wrap.estimatedFee}
            account=${account}
            network=${network}
            msig=${wrap.msigData}
            authAddr=${wrap.authAddr}
          />
        `}
        ${wrap.transaction.type === 'axfer' &&
        html`
          <${TxAxfer}
            tx=${wrap.transaction}
            vo=${wrap.validityObject}
            dt=${wrap.txDerivedTypeText}
            estFee=${wrap.estimatedFee}
            da=${wrap.assetInfo.displayAmount}
            un=${wrap.assetInfo.unitName}
            account=${account}
            network=${network}
            msig=${wrap.msigData}
            contact=${contact}
            authAddr=${wrap.authAddr}
          />
        `}
        ${wrap.transaction.type === 'afrz' &&
        html`
          <${TxAfrz}
            tx=${wrap.transaction}
            vo=${wrap.validityObject}
            estFee=${wrap.estimatedFee}
            account=${account}
            network=${network}
            msig=${wrap.msigData}
            authAddr=${wrap.authAddr}
          />
        `}
        ${wrap.transaction.type === 'appl' &&
        html`
          <${TxAppl}
            tx=${wrap.transaction}
            vo=${wrap.validityObject}
            estFee=${wrap.estimatedFee}
            account=${account}
            network=${network}
            msig=${wrap.msigData}
            authAddr=${wrap.authAddr}
          />
        `}
      </div>
    `;
  };

  return html`
    <div
      class="main-view is-flex-direction-column is-justify-content-space-between"
      style="min-height: 660px;"
    >
      <div class="px-5 mt-2" style="flex: 0; border-bottom: 1px solid #EFF4F7">
        <img src=${logotype} width="130" />
        ${totalGroups > 1 &&
        html`
          <span style="float: right;">Signing group ${currentGroup} out of ${totalGroups}</span>
        `}
      </div>
      ${request.body &&
      html`
        <section class="hero">
          <div class="hero-body is-flex is-align-items-center py-2">
            ${request.favIconUrl &&
            html`<img class="mr-2" src=${request.favIconUrl} width="32" style="float:left" />`}
            <h1 class="title is-size-5">
              <span>${request.originTitle} wants to sign transactions for </span>
              <span style="color:${network.toLowerCase() == 'mainnet' ? '#f16522' : '#222b60'};">
                ${network}
              </span>
            </h1>
          </div>
        </section>
      `}
      ${request.body &&
      accountNames.length == transactionWraps.length &&
      transactionWraps.length > 1 &&
      html`
        <div class="px-5 pb-3 is-flex is-justify-content-space-between">
          <div class="dropdown ${dropdown ? 'is-active' : ''}">
            <div class="dropdown-trigger">
              <button
                class="button is-light"
                onClick=${flipDropdown}
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>Transaction ${activeTx + 1} of ${transactionWraps.length}</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu">
              <div class="dropdown-mask" onClick=${flipDropdown} />
              <div class="dropdown-content" style="border: 1px solid #eff4f7;">
                ${transactionWraps.map(
                  (_, index) => html`
                    <a
                      class="dropdown-item pr-4 is-flex is-justify-content-space-between"
                      onClick=${() => {
                        setActiveTx(index);
                        flipDropdown();
                      }}
                    >
                      <span>Transaction ${index + 1}</span>
                      ${getApproval(index)}
                    </a>
                  `
                )}
              </div>
            </div>
          </div>
          <button class="button is-primary" id="toggleApproval" onClick="${toggleApproval}">
            <span>Approve</span>
            ${getApproval(activeTx)}
          </button>
        </div>
        ${getWrapUI(transactionWraps[activeTx], accountNames[activeTx])}
        <div
          class="is-flex is-flex-direction-column has-text-centered mb-3 mx-5"
          style="margin-top: -1.5rem;"
        >
          <span>${approvedAmount} out of ${transactionWraps.length} transactions approved.</span>
          <progress
            class="progress ${approvedPercent < 100 ? 'is-primary' : 'is-success'}"
            value="${approvedPercent}"
            max="100"
          />
        </div>
      `}
      ${request.body &&
      accountNames.length == transactionWraps.length &&
      transactionWraps.length === 1 &&
      html` ${getWrapUI(transactionWraps[0], accountNames[0])} `}
      ${request.body &&
      html`
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
            disabled=${isSignDisabled}
          >
            ${transactionWraps.length > 1
              ? isSignDisabled
                ? 'Approve transactions first!'
                : 'Sign all transactions!'
              : 'Sign!'}
          </button>
        </div>
      `}
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

export default SignWalletTransaction;
