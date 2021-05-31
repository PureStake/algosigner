import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';

const TxAppl: FunctionalComponent = (props: any) => {
  const [tab, setTab] = useState<string>('overview');
  const { tx, account, vo, estFee } = props;
  const fee = estFee ? estFee : tx['fee'];

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
    <p class="has-text-centered has-text-weight-bold">${'Application'}</p>
    <p class="has-text-centered" style="color:red;">
      <i
        >Warning: Application transactions execute code and should be carefully reviewed before
        signing</i
      >
    </p>
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

    ${tab === 'overview' &&
    html`
      <div>
        ${tx.group &&
        html`
          <div class="is-flex">
            <p style="width: 40%;">Group ID:</p>
            <p style="width: 60%;" class="truncate-text">${tx.group}</p>
          </div>
        `}
        <div class="is-flex">
          <p style="width: 40%;">Application Index:</p>
          <p style="width: 60%;">${tx.appIndex}</p>
        </div>
        <div class="is-flex">
          <p style="width: 40%;">On Complete:</p>
          <p style="width: 60%;">${tx.appOnComplete}</p>
        </div>
        ${tx.appAccounts &&
        html`
          <div class="is-flex">
            <p style="width: 40%;">Accounts:</p>
            <p style="width: 60%;">${tx.appAccounts}</p>
          </div>
        `}
        ${tx.appApprovalProgram &&
        html`
          <div class="is-flex">
            <p style="width: 40%;">Approval Program:</p>
            <p style="width: 60%;">${tx.appApprovalProgram}</p>
          </div>
        `}
        ${tx.appArgs &&
        tx.appArgs.length &&
        html`
          <div class="is-flex">
            <p style="width: 40%;">Args:</p>
            <p style="width: 60%;">[${tx.appArgs.join(', ')}]</p>
          </div>
        `}
        ${tx.appClearProgram &&
        html`
          <div class="is-flex">
            <p style="width: 40%;">Clear Program:</p>
            <p style="width: 60%;">${tx.appClearProgram}</p>
          </div>
        `}
        ${tx.appForeignApps &&
        html`
          <div class="is-flex">
            <p style="width: 40%;">Foreign Apps:</p>
            <p style="width: 60%;">${tx.appForeignApps}</p>
          </div>
        `}
        ${tx.appForeignAssets &&
        html`
          <div class="is-flex">
            <p style="width: 40%;">Foreign Assets:</p>
            <p style="width: 60%;">${tx.appForeignAssets}</p>
          </div>
        `}
        ${tx.appGlobalInts &&
        html`
          <div class="is-flex">
            <p style="width: 40%;">Global Ints:</p>
            <p style="width: 60%;">${tx.appGlobalInts}</p>
          </div>
        `}
        ${tx.appGlobalByteSlices &&
        html`
          <div class="is-flex">
            <p style="width: 40%;">Global Bytes:</p>
            <p style="width: 60%;">${tx.appGlobalByteSlices}</p>
          </div>
        `}
        ${tx.appLocalInts &&
        html`
          <div class="is-flex">
            <p style="width: 40%;">Local Ints:</p>
            <p style="width: 60%;">${tx.appLocalInts}</p>
          </div>
        `}
        ${tx.appLocalByteSlices &&
        html`
          <div class="is-flex">
            <p style="width: 40%;">Local Bytes:</p>
            <p style="width: 60%;">${tx.appLocalByteSlices}</p>
          </div>
        `}
        <div class="is-flex">
          <p
            class="${vo && vo['fee'] ? (' ' + vo['fee']['className']).trimRight() : ''}"
            style="width: 40%;"
          >
            ${!estFee || tx['flatFee'] ? 'Fee:' : 'Estimated fee:'}
          </p>
          <p style="width: 60%;"><span>${fee / 1e6} Algos</span></p>
        </div>
      </div>
    `}
    ${tab === 'details' &&
    html`
      <div style="height: 245px; overflow: auto;">
        <pre style="background: #EFF4F7; border-radius: 5px;">
          <code>${txText}</code>
        </pre
        >
      </div>
    `}
  `;
};

export default TxAppl;
