import { render, createContext } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { autorun } from 'mobx';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import { Router, Route, route } from 'preact-router';
import { createHashHistory } from 'history';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging'

import Header from 'components/Header'
import Footer from 'components/Footer'

import Authorize from 'pages/Authorize'
import Welcome from 'pages/Welcome'
import SetPassword from 'pages/SetPassword'
import Login from 'pages/Login'
import CreateAccount from 'pages/CreateAccount'
import ImportAccount from 'pages/ImportAccount'
import Wallet from 'pages/Wallet'
import Account from 'pages/Account'
import SendAlgos from 'pages/SendAlgos'

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'


export const StoreContext = createContext();

const StoreProvider = ({children}) => {
        console.log('PATHNAME1',window.location.hash);
  const existingStore = sessionStorage.getItem('wallet');
  const store = useLocalStore(() => ({
    ledger: 'MainNet',
    addAccount: (ledger, address, name) => {
      store[ledger].push({
        address: address,
        name: name
      })
    },
    deleteAccount: (ledger, account) => {
      for (var i = store[ledger].length - 1; i >= 0; i--) {
        if (store[ledger][i].address == account.address) {
          store[ledger].splice(i, 1)
          break;
        }
      }
    },
    setLedger: (ledger) => {
      store.ledger = ledger;
    },
    updateWallet: (newWallet) => {
      store.TestNet = newWallet.TestNet;
      store.MainNet = newWallet.MainNet;
    }
  }));

  autorun(() => {
    sessionStorage.setItem('wallet', JSON.stringify(store))
  })

  // Try to retrieve session from background
  sendMessage(JsonRpcMethod.GetSession, {}, function(response) {
    // Object.assign(store, JSON.parse(existingStore));
    console.log('GETSESSION', response)
    if (response && response.exist){
      let hashPath = "";
      if (window.location.hash.length > 0)
         // Remove # from hash
        hashPath = window.location.hash.slice(2);
      console.log('hashpath', hashPath)
      if ('session' in response) {
        store.updateWallet(response.session);
        if (hashPath.length > 0) {
          console.log('1', hashPath)
          route(`/${hashPath}`)
        } else {
          console.log('2', hashPath)
          route('/wallet')
        }
      } else {
        console.log('3', hashPath)
        route('/login/'+hashPath);
      }
    }
  });

  return html`
    <${StoreContext.Provider} value=${store}>${children}</${StoreContext.Provider}>
  `
};


require('./styles.scss');

const mountNode = document.getElementById('root');

const Root = (props) => {
  return html`
      ${props.children}
  `
}

const App = () => {
    return html`
      <${StoreProvider}>
        <div style="overflow: hidden; width: 400px; height: 550px; display: flex; flex-direction: column;">
          <${Router} history=${createHashHistory()}>
            <${Authorize} path="/authorize" />
            <${Welcome} path="/" />
            <${SetPassword} path="/set-password" />
            <${Login} path="/login/:redirect?" />
            <${Root} path="/:*?">
              <${Header} />
              <div style="overflow: auto; flex: 1; display: flex; flex-direction: column;">
                <${Router}>
                  <${Wallet} path="/wallet" />
                  <${CreateAccount} path="/:ledger/create-account" />
                  <${ImportAccount} path="/:ledger/import-account" />
                  <${Account} path="/:ledger/:address" />
                  <${SendAlgos} path="/:ledger/:address/send" />
                </${Router}>
              </div>
              <${Footer} />
            </${Route}>
          </${Router}>
        </div>
      </${StoreProvider}>
    `;
};

render(html`<${App}/>`, mountNode, mountNode.lastChild)
