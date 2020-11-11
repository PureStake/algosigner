import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import AddAssetConfirm from 'components/Account/AddAssetConfirm';
import HeaderView from 'components/HeaderView';

import { useDebounce } from 'services/customHooks';
import { sendMessage } from 'services/Messaging';
import { StoreContext } from 'services/StoreContext';

const AddAsset: FunctionalComponent = (props: any) => {
  const store: any = useContext(StoreContext);
  const { matches, ledger, address } = props;
  const [tab, setTab] = useState<number>(0);
  const [filter, setFilter] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [nextToken, setNextToken] = useState<any>(null);
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // Verified results coming from Inc's API
  const [verifiedResults, setVerifiedResults] = useState<any>({});
  const [verifiedIDs, setVerifiedIDs] = useState<number[]>([]);
  const [accountsAssetsIDs, setAccountsAssetsIDs] = useState<number[]>([]);

  const debouncedFilter = useDebounce(filter, 500);

  const filterChange = (e) => {
    setNextToken(null);
    setFilter(e.target.value);
  };

  const changeTab = (selectedTab) => {
    setNextToken(null);
    setTab(selectedTab);
  };

  const fetchApi = () => {
    setLoading(true);
    const params = {
      ledger: ledger,
      filter: filter,
      nextToken: nextToken,
    };
    sendMessage(JsonRpcMethod.AssetsAPIList, params, function (response) {
      // If there is a nextToken set, it means that we are loading additional
      // results.
      if (nextToken && nextToken.length > 0)
        setResults(results.concat(response.assets));
      else setResults(response.assets);

      setNextToken(response['next-token']);
      setLoading(false);
    });
  };

  useEffect(() => {
    switch (tab) {
      case 0:
        if (verifiedResults.results) {
          const value = debouncedFilter.toLowerCase();
          setResults(
            verifiedResults.results.filter((elem) => {
              return (
                elem['asset_id'] === +value ||
                (elem.name && elem.name.toLowerCase().includes(value)) ||
                (elem['unit_name'] &&
                  elem['unit_name'].toLowerCase().includes(value))
              );
            })
          );
        }
        break;
      case 1:
        fetchApi();
        break;
    }
  }, [debouncedFilter, tab]);

  useEffect(() => {
    setLoading(true);
    // Load account's assets
    for (let i = store[ledger].length - 1; i >= 0; i--) {
      if (store[ledger][i].address === address) {
        if ('details' in store[ledger][i]) {
          const ids = store[ledger][i].details.assets.map((x) => x['asset-id']);
          setAccountsAssetsIDs(ids);
        }
        break;
      }
    }

    // Load Verified assets
    const params = {
      ledger: ledger,
    };
    sendMessage(JsonRpcMethod.AssetsVerifiedList, params, function (response) {
      setVerifiedResults(response);
      setResults(response.results);
      const ids: number[] = [];
      for (let i = response.results.length - 1; i >= 0; i--) {
        ids.push(response.results[i]['asset_id']);
      }
      setVerifiedIDs(ids);
      setLoading(false);
    });
  }, []);

  return html`
    <div
      class="main-view"
      style="flex-direction: column; justify-content: space-between;"
    >
      <${HeaderView}
        action="${() => route(`/${matches.ledger}/${matches.address}`)}"
        title="Add asset"
      />

      <div class="control has-icons-right mb-2 mx-4">
        <input
          class="input"
          id="filter"
          placeholder="Filter by name"
          value=${filter}
          onInput=${filterChange}
        />
      </div>

      <div class="tabs is-centered mb-2">
        <ul>
          <li
            class=${tab === 0 ? 'is-active' : ''}
            onClick=${() => changeTab(0)}
          >
            <a>
              Verified
              <span class="icon mr-0">
                <i class="fas fa-check-circle"></i>
              </span>
            </a>
          </li>
          <li
            class=${tab === 1 ? 'is-active' : ''}
            onClick=${() => changeTab(1)}
          >
            <a>All</a>
          </li>
        </ul>
      </div>

      <div style="flex: 1;">
        ${results.length == 0 &&
        !loading &&
        html` <div class="py-2 px-4 has-text-centered">No results!</div> `}
        ${results.map(
          (asset: any) => html`
            <div
              class="py-2 px-4 is-flex"
              onClick=${() => setSelectedAsset(asset)}
              style="border-bottom: 1px solid rgba(138, 159, 168, 0.2); cursor: pointer; justify-content: space-between; align-items: center;"
            >
              <div>
                ${asset.name && asset.name.length > 0 && html` ${asset.name} `}
                ${verifiedIDs.includes(asset['asset_id']) &&
                html`
                  <span class="icon ml-2">
                    <i class="fas fa-check-circle"></i>
                  </span>
                `}
                <br />
                ${asset['unit_name'] &&
                asset['unit_name'].length > 0 &&
                html`
                  <span class="has-text-grey-light">
                    ${asset['unit_name']}</span
                  >
                `}
              </div>

              <b>${asset['asset_id']}</b>
            </div>
          `
        )}
        ${nextToken &&
        nextToken.length > 0 &&
        !loading &&
        html`
          <div
            class="py-2 px-4 has-text-centered"
            style="border-top: 1px solid rgba(138, 159, 168, 0.2);"
          >
            <a onClick=${fetchApi}> Load more results </a>
          </div>
        `}
        ${loading &&
        html`
          <div class="py-2 px-4 has-text-centered">
            <span class="icon is-medium">
              <i class="fas fa-lg fa-circle-notch fa-spin"></i>
            </span>
          </div>
        `}
      </div>
    </div>

    ${selectedAsset &&
    html`
      <div class="modal is-active">
        <div
          class="modal-background"
          onClick=${() => setSelectedAsset(null)}
        ></div>
        <div
          class="modal-content"
          style="padding: 0 15px; max-height: calc(100vh - 95px);"
        >
          <${AddAssetConfirm}
            asset=${selectedAsset}
            ledger=${ledger}
            address=${address}
            accountsAssetsIDs=${accountsAssetsIDs}
          />
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick=${() => setSelectedAsset(null)}
        />
      </div>
    `}
  `;
};

export default AddAsset;
