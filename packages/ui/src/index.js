import { render } from 'preact';
import { html } from 'htm/preact';
import { Router, Route } from 'preact-router';
import { createHashHistory } from 'history';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';

import MainHeader from 'components/MainHeader';
import Footer from 'components/Footer';

import Authorize from 'pages/Authorize';
import Welcome from 'pages/Welcome';
import SetPassword from 'pages/SetPassword';
import Login from 'pages/Login';
import CreateAccount from 'pages/CreateAccount';
import ImportAccount from 'pages/ImportAccount';
import Wallet from 'pages/Wallet';
import Account from 'pages/Account';
import SendAlgos from 'pages/SendAlgos';
import AddAsset from 'pages/AddAsset';
import SignTransaction from 'pages/SignTransaction';
import SignV2Transaction from 'pages/SignV2Transaction';
import SignMultisigTransaction from 'pages/SignMultisigTransaction';

import { StoreProvider } from 'services/StoreContext';

require('./styles.scss');

window.FontAwesome.config.autoReplaceSvg = 'nest';

const mountNode = document.getElementById('root');

const Root = (props) => {
  return html` ${props.children} `;
};

const App = () => {
  return html`
      <${StoreProvider}>
        <div style="overflow: hidden; width: 400px; height: 550px; display: flex; flex-direction: column;">
          <${Router} history=${createHashHistory()}>
            <${SignTransaction} path="/sign-transaction" />
            <${SignV2Transaction} path="/sign-v2-transaction" />
            <${SignMultisigTransaction} path="/sign-multisig-transaction" />
            <${Authorize} path="/authorize" />
            <${Welcome} path="/" />
            <${SetPassword} path="/set-password" />
            <${Login} path="/login/:redirect?" />
            <${Root} path="/:*?">
              <${MainHeader} />
              <div style="overflow: auto; flex: 1; display: flex; flex-direction: column;">
                <${Router}>
                  <${Wallet} path="/wallet" />
                  <${CreateAccount} path="/:ledger/create-account" />
                  <${ImportAccount} path="/:ledger/import-account" />
                  <${Account} path="/:ledger/:address" />
                  <${AddAsset} path="/:ledger/:address/add-asset" />
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

render(html`<${App} />`, mountNode, mountNode.lastChild);
