/* eslint-disable no-unused-vars */
import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import Authenticate from 'components/Authenticate';
import { StoreContext } from 'services/StoreContext';
import { NETWORK_HEADERS_TOOLTIP } from '@algosigner/common/strings';

import { sendMessage } from 'services/Messaging';

const LedgerNetworkModify: FunctionalComponent = (props: any) => {
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
  const [checkStatus, setCheckStatus] = useState<string>('gray');

  const previousName = props.name ? props.name : '';

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
          closeFunction && closeFunction(1);
        });
      }
    });
  };

  const checkNetwork = () => {
    setLoading(true);
    setAuthError('');
    setCheckStatus('');
    setError('');
    const params = {
      name: networkName,
      genesisId: networkId,
      symbol: networkSymbol,
      algodUrl: networkAlgodUrl,
      indexerUrl: networkIndexerUrl,
      headers: networkHeaders,
    };

    sendMessage(JsonRpcMethod.CheckNetwork, params, (response) => {
      setLoading(false);
      if (response.algod.error || response.indexer.error) {
        // Error display
        setCheckStatus('red');
        setError(
          JSON.stringify({
            algod: response.algod.error || 'Success',
            indexer: response.indexer.error || 'Success',
          })
        );
      } else {
        setCheckStatus('green');
      }
    });
  };

  const saveNetwork = (pwd) => {
    setLoading(true);
    setAuthError('');
    setError('');
    const params = {
      name: networkName,
      previousName: previousName,
      genesisId: networkId,
      symbol: networkSymbol,
      algodUrl: networkAlgodUrl,
      indexerUrl: networkIndexerUrl,
      headers: networkHeaders,
      passphrase: pwd,
    };

    sendMessage(JsonRpcMethod.SaveNetwork, params, function (response) {
      setLoading(false);
      if (response.error) {
        // Error display
        console.log(response.error);
      } else {
        store.setAvailableLedgers(response.availableLedgers);
        store.setLedger(networkName);
        closeFunction && closeFunction(2);
      }
    });
  };

  const evaluateNextStep = (pwd: string) => {
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
          <div style="float: right; font-size: small; margin: -4px 4px 0px 0px;">
            <button
              style="background-color: rgb(240 240 240 / .1); border-color: rgba(200, 200, 200, 0.3); border-width: 1px; border-radius: 4px; cursor: pointer; font-size: smaller;"
              id="checkNetwork"
              onClick=${() => {
                checkNetwork();
              }}
            >
              Check URLs
              <i
                style="font-size: medium; color: ${checkStatus}"
                class="far fa-check-circle pl-1"
              ></i>
            </button>
          </div>
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
          <label
            >Network Headers
            <a
              target="_blank"
              href="https://github.com/PureStake/algosigner/blob/develop/docs/add-network.md#network-headers"
            >
              <i
                class="fas fa-info-circle ml-1 has-tooltip-arrow has-tooltip-text-left has-tooltip-fade"
                data-tooltip="${NETWORK_HEADERS_TOOLTIP}"
              />
            </a>
          </label>
          <input
            id="networkHeaders"
            class="input"
            placeholder="API Key or JSON Structure"
            value=${networkHeaders}
            onInput=${(e) => setNetworkHeaders(e.target.value)}
          />
        </div>
        <button
          class="modal-close is-large"
          style="z-index: 1; opacity: 0;"
          onClick=${() => closeFunction && closeFunction(1)}
        />
      </div>
      ${isEditable &&
      html`
        <div className="network-modify-footer is-flex is-justify-content-space-between mt-2">
          <button
            id="deleteNetwork"
            class="button is-danger is-flex-grow-1"
            disabled="${loading}"
            onClick=${() => {
              setIsDeleting(true);
              setAskAuth(true);
            }}
          >
            Delete
          </button>
          <button
            id="saveNetwork"
            class="button is-link is-flex-grow-1 ml-1"
            disabled="${loading}"
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
        html`<span id="networkError" class="mt-3 has-text-danger">${error}</span>`}
      `}
    `
  );
};

export default LedgerNetworkModify;
