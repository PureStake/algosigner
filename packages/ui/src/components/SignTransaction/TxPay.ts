import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';
import TxTemplate from './Common/TxTemplate';

const TxPay: FunctionalComponent = (props: any) => {
  const { tx, account, vo, estFee, msig } = props;
  const fee = estFee ? estFee : tx['fee'];

  const midsection = html`
    <p class="has-text-centered has-text-weight-bold">
      <span><i class="fas fa-arrow-down mr-3"></span></i>
      <span>Payment</span>
    </p>

    <div class="box py-2 is-shadowless mt-3 mb-0" style="background: #eff4f7;">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <b style="word-break: break-all;">${tx.to}</b>
        </div>
      </div>
    </div>
  `;

  const overview = html`
    <div>
      ${tx.group &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">Group ID:</p>
          <p style="width: 70%;" class="truncate-text">${tx.group}</p>
        </div>
      `}
      <div class="is-flex">
        <p style="width: 30%;">Sending:</p>
        <p style="width: 70%;">${tx.amount / 1e6} Algos</p>
      </div>
      <div class="is-flex${vo && vo['fee'] ? (' ' + vo['fee']['className']).trimRight() : ''}">
        <p style="width: 30%;">${!estFee || tx['flatFee'] ? 'Fee:' : 'Estimated fee:'}</p>
        <p style="width: 70%;">${fee / 1e6} Algos</p>
      </div>
      <div class="is-flex">
        <p style="width: 30%;"><b>Total:</b></p>
        <p style="width: 70%;">${(fee + tx.amount) / 1e6} Algos</p>
      </div>
    </div>
  `;

  return html`
    <${TxTemplate}
      tx=${tx}
      account=${account}
      vo=${vo}
      msig=${msig}
      midsection=${midsection}
      overview=${overview}
    />
  `;
};

export default TxPay;
