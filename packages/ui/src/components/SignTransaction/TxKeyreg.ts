import { html } from 'htm/preact';
import { FunctionalComponent } from "preact";
import { useState } from 'preact/hooks';

const TxKeyreg: FunctionalComponent = (props: any) => {
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

    <p class="has-text-centered has-text-weight-bold">Key Registration</p>

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
          <p style="width: 30%;">Vote Key:</p>
          <p style="width: 70%; word-break: break-word;">${tx.voteKey}</p>
        </div>
        <div class="is-flex">
          <p style="width: 30%;">Selection Key:</p>
          <p style="width: 70%; word-break: break-word;">${tx.selectionKey}</p>
        </div>
        <div class="is-flex">
          <p style="width: 30%;">Fee:</p>
          <p style="width: 70%;">${tx.fee/1e6} Algos</p>
        </div>
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

export default TxKeyreg