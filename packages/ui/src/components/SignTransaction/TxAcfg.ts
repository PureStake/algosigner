import { obfuscateAddress } from '@algosigner/common/utils';
import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';
import TxTemplate from './Common/TxTemplate';

const TxAcfg: FunctionalComponent = (props: any) => {
  const { tx, account, vo, dt, estFee, msig, authAddr } = props;
  const fee = estFee ? estFee : tx['fee'];

  const midsection = html`
    <p class="has-text-centered has-text-weight-bold"> ${dt || 'Asset Configuration'} </p>
  `;

  const overview = html`
    <div>
      ${tx.group &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">Group ID:</p>
          <p style="width: 70%;" class="truncate-text">${tx.group}</p>
        </div>
      `}
      ${tx.assetIndex &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">Asset:</p>
          <p style="width: 70%;">${tx.assetIndex}</p>
        </div>
      `}
      ${tx.assetName &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">Asset Name:</p>
          <p style="width: 70%;">${tx.assetName}</p>
        </div>
      `}
      ${tx.assetUnitName &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">Unit Name:</p>
          <p style="width: 70%;">${tx.assetUnitName}</p>
        </div>
      `}
      ${tx.assetURL &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">Asset URL:</p>
          <p style="width: 70%;">${tx.assetURL}</p>
        </div>
      `}
      ${tx.assetTotal &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">Asset Total:</p>
          <p style="width: 70%;">${tx.assetTotal}</p>
        </div>
      `}
      ${tx.assetManager &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">Manager Address:</p>
          <p style="width: 70%;">${obfuscateAddress(tx.assetManager)}</p>
        </div>
      `}
      ${tx.assetReserve &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">Manager Address:</p>
          <p style="width: 70%;">${obfuscateAddress(tx.assetReserve)}</p>
        </div>
      `}
      ${tx.assetFreeze &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">Manager Address:</p>
          <p style="width: 70%;">${obfuscateAddress(tx.assetFreeze)}</p>
        </div>
      `}
      ${tx.assetClawback &&
      html`
        <div class="is-flex">
          <p style="width: 30%;">Manager Address:</p>
          <p style="width: 70%;">${obfuscateAddress(tx.assetClawback)}</p>
        </div>
      `}
      <div class="is-flex">
        <p style="width: 30%;">${!estFee || tx['flatFee'] ? 'Fee:' : 'Estimated fee:'}</p>
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

export default TxAcfg;
