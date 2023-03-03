import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';

import HeaderComponent from './HeaderComponent';
import NetworkSelect from './NetworkSelect';
import OpenContacts from './OpenContacts';
import SettingsMenu from './SettingsMenu';
import Logo from './Logo';

const MainHeader: FunctionalComponent = () => {
  return html`
    <${HeaderComponent}>
      <${Logo} />
      <${NetworkSelect} />
      <${OpenContacts} />
      <${SettingsMenu} />
    </${HeaderComponent}>
  `;
};

export default MainHeader;
