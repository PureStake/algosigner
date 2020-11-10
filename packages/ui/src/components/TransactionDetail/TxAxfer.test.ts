import { shallow } from 'enzyme';
import { html } from 'htm/preact';
import TxAxfer from './TxAxfer';

let component;
const tx = {
  'asset-transfer-transaction': {
    'amount': 0,
    'asset-id': 10984,
    'close-amount': 0,
    'receiver': 'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
  },
  'close-rewards': 0,
  'closing-amount': 0,
  'confirmed-round': 9548799,
  'fee': 249000,
  'first-valid': 9548788,
  'genesis-hash': 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
  'genesis-id': 'testnet-v1.0',
  'id': '5EYWUOBWEEOM4QRE6JNVP3XHEVFCZ7CFNNI32Q5T2SWWUC7QPGIQ',
  'intra-round-offset': 0,
  'last-valid': 9549788,
  'receiver-rewards': 0,
  'round-time': 1601394079,
  'sender': 'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
  'sender-rewards': 0,
  'signature': {
    sig:
      'SP9PaE/7EkOrhBhieble5kcfHbbUGaDl2EXtPcL4OSZy5bPO/ruxECWJPECCH3TJBd9Z8nDMAnv0bZYp/DL8Bg==',
  },
  'tx-type': 'axfer',
};

const ledger = 'TestNet';

describe('TxAxfer', () => {
  beforeEach(() => {
    component = shallow(html` <${TxAxfer} tx=${tx} ledger=${ledger} /> `);
  });

  it('should display tx id', () => {
    expect(component.contains(html`<span>${tx.id}</span>`)).toBe(true);
  });

  it('should display sender', () => {
    expect(component.contains(html`<span>${tx.sender}</span>`)).toBe(true);
  });

  it('should display receiver', () => {
    expect(
      component.contains(
        html`<span>${tx['asset-transfer-transaction'].receiver}</span>`
      )
    ).toBe(true);
  });

  it('should display amount', () => {
    expect(
      component.contains(
        html`<span
          >${tx['asset-transfer-transaction']['amount'].toString()}</span
        >`
      )
    ).toBe(true);
  });

  it('should display confirmed round', () => {
    expect(
      component.contains(html`<span>${tx['confirmed-round'].toString()}</span>`)
    ).toBe(true);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
