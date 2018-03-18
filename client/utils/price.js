/**
 * @name formatPrice
 * @description Format a number to a price string
 * @param {number}  price - Price to format
 * @param {number} n - Length of decimal
 * @param {number} x - Length of whole part
 * @param {string}   s - Sections delimiter
 * @param {string}   c - Decimal delimiter
 *
 * @return {string} Formatted price
 */
export function formatPrice(price, n = 2, x = 3, s = ',', c = '.') {
  let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')';
  let num = price.toFixed(Math.max(0, ~~n));
  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
}

/**
 * @name priceToNumber
 * @description Parse a price to number
 * @param  {string} price - Price string to parse
 *
 * @return {number} Price parsed to number
 */
export function priceToNumber(price) {
  return Number(price.replace(/[^0-9\.-]+/g, ''));
}
