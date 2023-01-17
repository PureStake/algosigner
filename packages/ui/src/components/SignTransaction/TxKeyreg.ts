import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';
import TxTemplate from './Common/TxTemplate';

const TxKeyreg: FunctionalComponent = (props: any) => {
  const { tx, account, vo, estFee, msig, authAddr } = props;
  const fee = estFee ? estFee : tx['fee'];

  const midsection = html`<p class="has-text-centered has-text-weight-bold">Key Registration</p>`;

  const overview = html`
    <div>
      ${tx.group &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">Group ID:</p>
          <p style="width: 70%;" class="truncate-text">${tx.group}</p>
        </div>
      `}
      <div class="is-flex">
        <p style="width: 30%;">Vote Key:</p>
        <p style="width: 70%; word-break: break-word;">${tx.voteKey}</p>
      </div>
      <div class="is-flex">
        <p style="width: 30%;">Selection Key:</p>
        <p style="width: 70%; word-break: break-word;">${tx.selectionKey}</p>
      </div>
      ${tx.stateProofKey &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">State Proof Key:</p>
          <p style="width: 70%; word-break: break-word;">${tx.stateProofKey}</p>
        </div>
      `}
      ${tx.nonParticipation &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">Non-participation:</p>
          <p style="width: 70%;">${tx.nonParticipation}</p>
        </div>
      `}
      <div class="is-flex">
        <p style="width: 30%;"> ${!estFee || tx['flatFee'] ? 'Fee:' : 'Estimated fee:'} </p>
        <p style="width: 70%;">${fee / 1e6} Algos</p>
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

export default TxKeyreg;
