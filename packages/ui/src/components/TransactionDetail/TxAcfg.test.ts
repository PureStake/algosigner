/**
 * @jest-environment jsdom
 */
import { shallow } from 'enzyme';
import { html } from 'htm/preact';
import TxAcfg from './TxAcfg';

let component;
const tx = {
  "asset-config-transaction": {
    "asset-id": 0,
    "params": {
      "creator": "RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A",
      "decimals": 1,
      "default-frozen": false,
      "name": "non",
      "total": 12999,
      "unit-name": "non"
    }
  },
  "close-rewards": 0,
  "closing-amount": 0,
  "confirmed-round": 9265758,
  "created-asset-index": 12249848,
  "fee": 241000,
  "first-valid": 9265746,
  "genesis-hash": "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
  "genesis-id": "testnet-v1.0",
  "id": "B2EMD3434ROUEZESQXI3C5TNUBUL6AZJXYEEE54BBRGBJ743SKLQ",
  "intra-round-offset": 0,
  "last-valid": 9266746,
  "note": "bm90ZQ==",
  "receiver-rewards": 0,
  "round-time": 1600194561,
  "sender": "RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A",
  "sender-rewards": 0,
  "signature": {
    "sig": "lO/DZnJHH2iS/gReqIHzyJS2A36oPGJqx6hvHu0s5Ie/Didp/OMfRFHP4eUHJmzjMLZ0kf0S+OShxSoiimVRDQ=="
  },
  "tx-type": "acfg"
};
const ledger = "TestNet";

describe('TxAcfg', () => {
  beforeEach(() => {
    component = shallow(html`
      <${TxAcfg} tx=${tx} ledger=${ledger} />
    `);
  });

  it('should display tx id', () => {
    expect(component.contains(html`<span>${tx.id}</span>`)).toBe(true);
  });

  it('should display tx from', () => {
    expect(component.contains(html`<span>${tx.sender}</span>`)).toBe(true);
  });

  it('should display asset name', () => {
    expect(component.contains(html`<span>${tx['asset-config-transaction']['params']['name']}</span>`)).toBe(true);
  });

  it('should display confirmed round', () => {
    expect(component.contains(html`<span>${tx['confirmed-round'].toString()}</span>`)).toBe(true);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
