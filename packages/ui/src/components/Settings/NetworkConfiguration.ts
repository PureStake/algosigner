import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';
import { StoreContext } from 'services/StoreContext';
import { NetworkTemplate } from '@algosigner/common/types/network';
import NetworkModify from './NetworkModify';
import { route } from 'preact-router';

const NetworkConfiguration: FunctionalComponent = (props: any) => {
  const { closeFunction } = props;
  const store: any = useContext(StoreContext);
  const [isNetConfigModalVisible, setNetConfigModalVisible] = useState<boolean>(false);
  const [activeNetworkTemplate, setActiveNetworkTemplate] = useState<any>(undefined);

  let sessionNetworks;
  store.getAvailableNetworks((availableNetworks) => {
    if (!availableNetworks.error) {
      sessionNetworks = availableNetworks;
    }
  });

  const setActiveNetwork = (network?: NetworkTemplate) => {
    if (network) {
      setActiveNetworkTemplate({ ...network });
    } else {
      setActiveNetworkTemplate({ name: '', isEditable: true });
    }
    setNetConfigModalVisible(true);
  };

  return useObserver(
    () => html`
      <div className="box has-text-centered is-flex pt-3" style="flex-direction: column;">
        <div class="mb-2">
          <div><b>Network Configuration</b></div>
          <a
            class="is-size-7"
            target="_blank"
            href="https://github.com/PureStake/algosigner/blob/develop/docs/add-network.md"
            >More info</a
          >
        </div>

        <div style="flex: 1; text-align: -webkit-center;">
          ${!isNetConfigModalVisible &&
          html`
            ${sessionNetworks &&
            sessionNetworks.map(
              (network: any) =>
                html`
                  <div style="padding: 0.2rem 0.3rem; width: 100%;">
                    <button
                      id="select${network.name}"
                      style="width: 90%;"
                      onClick=${() => setActiveNetwork(network)}
                      class="button ${(!network.isEditable && 'is-dark is-outlined') ||
                      'is-primary is-outlined'}"
                    >
                      ${network.name}
                      ${!network.isEditable &&
                      html`<span
                        class="icon"
                        style="padding-right: 5%; padding-left: 90%;position: absolute;"
                        ><i class="fas fa-lock"></i
                      ></span>`}
                    </button>
                  </div>
                `
            )}
            ${sessionNetworks &&
            html`
              <button
                id="createNetwork"
                className="button is-link mt-2"
                onClick=${() => setActiveNetwork()}
              >
                New Network
              </button>
            `}
          `}
          ${isNetConfigModalVisible &&
          html`
            <${NetworkModify}
              closeFunction=${(closeType) => {
                setNetConfigModalVisible(false);
                if (closeType === 1) {
                  closeFunction && closeFunction();
                } else if (closeType === 2) {
                  closeFunction && closeFunction();
                  route('/wallet');
                }
              }}
              name=${activeNetworkTemplate.name}
              genesisID=${activeNetworkTemplate.genesisID}
              symbol=${activeNetworkTemplate.symbol}
              algodUrl=${activeNetworkTemplate.algodUrl}
              indexerUrl=${activeNetworkTemplate.indexerUrl}
              headers=${activeNetworkTemplate.headers}
              isEditable=${activeNetworkTemplate.isEditable}
              isModify=${activeNetworkTemplate.name !== ''}
            />
          `}
        </div>
      </div>
    `
  );
};

export default NetworkConfiguration;
