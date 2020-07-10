import { shallow } from 'enzyme';
import { html } from 'htm/preact';
import AccountDetails from './AccountDetails';

describe('AccountDetails', () => {
  it('should display account information', () => {
    const account = {
      address: "PBZHOKKNBUCCDJB7KB2KLHUMWCGAMBXZKGBFGGBHYNNXFIBOYI7ONYBWK4"
    }
    const ledger = "TestNet";
    const component = shallow(html`<${AccountDetails} account=${account} ledger=${ledger} />`);
    expect(component).toMatchSnapshot();
  });
});