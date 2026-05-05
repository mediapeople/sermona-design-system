# Sermona design system

Design tokens and CSS primitives derived from [Sermona (Figma)](https://www.figma.com/design/IC2hBpxXtkX9Hzb5IMdwmh/Sermona). This repo is both the **source of truth for tokens** and a **default “doc creator” stack** for new documentation sites (VitePress + Sermona theme).

## Packages

| Package | Role |
| --- | --- |
| `@sermona/tokens` | `tokens.json`, generated `sermona.css` + `sermona.components.css` |
| `@sermona/vitepress-theme` | Default VitePress theme: Sermona shell, `force-dark`, token-mapped VP variables |
| `create-sermona-docs` | Private scaffold CLI — run `node ./packages/create-sermona-docs/bin.mjs` |

## Monorepo layout

- `packages/sermona-tokens` — canonical tokens + build script
- `packages/sermona-vitepress-theme` — theme + `defineSermonaDocsConfig` / `sermonaTokensAliases`
- `packages/create-sermona-docs` — scaffold CLI + `template/`
- `docs` — this design system’s own VitePress site (uses the theme package)

## Provenance export

Copy **everything** (except `node_modules` and VitePress caches) to a folder for archival or handoff:

```bash
npm run export:provenance -- /path/to/sermona-export
# Replace existing folder:
npm run export:provenance -- /path/to/sermona-export --force
# Include git history (commit SHA in PROVENANCE.json either way when .git exists):
npm run export:provenance -- /path/to/sermona-export --with-git
```

The export includes `PROVENANCE.json` (timestamp, source path, `git rev-parse` when available, Node version). Reinstall with `npm install` and rebuild with `npm run build` in the copy.

## Commands

```bash
cd /path/to/sermona-design-system
npm install
npm run dev              # VitePress → http://127.0.0.1:5173/
npm run build:tokens     # Regenerate dist/*.css from tokens
npm run build            # tokens + static docs site
```

## Publish the repo and the handbook

1. **Create an empty Git repository** on GitHub (or GitLab, etc.) — do not add a README or license there if you already have them locally; you want a clean push.
2. **From this folder:**

   ```bash
   git init
   git add -A
   git commit -m "Initial commit: Sermona design system"
   git branch -M main
   git remote add origin https://github.com/YOUR_USER/sermona-design-system.git
   git push -u origin main
   ```

3. **Host the static docs** so “hand this link to a developer” works:
   - **Netlify:** connect the repo; use the included **`netlify.toml`** (`npm run build`, publish `docs/.vitepress/dist`). In **Site settings → Environment variables**, set **`VITEPRESS_SITE_URL`** to your live site URL (no trailing slash) for correct sharing/meta tags.
   - **GitHub Pages, Cloudflare Pages, Vercel:** same idea — build command **`npm run build`**, output directory **`docs/.vitepress/dist`**, Node **20**.
4. **npm (optional):** publishing **`@sermona/tokens`** and **`@sermona/vitepress-theme`** lets consumers depend on versions instead of `file:`. Until then, `file:` / `npm link` from this repo is fine.

## Bootstrap a new doc site

From the monorepo root, scaffold a sibling folder with **file-linked** local packages:

```bash
node ./packages/create-sermona-docs/bin.mjs ../my-product-docs --link .
cd ../my-product-docs
npm install
npm run dev
```

Use `--link` pointing at **this** `sermona-design-system` directory so `package.json` gets `file:` dependencies for `@sermona/tokens` and `@sermona/vitepress-theme`. After you publish those packages to npm, you can omit `--link` and rely on version ranges instead.

The starter’s `.vitepress/config.ts` uses `defineSermonaDocsConfig()` (dark-by-default) and wires Vite aliases for `@sermona/tokens/*`. **Import the token CSS first** in `.vitepress/theme/index.ts` (the template already does) so file-linked installs resolve correctly.

## “Standard doc creator” defaults

- **Theme**: import `@sermona/vitepress-theme` in `.vitepress/theme/index.ts`. It wraps the stock VitePress layout in `.sermona-root` and maps `--vp-*` variables to Sermona tokens.
- **Config**: import `defineSermonaDocsConfig` from `@sermona/vitepress-theme/config` so new sites get `appearance: 'force-dark'` unless overridden.
- **Patterns**: use HTML + classes from `sermona.components.css` inside Markdown for cards, quotes, icon tiles, service grids (see this repo’s `docs/` pages).

## Consuming only tokens in another repo

```json
"dependencies": {
  "@sermona/tokens": "file:../sermona-design-system/packages/sermona-tokens"
}
```

```css
@import "@sermona/tokens/css";
@import "@sermona/tokens/components.css";
```

Host **Scto Grotesk A** under your font license; tokens reference it by name with system fallbacks.
