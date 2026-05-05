import { createRequire } from "node:module";
import path from "node:path";
import { defineConfig } from "vitepress";

/**
 * Vite `resolve.alias` entries pointing at a built `@sermona/tokens` dist folder.
 * @param {string} tokensDistDir
 * @returns {Record<string, string>}
 */
export function sermonaTokensAliases(tokensDistDir) {
  const root = path.resolve(tokensDistDir);
  return {
    "@sermona/tokens/css": path.join(root, "sermona.css"),
    "@sermona/tokens/components.css": path.join(root, "sermona.components.css"),
  };
}

/** @param {string} projectRoot */
function tokenDistFromProjectRoot(projectRoot) {
  const require = createRequire(path.join(path.resolve(projectRoot), "package.json"));
  const entry = require.resolve("@sermona/tokens");
  return path.dirname(entry);
}

/** @param {Record<string, string>} base @param {unknown} user */
function mergeAlias(base, user) {
  if (!user) return base;
  if (Array.isArray(user)) {
    return [...Object.entries(base).map(([find, replacement]) => ({ find, replacement })), ...user];
  }
  return { ...base, ...user };
}

/** @param {*} md */
export function applySermonaMarkdownTableScroll(md) {
  const tableOpen = md.renderer.rules.table_open;
  const tableClose = md.renderer.rules.table_close;
  md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
    const prefix = '<div class="vp-table-scroll">\n';
    return prefix + (tableOpen ? tableOpen(tokens, idx, options, env, self) : "<table>\n");
  };
  md.renderer.rules.table_close = (tokens, idx, options, env, self) => {
    const inner = tableClose ? tableClose(tokens, idx, options, env, self) : "</table>\n";
    return inner + "</div>\n";
  };
}

/**
 * VitePress preset for Sermona doc sites: dark-first chrome aligned with design tokens,
 * plus `resolve.alias` for `@sermona/tokens/*` (use with token imports in `.vitepress/theme/index.ts`).
 * Wraps markdown tables in `.vp-table-scroll` for horizontal scrolling on small screens (theme CSS).
 *
 * @param {import("vitepress").UserConfig} [config]
 * @param {string} [projectRoot] Directory containing the consuming doc app `package.json` (default: `process.cwd()`).
 */
export function defineSermonaDocsConfig(config = {}, projectRoot = process.cwd()) {
  const { appearance, vite: userVite, markdown: userMarkdown, ...rest } = config;
  const tokenDist = tokenDistFromProjectRoot(projectRoot);
  const tokenAliases = sermonaTokensAliases(tokenDist);
  const mergedAlias = mergeAlias(tokenAliases, userVite?.resolve?.alias);

  return defineConfig({
    ...rest,
    appearance: appearance ?? "force-dark",
    markdown: {
      ...userMarkdown,
      config(md) {
        applySermonaMarkdownTableScroll(md);
        userMarkdown?.config?.(md);
      },
    },
    vite: {
      ...userVite,
      resolve: {
        ...userVite?.resolve,
        alias: mergedAlias,
      },
    },
  });
}
