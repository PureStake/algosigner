import { shallow } from 'enzyme';
import { html } from 'htm/preact';
import TxPay from './TxPay';

let component;
const tx = {
  'close-rewards': 0,
  'closing-amount': 0,
  'confirmed-round': 9548884,
  'fee': 245000,
  'first-valid': 9548877,
  'genesis-hash': 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
  'genesis-id': 'testnet-v1.0',
  'id': 'FTENCQN3ZPSK7CZP2WVJ2FGZG66K6ZT65NEECKWGJ753KAXQSOZQ',
  'intra-round-offset': 0,
  'last-valid': 9549877,
  'payment-transaction': {
    'amount': 4232,
    'close-amount': 0,
    'receiver': 'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
  },
  'receiver-rewards': 0,
  'round-time': 1601394438,
  'sender': 'RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A',
  'sender-rewards': 0,
  'signature': {
    sig:
      'ZNzEA9U60EQ9w7kZct4t/PyhoE1NYWar6kLJskCIAgfDP4tePFmYdADjNpDcThsRAwSWu0rkRkl+j9WS5br/Aw==',
  },
  'tx-type': 'pay',
};

const ledger = 'TestNet';

describe('TxPay', () => {
  beforeEach(() => {
    component = shallow(html` <${TxPay} tx=${tx} ledger=${ledger} /> `);
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
        html`<span>${tx['payment-transaction'].receiver}</span>`
      )
    ).toBe(true);
  });

  it('should display amount', () => {
    expect(
      component.contains(
        html`<span
          >${(tx['payment-transaction']['amount'] / 1e6).toString()} Algos</span
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
