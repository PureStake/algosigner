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
          <b class="has-text-link">YOU</b>
        </div>
      </div>
    </div>

    <p class="has-text-centered has-text-weight-bold">Asset configuration</p>

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
        ${tx.assetIndex && html`
          <div class="is-flex">
            <p style="width: 30%;">Asset:</p>
            <p style="width: 70%;">${tx.assetIndex}</p>
          </div>
        `}
        ${tx.assetName && html`
          <div class="is-flex">
            <p style="width: 30%;">Asset Name:</p>
            <p style="width: 70%;">${tx.assetName}</p>
          </div>
        `}
        ${tx.assetUnitName && html`
          <div class="is-flex">
            <p style="width: 30%;">Unit Name:</p>
            <p style="width: 70%;">${tx.assetUnitName}</p>
          </div>
        `}
        ${tx.assetURL && html`
          <div class="is-flex">
            <p style="width: 30%;">Asset URL:</p>
            <p style="width: 70%;">${tx.assetURL}</p>
          </div>
        `}
        ${tx.assetTotal && html`
          <div class="is-flex">
            <p style="width: 30%;">Asset Total:</p>
            <p style="width: 70%;">${tx.assetTotal}</p>
          </div>
        `}
        <p>Fee: <span style="float: right; margin-right: 11em;">${tx.fee/1e6} Algos</span></p>
      </div>
    `}
    ${ tab==="details" && html`
      <div style="height: 245px; overflow: auto;">
        <pre style="background: #EFF4F7; border-radius: 5px;">
          <code>${txText}</code>
        </pre>
      </div>
    `}

  `;
}

export default TxAcfg