# Releasing `@sermona/*` packages

This monorepo ships two **publishable** packages:

| Package | Purpose |
| --- | --- |
| `@sermona/tokens` | `tokens.json`, `sermona.css`, `sermona.components.css` |
| `@sermona/vitepress-theme` | VitePress theme + `defineSermonaDocsConfig` |

The **handbook** at [sermonacss.com](https://sermonacss.com) deploys from **Git** (Netlify); npm releases only affect **consumers** installing in their own apps.

## Versioning

- Follow **semver**: breaking token/CSS renames → **major**; new tokens or additive CSS → **minor**; fixes → **patch**.
- Bump **both** `packages/sermona-tokens/package.json` and `packages/sermona-vitepress-theme/package.json` when a change affects their public API or peer range.
- Keep the theme’s **`peerDependencies["@sermona/tokens"]`** aligned with the lowest compatible tokens major you support.

## Pre-publish checklist

1. `npm ci && npm test && npm run build`
2. Scan `CHANGELOG` intent (commit messages or a short `CHANGELOG.md` entry if you maintain one).
3. Confirm **`exports`** and **`files`** in each package include what consumers need (no stray dev files).

## Publish commands (npm trusted publisher / OTP as required)

From the **monorepo root**:

```bash
npm publish -w @sermona/tokens --access public
npm publish -w @sermona/vitepress-theme --access public
```

Tag the repo for traceability, e.g. `tokens-v0.1.1` / `theme-v0.1.1`, or a single `v0.1.1` if you release lockstep.

## After publish

- Bump **local** patch versions on `main` for the next development cycle, or use your preferred **Changesets** / **Beachball** flow if you add one later.
- Update **consumer** docs (e.g. [Elevating](/elevating)) if minimum versions change.
