import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';

import HeaderComponent from './HeaderComponent';
import LedgerSelect from './LedgerSelect';
import SettingsMenu from './SettingsMenu';
import Logo from './Logo';

const MainHeader: FunctionalComponent = () => {
  return html`
    <${HeaderComponent}>
      <${Logo} />
      <${LedgerSelect} />
      <${SettingsMenu} />
    </${HeaderComponent}>
  `;
};

export default MainHeader;
