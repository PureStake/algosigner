import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { sendMessage } from 'services/Messaging';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { ledgerActions } from './structure/ledgerActions';
import { getBaseSupportedLedgers } from '@algosigner/common/types/ledgers';
import TxAcfg from 'components/SignTransaction/TxAcfg';
import TxPay from 'components/SignTransaction/TxPay';
import TxKeyreg from 'components/SignTransaction/TxKeyreg';
import TxAxfer from 'components/SignTransaction/TxAxfer';
import TxAfrz from 'components/SignTransaction/TxAfrz';
import TxAppl from 'components/SignTransaction/TxAppl';
import { logging } from '@algosigner/common/logging';
import { StoreContext } from 'services/StoreContext';

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

  useEffect(() => {
    if (txn.transaction === undefined && error === '') {
      try {
        sendMessage(JsonRpcMethod.LedgerGetSessionTxn, {}, function (response) {
          if (response.error) {
            setError(response.error);
          } else {
            getBaseSupportedLedgers().forEach((l) => { 
              if (response.genesisID === l['genesisId']) {
                setLedger(l['name']);

                // Update the ledger dropdown to the signing one
                sendMessage(JsonRpcMethod.ChangeLedger, { ledger: l['name'] }, function () {
                  store.setLedger(l['name']);
                });
              }
            });

            // Update account value to the signer
            setAccount(response.from);

            setTxn(response);
          }
        });
      } catch (ex) {
        setError('Error retrieving transaction from AlgoSigner.');
        logging.log(`${JSON.stringify(ex)}`, 2);
      }
    }
  }, []);

  const ledgerSignTransaction = () => {
    setLoading(true);
    setError('');
    ledgerActions.signTransaction(txn).then((lar) => {
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
          setTxResponseHeader('Transaction sent:');
          setTxResponseDetail(response['txId']);
          setIsComplete(true);
        } else {
          console.log(`response: ${JSON.stringify(response)}`);
          setTxResponseHeader('Transaction signed. Result sent to origin tab.');
          setTxResponseDetail(JSON.stringify(response));
          setIsComplete(true);
        }

        setLoading(true);
      });
    });
  };

  return html`
    <div
      class="main-view"
      style="flex-direction: column; justify-content: space-between; overflow: hidden;"
    >
      <div class="top-view" style="flex: 1; overflow:auto;">
        <div class="px-5 py-1 has-text-weight-bold is-size-5">
          <p style="overflow: hidden; text-overflow: ellipsis;">Sign Using Ledger Device</p>
        </div>
        ${isComplete &&
        html`
          <div class="box">
            <p id="txResponseHeader" style="font-weight: bold"> ${txResponseHeader} </p>
            <p id="txResponseDetail" style="word-break: break-all;"> ${txResponseDetail} </p>
            <p class="my-3"> You may now close this site and relaunch AlgoSigner.</p>
          </div>
        `}
        ${isComplete === false &&
        html`
          <div class="py-0 px-0">
            <section id="txInfo" class="section py-0">
              <p
                >Insert the hardware device and verify the Algorand application is open before
                continuing. Review data on the device for correctness.
              </p>
            </section>
            ${txn &&
            txn.transaction &&
            html`
              <section class="section py-0 px-0" style="word-break: break-all;">
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
              </section>
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
