/**
 * Codemod: rename .js/.jsx files to .ts/.tsx
 * If the file contains JSX (heuristic), output .tsx; else .ts.
 *
 * Run with:
 *   npx jscodeshift -t codemods/rename-js-to-tsx.js "src/**/*.{js,jsx}"
 */
const fs = require('fs');
const path = require('path');

module.exports = function transformer(fileInfo, api, options) {
  const src = fileInfo.source;
  const hasJSX = /<\/?[A-Z][A-Za-z0-9]*\b/.test(src);
  const ext = hasJSX ? '.tsx' : '.ts';
  const newPath = fileInfo.path.replace(/\.(jsx?)$/, ext);

  if (newPath !== fileInfo.path) {
    fs.mkdirSync(path.dirname(newPath), { recursive: true });
    fs.writeFileSync(newPath, src);
    fs.unlinkSync(fileInfo.path);               // remove old file
  }
  return null;                                  // no AST changes
};
