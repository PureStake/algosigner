import { html } from 'htm/preact';
import { FunctionalComponent } from 'preact';

const ContactPreview: FunctionalComponent = (props: any) => {
  const { contact, rightSide, style, className, action } = props;

  const namespace = className ? className : '';

  return html`
    <div class="box contact-preview py-2 mb-2 ${namespace}" style="${style}" onClick=${action}>
      <div style="max-width: 80%;">
        <h6 class="title is-6">${contact.name}</h6>
        <h6 class="subtitle is-6">
          ${contact.address.slice(0, 10)}.....${contact.address.slice(-10)}
        </h6>
      </div>
      ${rightSide && rightSide}
    </div>
  `;
};

export default ContactPreview;
