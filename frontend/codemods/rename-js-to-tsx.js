// npx jscodeshift -t codemods/rename-js-to-tsx.js src/**/*.{js,jsx}

import { mkdirSync, writeFileSync, unlinkSync } from "fs";
import { dirname } from "path";

export default function transformer(fileInfo, api, options) {
  const src = fileInfo.source;
  const hasJSX = /<\/?[A-Z][A-Za-z0-9]*\b/.test(src);
  const ext = hasJSX ? ".tsx" : ".ts";
  const newPath = fileInfo.path.replace(/\.(jsx?)$/, ext);

  if (newPath !== fileInfo.path) {
    mkdirSync(dirname(newPath), { recursive: true });
    writeFileSync(newPath, src);
    unlinkSync(fileInfo.path); // remove old file
  }
  return null; // no AST changes
}
