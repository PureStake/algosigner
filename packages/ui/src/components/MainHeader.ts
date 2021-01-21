import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';

import HeaderComponent from './HeaderComponent';
import LedgerSelect from './LedgerSelect';
import Logo from './Logo';

const MainHeader: FunctionalComponent = () => {
  return html`
    <${HeaderComponent}>
      <${Logo} />
      <${LedgerSelect} />
    </${HeaderComponent}>
  `;
};

export default MainHeader;
