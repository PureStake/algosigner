import { createContext } from 'preact';
import { html } from 'htm/preact';
import { useLocalStore } from 'mobx-react-lite';
import { route } from 'preact-router';
import { autorun } from 'mobx';

import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { sendMessage } from 'services/Messaging'

export const StoreContext = createContext(undefined);

export const StoreProvider = ({children}) => {
  const existingStore = sessionStorage.getItem('wallet');
  const store = useLocalStore(() => ({
    ledger: 'MainNet',
    TestNet: {},
    MainNet: {},
    savedRequest: null,
    setLedger: (ledger) => {
      store.ledger = ledger;
    },
    updateWallet: (newWallet) => {
      store.TestNet = newWallet.TestNet;
      store.MainNet = newWallet.MainNet;
    },
    saveRequest: (request) => {
      store.savedRequest = request;
    },
    clearSavedRequest: () => {
      delete store.savedRequest;
    },
  }));

  autorun(() => {
    sessionStorage.setItem('wallet', JSON.stringify(store))
  })

  // Try to retrieve session from background
  sendMessage(JsonRpcMethod.GetSession, {}, function(response) {
    if (response && response.exist){
      let hashPath = "";
      if (window.location.hash.length > 0) {
        // Remove # from hash
        hashPath = window.location.hash.slice(2);
      }
      if ('session' in response) {
        store.updateWallet(response.session.wallet);
        store.setLedger(response.session.ledger);
        if (hashPath.length > 0) {
          route(`/${hashPath}`)
        } else {
          route('/wallet')
        }
      } else {
        route('/login/'+hashPath);
      }
    }
  });

  return html`
    <${StoreContext.Provider} value=${store}>${children}</${StoreContext.Provider}>
  `
};