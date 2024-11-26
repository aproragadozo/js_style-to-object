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
  .split('\n')
  .filter(line => line.trim() && line.trim() !== ';');

  // process lines
  for (const line of lines) {
    const [key, value] = line.split(':').map(part => part.trim());

    if (key && value) {
      const cleanedValue = value.replace(/;+$/, '').trim();
      // add to stylesheet result
      styleSheet[key] = cleanedValue;
    }
  }
  return styleSheet;
}

module.exports = convertToObject;
