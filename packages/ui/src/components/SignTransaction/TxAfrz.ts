import { html } from 'htm/preact';
import { FunctionalComponent } from "preact";
import { useState } from 'preact/hooks';

const TxAfrz: FunctionalComponent = (props: any) => {
  const [tab, setTab] = useState<string>('overview');
  const { tx, account } = props;

  const txText = JSON.stringify(tx, null, 2);

  return html`
    <div class="box py-2 is-shadowless mb-3" style="background: #eff4f7;">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <b>${account}</b>
        </div>
        <div class="is-size-7 has-text-right">
          <b>YOU</b>
        </div>
      </div>
    </div>

    <p class="has-text-centered has-text-weight-bold">Asset configuration</p>

    <div class="tabs is-centered">
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
        <p>Asset ID:
          <span style="float: right; margin-right: 11em;">${tx.assetIndex}</span>
        </p>
        <p>Freeze Account:
          <span style="float: right; margin-right: 11em;">${tx.freezeAccount}</span>
        </p>
        <p>Freeze State:
          <span style="float: right; margin-right: 11em;">${tx.freezeState ? 'Freeze' : 'Unfreeze'}</span>
        </p>
        <p>Fee: <span style="float: right; margin-right: 11em;">${tx.fee/1e6} Algos</span></p>
      </div>
    `}
    ${ tab==="details" && html`
      <div style="height: 200px; overflow: auto;">
        <pre style="background: #EFF4F7; border-radius: 5px;">
          <code>${txText}</code>
        </pre>
      </div>
    `}
  `;
}

export default TxAfrz