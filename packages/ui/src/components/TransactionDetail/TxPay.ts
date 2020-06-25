import { html } from 'htm/preact';
import { FunctionalComponent } from "preact";

const TxPay: FunctionalComponent = (props: any) => {
  const { tx, ledger } = props;

  // TODO close to payments
  // const closeamount = props.data.payment.closeamount || 0;
  // const closerewards = props.data.payment.closerewards || 0;

  return html`
    <div class="box" style="overflow-wrap: break-word;">
      <p class="has-text-centered has-text-weight-bold">Payment</p>
      <p><strong>TxID:</strong> ${tx.id}</p>
      <p><strong>From:</strong> ${tx.sender}</p>
      <p><strong>To:</strong> ${tx['payment-transaction'].receiver}</p>
      <p><strong>Amount:</strong> ${tx['payment-transaction']['amount']/1e6} Algos</p>
      <p><strong>Block:</strong> ${tx['confirmed-round']}</p>
      <div class="has-text-centered">
        <a href=${`https://goalseeker.purestake.io/algorand/${ledger.toLowerCase()}/transaction/${tx.id}`} target="_blank" rel="noopener noreferrer">
          See details in GoalSeeker
        </a>
      </div>
    </div>
  `;
}

export default TxPay