const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const vm = require("node:vm");

function loadPage(href, storage) {
  const location = new URL(href);
  const toggle = {
    dataset: {},
    addEventListener(_, handler) {
      this.click = handler;
    },
  };
  const document = {
    documentElement: {},
    getElementById: () => ({}),
    querySelector: () => null,
    querySelectorAll: (selector) =>
      selector === ".lang-toggle" ? [toggle] : [],
  };
  vm.runInNewContext(
    readFileSync(new URL("../main.js", `file://${__filename}`), "utf8"),
    {
      URL,
      URLSearchParams,
      location,
      document,
      TRANSLATIONS: { en: {}, es: {} },
      window: { matchMedia: () => ({ matches: true }) },
      localStorage: {
        getItem: (key) => storage[key],
        setItem: (key, value) => {
          storage[key] = value;
        },
      },
      history: {
        replaceState: (_, __, url) => {
          location.href = url.href;
        },
      },
    },
  );
  return { location, document, toggle };
}

test("language toggle persists on reload and preserves other URL parameters and hash", () => {
  const storage = { lang: "en" };
  let page = loadPage("https://example.test/?lang=es&ref=cv#systems", storage);
  assert.equal(page.document.documentElement.lang, "es");
  page.toggle.click();
  assert.equal(page.location.searchParams.get("lang"), "en");
  assert.equal(page.location.searchParams.get("ref"), "cv");
  assert.equal(page.location.hash, "#systems");
  assert.equal(storage.lang, "en");
  page = loadPage(page.location.href, storage);
  assert.equal(page.document.documentElement.lang, "en");
  page.toggle.click();
  page = loadPage(page.location.href, storage);
  assert.equal(page.document.documentElement.lang, "es");
});

test("a URL without a language inherits the saved preference", () => {
  const page = loadPage("https://example.test/", { lang: "es" });
  assert.equal(page.document.documentElement.lang, "es");
  assert.equal(page.location.searchParams.get("lang"), "es");
});
