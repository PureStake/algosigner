import { Namespace } from '@algosigner/common/types';
import algosigner from 'assets/logo.svg';
import algosignerInverted from 'assets/logo-inverted.svg';
import contacts from 'assets/contacts.svg';
import contactsInverted from 'assets/contacts-inverted.svg';

/**
 * Format a given number to US local, with needed fraction digits
 *
 * @param {int} val  Number to format
 * @param {int} decimals  Max decimals to show
 *
 * @return {string|null} Formated number or null if invalid.
 */
export function numFormat(val: number, dec: number) {
  if (!isNaN(val)) {
    return val.toLocaleString('en-US', { maximumFractionDigits: dec });
  } else {
    return null;
  }
}

/**
 * Apply format to an asset amount with its decimals.
 *
 * @param {int} val  Number to format
 * @param {int} decimals  Assets max decimals
 *
 * @return {string|null} Formated number or null if invalid.
 */
export function assetFormat(val: number, dec: number) {
  const decimals = dec || 0;
  const amount = val / Math.pow(10, decimals);
  return numFormat(amount, decimals);
}

export function getNamespaceIcon(namespace: Namespace, active: boolean) {
  const icons = {
    [Namespace.AlgoSigner_Contacts]: [contacts, contactsInverted],
    [Namespace.AlgoSigner_Accounts]: [algosigner, algosignerInverted],
  };
  return icons[namespace][active ? 1 : 0];
}
