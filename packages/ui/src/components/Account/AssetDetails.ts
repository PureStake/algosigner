import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging'

import ToClipboard from 'components/ToClipboard'


const AssetDetails: FunctionalComponent = (props: any) => {
  const { asset, ledger } = props;
  const [results, setResults] = useState<any>(null);

  const fetchApi = async () => {
    const params = {
      'ledger': ledger,
      'asset-id': asset['asset-id']
    };
    sendMessage(JsonRpcMethod.AssetDetails, params, function(response) {
      asset.name = response.asset.params.name;
      asset.unitname = response.asset.params['unit-name'];
      asset.decimals = response.asset.params['decimals'];
      setResults(response.asset.params);
    });
  }

  const toDecimal = (num) => {
    return num/Math.pow(10, asset.decimals)
  }

  useEffect(() => {
    fetchApi();
  }, []);


  return html`
    <div class="box" style="overflow-wrap: break-word;">
      ${ results && html`
        <div class="has-text-centered mb-2">
          <b>${results.name}</b>
          <br />
          <span class="has-text-grey-light">${asset['asset-id']}</span>
        </div>
        <p>
          <b>Your balance</b>
          <span class="is-pulled-right">
            <b>${toDecimal(asset.amount)}</b> <span class="has-text-grey-light">${results['unit-name']}</span>
          </span>
        </p>
        <hr class="my-2" />
        <p>
          <b>Total units</b>
          <span class="is-pulled-right">
            <b>${toDecimal(results.total)}</b> <span class="has-text-grey-light">${results['unit-name']}</span>
          </span>
        </p>
        <p>
          <b>Creator</b> (<${ToClipboard} data=${results.creator} />)
          <span class="is-pulled-right">
            ${results.creator.slice(0, 8)}.....${results.creator.slice(-8)}
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