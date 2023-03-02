import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';

const Footer: FunctionalComponent = () => {
  return html`
    <div style="flex: 0; padding: 0 0.5em; border-top: 1px solid #EFF4F7;">
      <span class="is-size-7">
        ${'\u00A9'} 2023 PureStake
      </span>
    </div>
  `;
};

export default Footer;