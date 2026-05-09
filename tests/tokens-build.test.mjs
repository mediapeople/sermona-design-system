/**
 * Regression checks for @sermona/tokens build output.
 * Run after `npm ci` (workspace prepare builds tokens) or `npm run build:tokens`.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tokensPath = path.join(root, "packages/sermona-tokens/dist/tokens.json");
const sermonaCssPath = path.join(root, "packages/sermona-tokens/dist/sermona.css");
const componentsCssPath = path.join(root, "packages/sermona-tokens/dist/sermona.components.css");

test("tokens.json parses and retains core schema", () => {
  const data = JSON.parse(readFileSync(tokensPath, "utf8"));
  assert.equal(data.meta?.name, "Sermona");
  assert.ok(typeof data.color?.bg?.page === "string");
  assert.ok(typeof data.space?.["4"] === "string");
  assert.ok(typeof data.font?.lineHeight?.body === "number");
});

test("sermona.css emits canonical custom properties", () => {
  const css = readFileSync(sermonaCssPath, "utf8");
  assert.match(css, /--sermona-color-bg-page:\s*#/);
  assert.match(css, /--sermona-color-accent-primary:/);
  assert.match(css, /--sermona-space-4:/);
});

test("sermona.components.css retains critical primitives", () => {
  const css = readFileSync(componentsCssPath, "utf8");
  assert.match(css, /\.sermona-card\s*\{/);
  assert.match(css, /\.sermona-btn\s*\{/);
});
