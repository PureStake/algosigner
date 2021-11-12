import { createContext } from 'preact';
import { html } from 'htm/preact';
import { useLocalStore } from 'mobx-react-lite';
import { route } from 'preact-router';
import { autorun } from 'mobx';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { sendMessage } from 'services/Messaging';

export const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    ledger: 'MainNet',
    availableLedgers: [],
    TestNet: [],
    MainNet: [],
    savedRequest: undefined,
    setLedger: (ledger: string) => {
      if (!ledger) {
        ledger = 'MainNet';
      } else if (!store[ledger]) {
        store[ledger] = [];
      }
      store.ledger = ledger;
    },
    deleteNetwork: (ledger: string, callback: Function) => {
      delete store[ledger];
      store.setLedger('MainNet');
      // Reset available ledgers
      store.availableLedgers = [];
      store.getAvailableLedgers((availableLedgers) => {
        if (!availableLedgers.error) {
          store.availableLedgers = availableLedgers;
        }
        callback();
      });
    },
    getAvailableLedgers: (callback: Function) => {
      if (!store.availableLedgers || store.availableLedgers.length === 0) {
        try {
          sendMessage(JsonRpcMethod.GetLedgers, undefined, (response) => {
            if (response) {
              store.setAvailableLedgers(response);
            }
            callback(response);
          });
        } catch (e) {
          const errorMsg = chrome.runtime.lastError || (e as any).message;
          callback({ error: errorMsg });
        }
      } else {
        callback(store.availableLedgers);
      }
    },
    setAvailableLedgers: (ledgers: any) => {
      store.availableLedgers = ledgers;
    },
    updateWallet: (newWallet: any, callback: Function) => {
      let updateLedgers;
      store.getAvailableLedgers((availableLedgers) => {
        if (!availableLedgers.error) {
          updateLedgers = availableLedgers;

          for (let i = 0; i < updateLedgers.length; i++) {
            const currentLedgerName = updateLedgers[i].name;
            if (currentLedgerName) {
              store[currentLedgerName] = newWallet[currentLedgerName];
            }
          }
        }
        callback();
      });
    },
    updateAccountDetails: (ledger: string, details: any) => {
      console.log(details);
      for (let i = store[ledger].length - 1; i >= 0; i--) {
        if (store[ledger][i].address === details.address) {
          store[ledger][i].details = details;
          break;
        }
      }
    },
    getAssetDetails: (ledger: string, address: string, callback: Function) => {
      const assetDetails: any = [];
      for (let i = store[ledger].length - 1; i >= 0; i--) {
        if (store[ledger][i].address === address) {
          store[ledger][i]['details']['assets'].forEach((a) => {
            const id = a['asset-id'];
            const asset = {
              unitName: a['unit-name'],
              decimals: a['decimals'],
            };
            assetDetails[id] = asset;
          });
          break;
        }
      }
      callback(assetDetails);
    },
    clearCache: (callback: Function) => {
      store.getAvailableLedgers((storedLedgers) => {
        storedLedgers.forEach((ledger) => {
          const accounts = store[ledger.name];
          if (accounts && accounts.length) {
            store[ledger.name].forEach((account) => {
              delete account.details;
            });
          }
        });
      });
      callback();
    },
    saveRequest: (request) => {
      store.savedRequest = request;
    },
    clearSavedRequest: () => {
      delete store.savedRequest;
    },
  }));

  autorun(() => {
    sessionStorage.setItem('wallet', JSON.stringify(store));
  });

  // Try to retrieve session from background
  sendMessage(JsonRpcMethod.GetSession, {}, function (response) {
    if (response && response.exist) {
      let hashPath = '';
      if (window.location.hash.length > 0) {
        // Remove # from hash
        hashPath = window.location.hash.slice(2);
      }
      if ('session' in response) {
        store.setAvailableLedgers(response.session.availableLedgers);
        store.updateWallet(response.session.wallet, () => {
          store.setLedger(response.session.ledger);
          if (hashPath.length > 0) {
            route(`/${hashPath}`);
          } else {
            route('/wallet');
          }
        });
      } else {
        route('/login/' + hashPath);
      }
    }
  });

  return html`
    <${StoreContext.Provider} value=${store}>${children}</${StoreContext.Provider}>
  `;
};
