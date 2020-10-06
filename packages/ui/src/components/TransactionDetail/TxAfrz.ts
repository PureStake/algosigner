import { html } from 'htm/preact';
import { FunctionalComponent } from "preact";

const TxAfrz: FunctionalComponent = (props: any) => {
  const { tx, ledger } = props;

  const freezed = tx['asset-freeze-transaction']['new-freeze-status'] ? 'Freeze' : 'Unfreeze';

  return html`
    <div class="box" style="overflow-wrap: break-word;">
      <p class="has-text-centered has-text-weight-bold">Asset ${freezed}</p>
      <p><b>TxID:</b> <span>${tx.id}</span></p>
      <p><b>Origin:</b> <span>${tx.sender}</span></p>
      <p><b>Freeze address:</b> <span>${tx['asset-freeze-transaction']['address']}</span></p>
      <p><b>Asset:</b> <span>${tx['asset-freeze-transaction']['asset-id']}</span></p>
      <p><b>Action:</b> <span>${freezed}</span></p>
      <p><b>Block:</b> <span>${tx['confirmed-round']}</span></p>
      <div class="has-text-centered">
        <a href=${`https://goalseeker.purestake.io/algorand/${ledger.toLowerCase()}/transaction/${tx.id}`} target="_blank" rel="noopener noreferrer">
          See details in GoalSeeker
        </a>
      </div>
    </div>
  `;
}

export default TxAfrz