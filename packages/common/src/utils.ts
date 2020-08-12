import { extensionBrowser } from './chrome';

export function isFromExtension(origin) {
    const s = origin.split('://');
    return s[0] === "chrome-extension" && s[1] === extensionBrowser.runtime.id;
}