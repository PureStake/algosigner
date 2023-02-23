import { createContext } from 'preact';
import { html } from 'htm/preact';
import { useLocalStore } from 'mobx-react-lite';
import { route } from 'preact-router';
import { autorun } from 'mobx';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { sendMessage } from 'services/Messaging';
import logging, { LogLevel } from '@algosigner/common/logging';
import { SessionObject, WalletStorage } from '@algosigner/common/types';

export const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    activeNetwork: 'MainNet',
    setActiveNetwork: (networkName: string) => {
      if (!networkName) {
        networkName = 'MainNet';
      } else if (!store.wallet[networkName]) {
        store.wallet[networkName] = [];
      }
      store.activeNetwork = networkName;
    },
    availableNetworks: [],
    getAvailableNetworks: (callback: Function) => {
      if (!store.availableNetworks || store.availableNetworks.length === 0) {
        try {
          sendMessage(JsonRpcMethod.GetNetworks, undefined, (response) => {
            if (response) {
              store.setAvailableNetworks(response);
            }
            callback(response);
          });
        } catch (e) {
          const errorMsg = chrome.runtime.lastError || (e as any).message;
          callback({ error: errorMsg });
        }
      } else {
        callback(store.availableNetworks);
      }
    },
    setAvailableNetworks: (networks: any) => {
      store.availableNetworks = networks;
    },
    deleteNetwork: (networkName: string, callback: Function) => {
      delete store[networkName];
      store.setActiveNetwork('MainNet');
      // Reset available networks
      store.availableNetworks = [];
      store.getAvailableNetworks((availableNetworks) => {
        if (!availableNetworks.error) {
          store.availableNetworks = availableNetworks;
        }
        callback();
      });
    },
    savedRequest: undefined,
    setSavedRequest: (request) => {
      store.savedRequest = request;
    },
    clearSavedRequest: () => {
      delete store.savedRequest;
    },
    wallet: {
      TestNet: [],
      MainNet: [],
    },
    updateWallet: (newWallet: WalletStorage, callback: Function) => {
      let networksToUpdate;
      store.getAvailableNetworks((availableNetworks) => {
        if (!availableNetworks.error) {
          networksToUpdate = availableNetworks;

          for (let i = 0; i < networksToUpdate.length; i++) {
            const currentNetworkName = networksToUpdate[i].name;
            if (currentNetworkName) {
              store.wallet[currentNetworkName] = newWallet[currentNetworkName];
            }
          }
        }
        callback();
      });
    },
    updateAccountDetails: (network: string, details: any) => {
      logging.log(`Updating account details on network '${network}':`, LogLevel.Debug);
      logging.log(details, LogLevel.Debug);
      for (let i = store.wallet[network].length - 1; i >= 0; i--) {
        if (store.wallet[network][i].address === details.address) {
          store.wallet[network][i].details = details;
          break;
        }
      }
    },
    getAssetDetails: (network: string, address: string, callback: Function) => {
      const assetDetails: any = [];
      for (let i = store.wallet[network].length - 1; i >= 0; i--) {
        if (store.wallet[network][i].address === address) {
          store.wallet[network][i]['details']['assets'].forEach((a) => {
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
      store.getAvailableNetworks((storedNetworks) => {
        storedNetworks.forEach((network) => {
          const accounts = store.wallet[network.name];
          if (accounts && accounts.length) {
            store.wallet[network.name].forEach((account) => {
              delete account.details;
            });
          }
        });
      });
      callback();
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
        const session: SessionObject = response.session;
        store.setAvailableNetworks(session.availableNetworks);
        store.updateWallet(session.wallet, () => {
          store.setActiveNetwork(session.network);
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
