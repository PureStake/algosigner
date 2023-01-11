import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext, useEffect } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { obfuscateAddress } from '@algosigner/common/utils';
import { StoreContext } from 'services/StoreContext';
import logotype from 'assets/logotype.png';
import { sendMessage } from 'services/Messaging';

function deny() {
  chrome.runtime.sendMessage({
    source: 'extension',
    body: {
      jsonrpc: '2.0',
      method: JsonRpcMethod.AuthorizationDeny,
      params: {
        responseOriginTabID: responseOriginTabID,
      },
    },
  });
}

let responseOriginTabID;

const Enable: FunctionalComponent = () => {
  const store: any = useContext(StoreContext);
  const [genesisID, setGenesisID] = useState<any>('');
  const [genesisHash, setGenesisHash] = useState<any>('');
  const [networkSpecifiedType, setNetworkSpecifiedType] = useState<any>('');
  const [accounts, setPromptedAccounts] = useState<any>([]);
  const [request, setRequest] = useState<any>({});
  const [active, setActive] = useState<boolean>(false);
  let sessionLedgers;
  let ddClass: string = 'dropdown';

  store.getAvailableLedgers((availableLedgers) => {
    if (!availableLedgers.error) {
      let restrictedLedgers: any[] = [];
      if (networkSpecifiedType === 1) {
        restrictedLedgers.push(
          availableLedgers.find((l) => l.genesisId === genesisID && l.genesisHash === genesisHash)
        );
      } else if (networkSpecifiedType === 2) {
        for (let i = 0; i < availableLedgers.length; i++) {
          if (availableLedgers[i]['genesisId'] === genesisID) {
            restrictedLedgers.push(availableLedgers[i]);
          }
        }
      } else {
        restrictedLedgers = availableLedgers;
      }
      sessionLedgers = restrictedLedgers;
    }
  });

  if (active) ddClass += ' is-active';
  const flip = () => {
    setActive(!active);
  };

  const setDetails = (params) => {
    // Check for existence of the params and set page values
    if (params.promptedAccounts && params.promptedAccounts.length > 0) {
      setPromptedAccounts(params.promptedAccounts);
    } else {
      setPromptedAccounts(null);
    }
    if (params.genesisID) {
      setGenesisID(params.genesisID);
    }
    if (params.genesisHash) {
      setGenesisHash(params.genesisHash);
    }
    if (params.ledger) {
      // Ledger is added during EnableAuthorization to match with legacy ledger name and with GetEnableAccounts
      store.setLedger(params.ledger);
    }
    if (params.networkSpecifiedType) {
      setNetworkSpecifiedType(params.networkSpecifiedType);
    }
  };

  const setLedger = (ledger) => {
    store.setLedger(ledger);
    flip();

    // Set the new ledger to be loaded
    request.body.params['ledger'] = ledger;

    sendMessage(JsonRpcMethod.GetEnableAccounts, request.body.params, function (response) {
      if (response.error) {
        console.error(response.error);
      } else {
        setDetails(response);
      }
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.body.method == JsonRpcMethod.EnableAuthorization) {
        // Set the request in the store with origin so we can respond later
        setRequest(request);
        store.saveRequest(request);
        responseOriginTabID = request.originTabID;

        // Check for existence of the params and set page values
        setDetails(request.body.params);
      }
    });
    window.addEventListener('beforeunload', deny);
    return () => window.removeEventListener('beforeunload', deny);
  }, []);

  const grant = () => {
    window.removeEventListener('beforeunload', deny);
    chrome.runtime.sendMessage({
      source: 'extension',
      body: {
        jsonrpc: '2.0',
        method: JsonRpcMethod.AuthorizationAllow,
        params: {
          responseOriginTabID: responseOriginTabID,
          isEnable: true,
          genesisID: genesisID,
          genesisHash: genesisHash,
          accounts: accounts,
          ledger: store.ledger,
        },
      },
    });
  };

  return useObserver(
    () => html`
      <div class="main-view" style="flex-direction: column; justify-content: space-between;">
        <div class="px-4 mt-2" style="flex: 0; border-bottom: 1px solid #EFF4F7">
          <img src=${logotype} width="130" />
        </div>
        <div style="flex: 1">
          <section class="hero">
            <div class="hero-body py-5">
              ${request.favIconUrl &&
              html` <img src=${request.favIconUrl} width="48" style="float:left" /> `}
              <h1 class="title is-size-4" style="margin-left: 58px;">
                Access requested to your
                wallet${request.originTitle && html` from ${request.originTitle}`}
              </h1>
            </div>
          </section>
          <section class="px-5 py-0">
            <h3
              >Select the accounts to
              share${request.originTitle && html` with ${request.originTitle}`}.
              <b> Bolded</b> accounts are required by the dApp.</h3
            >
            <div class="is-flex is-align-items-baseline my-3">
              ${sessionLedgers &&
              sessionLedgers.length === 1 &&
              html` <span>Sharing accounts on the <b>${store.ledger}</b> network.</span> `}
              ${sessionLedgers &&
              sessionLedgers.length > 1 &&
              html`
                <div class="mr-3">Shared Network:</div>
                <div class=${ddClass}>
                  <div class="dropdown-trigger">
                    <button
                      id="selectLedger"
                      class="button is-fullwidth is-justify-content-start"
                      onClick=${flip}
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                    >
                      <span class="icon is-small">
                        <i class="fas fa-caret-down" aria-hidden="true"></i>
                      </span>
                      <span>${store.ledger}</span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-mask" onClick=${flip} />
                    <div class="dropdown-content">
                      ${sessionLedgers &&
                      sessionLedgers.map(
                        (availableLedger: any) =>
                          html`
                            <a
                              id="select${availableLedger.name}"
                              onClick=${() => setLedger(availableLedger.name)}
                              class="dropdown-item"
                            >
                              ${availableLedger.name}
                            </a>
                          `
                      )}
                    </div>
                  </div>
                </div>
              `}
            </div>
            ${!!store[store.ledger] &&
            html`
              ${(!accounts || accounts.length === 0) &&
              html`
                <div class="mb-2">There are no accounts available to share on this network.</div>
              `}
              ${accounts &&
              accounts.length > 0 &&
              html`
                <div class="table-container" style="max-height: 300px; overflow: auto;">
                  <table class="table is-striped is-fullwidth">
                    <thead>
                      <tr>
                        <th>Account</th>
                        <th>Shared</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${accounts &&
                      accounts.map(
                        (account) => html`<tr>
                          <td title=${account.address}>
                            ${account.requested &&
                            html`<b>${obfuscateAddress(account.address, 7)}</b>`}
                            ${!account.requested && html`${obfuscateAddress(account.address, 7)}`}
                          </td>
                          ${account.missing &&
                          html`<td style="color: red; vertical-align: top;">Not Available</td>`}
                          ${!account.missing &&
                          html`<td style="vertical-align: top;">
                            <input
                              type="checkbox"
                              id="checkbox-${account.address}"
                              checked=${account.selected}
                              onClick=${() => {
                                account.selected = !account.selected;
                              }}
                            />
                          </td>`}
                        </tr>`
                      )}
                    </tbody>
                  </table>
                </div>
              `}
            `}
          </section>
        </div>
        <div class="mx-5 mb-3" style="display: flex;">
          <button
            id="denyAccess"
            class="button is-link is-outlined px-6"
            onClick=${() => {
              deny();
            }}
          >
            Reject
          </button>
          <button
            class="button is-primary ml-3"
            disabled=${!(accounts && accounts.length > 0)}
            id="grantAccess"
            style="flex: 1;"
            onClick=${() => {
              grant();
            }}
          >
            Grant access
          </button>
        </div>
      </div>
    `
  );
};

export default Enable;
