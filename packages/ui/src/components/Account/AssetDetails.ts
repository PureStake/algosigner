import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging'

import ToClipboard from 'components/ToClipboard'


const AssetDetails: FunctionalComponent = (props: any) => {
  const { asset, ledger } = props;
  const [results, setResults] = useState<number>(0);

  const fetchApi = async () => {
    const params = {
      'ledger': ledger,
      'asset-id': asset['asset-id']
    };
    if (!('name' in asset)) {
      sendMessage(JsonRpcMethod.AssetDetails, params, function(response) {
        const keys = Object.keys(response.asset.params);
        for (var i = keys.length - 1; i >= 0; i--) {
          asset[keys[i]] = response.asset.params[keys[i]];
        }
        setResults(1);
      });
    }
  }

  const toDecimal = (num, full=false) => {
    let params: any = {
      maximumFractionDigits: asset.decimals
    }
    const amount = num/Math.pow(10, asset.decimals);
    if (full)
      params.minimumFractionDigits = asset.decimals;
    return amount.toLocaleString('en-US', params);
  }

  useEffect(() => {
    fetchApi();
  }, []);


  return html`
    <div class="box" style="overflow-wrap: break-word;">
      ${ "decimals" in asset && html`
        <div class="has-text-centered mb-2">
          <b>${asset.name}</b>
          <br />
          <span class="has-text-grey-light">${asset['asset-id']}</span>
        </div>
        <p>
          <b>Your balance</b>
          <span class="is-pulled-right">
            <b>${toDecimal(asset.amount)}</b> <span class="has-text-grey-light">${asset['unit-name']}</span>
          </span>
        </p>
        <hr class="my-2" />
        <p>
          <b>Total units</b>
          <span class="is-pulled-right">
            <b>${toDecimal(asset.total, true)}</b> <span class="has-text-grey-light">${asset['unit-name']}</span>
          </span>
        </p>
        <p>
          <b>Creator</b> (<${ToClipboard} data=${asset.creator} />)
          <span class="is-pulled-right">
            ${asset.creator.slice(0, 8)}.....${asset.creator.slice(-8)}
          </span>
        </p>
        <div class="has-text-centered mt-3">
          <a href=${`https://goalseeker.purestake.io/algorand/${ledger.toLowerCase()}/asset/${asset['asset-id']}`}
            target="_blank"
            rel="noopener noreferrer">
            See details in GoalSeeker
          </a>
        </div>
      `}
    </div>

  `
};

export default AssetDetails;