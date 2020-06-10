import { render, createContext } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { autorun } from 'mobx';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import { Router, Route } from 'preact-router';
import { createHashHistory } from 'history';

import ImportAccount from './pages/ImportAccount'
import Wallet from './pages/Wallet'
import Account from './pages/Account'
import SendAlgos from './pages/SendAlgos'
import Header from './components/Header'


export const StoreContext = createContext();

const StoreProvider = ({children}) => {
  const existingStore = localStorage.getItem('wallet');
  const store = useLocalStore(() => ({
    TestNet: [],
    MainNet: [],
    ledger: 'MainNet',
    addAccount: (ledger, account) => {
      store[ledger].push(account)
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

const List = () => {
  const store = useContext(StoreContext);
  return useObserver(() => (
    html`<a>${ store.accounts }</a>`
  ))
}

require('./mystyles.scss');

const mountNode = document.getElementById('root');


const App = () => {
    let currentUrl;
    const handleRoute = (e) => {
        currentUrl = e.url;
    };

    return html`
      <${StoreProvider}>
        <div style="overflow: hidden; width: 450px; height: 550px;">
          <${Header} />
          <${Router} history=${createHashHistory()}>
            <${Wallet} path="/" />
            <${ImportAccount} path="/import-account/:ledger" />
            <${Account} path="/:ledger/:address" />
            <${SendAlgos} path="/:ledger/:address/send" />
          </${Router}>
        </div>
      </${StoreProvider}>
    `;
};

// render(html`<${App}/>`, mountNode, mountNode.lastChild)
