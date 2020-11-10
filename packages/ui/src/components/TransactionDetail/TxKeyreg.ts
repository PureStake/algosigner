import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';

const TxKeyreg: FunctionalComponent = (props: any) => {
  const { tx, ledger } = props;

  return html`
    <div class="box" style="overflow-wrap: break-word;">
      <p class="has-text-centered has-text-weight-bold">Key registration</p>
      <p><strong>TxID:</strong> ${tx.id}</p>
      <p><strong>From:</strong> ${tx.sender}</p>
      <p><strong>Block:</strong> ${tx['confirmed-round']}</p>
      <div class="has-text-centered">
        <a
          href=${`https://goalseeker.purestake.io/algorand/${ledger.toLowerCase()}/transaction/${
            tx.id
          }`}
          target="_blank"
          rel="noopener noreferrer"
        >
          See details in GoalSeeker
        </a>
      </div>
    </div>
  `;
};

export default TxKeyreg;
