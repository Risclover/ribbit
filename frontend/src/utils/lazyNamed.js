import { lazy } from "react";

export function lazyNamed(factory, exportName) {
  return lazy(() => factory().then((m) => ({ default: m[exportName] })));
}
