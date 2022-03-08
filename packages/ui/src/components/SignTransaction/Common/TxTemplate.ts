import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { MULTISIG_TOOLTIP } from '@algosigner/common/strings';
import TxAlert from './TxAlert';

const TxTemplate: FunctionalComponent = (props: any) => {
  const [tab, setTab] = useState<string>('overview');
  const { tx, vo, account, msig, midsection, overview, authAddr } = props;

  const txText = JSON.stringify(tx, null, 2);
  const tabsStyle = 'height: 160px; overflow: auto;';

  return html`
    ${vo && html`<${TxAlert} vo=${vo} />`}
    <section class="section py-0">
      <div class="box py-2 is-shadowless mb-2" style="background: #eff4f7;">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <b style="word-break: break-all;">
              ${msig &&
              html`
                <span
                  class="mr-2 has-text-primary has-tooltip-primary has-tooltip-right has-tooltip-arrow has-tooltip-fade"
                  data-tooltip="${MULTISIG_TOOLTIP}"
                >
                  Multisig:
                </span>
              `}
              ${account}
            </b>
          </div>
          <div class="has-text-right" style="min-width: 30px;">
            <b class="is-size-7 has-text-link">YOU</b>
          </div>
        </div>
      </div>

      ${midsection}

      <div class="tabs is-centered mb-2">
        <ul>
          <li class=${tab === 'overview' ? 'is-active' : ''} onClick=${() => setTab('overview')}>
            <a>Overview</a>
          </li>
          <li class=${tab === 'details' ? 'is-active' : ''} onClick=${() => setTab('details')}>
            <a>Details</a>
          </li>
        </ul>
      </div>

      ${tab === 'overview' && html`<div style="${tabsStyle}">
        ${authAddr && html` 
          <div class="is-flex">
            <p style="width: 30%;">Signing Address:</p>
            <p style="width: 70%;"><span style="word-break: break-all;">${authAddr}</span></p>
          </div>
        `}
        ${overview}
      </div>`}
      ${tab === 'details' &&
      // prettier-ignore
      html`
        <pre style="background: #EFF4F7; border-radius: 5px; ${tabsStyle}">
          <code>${txText}</code>
        </pre>
      `}
    </section>
  `;
};

export default TxTemplate;
