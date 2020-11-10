import { shallow } from 'enzyme';
import { html } from 'htm/preact';
import { sendMessage } from 'services/Messaging';
import Login from './Login';

jest.mock('services/Messaging');

describe('Login', () => {
  let component = shallow(html` <${Login} /> `);

  it('should display empty input field', () => {
    expect(component.find('input#enterPassword').exists()).toBe(true);
    expect(component.find('input#enterPassword').props().value).toBe('');
  });

  it('should display submit button', () => {
    expect(component.find('button#login').exists()).toBe(true);
    expect(component.find('button#login').props()).toEqual({
      className: 'button is-link is-fullwidth ',
      disabled: true,
      id: 'login',
      onClick: expect.any(Function),
    });
  });

  it('should sendMessage on submit', () => {
    component.find('button#login').simulate('click');
    expect(sendMessage).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
