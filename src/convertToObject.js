'use strict';

/**
 * @param {string} sourceString
 *
 * @return {object}
 */
function convertToObject(sourceString) {
  // result object declaration
  const styleSheet = {};

  // split the string into lines
  // filter out empty or whitespace-only lines
  const lines = sourceString
  .replace(/\n\s*\n/g, '\n') // remove empty lines
  .split('\n')
  .filter(line => line.trim() && line.trim() !== ';');

  let currentKey = null;

  // process lines
  for (const line of lines) {
    // check if this is the continuation of a previous line
    if (currentKey && line.trim() && !line.includes(':')) {
      // append to existing values
      styleSheet[currentKey] += ' ' + line.trim();
      continue;
    }
    // resume normal key-value parsing
    const [key, value] = line.split(':').map(part => part.trim());

    if (key && value) {
      const cleanedValue = value.replace(/;+$/, '').trim();
      // store the current key for potential continuation
      currentKey = key;
      
      // add to stylesheet result
      styleSheet[key] = cleanedValue;
    }
  }
  return styleSheet;
}

module.exports = convertToObject;
