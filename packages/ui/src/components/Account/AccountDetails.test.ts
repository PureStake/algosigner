import { shallow } from 'enzyme';
import { html } from 'htm/preact';
import AccountDetails from './AccountDetails';

let component;
const account = {
  address: "PBZHOKKNBUCCDJB7KB2KLHUMWCGAMBXZKGBFGGBHYNNXFIBOYI7ONYBWK4"
}
const ledger = "TestNet";

describe('AccountDetails', () => {
  beforeEach(() => {
    component = shallow(html`
      <${AccountDetails} account=${account} ledger=${ledger} />
    `);
  });

  it('should display account address', () => {
    expect(component.contains(html`<p id="accountAddress">${account.address}</p>`)).toBe(true);
  });

  it('should display account address QR', () => {
    expect(component.find('#accountQR').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
