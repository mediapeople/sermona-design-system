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

/**
 * VitePress preset for Sermona doc sites: dark-first chrome aligned with design tokens,
 * plus `resolve.alias` for `@sermona/tokens/*` (use with token imports in `.vitepress/theme/index.ts`).
 *
 * @param {import("vitepress").UserConfig} [config]
 * @param {string} [projectRoot] Directory containing the consuming doc app `package.json` (default: `process.cwd()`).
 */
export function defineSermonaDocsConfig(config = {}, projectRoot = process.cwd()) {
  const { appearance, vite: userVite, ...rest } = config;
  const tokenDist = tokenDistFromProjectRoot(projectRoot);
  const tokenAliases = sermonaTokensAliases(tokenDist);
  const mergedAlias = mergeAlias(tokenAliases, userVite?.resolve?.alias);

  return defineConfig({
    ...rest,
    appearance: appearance ?? "force-dark",
    vite: {
      ...userVite,
      resolve: {
        ...userVite?.resolve,
        alias: mergedAlias,
      },
    },
  });
}
