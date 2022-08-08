import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';

import HeaderComponent from './HeaderComponent';
import LedgerSelect from './LedgerSelect';
import OpenContacts from './OpenContacts';
import SettingsMenu from './SettingsMenu';
import Logo from './Logo';

const MainHeader: FunctionalComponent = () => {
  return html`
    <${HeaderComponent}>
      <${Logo} />
      <${LedgerSelect} />
      <${OpenContacts} />
      <${SettingsMenu} />
    </${HeaderComponent}>
  `;
};

export default MainHeader;
