import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { Link } from 'preact-router';

const OpenContacts: FunctionalComponent = () => {
  return html`
    <${Link}
      id="contactsList"
      class="has-tooltip-arrow has-tooltip-bottom has-tooltip-bottom-right has-tooltip-fade has-text-centered has-text-grey-dark"
      data-tooltip="Contacts List"
      style="min-width: 24px;"
      href=${'/contacts-page'}
    >
      <span class="icon is-small">
        <i class="fas fa-user-friends" aria-hidden="true"></i>
      </span>
    </${Link}>
  `;
};

export default OpenContacts;
