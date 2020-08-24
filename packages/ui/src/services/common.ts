/**
 * Format a given number to US local, with needed fraction digits
 *
 * @param {int} val  Number to format
 * @param {int} decimals  Max decimals to show
 *
 * @return {string|null} Formated number or null if invalid.
 */
export function numFormat(val: number, dec: number) {
  if (!isNaN(val))
    return val.toLocaleString('en-US', {maximumFractionDigits: dec});
  else
    return null
}

