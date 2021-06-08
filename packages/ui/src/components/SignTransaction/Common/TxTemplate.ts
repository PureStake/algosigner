import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { MULTISIG_TOOLTIP } from '@algosigner/common/strings';
import TxAlert from './TxAlert';

const TxTemplate: FunctionalComponent = (props: any) => {
  const [tab, setTab] = useState<string>('overview');
  const { tx, vo, account, msig, midsection, overview } = props;

  const txText = JSON.stringify(tx, null, 2);

  return html`
    ${vo &&
    html`
      <section id="txAlerts" class="section py-0">
        <${TxAlert} vo=${vo} />
      </section>
    `}
    <section class="section py-0">
      <div class="box py-2 is-shadowless mb-3" style="background: #eff4f7;">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <b>
              ${msig &&
              html`
                <span
                  class="mr-2 has-text-primary has-tooltip-primary has-tooltip-right has-tooltip-arrow"
                  data-tooltip="${MULTISIG_TOOLTIP}"
                >
                  Multisig:
                </span>
              `}
              ${account}
            </b>
          </div>
          <div class="has-text-right">
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

      ${tab === 'overview' && overview}
      ${tab === 'details' &&
      html`
        <div style="height: 170px; overflow: auto;">
          <pre style="background: #EFF4F7; border-radius: 5px;">
          <code>${txText}</code>
        </pre
          >
        </div>
      `}
    </section>
  `;
};

export default TxTemplate;
