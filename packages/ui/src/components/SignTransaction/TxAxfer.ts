import { html } from 'htm/preact';
import { FunctionalComponent } from "preact";
import { useState } from 'preact/hooks';

const TxAxfer: FunctionalComponent = (props: any) => {
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

    <p class="has-text-centered has-text-weight-bold"><i class="fas fa-arrow-down"></i> Payment</p>

    <div class="box py-2 is-shadowless mt-3 mb-0" style="background: #eff4f7;">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <b style="word-break: break-all;">${tx.to}</b>
        </div>
      </div>
    </div>

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
        <p>Asset: <span style="float: right; margin-right: 11em;">${tx.assetIndex}</span></p>
        <p>Amount: <span style="float: right; margin-right: 11em;">${tx.amount}</span></p>
        <p>Fee: <span style="float: right; margin-right: 11em;">${tx.fee/1e6} Algos</span></p>
      </div>
    `}
    ${ tab==="details" && html`
      <div style="height: 160px; overflow: auto;">
        <pre style="background: #EFF4F7; border-radius: 5px;">
          <code>${txText}</code>
        </pre>
      </div>
    `}

  `;
}

export default TxAxfer