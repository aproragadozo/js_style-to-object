'use strict';

/**
 * @param {string} sourceString
 *
 * @return {object}
 */
function convertToObject(sourceString) {
  // result object declaration
  const styleSheet = {};

  const processedString = sourceString
    .replace(/\n\s*\n/g, '\n') // Remove completely empty lines
    .replace(/;\s*\n\s*\)/g, ' )') // emicolon-newline-closing paren
    .replace(/\n\s*/g, ' '); // Replace newlines with spaces
  
  // Split into declarations
  const declarations = processedString
    .split(';')
    .filter(decl => decl.trim());
  
  for (const declaration of declarations) {
    const [key, ...valueParts] = declaration.split(':').map(part => part.trim());
    
    if (key) {
      const value = valueParts.join(':').trim().replace(/;+$/, '');
      styleSheet[key] = value;
    }
  }
  return styleSheet;
}

module.exports = convertToObject;
