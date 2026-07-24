// Node 22+ ships an experimental global `localStorage`. Without a backing
// file it exists but its methods throw ("localStorage.getItem is not a
// function"), which breaks any code (ours or a dependency's) that does
// `typeof localStorage !== "undefined"` feature detection during SSR.
// This removes the broken global so that check correctly falls through to
// `undefined` on the server, same as on older Node versions.
try {
  delete globalThis.localStorage;
} catch (_e) {
  // ignore
}
Object.defineProperty(globalThis, "localStorage", {
  value: undefined,
  writable: true,
  configurable: true,
});
