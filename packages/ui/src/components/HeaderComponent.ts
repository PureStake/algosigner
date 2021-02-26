import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';

const HeaderComponent: FunctionalComponent = ({ children }) => {
  return html` <div class="px-4 header"> ${children} </div> `;
};

export default HeaderComponent;
