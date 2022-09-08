import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';

import HeaderComponent from './HeaderComponent';
import Logo from './Logo';

const ReducedHeader: FunctionalComponent = () => {
  return html`
    <${HeaderComponent}>
      <${Logo} />
    </${HeaderComponent}>
  `;
};

export default ReducedHeader;
