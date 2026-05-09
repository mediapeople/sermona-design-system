---
title: Elevating
description: Maturity ladder for Sermona — from CSS import to npm, Figma parity, automated checks, and product wrappers.
---

# Elevating

Sermona is **strong at the center**: tokens, a large **CSS primitive** layer, and a **handbook** you can ship. “Elevating” means tightening **adoption**, **parity with design tools**, and **safety nets** as teams depend on it.

## Levels (what “good” looks like)

| Stage | You have | Next move |
| --- | --- | --- |
| **1 · Consume** | `@import` tokens + components; pages match the handbook | Pin versions; document **which** primitives your app uses |
| **2 · Publish** | Consumers install from **npm** (not only `file:`) | Follow [RELEASE.md](https://github.com/mediapeople/sermona-design-system/blob/main/RELEASE.md) — semver, tags |
| **3 · Align** | **Figma variables** and hero components map to tokens | Code Connect for high-traffic surfaces (Button, Card, forms) |
| **4 · Guard** | **CI** fails on broken token builds; optional visual or a11y checks | `npm test` in this repo; add your app’s smoke tests |
| **5 · Product** | **Framework components** wrap class contracts (React/Vue) | Thin shims; don’t fork token values in JS |

You do not need every row before shipping product — but **stage 2 + 4** removes most “it worked on my laptop” risk.

## This repo today

- **Automated checks:** `npm test` validates `tokens.json` shape and key lines in generated CSS (see `tests/`).
- **Handbook:** [sermonacss.com](https://sermonacss.com) tracks `main` when Netlify **Git integration** is on.
- **Figma:** [Sermona file](https://www.figma.com/design/IC2hBpxXtkX9Hzb5IMdwmh/Sermona) — foundations and starter components; expand until Dev Mode reads the same names as CSS.

## For teams adopting Sermona

1. **Read** [Using Sermona](/using-sermona) and [Tokens](/tokens).
2. **Import** base then components CSS (order matters — see homepage install copy).
3. **Mirror density** choices (`--dense`, data pairs, tables) from [Cards & swipers](/cards-and-swipers#core-to-card-exemplified) and [Data & tables](/data-and-tables).
4. **Open an issue** in the [GitHub repo](https://github.com/mediapeople/sermona-design-system) for gaps that block your roadmap — elevation works best when it’s **prioritized** against real screens.

## See also

- [Using Sermona](/using-sermona) — meta, sharing URLs, VitePress setup  
- [Components](/components) — class index  
- [RELEASE.md](https://github.com/mediapeople/sermona-design-system/blob/main/RELEASE.md) — npm checklist  
