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
import { SessionObject } from '@algosigner/common/types';

const NetworkModify: FunctionalComponent = (props: any) => {
  const { closeFunction, isEditable } = props;
  const store: any = useContext(StoreContext);
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [networkName, setNetworkName] = useState<string>(props.name || '');
  const [networkAlgodUrl, setNetworkAlgodUrl] = useState<string>(props.algodUrl || '');
  const [networkIndexerUrl, setNetworkIndexerUrl] = useState<string>(props.indexerUrl || '');
  const [networkHeaders, setNetworkHeaders] = useState<string>(props.headers || '');
  const [checkStatus, setCheckStatus] = useState<string>('gray');

  // If we have a previous name, we're modifying; otherwise, it's a new one
  const previousName = props.name ? props.name : '';

  const deleteNetwork = (pwd: string) => {
    setLoading(true);
    setAuthError('');
    setError('');
    const params = {
      name: previousName,
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
          store.setActiveNetwork(undefined);
          closeFunction && closeFunction(1);
        });
      }
    });
  };

  const checkNetwork = () => {
    setLoading(true);
    setAuthError('');
    setCheckStatus('gray');
    setError('');
    const params = {
      name: networkName,
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
      algodUrl: networkAlgodUrl,
      indexerUrl: networkIndexerUrl,
      headers: networkHeaders,
      passphrase: pwd,
    };

    sendMessage(JsonRpcMethod.SaveNetwork, params, function (response) {
      if (response.error) {
        // Error display
        console.log(response.error);
        setLoading(false);
      } else {
        const session: SessionObject = response;
        store.setAvailableNetworks(session.availableNetworks);
        store.updateWallet(session.wallet, () => {
          store.setActiveNetwork(session.network);
          setLoading(false);
          closeFunction && closeFunction(2);
        });
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
          <textarea
            id="networkHeaders"
            class="textarea"
            placeholder="API Key or JSON Structure"
            value=${networkHeaders}
            onInput=${(e) => setNetworkHeaders(e.target.value)}
          />
        </div>
        <div
          class="has-text-centered"
          style="cursor: pointer; min-width: 24px; position: absolute; top: 3.5em; left: 1em; z-index: 5; background: white;"
          onClick=${() => closeFunction && closeFunction(1)}
        >
          <span class="icon">
            <i class="fas fa-arrow-left" aria-hidden="true" />
          </span>
        </div>
      </div>
      ${isEditable &&
      html`
        <div className="network-modify-footer">
          <div className="is-flex is-justify-content-space-between mt-2">
            <button
              id="deleteNetwork"
              class="button is-danger is-flex-grow-1"
              disabled="${loading || !previousName}"
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
                if (previousName) {
                  setAskAuth(true);
                } else {
                  saveNetwork(undefined);
                }
              }}
            >
              Save
            </button>
          </div>
          ${error !== undefined &&
          error.length > 0 &&
          html`<div class="mt-2">
            <span id="networkError" class="has-text-danger">${error}</span>
          </div>`}
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
      `}
    `
  );
};

export default NetworkModify;
