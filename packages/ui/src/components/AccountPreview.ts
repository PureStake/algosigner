import { html } from 'htm/preact';
import { FunctionalComponent } from "preact";
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';

const AccountPreview: FunctionalComponent = (props: any) => {
  const { account, ledger } = props;
  const [results, setResults] = useState<any>(null);

  const fetchApi = async () => {
    chrome.runtime.sendMessage({
        source:'ui',
        body:{
            jsonrpc: '2.0',
            method:'account',
            ledger: 'testnet',
            address: account.address,
            params:[],
            id: (+new Date).toString(16)
        }
    }, function(response) {
      setResults(response);
    });
  }

  useEffect(() => {
    fetchApi();
  }, []);

  return html`
    <div class="box py-2"
      style="overflow: hidden; text-overflow: ellipsis; background: #EFF4F7; box-shadow: none; height: 55px;"
      onClick=${() => route(`/${ledger}/${account.address}`)}>
      <div style="display: flex; justify-content: space-between;">
        <div>
          <b>${ account.name }</b>
        </div>
        <div class="is-size-7 has-text-right">
          ${ results && html`
            <b>${results.assets.length}</b> ASAs<br />
            <b>${results.amount}</b> MAlgos
          `}
        </div>
      </div>
    </div>
  `
};

export default AccountPreview;