import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { useEffect, useState, useContext } from 'preact/hooks';
import { Link } from 'preact-router';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { StoreContext } from 'services/StoreContext'

import logotype from 'assets/logotype.png'

function deny() {
  chrome.runtime.sendMessage({
    source: 'extension',
    body: {
      jsonrpc: '2.0',
      method:'authorization-deny',
      params: {
        responseOriginTabID: responseOriginTabID
      }
    }
  });
}

let responseOriginTabID;

const Authorize: FunctionalComponent = (props) => {
  const store:any = useContext(StoreContext);
  const [request, setRequest] = useState<any>({});

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
      if(request.body.method == JsonRpcMethod.Authorization) {
        setRequest(request);
        store.saveRequest(request);
        responseOriginTabID = request.originTabID;
      }
    });

    // Check if the stored request is an Authorization one
    if (store.savedRequest && store.savedRequest.body.method == JsonRpcMethod.Authorization){
      setRequest(store.savedRequest);
      store.clearSavedRequest();  
    }

    window.addEventListener("beforeunload", deny);
    return () => window.removeEventListener("beforeunload", deny);
  }, []);


  const grant = () => {
    window.removeEventListener("beforeunload", deny);
    chrome.runtime.sendMessage({
      source:'extension',
      body: {
        jsonrpc: '2.0',
        method: 'authorization-allow',
        params: {
          responseOriginTabID: responseOriginTabID
        }
      }
    });
  }

  return html`
    <div class="main-view" style="flex-direction: column; justify-content: space-between;">
      <div class="px-4 mt-2" style="flex: 0; border-bottom: 1px solid #EFF4F7">
        <img src=${logotype} width="130" />
      </div>
      <div style="flex: 1">
        <section class="hero">
          <div class="hero-body py-5">
            ${request.favIconUrl && html`
              <img src=${request.favIconUrl} width="48" style="float:left"/>
            `}
            <h1 class="title is-size-4" style="margin-left: 58px;">
              ${request.originTitle} requested access to your wallet
            </h1>
          </div>
        </section>

        <section class="section py-0">
          <h3>
            This will grant ${request.originTitle} the following privileges:
          </h3>
          <ul class="pl-5 mt-5" style="list-style: disc;">
            <li><b>Read</b> the list of <b>accounts</b> in this wallet per supported ledger.</li> 
            <li class="mt-4">
              <b>Send you requests for transactions.</b> You will have the chance to review all transactions and will need to sign each with your wallet’s password.
            </li>
          </ul>
        </section>
      </div>

      <div class="mx-5 mb-3" style="display: flex;">
        <button id="denyAccess" class="button is-link is-outlined px-6"
          onClick=${() => {deny()}}>
          Reject
        </button>
        <button class="button is-primary ml-3"
          id="grantAccess"
          style="flex: 1;"
          onClick=${() => {grant()}}>
          Grant access
        </button>
      </div>
    </div>
  `
}

export default Authorize;