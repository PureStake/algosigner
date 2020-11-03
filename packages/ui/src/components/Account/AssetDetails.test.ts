import { shallow } from 'enzyme';
import { html } from 'htm/preact';
import AssetDetails from './AssetDetails';

let component;
const asset = {
  "amount": 1000,
  "asset-id": 12007988,
  "creator": "RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A",
  "is-frozen": false,
  "unit-name": "DsG0I1",
  "total": 1000,
  "reserve": "RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A",
  "name": "Dm-1",
  "manager": "RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A",
  "freeze": "RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A",
  "default-frozen": false,
  "decimals": 0,
  "clawback": "RCWKH27QBUZSE5B5BRR4KY6J4FHZB6GMY3ZYHFL2ER43ETTGBQCJGRNH7A"
};

const ledger = "TestNet";

describe('AssetDetails', () => {
  beforeEach(() => {
    component = shallow(html`
      <${AssetDetails} asset=${asset} ledger=${ledger} />
    `);
  });

  it('should display asset name', () => {
    expect(component.contains(html`<b>${asset.name}</b>`)).toBe(true);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
