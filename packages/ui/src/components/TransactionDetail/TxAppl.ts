import { html } from 'htm/preact';
import { FunctionalComponent } from "preact";

const TxAppl: FunctionalComponent = (props: any) => {
  const { tx, ledger } = props;

  return html`
    <div class="box" style="overflow-wrap: break-word;">
      <p class="has-text-centered has-text-weight-bold">Application</p>
      <p><strong>TxID:</strong> <span>${tx.id}</span></p>
      <p><strong>From:</strong> <span>${tx.sender}</span></p>
      <p><strong>Amount:</strong> <span>On completion: ${tx['application-transaction']['on-completion']}</span></p>
      <p><strong>Block:</strong> <span>${tx['confirmed-round']}</span></p>
      <div class="has-text-centered">
        <a href=${`https://goalseeker.purestake.io/algorand/${ledger.toLowerCase()}/transaction/${tx.id}`} target="_blank" rel="noopener noreferrer">
          See details in GoalSeeker
        </a>
      </div>
    </div>
  `;
}

export default TxAppl