import { html } from 'htm/preact';
import { FunctionalComponent } from "preact";

const TxAcfg: FunctionalComponent = (props: any) => {
  const { tx, ledger } = props;

  return html`
    <div class="box" style="overflow-wrap: break-word;">
      <p class="has-text-centered has-text-weight-bold">Asset configuration</p>
      <p><strong>TxID:</strong> ${tx.id}</p>
      <p><strong>From:</strong> ${tx.sender}</p>
      <p><strong>Asset name:</strong> ${tx['asset-config-transaction']['params']['name']}</p>
      <p><strong>Total:</strong> ${tx['asset-config-transaction']['params']['total']} ${tx['asset-config-transaction']['params']['unit-name']}</p>
      <p><strong>Block:</strong> ${tx['confirmed-round']}</p>
      <div class="has-text-centered">
        <a href=${`https://goalseeker.purestake.io/algorand/${ledger.toLowerCase()}/transaction/${tx.id}`} target="_blank" rel="noopener noreferrer">
          See details in GoalSeeker
        </a>
      </div>
    </div>
  `;
}

export default TxAcfg