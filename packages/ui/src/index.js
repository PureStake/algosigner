import { render, createContext } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { autorun } from 'mobx';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import { Router, Route } from 'preact-router';
import { createHashHistory } from 'history';

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


export const StoreContext = createContext();

const StoreProvider = ({children}) => {
  const existingStore = localStorage.getItem('wallet');
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

  if (existingStore) {
    Object.assign(store, JSON.parse(existingStore)); 
  }
  autorun(() => {
    localStorage.setItem('wallet', JSON.stringify(store))
  })

  return html`
    <${StoreContext.Provider} value=${store}>${children}</${StoreContext.Provider}>
  `
};


require('./mystyles.scss');

const mountNode = document.getElementById('root');

const Root = (props) => {
  return html`
      ${props.children}
  `
}

const App = () => {
    return html`
      <${StoreProvider}>
        <div style="overflow: hidden; width: 450px; height: 550px; display: flex; flex-direction: column;">
          <${Router} history=${createHashHistory()}>
            <${Authorize} path="/authorize" />
            <${Welcome} path="/" />
            <${SetPassword} path="/set-password" />
            <${Login} path="/login" />
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
