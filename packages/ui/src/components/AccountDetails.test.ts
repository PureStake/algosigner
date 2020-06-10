import { shallow } from 'enzyme';
import { html } from 'htm/preact';

import AccountDetails from './AccountDetails';

describe('AccountDetails', () => {
  it('should display initial count', () => {
    const account = {
      address: "",
      mnemonic: ""
    }
    const ledger = "TestNet";
    const component = shallow(html`<${AccountDetails}  account=${account} ledger ={ledger} />`);
    expect(component).toMatchSnapshot();
    // expect(true).toBe(true);
  });

  // it('should increment after "Increment" button is clicked', () => {
  //   const wrapper = mount(<Counter initialCount={5}/>);

  //   wrapper.find('button').simulate('click');

  //   expect(wrapper.text()).to.include('Current value: 6');
  // });
});