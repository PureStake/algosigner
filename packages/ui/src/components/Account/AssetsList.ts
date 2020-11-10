import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState } from 'preact/hooks';

import AssetDetails from 'components/Account/AssetDetails';

const AssetPreview: FunctionalComponent = (props: any) => {
  const { asset, setShowAsset } = props;

  const getAmount = () => {
    const decimals = asset.decimals || 0;
    const amount = asset.amount / Math.pow(10, decimals);
    return amount.toLocaleString('en-US', { maximumFractionDigits: decimals });
  };

  return html`
    <div
      class="py-2 px-4"
      style="border-top: 1px solid rgba(138, 159, 168, 0.2); cursor: pointer;"
      onClick=${() => setShowAsset(asset)}
    >
      ${asset.name &&
      asset.name.length > 0 &&
      html`
        ${asset.name}
        <small class="has-text-grey-light" id="asset_${asset['asset-id']}">
          ${asset['asset-id']}</small
        >
      `}
      ${(!asset.name || asset.name.length === 0) &&
      html` ${asset['asset-id']} `}
      <span style="float: right;">
        <b>${getAmount()}</b>
        ${asset['unit-name'] &&
        asset['unit-name'].length > 0 &&
        html` <span class="has-text-grey-light"> ${asset['unit-name']}</span> `}
      </span>
    </div>
  `;
};

const AssetsList: FunctionalComponent = (props: any) => {
  const { ledger, assets } = props;

  const [showAsset, setShowAsset] = useState<any>(null);
  const [fullList, setFullList] = useState<boolean>(false);

  // Only show the first 10 assets, and a link to the assets view
  // if needed.
  return html`
    ${assets
      .slice(0, 10)
      .map(
        (asset: any) => html`
          <${AssetPreview} asset=${asset} setShowAsset=${setShowAsset} />
        `
      )}
    ${assets.length > 10 &&
    html`
      <div
        class="py-3 px-4 has-text-centered"
        style="border-top: 1px solid rgba(138, 159, 168, 0.2);"
      >
        <a onClick=${() => setFullList(true)}> Show all assets </a>
      </div>
    `}

    <div class=${`modal ${fullList ? 'is-active' : ''}`}>
      <div class="modal-background" onClick=${() => setFullList(false)}></div>
      <div class="modal-content" style="padding: 0 15px;">
        <div class="box" style="overflow-wrap: break-word;">
          ${assets.map(
            (asset: any) => html`
              <${AssetPreview} asset=${asset} setShowAsset=${setShowAsset} />
            `
          )}
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        onClick=${() => setFullList(false)}
      />
    </div>

    <div class=${`modal ${showAsset ? 'is-active' : ''}`}>
      <div class="modal-background" onClick=${() => setShowAsset(null)}></div>
      <div class="modal-content" style="padding: 0 15px;">
        ${showAsset &&
        html` <${AssetDetails} asset=${showAsset} ledger=${ledger} /> `}
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        onClick=${() => setShowAsset(null)}
      />
    </div>
  `;
};

export default AssetsList;
