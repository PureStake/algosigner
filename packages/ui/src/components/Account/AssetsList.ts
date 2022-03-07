import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState } from 'preact/hooks';

import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { sendMessage } from 'services/Messaging';

import AssetDetails from 'components/Account/AssetDetails';
import Authenticate from 'components/Authenticate';

const AssetPreview: FunctionalComponent = (props: any) => {
  const { asset, setShowAsset } = props;

  const getAmount = () => {
    const decimals = asset.decimals || 0;
    const amount = asset.amount / Math.pow(10, decimals);
    return amount.toLocaleString('en-US', { maximumFractionDigits: decimals });
  };

  return html`
    <div
      class="py-2 px-4 is-flex is-justify-content-space-between"
      data-asset-id="${asset['asset-id']}"
      data-asset-balance="${getAmount()}"
      style="border-top: 1px solid rgba(138, 159, 168, 0.2); cursor: pointer;"
      onClick=${() => setShowAsset(asset)}
    >
      <span style="max-width: 55%;">
        ${asset.name &&
        asset.name.length > 0 &&
        html`
          ${asset.name}
          <small class="has-text-grey-light"> ${asset['asset-id']}</small>
        `}
        ${(!asset.name || asset.name.length === 0) && html` ${asset['asset-id']} `}
      </span>
      <span>
        <b>${getAmount()}</b>
        ${asset['unit-name'] &&
        asset['unit-name'].length > 0 &&
        html` <span class="has-text-grey-light"> ${asset['unit-name']}</span> `}
      </span>
    </div>
  `;
};

const AssetsList: FunctionalComponent = (props: any) => {
  const { ledger, assets, address } = props;

  const [showAsset, setShowAsset] = useState<any>(null);
  const [fullList, setFullList] = useState<boolean>(false);
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const sendOptOut = async (pwd: string) => {
    setLoading(true);
    setAuthError('');
    const params = {
      ledger: ledger,
      passphrase: pwd,
      address: address,
      id: showAsset['asset-id'],
    };
    sendMessage(JsonRpcMethod.AssetOptOut, params, function (response) {
      setLoading(false);
      if ('error' in response) {
        switch (response.error) {
          case 'Login Failed':
            setAuthError('Wrong passphrase');
            break;
          default:
            setAuthError(response.error);
            break;
        }
      } else {
        setAskAuth(false);
        setShowAsset(null);
        setFullList(false);
      }
    });
  };

  // Only show the first 10 assets, and a link to the assets view
  // if needed.
  return html`
    ${assets
      .slice(0, 10)
      .map((asset: any) => html`<${AssetPreview} asset=${asset} setShowAsset=${setShowAsset} />`)}
    ${assets.length > 10 &&
    html`
      <div
        class="py-3 px-4 has-text-centered"
        style="border-top: 1px solid rgba(138, 159, 168, 0.2);"
      >
        <a id="showAssets" onClick=${() => setFullList(true)}>Show all assets</a>
      </div>
    `}

    <div class=${`modal ${fullList ? 'is-active' : ''}`}>
      <div class="modal-background" onClick=${() => setFullList(false)}></div>
      <div class="modal-content">
        <div class="box" style="overflow-wrap: break-word;">
          ${assets.map(
            (asset: any) => html`<${AssetPreview} asset=${asset} setShowAsset=${setShowAsset} />`
          )}
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" onClick=${() => setFullList(false)} />
    </div>

    <div class=${`modal ${showAsset ? 'is-active' : ''}`}>
      <div class="modal-background" onClick=${() => setShowAsset(null)}></div>
      <div class="modal-content">
        ${showAsset &&
        html`<${AssetDetails} asset=${showAsset} ledger=${ledger} optOutFn=${() => setAskAuth(true)} />`}
      </div>
      <button class="modal-close is-large" aria-label="close" onClick=${() => setShowAsset(null)} />
    </div>

    ${askAuth &&
    html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <${Authenticate} error=${authError} loading=${loading} nextStep=${sendOptOut} />
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick=${() => setAskAuth(false)}
        />
      </div>
    `}
  `;
};

export default AssetsList;
