import { html } from 'htm/preact';
import { FunctionalComponent } from "preact";

const TxAfrz: FunctionalComponent = (props: any) => {
  const { tx, ledger } = props;

  const freezed = tx['asset-freeze-transaction']['new-freeze-status'] ? 'Freeze' : 'Unfreeze';

  return html`
    <div class="box" style="overflow-wrap: break-word;">
      <p class="has-text-centered has-text-weight-bold">Asset ${freezed}</p>
      <p><b>TxID:</b> ${tx.id}</p>
      <p><b>Origin:</b> ${tx.sender}</p>
      <p><b>Freeze address:</b> ${tx['asset-freeze-transaction']['address']}</p>
      <p><b>Asset:</b> ${tx['asset-freeze-transaction']['asset-id']}</p>
      <p><b>Action:</b> ${freezed}</p>
      <p><b>Block:</b> ${tx['confirmed-round']}</p>
      <div class="has-text-centered">
        <a href=${`https://goalseeker.purestake.io/algorand/${ledger.toLowerCase()}/transaction/${tx.id}`} target="_blank" rel="noopener noreferrer">
          See details in GoalSeeker
        </a>
      </div>
    </div>
  `;
}

export default TxAfrz