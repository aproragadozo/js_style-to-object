'use strict';

/**
 * @param {string} sourceString
 *
 * @return {object}
 */
function convertToObject(sourceString) {
  // result object declaration
  const styleSheet = {};

  const cleanedString = sourceString
    .replace(/\s*\n\s*/g, ' ') // Replace line breaks with spaces
    .replace(/\s*;\s*/g, ';') // Normalize semicolons
    .trim();
  
  // Split declarations, handling multiple declarations in one line
  const declarations = cleanedString
    .split(';')
    .filter(decl => decl.trim());
  
  for (const declaration of declarations) {
    // Split each declaration into key and value
    const [key, ...valueParts] = declaration.split(':').map(part => part.trim());
    
    if (key) {
      // Join value parts in case of multiple colons, trim
      const value = valueParts.join(':').trim().replace(/;+$/, '');
      
      // Add to styleSheet
      styleSheet[key] = value;
    }
  }
  return styleSheet;
}

module.exports = convertToObject;
