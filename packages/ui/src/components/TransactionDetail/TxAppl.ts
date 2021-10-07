import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';

const TxAppl: FunctionalComponent = (props: any) => {
  const { tx, ledger } = props;

  return html`
    <div class="box" style="overflow-wrap: break-word;">
      <p id="txTitle" class="has-text-centered has-text-weight-bold"> Application </p>
      <p data-transaction-id="${tx.id}">
        <strong>TxID: </strong>
        <span>${tx.id}</span>
      </p>
      <p data-transaction-sender="${tx.sender}">
        <strong>From: </strong>
        <span>${tx.sender}</span>
      </p>
      <p>
        <strong>Application Id: </strong>
        <span>${tx['application-transaction']['application-id']}</span>
      </p>
      <p>
        <strong>On Completion: </strong>
        <span>${tx['application-transaction']['on-completion']}</span>
      </p>
      ${tx['inner-txns'].length &&
      html`
        <p>
          <strong>Inner Transactions: </strong>
          <span>${tx['inner-txns'].length}</span>
        </p>
      `}
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
        </a>
      </div>
    </div>
  `;
};

export default TxAppl;
