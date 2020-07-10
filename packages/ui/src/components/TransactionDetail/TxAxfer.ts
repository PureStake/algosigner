import { html } from 'htm/preact';
import { FunctionalComponent } from "preact";

const TxAxfer: FunctionalComponent = (props: any) => {
  const { tx, ledger } = props;
  //TODO more details in close to and clawbacks

  console.log('tadfad', tx)
  return html`
    <div class="box" style="overflow-wrap: break-word;">
      <p class="has-text-centered has-text-weight-bold">Asset transfer</p>
      <p><strong>TxID:</strong> ${tx.id}</p>
      <p><strong>From:</strong> ${tx.sender}</p>
      <p><strong>To:</strong> ${tx['asset-transfer-transaction'].receiver}</p>
      <p><strong>Amount:</strong> ${tx['asset-transfer-transaction']['amount']}</p>
      <p><strong>Block:</strong> ${tx['confirmed-round']}</p>
      <div class="has-text-centered">
        <a href=${`https://goalseeker.purestake.io/algorand/${ledger.toLowerCase()}/transaction/${tx.id}`} target="_blank" rel="noopener noreferrer">
          See details in GoalSeeker
        </a>
      </div>
    </div>
  `;
}

export default TxAxfer