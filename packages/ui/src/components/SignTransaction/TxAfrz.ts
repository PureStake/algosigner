import { html } from 'htm/preact';
import { FunctionalComponent } from "preact";
import { useState } from 'preact/hooks';

const TxAfrz: FunctionalComponent = (props: any) => {
  const [tab, setTab] = useState<string>('overview');
  const { tx, account, ledger } = props;

  const txText = JSON.stringify(tx, null, 2);

  const state = tx.freezeState ? 'Freeze' : 'Unfreeze';

  return html`
    <div class="box py-2 is-shadowless mb-3" style="background: #eff4f7;">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <b>${account}</b>
        </div>
        <div class="is-size-7 has-text-right">
          <b class="has-text-link">YOU</b>
        </div>
      </div>
    </div>

    <div class="has-text-centered has-text-weight-bold">
      <span><i class="fas fa-arrow-down mr-3"></i></span>
      <span>Asset ${state}</span>
    </div>

    <div class="box py-2 is-shadowless mt-3 mb-0" style="background: #eff4f7;">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <b style="word-break: break-all;">${tx.freezeAccount}</b>
        </div>
      </div>
    </div>

    <div class="tabs is-centered mb-2">
      <ul>
        <li class=${tab==="overview" ? "is-active" : ""}
          onClick=${() => setTab('overview')}>
          <a>Overview</a>
        </li>
        <li class=${tab==="details" ? "is-active" : ""}
          onClick=${() => setTab('details')}>
          <a>Details</a>
        </li>
      </ul>
    </div>

    ${ tab==="overview" && html`
      <div>
        <div class="is-flex">
          <p style="width: 30%;">Asset:</p>
          <a style="width: 70%"
            href=${`https://goalseeker.purestake.io/algorand/${ledger.toLowerCase()}/asset/${tx.assetIndex}`}
            target="_blank" rel="noopener noreferrer">
            ${tx.assetIndex}
          </a>
        </div>
        <div class="is-flex">
          <p style="width: 30%;">Fee:</p>
          <p style="width: 70%;">${tx.fee/1e6} Algos</p>
        </div>
      </div>
    `}
    ${ tab==="details" && html`
      <div style="height: 170px; overflow: auto;">
        <pre style="background: #EFF4F7; border-radius: 5px;">
          <code>${txText}</code>
        </pre>
      </div>
    `}
  `;
}

export default TxAfrz