# Guide

This starter ships with:

- **`@sermona/tokens`** — CSS variables (`sermona.css`) and layout primitives (`sermona.components.css`).
- **`@sermona/vitepress-theme`** — wraps the default VitePress layout in `.sermona-root`, forces dark mode, and maps VitePress theme colors to Sermona tokens.

## Config

Edit `.vitepress/config.ts`: title, `themeConfig.nav`, `themeConfig.sidebar`.

## Theme entry

Keep **token imports first** in `.vitepress/theme/index.ts` so Vite resolves `@sermona/tokens/*` from your app (required for `file:`-linked packages):

```ts
import "@sermona/tokens/css";
import "@sermona/tokens/components.css";
import Theme from "@sermona/vitepress-theme";
export default Theme;
```

`defineSermonaDocsConfig()` already sets Vite aliases to the same files for consistency.

## Fonts

Tokens reference **Scto Grotesk A**. License and host the font in your product, or change `font.family.sans` in `node_modules/@sermona/tokens/dist/tokens.json` and rebuild if you maintain a fork.
