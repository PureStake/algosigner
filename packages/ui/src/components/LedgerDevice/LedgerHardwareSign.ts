import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { getBaseSupportedLedgers } from '@algosigner/common/types/ledgers';
import { logging } from '@algosigner/common/logging';
import TxAcfg from 'components/SignTransaction/TxAcfg';
import TxPay from 'components/SignTransaction/TxPay';
import TxKeyreg from 'components/SignTransaction/TxKeyreg';
import TxAxfer from 'components/SignTransaction/TxAxfer';
import TxAfrz from 'components/SignTransaction/TxAfrz';
import TxAppl from 'components/SignTransaction/TxAppl';
import ReducedHeader from 'components/ReducedHeader';

import { sendMessage } from 'services/Messaging';
import { StoreContext } from 'services/StoreContext';
import { ledgerActions } from './structure/ledgerActions';

const LedgerHardwareSign: FunctionalComponent = () => {
  const store: any = useContext(StoreContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [txn, setTxn] = useState<any>({});
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [account, setAccount] = useState<string>('');
  const [txResponseHeader, setTxResponseHeader] = useState<string>('');
  const [txResponseDetail, setTxResponseDetail] = useState<string>('');
  const [ledger, setLedger] = useState<string>('');
  const [sessionTxnObj, setSessionTxnObj] = useState<any>({});

  useEffect(() => {
    try {
      sendMessage(JsonRpcMethod.LedgerGetSessionTxn, {}, function (response) {
        if (response.error) {
          setError(response.error);
        } else {
          // Get the single transaction to sign and put it in the same format
          let primaryTx;
          if (response.transactionWraps && response.transactionWraps.length > 0) {
            primaryTx = response.transactionWraps[0];
          } else {
            primaryTx = {
              transaction: response.transaction,
              estimatedFee: response.estimatedFee,
              txDerivedTypeText: response.txDerivedTypeText,
            };
          }

          getBaseSupportedLedgers().forEach((l) => {
            if (primaryTx.transaction?.genesisID === l['genesisId']) {
              setLedger(l['name']);

              // Update the ledger dropdown to the signing one
              sendMessage(JsonRpcMethod.ChangeLedger, { ledger: l['name'] }, function () {
                store.setLedger(l['name']);
              });
            }
          });

          // Update account value to the signer
          setAccount(primaryTx.transaction?.from);

          setSessionTxnObj(response);
          setTxn(primaryTx);
        }
      });
    } catch (ex) {
      setError('Error retrieving transaction from AlgoSigner.');
      logging.log(`${JSON.stringify(ex)}`, 2);
    }
  }, []);

  const ledgerSignTransaction = () => {
    setLoading(true);
    setError('');
    ledgerActions.signTransaction(sessionTxnObj).then((lar) => {
      if (lar.error) {
        setError(lar.error);
        setLoading(false);
        return;
      }
      const b64Response = Buffer.from(lar.message, 'base64').toString('base64');
      sendMessage(JsonRpcMethod.LedgerSendTxnResponse, { txn: b64Response }, function (response) {
        logging.log(`UI: Ledger response: ${JSON.stringify(response)}`, 2);
        if (response && 'error' in response) {
          setError(response['error']);
        }

        if (response && 'txId' in response) {
          setTxResponseHeader('Transaction sent with ID:');
          setTxResponseDetail(response['txId']);
          setIsComplete(true);
        } else if (response) {
          console.log(`response: ${JSON.stringify(response)}`);
          setTxResponseHeader('Transaction signed. Result sent to origin tab.');
          setTxResponseDetail(JSON.stringify(response));
          setIsComplete(true);
        } else {
          console.log('response not found');
          setError('There was a problem signing the transaction, please try again.');
        }

        setLoading(false);
      });
    });
  };

  return html`
    <${ReducedHeader} />
    <div
      class="main-view"
      style="flex-direction: column; justify-content: space-between; overflow: hidden;"
    >
      <div class="px-4 py-3 has-text-weight-bold is-size-5">
        <p style="overflow: hidden; text-overflow: ellipsis;">Sign Using Ledger Device</p>
      </div>
      <div class="top-view" style="flex: 1; overflow-y: auto; overflow-x: hidden;">
        ${isComplete &&
        html`
          <div class="mt-2 px-4">
            <p id="txResponseHeader" style="font-weight: bold">${txResponseHeader}</p>
            <pre style="white-space: break-spaces;" class="mt-2">
              <code id="txResponseDetail" style="word-break: break-all;">${txResponseDetail}</code>
            </pre>
            <p class="my-3">You may now close this site and relaunch AlgoSigner.</p>
          </div>
        `}
        ${isComplete === false &&
        html`
          <div class="py-0 px-4">
            <section id="txInfo" class="py-0">
              <p class="mb-2">
                Insert the hardware device and verify the Algorand application is open before
                continuing. Review data on the device for correctness.
              </p>
            </section>
            ${txn &&
            txn.transaction &&
            html`
              <div style="margin-left: -3rem; margin-right: -3rem;">
                ${txn.transaction.type === 'pay' &&
                html`
                  <${TxPay}
                    tx=${txn.transaction}
                    vo=${txn.validityObject}
                    estFee=${txn.estimatedFee}
                    account=${account}
                    ledger=${ledger}
                  />
                `}
                ${txn.transaction.type === 'keyreg' &&
                html`
                  <${TxKeyreg}
                    tx=${txn.transaction}
                    vo=${txn.validityObject}
                    estFee=${txn.estimatedFee}
                    account=${account}
                    ledger=${ledger}
                  />
                `}
                ${txn.transaction.type === 'acfg' &&
                html`
                  <${TxAcfg}
                    tx=${txn.transaction}
                    vo=${txn.validityObject}
                    dt=${txn.txDerivedTypeText}
                    estFee=${txn.estimatedFee}
                    account=${account}
                    ledger=${ledger}
                  />
                `}
                ${txn.transaction.type === 'axfer' &&
                html`
                  <${TxAxfer}
                    tx=${txn.transaction}
                    vo=${txn.validityObject}
                    dt=${txn.txDerivedTypeText}
                    estFee=${txn.estimatedFee}
                    da=${txn.displayAmount}
                    un=${txn.unitName}
                    account=${account}
                    ledger=${ledger}
                  />
                `}
                ${txn.transaction.type === 'afrz' &&
                html`
                  <${TxAfrz}
                    tx=${txn.transaction}
                    vo=${txn.validityObject}
                    estFee=${txn.estimatedFee}
                    account=${account}
                    ledger=${ledger}
                  />
                `}
                ${txn.transaction.type === 'appl' &&
                html`
                  <${TxAppl}
                    tx=${txn.transaction}
                    vo=${txn.validityObject}
                    estFee=${txn.estimatedFee}
                    account=${account}
                    ledger=${ledger}
                  />
                `}
              </div>
            `}
          </div>
        `}
      </div>
      ${isComplete === false &&
      html`
        <div class="bottom-view" style="padding: 0.5em 1em;">
          <p class="has-text-danger"> ${error !== undefined && error.length > 0 && error} </p>
          <button
            class="button is-primary is-fullwidth${loading ? ' is-loading' : ''}"
            id="nextStep"
            disabled=${txn.transaction === undefined}
            onClick=${() => {
              ledgerSignTransaction();
            }}
          >
            Send to device
          </button>
        </div>
      `}
    </div>
  `;
};

export default LedgerHardwareSign;
