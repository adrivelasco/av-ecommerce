export function formatPrice(price, n = 2, x = 3, s = ',', c = '.') {
  let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')';
  let num = price.toFixed(Math.max(0, ~~n));
  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
}

export function priceToNumber(price) {
  return Number(price.replace(/[^0-9\.-]+/g, ''));
}