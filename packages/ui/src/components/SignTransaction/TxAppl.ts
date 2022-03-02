import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';
import TxTemplate from './Common/TxTemplate';

const ON_COMPLETE = [
  'No-op',
  'Opt-in',
  'Close Out',
  'Clear State',
  'Update Application',
  'Delete Application',
];

const TxAppl: FunctionalComponent = (props: any) => {
  const { tx, account, vo, estFee, msig, authAddr } = props;
  const fee = estFee ? estFee : tx['fee'];

  const midsection = html`
    <p class="has-text-centered has-text-weight-bold">${'Application'}</p>
    <p class="has-text-centered" style="color:red;">
      <i
        >Warning: Application transactions execute code and should be carefully reviewed before
        signing</i
      >
    </p>
  `;

  const overview = html`
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
        <p style="width: 60%;">${`${tx.appOnComplete} - ${ON_COMPLETE[tx.appOnComplete]}`}</p>
      </div>
      ${tx.appAccounts &&
      html`
        <div class="is-flex">
          <p style="width: 40%;">App Accounts:</p>
          <p style="width: 60%;">
            ${tx.appAccounts.map((item) => {
              return html`<span class="truncate-text">${'\u2022'} ${item}</span>`;
            })}
          </p>
        </div>
      `}
      ${tx.appApprovalProgram &&
      html`
        <div class="is-flex">
          <p style="width: 40%;">Approval Program:</p>
          <p style="width: 60%;" class="truncate-text">${tx.appApprovalProgram}</p>
        </div>
      `}
      ${tx.appArgs &&
      tx.appArgs.length &&
      html`
        <div class="is-flex">
          <p style="width: 40%;">Args:</p>
          <p style="width: 60%;">
            ${tx.appArgs.map((item) => {
              return html`<span class="truncate-text">${'\u2022'} ${item}</span>`;
            })}
          </p>
        </div>
      `}
      ${tx.appClearProgram &&
      html`
        <div class="is-flex">
          <p style="width: 40%;">Clear Program:</p>
          <p style="width: 60%;" class="truncate-text">${tx.appClearProgram}</p>
        </div>
      `}
      ${tx.appForeignApps &&
      html`
        <div class="is-flex">
          <p style="width: 40%;">Foreign Apps:</p>
          <p style="width: 60%;">
            ${tx.appForeignApps.map((item) => {
              return html`<span class="truncate-text">${'\u2022'} ${item}</span>`;
            })}
          </p>
        </div>
      `}
      ${tx.appForeignAssets &&
      html`
        <div class="is-flex">
          <p style="width: 40%;">Foreign Assets:</p>
          <p style="width: 60%;">
            ${tx.appForeignAssets.map((item) => {
              return html`<span class="truncate-text">${'\u2022'} ${item}</span>`;
            })}
          </p>
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
      ${tx.extraPages &&
      html`
        <div class="is-flex">
          <p style="width: 40%;">Extra Pages:</p>
          <p style="width: 60%;">${tx.extraPages}</p>
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
  `;

  return html`
    <${TxTemplate}
      tx=${tx}
      account=${account}
      vo=${vo}
      msig=${msig}
      midsection=${midsection}
      overview=${overview}
      authAddr=${authAddr}
    />
  `;
};

export default TxAppl;
