/* eslint-disable no-unused-vars */
import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import Authenticate from 'components/Authenticate';
import { StoreContext } from 'services/StoreContext';

import { sendMessage } from 'services/Messaging';

const LedgerNetworkModify: FunctionalComponent = (props: any) => {
  console.log('Network Modify Component Props:', props);
  const { closeFunction, isEditable, isModify } = props;
  const store: any = useContext(StoreContext);
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [networkName, setNetworkName] = useState<string>(props.name || '');
  const [networkId, setNetworkId] = useState<string>(props.genesisId || '');
  const [networkSymbol, setNetworkSymbol] = useState<string>(props.symbol || '');
  const [networkAlgodUrl, setNetworkAlgodUrl] = useState<string>(props.algodUrl || '');
  const [networkIndexerUrl, setNetworkIndexerUrl] = useState<string>(props.indexerUrl || '');
  const [networkHeaders, setNetworkHeaders] = useState<string>(props.headers || '');

  const deleteNetwork = (pwd: string) => {
    setLoading(true);
    setAuthError('');
    setError('');
    const params = {
      name: networkName,
      passphrase: pwd,
    };

    sendMessage(JsonRpcMethod.DeleteNetwork, params, function (response) {
      setLoading(false);
      if (response.error) {
        switch (response.error) {
          case 'Delete Failed':
            setAuthError('Wrong passphrase');
            break;
          default:
            setError(response.error);
            setAskAuth(false);
            break;
        }
      } else {
        // Delete the network from store, then update the wallet and return
        store.deleteNetwork(networkName, () => {
          store.setLedger(undefined);
          closeFunction && closeFunction(true);
        });
      }
    });
  };

  const saveNetwork = (pwd) => {
    setLoading(true);
    setAuthError('');
    setError('');
    const params = {
      name: networkName,
      genesisId: networkId,
      symbol: networkSymbol,
      algodUrl: networkAlgodUrl,
      indexerUrl: networkIndexerUrl,
      headers: networkHeaders,
      passphrase: pwd,
    };

    sendMessage(JsonRpcMethod.SaveNetwork, params, function (response) {
      if (response.error) {
        // Error display
        console.log(response.error);
      } else {
        store.setAvailableLedgers(response.availableLedgers);
        store.setLedger(networkName);
        closeFunction && closeFunction(true);
      }
    });
  };

  const evaluateNextStep = (pwd) => {
    if (isDeleting) {
      deleteNetwork(pwd);
    } else {
      saveNetwork(pwd);
    }
    setIsDeleting(false);
  };

  return useObserver(
    () => html`
      <div>
        <div class="network-modify">
          <label>Display Name</label>
          <input
            id="networkName"
            class="input"
            placeholder=""
            value=${networkName}
            onInput=${(e) => setNetworkName(e.target.value)}
          />
          <label>Network ID</label>
          <input
            id="networkId"
            class="input"
            placeholder="mainnet-v1.0"
            value=${networkId}
            onInput=${(e) => setNetworkId(e.target.value)}
          />
          <label>Network Algod URL</label>
          <input
            id="networkAlgodUrl"
            class="input"
            placeholder="https://mainnet-algorand.api.purestake.io/ps2"
            value=${networkAlgodUrl}
            onInput=${(e) => setNetworkAlgodUrl(e.target.value)}
          />
          <label>Network Indexer URL</label>
          <input
            id="networkIndexerUrl"
            class="input"
            placeholder="https://mainnet-algorand.api.purestake.io/idx2"
            value=${networkIndexerUrl}
            onInput=${(e) => setNetworkIndexerUrl(e.target.value)}
          />
          <label>Network Headers</label>
          <input
            id="networkHeaders"
            class="input"
            placeholder='{"Algod":{"X-API-Key":"xxxxx"},"Indexer":{"X-API-Key":"xxxxx"}}'
            value=${networkHeaders}
            onInput=${(e) => setNetworkHeaders(e.target.value)}
          />
        </div>
        <button
          class="modal-close is-large"
          style="z-index: 1; opacity: 0;"
          onClick=${() => closeFunction && closeFunction(true)}
        />
      </div>
      ${isEditable &&
      html`
        <div className="network-modify-footer mt-2">
          <button
            id="deleteNetwork"
            class="button is-danger is-link"
            onClick=${() => {
              setIsDeleting(true);
              setAskAuth(true);
            }}
          >
            Delete
          </button>
          <button
            id="saveNetwork"
            class="button is-link"
            onClick=${() => {
              if (isModify) {
                setAskAuth(true);
              } else {
                saveNetwork(undefined);
              }
            }}
          >
            Save
          </button>
        </div>
        ${askAuth &&
        html`
          <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
              <${Authenticate} error=${authError} loading=${loading} nextStep=${evaluateNextStep} />
            </div>
            <button
              class="modal-close is-large"
              aria-label="close"
              onClick=${() => {
                setIsDeleting(false);
                setAskAuth(false);
              }}
            />
          </div>
        `}
        ${error !== undefined &&
        error.length > 0 &&
        html`<p class="mt-3 has-text-danger" style="height: 1.5em;"> ${error} </p>`}
      `}
    `
  );
};

export default LedgerNetworkModify;
