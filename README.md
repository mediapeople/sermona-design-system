# Sermona design system

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Handbook (deployed):** [sermonacss.com](https://sermonacss.com) · **Source:** [github.com/mediapeople/sermona-design-system](https://github.com/mediapeople/sermona-design-system) · **Figma:** [Sermona file](https://www.figma.com/design/IC2hBpxXtkX9Hzb5IMdwmh/Sermona)

If the hosted site is unavailable, clone this repo and run **`npm install`** and **`npm run dev`** to read the handbook locally.

Design tokens and CSS primitives derived from Figma. This repo is the **source of truth for tokens** and a **documentation stack** (VitePress + Sermona theme) you can clone or scaffold from.

## Quick start

```bash
git clone https://github.com/mediapeople/sermona-design-system.git
cd sermona-design-system
npm install
npm run dev              # handbook → http://127.0.0.1:5173/
```

Requires **Node 20+** (see `engines` in root `package.json`). To ship static HTML: `npm run build` → output in `docs/.vitepress/dist/`.

## Packages

| Package | Role |
| --- | --- |
| `@sermona/tokens` | `tokens.json`, generated `sermona.css` + `sermona.components.css` |
| `@sermona/vitepress-theme` | Default VitePress theme: Sermona shell, `force-dark`, token-mapped VP variables |
| `create-sermona-docs` | Scaffold CLI — `npm run create-docs -- ../my-site --link .` |

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
cd sermona-design-system
npm install
npm run dev              # VitePress → http://127.0.0.1:5173/
npm test                 # regression checks on generated token CSS
npm run build:tokens     # Regenerate dist/*.css from tokens
npm run build            # tokens + static docs site
```

## Hosting the handbook

The repo includes **`netlify.toml`** (`npm run build`, publish **`docs/.vitepress/dist`**). In Netlify **Environment variables**, set **`VITEPRESS_SITE_URL`** to your live origin (no trailing slash) for Open Graph / canonical URLs.

You can also use **GitHub Pages, Cloudflare Pages, or Vercel**: build **`npm run build`**, output **`docs/.vitepress/dist`**, Node **20+**.

**Publishing packages:** putting `@sermona/tokens` and `@sermona/vitepress-theme` on npm lets consumers use semver instead of pointing at this repo with `file:`. See **[RELEASE.md](RELEASE.md)** and the handbook page **[Elevating](https://sermonacss.com/elevating)** for the maturity ladder and npm checklist.

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

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

