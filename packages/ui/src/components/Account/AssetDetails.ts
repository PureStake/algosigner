import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging'


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
      setResults(response.asset.params);
    });
  }

  useEffect(() => {
    fetchApi();
  }, []);


  return html`
    <div class="box" style="overflow-wrap: break-word;">
      ${ results && html`
        <p><strong>Asset name:</strong> ${results.name}</p>
        <p><strong>Balance:</strong> ${asset.amount} ${results['unit-name']}</p>
        <hr />
        <p><strong>Creator:</strong> ${results.creator}</p>
        <p><strong>Total units:</strong> ${results.total} ${results['unit-name']}</p>
        <div class="has-text-centered">
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