import { FunctionalComponent } from 'preact';
import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';
import { JsonRpcMethod } from '@algosigner/common/messaging/types';

import { sendMessage } from 'services/Messaging';

import ContactPreview from 'components/ContactPreview';
import algosdk from 'algosdk';

const ContactList: FunctionalComponent = () => {
  const [savingError, setSavingError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [contacts, setContacts] = useState<Array<any>>([]);
  const [modalStatus, setModalStatus] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [newAddress, setNewAddress] = useState<string>('');
  const [previousName, setPreviousName] = useState<string>('');
  const [previousAddress, setPreviousAddress] = useState<string>('');

  const saveContact = () => {
    let conflictingContact = contacts.find((c) => c.name === newName || c.address === newAddress);
    if (
      conflictingContact &&
      (conflictingContact.name === previousName || conflictingContact.address === previousAddress)
    ) {
      conflictingContact = null;
    }
    if (conflictingContact) {
      const errorMessage =
        conflictingContact.name === newName
          ? `This name is already being used for address: ${conflictingContact.address}`
          : `This address has already been saved as '${conflictingContact.name}'`;
      setSavingError(errorMessage);
    } else {
      const params = {
        name: newName,
        address: newAddress,
        previousName: previousName,
      };
      setLoading(true);
      setSavingError('');
      sendMessage(JsonRpcMethod.SaveContact, params, function (response) {
        setLoading(false);
        if ('error' in response) {
          setSavingError(response.error.message);
        } else {
          closeModal();
          setContacts(response);
        }
      });
    }
  };

  const deleteContact = () => {
    const params = {
      name: newName,
      address: newAddress,
    };
    setLoading(true);
    setSavingError('');
    sendMessage(JsonRpcMethod.DeleteContact, params, function (response) {
      setLoading(false);
      if ('error' in response) {
        setSavingError(response.error.message);
      } else {
        closeModal();
        setContacts(response);
      }
    });
  };

  useEffect(() => {
    sendMessage(JsonRpcMethod.GetContacts, {}, function (response) {
      setLoading(false);
      if ('error' in response) {
        setSavingError(response.error.message);
      } else {
        setContacts(response);
      }
    });
  }, []);

  const disabled = loading || !newName || !algosdk.isValidAddress(newAddress);

  const openEditModal = (previousName: string = '', previousAddress = '') => {
    setNewName(previousName);
    setPreviousName(previousName);
    setNewAddress(previousAddress);
    setPreviousAddress(previousAddress);
    setModalStatus(previousName ? 'edit' : 'add');
  };

  const openDeleteModal = (name: string = '', address: string = '') => {
    setNewName(name);
    setNewAddress(address);
    setModalStatus('delete');
  };

  const closeModal = () => {
    setNewName('');
    setNewAddress('');
    setPreviousName('');
    setPreviousAddress('');
    setModalStatus('');
    setSavingError('');
  };

  let modalTitle = '';

  switch (modalStatus) {
    case 'add':
      modalTitle = 'New Contact';
      break;
    case 'edit':
      modalTitle = 'Edit Contact';
      break;
    case 'delete':
      modalTitle = 'Delete Contact';
      break;
    default:
      break;
  }

  return html`
    ${modalStatus &&
    html`
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <div class="has-text-centered mb-4 is-size-5">
              <b>${modalTitle}</b>
            </div>
            ${modalStatus !== 'delete' &&
            html`
              <input
                class="input mb-4"
                id="contactName"
                placeholder="Contact name"
                maxlength="32"
                value=${newName}
                onInput=${(e) => setNewName(e.target.value)}
              />
              <textarea
                class="textarea has-fixed-size mb-4"
                id="contactAddress"
                placeholder="Contact address"
                maxlength="58"
                rows="2"
                value=${newAddress}
                onInput=${(e) => setNewAddress(e.target.value)}
              />
              ${newName.includes('.') &&
              html`
                <p class="has-text-justified mb-4">
                  Note: Please refrain from using namespace aliases as Contacts won't be validated
                  against the namespace provider.
                </p>
              `}
              <button
                class="button is-link is-fullwidth ${loading ? 'is-loading' : ''}"
                id="authButton"
                disabled=${disabled}
                onClick=${() => saveContact()}
              >
                Save contact
              </button>
            `}
            ${modalStatus === 'delete' &&
            html`
              <${ContactPreview}
                contact="${{ name: newName, address: newAddress }}"
                className="mb-4"
              />
              <button
                class="button is-danger is-fullwidth ${loading ? 'is-loading' : ''}"
                id="authButton"
                disabled=${disabled}
                onClick=${() => deleteContact()}
              >
                Delete contact
              </button>
            `}
            ${savingError &&
            !loading &&
            html`
              <div class="has-text-centered mt-2 px-4" style="overflow-wrap: break-word;">
                <span>${savingError}</span>
              </div>
            `}
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" onClick=${() => closeModal()} />
      </div>
    `}
    <div
      class="box is-flex pt-2"
      style="overflow-wrap: break-word; flex-direction: column; max-height: 520px;"
    >
      <b class="has-text-centered mb-3 is-size-5">Contact List</b>
      <i
        class="fas fa-user-plus px-1"
        style="position: absolute; top: 50px; left: 90%; cursor: pointer;"
        aria-label="new contact"
        onClick=${() => openEditModal()}
      ></i>
      ${loading &&
      html`
        <div style="padding: 10px 0;">
          <span class="loader" style="position: relative; left: calc(50% - 0.5em);"></span>
        </div>
      `}
      ${!contacts.length &&
      !loading &&
      html`
        <div class="has-text-centered">
          <span>There are no contacts saved yet.</span>
        </div>
      `}
      <div style="overflow-y: auto; margin-right: -0.5rem;" class="pr-2">
        ${contacts.map(
          (c) =>
            html`<i
                class="far fa-trash-alt px-1"
                style="position: relative; z-index: 3; top: 8px; left: 92%; cursor: pointer;"
                aria-label="delete contact"
                onClick=${() => openDeleteModal(c.name, c.address)}
              ></i>
              <i
                class="far fa-edit px-1"
                style="position: relative; z-index: 3; top: 7px; left: 80%; cursor: pointer;"
                aria-label="edit contact"
                onClick=${() => openEditModal(c.name, c.address)}
              ></i>
              <a
                style="position: relative; z-index: 3; top: 7px; left: 66%; cursor: pointer; color: inherit;"
                class="has-tooltip-arrow has-tooltip-left has-tooltip-fade has-tooltip-primary px-1"
                target="_blank"
                href=${`https://goalseeker.purestake.io/algorand/mainnet/account/${c.address}`}
                data-tooltip="View on GoalSeeker"
                aria-label="view address info on goal seeker"
              >
                <i class="fas fa-external-link-alt px-1"></i>
              </a>
              <${ContactPreview}
                contact="${c}"
                style="cursor: pointer; margin-top: -22px;"
                className="mb-3"
              />`
        )}
      </div>
    </div>
  `;
};

export default ContactList;
