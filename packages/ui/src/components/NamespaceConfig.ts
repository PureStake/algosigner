import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';

import { JsonRpcMethod } from '@algosigner/common/messaging/types';
import { sendMessage } from 'services/Messaging';

import { NamespaceConfig } from '@algosigner/common/types';
import { getNamespaceIcon } from 'services/common';
import toggleOn from 'assets/toggle-on.svg';
import toggleOff from 'assets/toggle-off.svg';

const NamespacesConfiguration: FunctionalComponent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [namespaceConfigs, setNamespaceConfigs] = useState<Array<NamespaceConfig>>([]);

  const toggleNamespaceConfig = (namespace: NamespaceConfig) => {
    if (!loading) {
      setLoading(true);
      sendMessage(JsonRpcMethod.ToggleNamespaceConfig, namespace, function (response) {
        setLoading(false);
        if (!('error' in response)) {
          setNamespaceConfigs(response);
        }
      });
    }
  };

  useEffect(() => {
    sendMessage(JsonRpcMethod.GetNamespaceConfigs, {}, function (response) {
      setLoading(false);
      if (!('error' in response)) {
        setNamespaceConfigs(response);
      }
    });
  }, []);

  return html`
    <div
      class="box is-flex pt-2"
      style="overflow-wrap: break-word; flex-direction: column; max-height: 520px;"
    >
      <b class="has-text-centered mb-3 is-size-5">Namespaces Configuration</b>
      <p class="has-text-justified mb-4">
        Namespaces allows you enter short aliases instead of having to fully enter an Algorand
        Address. E.g., by entering <code>purestake.algo</code>, AlgoSigner resolves to an address
        registered to the alias owner. These namespaces can be turned off, doing so will stop
        showing aliases from said namespace when selecting a receiver for a transaction.
      </p>
      <div id="namespaceList">
        ${loading &&
        !namespaceConfigs.length &&
        html`
          <div style="padding: 10px 0;">
            <span class="loader" style="position: relative; left: calc(50% - 0.5em);"></span>
          </div>
        `}
        ${namespaceConfigs.map(
          (config: NamespaceConfig) =>
            html`<div class="box small is-flex">
              <span class="is-align-items-center is-flex">
                <img
                  src="${getNamespaceIcon(config.namespace, false)}"
                  height="16"
                  width="16"
                  class="mr-1"
                />
              </span>
              <span class="is-flex-grow-1">${config.name}</span>
              <a
                onClick="${() => toggleNamespaceConfig(config)}"
                class="is-align-items-center is-flex"
              >
                ${loading &&
                html`<span class="loader" style="position: relative; left: calc(50% - 0.5em);" />`}
                ${!loading &&
                html`<img src="${config.toggle ? toggleOn : toggleOff}" width="25" />`}
              </a>
            </div>`
        )}
      </div>
    </div>
  `;
};

export default NamespacesConfiguration;
