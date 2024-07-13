import numeral from 'numeral';

// ----------------------------------------------------------------------

/**
 * Formats a number using numeral.
 * @param {number} number - The number to be formatted
 * @returns {string} - The formatted number
 */
export function fNumber(number) {
  // Formats a number using numeral
  // @see https://numeraljs.com/
  return numeral(number).format();
}

export function fCurrency(number) {
  const format = number ? numeral(number).format('$0,0.00') : '';

  return result(format, '.00');
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
