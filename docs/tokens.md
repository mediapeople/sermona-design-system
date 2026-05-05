# Tokens

Values are generated into `dist/sermona.css` from `src/tokens.json`.

## Color

| Token | Sample | Variable |
| --- | --- | --- |
| Page | Dark canvas | `--sermona-color-bg-page` |
| Elevated | Cards / slides | `--sermona-color-bg-elevated` |
| Accent | Links & quotes | `--sermona-color-accent-primary` |
| Muted text | Secondary paragraphs, excerpts | `--sermona-color-text-muted` |
| Subtle text | Meta lines, hints, table data | `--sermona-color-text-subtle` |

## Typography (families)

Sermona separates **UI / body**, **display**, and **mono** so you can swap faces without touching component CSS.

| Variable | Role |
| --- | --- |
| `--sermona-font-family-body` | Alias of sans; what `.sermona-root` uses for inherited UI text. |
| `--sermona-font-family-sans` | Default UI stack (paragraphs, labels, buttons). |
| `--sermona-font-family-display` | Large display / hero type (`.sermona-display-light`, `.sermona-display-hero`). |
| `--sermona-font-family-mono` | Code, logs, tabular technical strings (e.g. `.sermona-log-list`). |

**Integrate product fonts** (after importing `sermona.css`):

```css
:root {
  --sermona-font-family-sans: "Your UI", system-ui, sans-serif;
  --sermona-font-family-display: "Your Display", var(--sermona-font-family-sans);
  --sermona-font-family-mono: "Your Mono", ui-monospace, monospace;
}
```

Use `@font-face` (or a host such as [Fontsource](https://fontsource.org/)) in the same stylesheet or an earlier import. Optional: set only `--sermona-font-family-sans` and `--sermona-font-family-display` to the same stack if you use a single typeface.

Source of truth: `packages/sermona-tokens/src/tokens.json` → `font.family.*` (regenerated into `dist/sermona.css`).

### Icon fonts (optional)

Variables: `--sermona-icon-font-family`, `--sermona-icon-font-weight`, `--sermona-icon-font-style`, `--sermona-icon-font-variation-settings`. Default `font.family` is `inherit` so glyph icons match surrounding UI until you override.

Utility: **`.sermona-icon--font`** on the same wrapper as **`.sermona-icon`** (hides nested `svg` for progressive enhancement). See [Iconography](/iconography).

## Typography scale (Scto Grotesk A default)

Host the default font files under your product license. Fallbacks are grotesk system fonts.

| Role | CSS variable |
| --- | --- |
| Display (light, 168px) | Use `.sermona-display-light` |
| Hero (bold ~119px) | `.sermona-display-hero` |
| Section H2 (42px) | `.sermona-h2` |
| Block H3 (32px) | `.sermona-h3` |
| Body 16 | `.sermona-body` |
| Meta / caption (13px) | `.sermona-meta`, hints, prose table cells |
| UI meta (14px) | Uppercase kickers, dense UI (e.g. `.sermona-kicker`) |
| Heading stack (line-height) | `.sermona-h2`, `.sermona-h3` → `--sermona-line-height-heading-snug` |

See `tokens.json` for the full scale (`font.size.*`, `font.lineHeight.*`).

## Space & radii

Spacing scale mirrors Figma padding: `space-7` (62px card inset), `space-9` (84px page gutter). Radius `sm` = 4px.
