import { IValidation } from './interfaces';

type T = string | number;
function diff(a: Array<T>, b: Array<T>): Array<T> {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    if (b.indexOf(a[i]) === -1) {
      result.push(a[i]);
    }
  }
  return result;
}

export class Validation implements IValidation {
  requiredArgs(required: Array<string>, input: Array<string>): boolean {
    const d = diff(required, input);
    if (d.length > 0) return false;
    return true;
  }
}
