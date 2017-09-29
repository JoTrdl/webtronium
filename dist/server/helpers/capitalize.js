'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalize;
/**
 * Capitalize a string, supports hyphen
 * capitalize('hello world') -> 'Hello World'
 * capitalize('hello-world') -> 'Hello-World'
 *
 * Force option:
 * capitalize('aBC') -> 'ABC'
 * capitalize('aBC', true) -> 'Abc'
 *
 * Take care of french rule + accented characters
 * capitalize('écharpe à coup') -> 'Écharpe à Coup'
 *
 * http://stackoverflow.com/questions/17200640/javascript-capitalize-first-letter-of-each-word-in-a-string-only-if-lengh-2
 */
const capitalizeRegExp = /([^a-zA-Z\u00E0-\u00FC])([a-zA-Z\u00E0-\u00FC])(?=[a-zA-Z\u00E0-\u00FC]{2})|^([a-zA-Z\u00E0-\u00FC])/g;

function capitalize(input, force) {
  if (!input) {
    return '';
  }
  const s = force ? input.toLowerCase() : input;
  return s.replace(capitalizeRegExp, (_, g1, g2, g3) => typeof g1 !== 'undefined' ? g1 + g2.toUpperCase() : g3.toUpperCase());
}