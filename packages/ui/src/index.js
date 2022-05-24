import { render } from 'preact';
import { html } from 'htm/preact';
import { Router, Route } from 'preact-router';
import { createHashHistory } from 'history';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';

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
import AccountDetails from 'pages/AccountDetails';
import SendAlgos from 'pages/SendAlgos';
import AddAsset from 'pages/AddAsset';
import SignWalletTransaction from 'pages/SignWalletTransaction';
import LinkHardwareAccount from 'pages/LinkHardwareAccount';
import LedgerHardwareConnector from 'components/LedgerDevice/LedgerHardwareConnector';
import LedgerHardwareSign from 'components/LedgerDevice/LedgerHardwareSign';
import { StoreProvider } from 'services/StoreContext';

require('./styles.scss');

window.FontAwesome.config.autoReplaceSvg = 'nest';

const mountNode = document.getElementById('root');

const Root = (props) => {
  return html` ${props.children} `;
};

const App = () => {
  // Add support for BigInt serialization
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  return html`
      <${StoreProvider}>
        <div style="width: 100vw; height: 100vh; display: flex; flex-direction: column; max-width: 500px; background: white;">
          <${Router} history=${createHashHistory()}>
            <${SignWalletTransaction} path="/sign-v2-transaction" />
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
                  <${AccountDetails} path="/:ledger/:address/details" />
                  <${AddAsset} path="/:ledger/:address/add-asset" />
                  <${SendAlgos} path="/:ledger/:address/send" />
                  <${LedgerHardwareConnector} path="/:ledger/ledger-hardware-connector" />
                  <${LedgerHardwareSign} path="/:ledger/ledger-hardware-sign" />
                  <${LinkHardwareAccount} path="/:ledger/link-hardware-account" />
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
