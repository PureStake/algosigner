import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';

import goalseekerIcon from 'assets/goalseeker.svg';

const TxAfrz: FunctionalComponent = (props: any) => {
  const { tx, ledger } = props;

  const freezed = tx['asset-freeze-transaction']['new-freeze-status']
    ? 'Freeze'
    : 'Unfreeze';

  return html`
    <div class="box" style="overflow-wrap: break-word;">
      <p id="txTitle" class="has-text-centered has-text-weight-bold">Asset ${freezed}</p>
      <p data-transaction-id="${tx.id}">
        <strong>TxID: </strong>
        <span>${tx.id}</span>
      </p>
      <p data-transaction-sender="${tx.sender}">
        <strong>Origin: </strong>
        <span>${tx.sender}</span>
      </p>
      <p>
        <strong>Freeze address: </strong>
        <span>${tx['asset-freeze-transaction']['address']}</span>
      </p>
      <p>
        <strong>Asset: </strong>
        <span>${tx['asset-freeze-transaction']['asset-id']}</span>
      </p>
      <p>
        <strong>Action: </strong>
        <span>${freezed}</span>
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

export default TxAfrz;
