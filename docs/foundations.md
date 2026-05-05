---
title: Foundations
description: Color, type, space, and motion — how Sermona hangs together before you reach for components.
---

# Foundations

Sermona is a **dark-first editorial** surface: charcoal canvas, white primary type, **gold** for emphasis and interactive affordances. Everything else supports readability and rhythm.

## Color roles

| Role | Variable | Use |
| --- | --- | --- |
| Canvas | `--sermona-color-bg-page` | Page background |
| Elevated | `--sermona-color-bg-elevated` / `bg-card` | Cards, chrome |
| Primary text | `--sermona-color-text-primary` | Body, headings |
| Secondary text | `--sermona-color-text-muted` | Supporting lines, captions |
| Accent | `--sermona-color-accent-primary` | Links, kickers, key quotes, focus |
| Text on gold fills | `--sermona-color-accent-on-accent` | **Required** for type on solid gold (buttons, hero CTAs) — never white on `#ffd600` |
| Borders | `--sermona-color-border-subtle`, `hairline`, `meta` | Separation without noise |

Reserve gold for **meaning** — navigation, links, primary CTAs, and moments you want to remember. If everything is accented, nothing is.

## Typography

The scale is built around **Scto Grotesk A** (license separately). Utilities include:

- **Display** — `.sermona-display-light`, `.sermona-display-hero`; they **clamp** on small screens.
- **Section titles** — `.sermona-h2`, `.sermona-h3`
- **Body** — `.sermona-body`
- **Meta / labels** — `.sermona-meta`, `.sermona-kicker` (uppercase, tracked, gold)

Pair **light + bold** display for contrast, or **one weight** for clarity — avoid three weights in one block without intent.

## Space & layout

Spacing tokens (`--sermona-space-*`) mirror editorial gutters. **Sections** use `.sermona-section` (`--tight`, `--loose`) for vertical rhythm.

- **Content rail** — `.sermona-layout` (measure for long reads)
- **Wide** — `.sermona-layout--wide` for two-column and grids
- **Full** — `.sermona-layout--full` for composed bands

## Motion

Use `--sermona-motion-duration-*` and `--sermona-motion-easing-*`. Prefer **short** transitions on color and border; **emphasis** easing for large controls (e.g. play). Avoid looping motion behind text.

## Icons

Icons are **SVG**, not a font. Sizes and tiles are tokenized. See [Iconography](/iconography) and [Voice & copy](/voice-and-copy).

## Next

- [Using Sermona](/using-sermona) — roles, vocabulary, adoption, quality bar  
- [Tokens](/tokens) — full variable list  
- [Components](/components) — CSS classes  
- [Forms, buttons & CTAs](/forms-buttons-cta) — inputs, actions, CTA bands  
- [Complex forms](/complex-forms) — grouped flows, wizards, repeatable rows  
- [Cards & horizontal swipers](/cards-and-swipers) — grids, interactive cards, swiper rails  
- [Ecommerce patterns](/ecommerce-patterns) — product discovery, cart, checkout chrome  
- [Modals & lightbox](/modals-and-lightbox) — dialogs and enlarged imagery  
- [Data & tables](/data-and-tables) — tabular data and key–value panels  
- [Good digital design](/good-digital-design) — principles in prose  
