# Contributing to Sermona

Thanks for helping improve the design system. This repo is a small npm **workspace** (tokens package, VitePress theme, scaffold CLI, and the `docs/` handbook).

## Local setup

```bash
git clone https://github.com/mediapeople/sermona-design-system.git
cd sermona-design-system
npm install
npm run dev          # handbook
npm run build        # tokens + static site (sanity check before a PR)
```

Use **Node 20+**.

## Where things live

| Change | Location |
| --- | --- |
| Token values | `packages/sermona-tokens/src/tokens.json` → run `npm run build:tokens` |
| Generated CSS | `packages/sermona-tokens/dist/` (committed so installs work without a build step) |
| Component / pattern CSS | `packages/sermona-tokens` build emits into `dist/sermona.components.css` (see `scripts/build.mjs`) |
| Doc site theme chrome | `packages/sermona-vitepress-theme/` |
| Handbook pages | `docs/*.md`, `docs/.vitepress/config.ts` |
| New consumer doc site template | `packages/create-sermona-docs/template/` |

## Pull requests

1. Keep changes scoped to one concern (tokens vs docs vs theme) when possible.
2. Run **`npm run build`** and fix any failures before opening the PR.
3. Describe **what** changed and **why** (screenshots for visual doc changes help).
4. If you change token names or CSS class contracts, note **migrations** in the PR body so consumers can follow along.

## Issues

Use [GitHub issues](https://github.com/mediapeople/sermona-design-system/issues) for bugs, gaps in the handbook, or small improvements. For security-sensitive reports, see [SECURITY.md](SECURITY.md).
