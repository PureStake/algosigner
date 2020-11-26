import { html } from 'htm/preact';
import { FunctionalComponent } from "preact";

const TxAcfg: FunctionalComponent = (props: any) => {
  const { tx, ledger } = props;

  return html`
    <div class="box" style="overflow-wrap: break-word;">
      <p id="txTitle" class="has-text-centered has-text-weight-bold">
        Asset configuration
      </p>
      <p data-transaction-id="${tx.id}">
        <strong>TxID:</strong> <span>${tx.id}</span>
      </p>
      <p data-transaction-sender="${tx.sender}">
        <strong>From:</strong> <span>${tx.sender}</span>
      </p>
      ${tx['asset-config-transaction']['params']['name'] &&
      html`
        <p>
          <strong>Asset name:</strong>
          <span>${tx['asset-config-transaction']['params']['name']}</span>
        </p>
      `}
      <p>
        <strong>Total:</strong> ${tx['asset-config-transaction']['params'][
          'total'
        ]}
        ${tx['asset-config-transaction']['params']['unit-name']}
      </p>
      <p><strong>Block:</strong> <span>${tx['confirmed-round']}</span></p>
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
}

export default TxAcfg