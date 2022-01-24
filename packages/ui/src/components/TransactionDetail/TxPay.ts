import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';

import goalseekerIcon from 'assets/goalseeker.svg';

const TxPay: FunctionalComponent = (props: any) => {
  const { tx, ledger } = props;

  // TODO close to payments
  // const closeamount = props.data.payment.closeamount || 0;
  // const closerewards = props.data.payment.closerewards || 0;

  return html`
    <div class="box" style="overflow-wrap: break-word;">
      <p id="txTitle" class="has-text-centered has-text-weight-bold">Payment</p>
      <p data-transaction-id="${tx.id}">
        <strong>TxID: </strong>
        <span>${tx.id}</span>
      </p>
      <p data-transaction-sender="${tx.sender}">
        <strong>From: </strong>
        <span>${tx.sender}</span>
      </p>
      <p>
        <strong>To: </strong>
        <span>${tx['payment-transaction'].receiver}</span>
      </p>
      <p>
        <strong>Amount: </strong>
        <span>${tx['payment-transaction']['amount'] / 1e6} Algos</span>
      </p>
      <p>
        <strong>Block: </strong>
        <span>${tx['confirmed-round']}</span>
      </p>
      <div class="has-text-centered">
        <a
          href=${`https://goalseeker.purestake.io/algorand/${ledger.toLowerCase()}/transaction/${
            tx.id
          }`}
          target="_blank"
          rel="noopener noreferrer"
        >
          See details in GoalSeeker
          <img src=${goalseekerIcon} width="12" style="margin-bottom: -4px;" class="ml-1" />
        </a>
      </div>
    </div>
  `;
};

export default TxPay;
