import { extensionBrowser } from './chrome';

export function isFromExtension(origin: string): boolean {
    const s = origin.split('://');
    return s[0] === "chrome-extension" && s[1] === extensionBrowser.runtime.id;
}

/**
 * removeEmpty gets a dictionary and removes empty values
 * @param obj
 * @returns {*}
 */
export function removeEmptyFields(obj: {[index: string]:any}): object {
    Object.keys(obj).forEach((key: string) => {
        if (obj.hasOwnProperty(key)) {
            if (!obj[key] || obj[key].length === 0) delete obj[key];
        }
    })
    return obj;
}

export function base64ToByteArray(blob: string): Uint8Array {
  return new Uint8Array(
    atob(blob)
      .split('')
      .map((x) => x.charCodeAt(0))
  );
}

export function byteArrayToBase64(array: any): string {
  return btoa(String.fromCharCode.apply(null, array));
}