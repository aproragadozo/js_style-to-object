'use strict';

/**
 * @param {string} sourceString
 *
 * @return {object}
 */
function convertToObject(sourceString) {
  // result object declaration
  const styleSheet = {};

  // Normalize the string, but preserve line breaks
  const processedString = sourceString
    .replace(/\n\s*\n/g, '\n') // Remove completely empty lines
    .split('\n')
    .filter(line => line.trim() && line.trim() !== ';');
  
  let currentKey = null;
  let currentValue = [];

  for (const line of processedString) {
    // Check if this line is a new declaration
    if (line.includes(':')) {
      // If we had a previous declaration, save it
      if (currentKey) {
        styleSheet[currentKey] = currentValue
        .join('\n')
        .trim()
        .replace(/;+$/, '')
        .trim();

        currentValue = [];
      }

      // Start a new declaration
      const [key, ...valueParts] = line.split(':').map(part => part.trim());
      currentKey = key;
      currentValue.push(valueParts.join(':').trim());
    } else if (currentKey) {
      // This is a continuation of the previous value
      currentValue.push(line.trim());
    }
  }

  // Save the last declaration
  if (currentKey) {
    styleSheet[currentKey] = currentValue
    join('\n')
    .trim()
    .replace(/;+$/, '')
    .trim();
  }
  return styleSheet;
}

module.exports = convertToObject;
