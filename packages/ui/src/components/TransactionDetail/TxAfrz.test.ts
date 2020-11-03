import { shallow } from 'enzyme';
import { html } from 'htm/preact';
import TxAfrz from './TxAfrz';

let component;
const tx = {
  "asset-freeze-transaction": {
    "address": "ZYQX7BZ6LGTD7UCS7J5RVEAKHUJPK3FNJFZV2GPUYS2TFIADVFHDBKTN7I",
    "asset-id": 185,
    "new-freeze-status": true
  },
  "close-rewards": 0,
  "closing-amount": 0,
  "confirmed-round": 3276956,
  "fee": 1000,
  "first-valid": 3276927,
  "genesis-hash": "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
  "id": "VH4LN4PICQPJNAZE6KVCNOYLE3K5XWWZH2OM3HWCSF2TOQU4MGNA",
  "intra-round-offset": 0,
  "last-valid": 3277927,
  "note": "AnwdDiVabq0=",
  "receiver-rewards": 0,
  "round-time": 1574696199,
  "sender": "WLH5LELVSEVQL45LBRQYCLJAX6KQPGWUY5WHJXVRV2NPYZUBQAFPH22Q7A",
  "sender-rewards": 0,
  "signature": {
    "sig": "TtL+XMfgNcQ1H/Tgdc11yFjLKm+dZ8PskkfTkxwgUih8FS4LW+ADQnmoVxDaolfwaX5km6XHBXY2Fx91e3o/DQ=="
  },
  "tx-type": "afrz"
};

const ledger = "TestNet";

describe('TxAfrz', () => {
  beforeEach(() => {
    component = shallow(html`
      <${TxAfrz} tx=${tx} ledger=${ledger} />
    `);
  });

  it('should display tx id', () => {
    expect(component.contains(html`<span>${tx.id}</span>`)).toBe(true);
  });

  it('should display sender', () => {
    expect(component.contains(html`<span>${tx.sender}</span>`)).toBe(true);
  });

  it('should display frozen address', () => {
    expect(component.contains(html`<span>${tx['asset-freeze-transaction']['address']}</span>`)).toBe(true);
  });

  it('should display asset ID', () => {
    expect(component.contains(html`<span>${tx['asset-freeze-transaction']['asset-id'].toString()}</span>`)).toBe(true);
  });

  it('should display freeze status', () => {
    const freezed = tx['asset-freeze-transaction']['new-freeze-status'] ? 'Freeze' : 'Unfreeze';
    expect(component.contains(html`<span>${freezed}</span>`)).toBe(true);
  });

  it('should display confirmed round', () => {
    expect(component.contains(html`<span>${tx['confirmed-round'].toString()}</span>`)).toBe(true);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
