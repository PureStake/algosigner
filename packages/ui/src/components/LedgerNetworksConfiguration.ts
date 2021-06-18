import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useContext } from 'preact/hooks';
import { useObserver } from 'mobx-react-lite';
import { StoreContext } from 'services/StoreContext';
import { LedgerTemplate } from '@algosigner/common/types/ledgers';
import LedgerNetworkModify from './LedgerNetworkModify';
import { route } from 'preact-router';

const LedgerNetworksConfiguration: FunctionalComponent = (props: any) => {
  const { closeFunction } = props;
  const store: any = useContext(StoreContext);
  const [isNetConfigModalVisible, setNetConfigModalVisible] = useState<boolean>(false);
  const [activeLedgerTemplate, setActiveLedgerTemplate] = useState<any>(undefined);

  let sessionLedgers;
  store.getAvailableLedgers((availableLedgers) => {
    if (!availableLedgers.error) {
      sessionLedgers = availableLedgers;
    }
  });

  const setActiveNetwork = (ledger?: LedgerTemplate) => {
    if (ledger) {
      setActiveLedgerTemplate({ ...ledger });
    } else {
      setActiveLedgerTemplate({ name: '', isEditable: true });
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
            ${sessionLedgers &&
            sessionLedgers.map(
              (availableLedger: any) =>
                html`
                  <div style="padding: 0.2rem 0.3rem; width: 100%;">
                    <button
                      id="select${availableLedger.name}"
                      style="width: 90%;"
                      onClick=${() => setActiveNetwork(availableLedger)}
                      class="button ${(!availableLedger.isEditable && 'is-dark is-outlined') ||
                      'is-primary is-outlined'}"
                    >
                      ${availableLedger.name}
                      ${!availableLedger.isEditable &&
                      html`<span
                        class="icon"
                        style="padding-right: 5%;padding-left: 90%;position: absolute;"
                        ><i class="fas fa-lock"></i
                      ></span>`}
                    </button>
                  </div>
                `
            )}
            ${sessionLedgers &&
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
            <${LedgerNetworkModify}
              closeFunction=${(closeType) => {
                setNetConfigModalVisible(false);
                if (closeType === 1) {
                  closeFunction && closeFunction();
                } else if (closeType === 2) {
                  closeFunction && closeFunction();
                  route('/wallet');
                }
              }}
              name=${activeLedgerTemplate.name}
              genesisId=${activeLedgerTemplate.genesisId}
              symbol=${activeLedgerTemplate.symbol}
              algodUrl=${activeLedgerTemplate.algodUrl}
              indexerUrl=${activeLedgerTemplate.indexerUrl}
              headers=${activeLedgerTemplate.headers}
              isEditable=${activeLedgerTemplate.isEditable}
              isModify=${activeLedgerTemplate.name !== ''}
            />
          `}
        </div>
      </div>
    `
  );
};

export default LedgerNetworksConfiguration;
