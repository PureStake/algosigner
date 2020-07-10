import { FunctionalComponent } from "preact";
import { html } from 'htm/preact';
import { route } from 'preact-router';

const HeaderView: FunctionalComponent = (props: any) => {
  const { title, action } = props;
  return html`
    <div class="px-4 py-3 has-text-weight-bold is-size-5">
      <p style="overflow: hidden; text-overflow: ellipsis;">
        <a class="icon mr-2" onClick=${action}>${'\u003C'}</a>
        ${title}
      </p>
    </div>
  `;
};

export default HeaderView;