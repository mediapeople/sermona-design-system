import { createRequire } from "node:module";
import path from "node:path";
import { defineConfig } from "vitepress";
import type { UserConfig } from "vitepress";

/**
 * Vite `resolve.alias` entries pointing at a built `@sermona/tokens` dist folder.
 */
export function sermonaTokensAliases(tokensDistDir: string): Record<string, string> {
  const root = path.resolve(tokensDistDir);
  return {
    "@sermona/tokens/css": path.join(root, "sermona.css"),
    "@sermona/tokens/components.css": path.join(root, "sermona.components.css"),
  };
}

function tokenDistFromProjectRoot(projectRoot: string): string {
  const require = createRequire(path.join(path.resolve(projectRoot), "package.json"));
  const entry = require.resolve("@sermona/tokens");
  return path.dirname(entry);
}

function mergeAlias(
  base: Record<string, string>,
  user: UserConfig["vite"] extends { resolve?: { alias?: infer A } } ? A : never,
): Record<string, string> | UserConfig["vite"] {
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
 * @param projectRoot - Directory containing the consuming doc app `package.json` (default: `process.cwd()`).
 */
export function defineSermonaDocsConfig(
  config: UserConfig = {},
  projectRoot: string = process.cwd(),
) {
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
