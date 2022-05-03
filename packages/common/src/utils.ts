import { extensionBrowser } from './chrome';
import { getBaseSupportedLedgers } from './types/ledgers';

export function isFromExtension(origin: string): boolean {
  const s = origin.split('://');
  return s[0] === 'chrome-extension' && s[1] === extensionBrowser.runtime.id;
}

/**
 * removeEmpty gets a dictionary and removes empty values
 * @param obj
 * @returns {*}
 */
export function removeEmptyFields(obj: { [index: string]: any }): any {
  Object.keys(obj).forEach((key: string) => {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null || obj[key] === undefined || obj[key].length === 0) delete obj[key];
    }
  });
  return obj;
}

/**
 * Check if a ledger belongs to our base supported ledgers (e.g: links to GoalSeeker)
 * @param ledger 
 * @returns boolean
 */
export function isLedgerBaseSupported(ledger: string): boolean {
  return getBaseSupportedLedgers().map((l) => l.name.toLowerCase()).includes(ledger.toLowerCase());
}

/**
 * Converts full addresses into a shorter format:
 * AAAAAAAAAA.....AAAAAAAAAA
 * @param address 
 * @returns string
 */
export function obsfucateAddress(address: string): string {
  return `${address.slice(0, 10)}.....${address.slice(-10)}`;
}