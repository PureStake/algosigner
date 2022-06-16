import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext, useEffect, useRef } from 'preact/hooks';
import { route } from 'preact-router';
import { Key } from 'ts-key-enum';

import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { AliasConfig } from '@algosigner/common/config';
import { obfuscateAddress } from '@algosigner/common/utils';
import { ALIAS_COLLISION_TOOLTIP } from '@algosigner/common/strings';

import { StoreContext } from 'services/StoreContext';
import { sendMessage } from 'services/Messaging';
import { assetFormat, numFormat, getNamespaceIcon } from 'services/common';

import HeaderView from 'components/HeaderView';
import Authenticate from 'components/Authenticate';
import ContactPreview from 'components/ContactPreview';

import algosdk from 'algosdk';

const ALIAS_TIMER = 500;
const MAX_LENGTH_LOOKUP = 20;

const SendAlgos: FunctionalComponent = (props: any) => {
  const store: any = useContext(StoreContext);
  const { matches, ledger, address } = props;
  const inputRef = useRef<HTMLHeadingElement>(null);
  const activeAliasRef = useRef<HTMLHeadingElement>(null);

  const [, forceUpdate] = useState<boolean>(false);
  const [account, setAccount] = useState<any>({});
  const [askAuth, setAskAuth] = useState<boolean>(false);
  const [ddActive, setDdActive] = useState<boolean>(false);
  // Asset {} is Algos
  const [asset, setAsset] = useState<any>({});
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');
  const [note, setNote] = useState('');
  const [txId, setTxId] = useState('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTimerID, setSearchTimerID] = useState<NodeJS.Timeout | undefined>(undefined);
  const [aliases, setAliases] = useState<any>({});
  const [interalAliases, setInternalAliases] = useState<any>({});
  const [highlightedAlias, setHighlightedAlias] = useState<number>(0);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [addingContact, setAddingContact] = useState<boolean>(false);
  const [newContactName, setNewContactName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Initial setup
  useEffect(() => {
    for (let i = store[ledger].length - 1; i >= 0; i--) {
      if (store[ledger][i].address === address) {
        setAccount(store[ledger][i]);
        break;
      }
    }
    // We search for the internal aliases to later determine wether the
    // destination address is worth offering to be saved as a contact
    const params = { ledger: ledger, searchTerm: '' };
    sendMessage(JsonRpcMethod.GetAliasedAddresses, params, (response) => {
      setLoading(false);
      if ('error' in response) {
        setError(response.error.message);
      } else {
        setInternalAliases(Object.keys(response).flatMap((n) => response[n]));
      }
    });
  }, []);
  // Automatically focus textbox on load
  useEffect(() => {
    if (inputRef !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [selectedDestination]);
  // Scroll keyboard cursor into view
  useEffect(() => {
    if (activeAliasRef !== null && activeAliasRef.current !== null) {
      activeAliasRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [highlightedAlias, selectedDestination]);

  // Transaction signing
  const selectAsset = (selectedAsset) => {
    setDdActive(false);

    // Load details if they are not present in the session or is an empty object (algos).
    if (Object.keys(selectedAsset).length === 0 || 'decimals' in selectedAsset) {
      setAsset(selectedAsset);
      handleAmountChange(amount, selectedAsset);
    } else {
      const params = {
        'ledger': ledger,
        'asset-id': selectedAsset['asset-id'],
      };

      sendMessage(JsonRpcMethod.AssetDetails, params, function (response) {
        const keys = Object.keys(response.asset.params);
        for (let i = keys.length - 1; i >= 0; i--) {
          selectedAsset[keys[i]] = response.asset.params[keys[i]];
        }
        setAsset(selectedAsset);
        handleAmountChange(amount, selectedAsset);
      });
    }
  };
  const sendTx = async (pwd: string) => {
    setLoading(true);
    setAuthError('');
    setError('');

    // We convert from String to BigInt while mantaining decimals.
    const decimals = 'decimals' in asset ? asset.decimals : 6;
    const amountArray = amount.split('.');
    const decimalsOnTheInput = amountArray.length > 1;
    let amountToSend = BigInt(amountArray[0]) * BigInt(Math.pow(10, decimals));
    if (decimalsOnTheInput) {
      amountToSend +=
        BigInt(amountArray[1]) * BigInt(Math.pow(10, decimals - amountArray[1].length));
    }

    const params: any = {
      ledger: ledger,
      passphrase: pwd,
      address: account.address,
      txnParams: {
        from: account.address,
        to: to || (selectedDestination && selectedDestination.address),
        note: note,
        amount: amountToSend,
      },
    };

    if ('asset-id' in asset) {
      params.txnParams.type = 'axfer';
      params.txnParams.assetIndex = asset['asset-id'];
    } else {
      params.txnParams.type = 'pay';
    }

    sendMessage(JsonRpcMethod.SignSendTransaction, params, function (response) {
      setLoading(false);
      if ('error' in response) {
        switch (response.error) {
          case 'Login Failed':
            setAuthError('Wrong passphrase');
            break;
          default:
            setError(response.error);
            setAskAuth(false);
            break;
        }
      } else {
        setAskAuth(false);
        setTxId(response.txId);
      }
    });
  };
  const saveContact = () => {
    const params = {
      name: newContactName,
      address: to,
    };
    setLoading(true);
    setError('');
    sendMessage(JsonRpcMethod.SaveContact, params, function (response) {
      setLoading(false);
      if ('error' in response) {
        setError(response.error.message);
      } else {
        goBack();
      }
    });
  };

  // Domains search and handling
  const searchAliases = async (searchTerm) => {
    const params = { ledger: ledger, searchTerm: searchTerm };
    sendMessage(JsonRpcMethod.GetAliasedAddresses, params, (response) => {
      setLoading(false);
      if ('error' in response) {
        setError(response.error.message);
      } else {
        setAliases(response);
      }
    });
  };
  const handleTimeout = async (searchTerm) => {
    clearTimeout(searchTimerID as NodeJS.Timeout);
    setSearchTimerID(undefined);
    await searchAliases(searchTerm);
  };
  const handleAddressChange = (value) => {
    clearTimeout(searchTimerID as NodeJS.Timeout);
    setAliases({});
    setHighlightedAlias(0);
    setTo(value);
    if (value.length && value.length <= MAX_LENGTH_LOOKUP) {
      setSearchTerm(value);
      setSearchTimerID(setTimeout(() => handleTimeout(value), ALIAS_TIMER));
    } else {
      setSearchTerm('');
    }
  };
  // Flattened aliases in order to iterate over them
  const orderedAliases = Object.keys(aliases).flatMap((n) => aliases[n]);
  // We check for duplicate aliases and mark them
  const namesUsed = orderedAliases.flatMap((a) => a.name);
  const namesWithCollisions = orderedAliases
    .filter((a, index) => namesUsed.indexOf(a.name) != index)
    .flatMap((a) => a.name);
  if (namesWithCollisions.length) {
    orderedAliases.forEach((a) => {
      if (namesWithCollisions.includes(a.name)) {
        a.collides = true;
      }
    });
  }
  // Use keyboard to navigate over the flattened aliases
  const handleAliasNavigation = (event: Event) => {
    const key = (event as KeyboardEvent).key as Key;
    const customKeys = [Key.Escape, Key.ArrowDown, Key.ArrowUp, Key.Enter];

    if (customKeys.includes(key)) {
      event.preventDefault();
      switch (key) {
        case Key.Escape:
          setAliases({});
          setSearchTerm('');
          break;
        case Key.ArrowDown:
          if (orderedAliases.length && highlightedAlias + 1 < orderedAliases.length) {
            setHighlightedAlias(highlightedAlias + 1);
          }
          break;
        case Key.ArrowUp:
          if (orderedAliases.length && highlightedAlias - 1 >= 0) {
            setHighlightedAlias(highlightedAlias - 1);
          }
          break;
        case Key.Enter:
          if (orderedAliases.length) {
            onSelectDestination(orderedAliases[highlightedAlias]);
          }
          break;
      }
    }
  };

  // Destination (de)selection
  const onSelectDestination = (c: object, index?: number) => {
    setSelectedDestination(c);
    setTo('');
    if (index) setHighlightedAlias(index);
  };
  const editDestination = () => {
    setTo(searchTerm);
    setSelectedDestination(null);
  };

  // Other UI functions and variables
  const goBack = () => {
    route(`/${matches.ledger}/${matches.address}`);
  };
  const handleAmountChange = (val, ass) => {
    const decimals = 'decimals' in ass ? ass.decimals : 6;
    const integer = decimals >= 16 ? 1 : 16 - decimals;
    let regex;
    if (decimals > 0) regex = new RegExp(`\\d{1,${integer}}(\\.\\d{0,${decimals}})?`);
    else regex = new RegExp(`\\d{1,16}`);

    const finalVal = val.match(regex);
    if (finalVal) setAmount(finalVal[0]);
    else setAmount('');
    forceUpdate((n) => !n);
  };

  let ddClass: string = 'dropdown is-right';
  if (ddActive) ddClass += ' is-active';
  const youIndicator = html`<b class="has-text-link">YOU</b>`;
  const disabled = (!selectedDestination && !algosdk.isValidAddress(to)) || +amount < 0;
  const isActive = (index: number) => (index === highlightedAlias ? 'is-active' : '');

  // Render HTML
  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <${HeaderView}
        action="${() => route(`/${matches.ledger}/${matches.address}`)}"
        title="Send"
      />

      <div class="px-4" style="flex: 1">
        <div class="is-flex mb-2" style="justify-content: space-between;">
          <div class="control">
            <input
              class="input"
              id="transferAmount"
              placeholder="0.000"
              style="width: 245px;"
              value=${amount}
              onInput=${(e) => handleAmountChange(e.target.value, asset)}
            />
            ${'decimals' in asset &&
            html`
              <p class="has-text-grey has-text-centered mt-1" style="font-size: 0.9em;">
                This asset allows for
                <span> ${asset.decimals} decimal${asset.decimals !== 1 && 's'}</span>
              </p>
            `}
          </div>
          <div class=${ddClass}>
            <div class="dropdown-trigger">
              <button
                id="selectAsset"
                class="button pr-1 pl-0"
                onClick=${() => setDdActive(!ddActive)}
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                style="border: none; width: 120px; justify-content: flex-end;"
              >
                <span style="text-overflow: ellipsis; overflow: hidden;">
                  ${asset['unit-name'] || asset['name'] || asset['asset-id'] || 'Algos'}
                </span>
                <span class="icon is-small">
                  <i class="fas fa-caret-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content" style="max-height: 330px; overflow: auto;">
                <a
                  id="asset-0"
                  onClick=${() => selectAsset({})}
                  class="dropdown-item is-flex px-4"
                  style="justify-content: space-between;"
                >
                  <span>Algos</span>
                  <span class="ml-4 has-text-grey">
                    ${account.details && numFormat(account.details.amount / 1e6, 6)} Algos
                  </span>
                </a>
                ${account.details &&
                account.details.assets.map(
                  (x) => html`
                    <a
                      id=${`asset-${x['asset-id']}`}
                      title=${x['asset-id']}
                      onClick=${() => selectAsset(x)}
                      class="dropdown-item is-flex px-4"
                      style="justify-content: space-between;"
                    >
                      <span>${x['name'] || x['asset-id']}</span>
                      <span class="ml-4 has-text-grey">
                        ${assetFormat(x.amount, x.decimals)} ${x['unit-name']}
                      </span>
                    </a>
                  `
                )}
              </div>
            </div>
          </div>
        </div>

        <div class="mb-2"><b>From</b></div>
        ${account.details &&
        html`<${ContactPreview} contact="${account}" rightSide=${youIndicator} />`}

        <div class="has-text-centered has-text-weight-bold my-2">
          <span><i class="fas fa-arrow-down mr-3"></i></span>
          ${'asset-id' in asset && html` <span>Asset transfer</span> `}
          ${!('asset-id' in asset) && html` <span>Payment</span> `}
        </div>

        <div>
          ${!selectedDestination &&
          html`
            <textarea
              placeholder="Enter either an address, an imported account, an added contact or a namespace alias"
              class="textarea has-fixed-size mb-4 pr-6"
              id="destinationAddress"
              value=${to}
              ref=${inputRef}
              rows="2"
              onInput=${(e) => handleAddressChange(e.target.value)}
              onKeyDown=${(e) => handleAliasNavigation(e)}
            />
            ${searchTerm &&
            html`
              ${!Object.keys(aliases).length &&
              html`<span style="position: absolute; left: 90%; bottom: 43%;" class="loader" />`}
              ${orderedAliases.length > 0 &&
              html`
                ${namesWithCollisions.length &&
                html`
                  <i
                    class="fas fa-exclamation-triangle px-1 has-text-link has-tooltip-arrow has-tooltip-left has-tooltip-fade"
                    data-tooltip="${ALIAS_COLLISION_TOOLTIP}"
                    style="position: absolute; z-index: 3; top: 48%; left: 88%; cursor: pointer; font-style: unset;"
                    aria-label="warning about name collisions"
                  ></i>
                `}
                <div class="alias-selector-container py-0">
                  <div class="alias-selector-content py-2">
                    ${orderedAliases.map(
                      (a, index) =>
                        html`
                          <a
                            onClick=${() => onSelectDestination(a, index)}
                            class="dropdown-item is-flex px-4 ${isActive(index)}"
                            style="justify-content: space-between;"
                          >
                            ${index === highlightedAlias && html`<span ref=${activeAliasRef} />`}
                            <div
                              class="is-flex is-align-items-center has-tooltip-arrow has-tooltip-right has-tooltip-fade"
                              data-tooltip="${`${AliasConfig[a.namespace]?.name}:\n${a.name}`}"
                            >
                              <img
                                src=${getNamespaceIcon(a.namespace, index === highlightedAlias)}
                                height="16"
                                width="16"
                                class="mr-1"
                              />
                              ${a.collides &&
                              html`<i class="fas fa-exclamation-triangle mr-1 has-text-link"></i>`}
                              <span style="text-overflow: ellipsis; overflow: hidden;">
                                ${a.name}
                              </span>
                            </div>
                            <span class="ml-2 has-text-grey has-text-right is-flex-grow-1">
                              ${obfuscateAddress(a.address)}
                            </span>
                          </a>
                        `
                    )}
                  </div>
                </div>
              `}
            `}
          `}
          ${selectedDestination &&
          html`
            <i
              class="far fa-edit px-1"
              style="position: relative; z-index: 3; top: 7px; left: 92%; cursor: pointer;"
              aria-label="edit"
              onClick=${() => editDestination()}
            ></i>
            <${ContactPreview}
              contact="${selectedDestination}"
              style="margin-top: -22px;"
              className="mb-4"
              id="selectedDestination"
            />
          `}
        </div>
        <textarea
          placeholder="Note"
          class="textarea has-fixed-size mb-4"
          style="resize: none;"
          id="note"
          value=${note}
          rows="2"
          onInput=${(e) => setNote(e.target.value)}
        />
      </div>
      <div class="px-4 py-4">
        <button
          id="submitTransfer"
          class="button is-primary is-fullwidth"
          disabled=${disabled}
          onClick=${() => setAskAuth(true)}
        >
          Send!
        </button>
      </div>
    </div>

    ${askAuth &&
    html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <${Authenticate} error=${authError} loading=${loading} nextStep=${sendTx} />
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick=${() => setAskAuth(false)}
        />
      </div>
    `}
    ${txId.length > 0 &&
    html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <p>Transaction sent with ID:</p>
            <p id="txId" class="mb-4" style="word-break: break-all;">${txId}</p>
            ${!selectedDestination &&
            !interalAliases.find((a) => a.address === to) &&
            html`
              <p>This address is not on your contact list, would you like to save it?</p>
              ${addingContact &&
              html`
                <div class="is-flex mt-2">
                  <input
                    class="input mr-2"
                    id="newContactName"
                    placeholder="Contact name"
                    value=${newContactName}
                    onInput=${(e) => setNewContactName(e.target.value)}
                  />
                  <button
                    id="confirmNewContact"
                    disabled=${loading}
                    class="button is-success ${loading ? 'is-loading' : ''}"
                    onClick=${() => saveContact()}
                  >
                    Save
                  </button>
                </div>
              `}
              ${!addingContact &&
              html`
                <button
                  id="saveNewContact"
                  class="button is-primary is-fullwidth"
                  onClick=${() => setAddingContact(true)}
                >
                  Save new Contact
                </button>
              `}
            `}
            <button
              id="backToAccount"
              class="button is-primary is-fullwidth mt-2"
              onClick=${() => goBack()}
            >
              Back to account!
            </button>
          </div>
        </div>
      </div>
    `}
    ${error !== undefined &&
    error.length > 0 &&
    html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <p class="has-text-danger has-text-weight-bold mb-2">
              Transaction failed with the following error:
            </p>
            <p id="tx-error">${error}</p>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${() => setError('')} />
      </div>
    `}
  `;
};

export default SendAlgos;
