import { html } from 'htm/preact';
import { FunctionalComponent } from "preact";
import { useState } from 'preact/hooks';

const TxAcfg: FunctionalComponent = (props: any) => {
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
        ${tx.assetIndex && html`
          <p>Asset ID:
            <span style="float: right; margin-right: 11em;">${tx.assetIndex}</span>
          </p>
        `}
        ${tx.assetName && html`
          <p>Asset Name:
            <span style="float: right; margin-right: 11em;">${tx.assetName}</span>
          </p>
        `}
        ${tx.assetUnitName && html`
          <p>Asset Unit Name:
            <span style="float: right; margin-right: 11em;">${tx.assetUnitName}</span>
          </p>
        `}
        ${tx.assetURL && html`
          <p>Asset URL:
            <span style="float: right; margin-right: 11em;">${tx.assetURL}</span>
          </p>
        `}
        ${tx.assetTotal && html`
          <p>Asset Total:
            <span style="float: right; margin-right: 11em;">${tx.assetTotal}</span>
          </p>
        `}
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

export default TxAcfg