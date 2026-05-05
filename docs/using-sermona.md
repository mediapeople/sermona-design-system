---
title: Using Sermona
description: How teams adopt, describe, and ship with the Sermona design system — roles, vocabulary, paths, and quality bar in one place.
---

# Using Sermona

Sermona is a **dark-first editorial system**: **Figma** is the visual source of truth; **tokens** and **CSS primitives** let any surface (docs, marketing, product) stay on-brand without reinventing layout, type, or color logic.

This page is the **handbook** — who touches what, how to talk about the system, and the shortest paths from **first import** to **production-quality** UI.

## Who uses what

| Role | Start here | Then |
| --- | --- | --- |
| **Design** | [Figma — Sermona file](https://www.figma.com/design/IC2hBpxXtkX9Hzb5IMdwmh/Sermona) | Publish or sync components; annotate specs with token names from [Tokens](/tokens). |
| **Engineering** | [Tokens](/tokens) → [Components](/components) | Import CSS; compose **patterns** from HTML classes; wire behavior (forms, modals) in your framework. |
| **Product / PM** | [Good digital design](/good-digital-design) | Use shared vocabulary below; scope features against **patterns** instead of one-off layouts. |
| **Content** | [Voice & copy](/voice-and-copy) | Pair labels with [Iconography](/iconography); follow error and CTA guidance. |

## Vocabulary (say this consistently)

Use the same words in **Slack, tickets, and reviews** so the system stays legible across disciplines.

| Term | Meaning |
| --- | --- |
| **Sermona** | The design system name (product + docs + Figma family). |
| **Tokens** | Named design decisions (`--sermona-*` CSS variables); not “variables” alone if you mean the full set. |
| **Primitives** | Editorial typography, cards, rules, quotes — in `sermona.components.css`. |
| **Patterns** | Composed blocks: sections, forms, tables, ecommerce, modals — copy from the **Patterns** pages. |
| **Accent / gold** | **`--sermona-color-accent-primary`** — for **focus**, **links**, **primary fills**, and **meaningful** emphasis — never wallpaper. |
| **On-accent** | **`--sermona-color-accent-on-accent`** — **text on solid gold**; required for contrast (avoid light text on yellow fills). |

**Elevator pitch (30 seconds):**  
*Sermona is our editorial design language in Figma, shipped as CSS tokens and pattern classes so docs and product feel like one studio — dark canvas, gold for action and focus, confident type.*

## Adoption paths

Pick a depth; each step ends in something shippable.

### In about 30 minutes
1. Skim [Foundations](/foundations) (color + type roles).  
2. Open [Components](/components) and copy one **HTML demo** into your environment.  
3. Confirm **two imports**: `sermona.css` + `sermona.components.css` (see home page on `/`).

### In a half day
1. Map your screen to a **pattern** ([Sections](/sections), [Forms & CTAs](/forms-buttons-cta), [Complex forms](/complex-forms), [Ecommerce](/ecommerce-patterns) as needed).  
2. Replace hard-coded hex with **tokens** where you touch color, space, or type.  
3. Run a **contrast pass**: primary buttons and hero actions use **on-accent** text on gold; links are not the only clue for errors ([Voice & copy](/voice-and-copy)).

### In a week
1. Align **Figma** library and **Code** on the same token names.  
2. Document **team-specific** deviations in your repo (not in the core token file) — e.g. app-only breakpoints.  
3. Add **accessibility** checks: focus order, labels, `aria-*` on modals, steppers, and summaries ([Modals & lightbox](/modals-and-lightbox), [Complex forms](/complex-forms)).

## How to communicate about change

**Do**
- Anchor requests in **outcomes** (“Users can complete checkout on mobile”) and cite **patterns** (“Use `.sermona-form-summary` + field links”).  
- Reference **token** or **class** names in tickets so design and eng share one ID.  
- When proposing **new** UI, ask: *Does a pattern exist? If not, can we extend a primitive before inventing a new shape?*

**Don’t**
- Treat gold as a **default text** color — it’s for **interactive** and **emphasis** moments.  
- Ship **light text on gold fills** — use **on-accent** ([Foundations](/foundations)).  
- Split **copy** and **structure** in handoffs — headings, meta, and CTAs should match [Voice & copy](/voice-and-copy) before visual polish.

## Quality bar (short checklist)

Before you merge or ship:

- **Contrast** — Body text on background meets intent; **gold fills** use **on-accent** type.  
- **Focus** — Keyboard users see **visible focus** (accent outline on primitives and themed controls).  
- **Touch** — Primary actions respect ~**44px** minimum height where Sermona buttons apply.  
- **Motion** — Respect **reduced motion** for scroll/smooth behaviors where documented.  
- **Meaning** — Errors and empty states say **what happened** and **what to do next**.

## Where everything lives

| Surface | URL / path |
| --- | --- |
| This documentation | You are here — **Patterns** in nav = composed UI recipes. |
| Figma | [Sermona file](https://www.figma.com/design/IC2hBpxXtkX9Hzb5IMdwmh/Sermona) |
| Token package | `@sermona/tokens` — `css` + `components.css` (+ `export:provenance` at monorepo root for snapshots). |

## Navigation (handbook wayfinding)

- **Breadcrumbs** appear above the main article on doc pages: they follow the same hierarchy as the **left sidebar** (section group → page).
- **Top nav** highlights **Patterns** when you are on any pattern page (not only when a flyout child is an exact route match).
- **On this page** (right rail on wide viewports) lists **h2–h3** headings so readers can jump within a long doc.
- **Previous / Next** at the bottom follow the **flattened sidebar order** (Introduction → Systems → Patterns → Content). To tune labels per page, use **`docFooterText`** on a sidebar item. To point somewhere other than the default neighbor, set frontmatter:
  - `prev: "Custom label"` / `next: "Custom label"` (label only, link stays sidebar order)
  - or `prev: { text: "…", link: "/path" }` / `next: { text: "…", link: "/path" }` for a custom target.
- Set `prev: false` or `next: false` on a page to hide that control.

## Meta and sharing

For **Open Graph**, **Twitter / X cards**, **canonical URLs**, and a small **WebSite** JSON-LD block on the home page, the docs build expects a deployed origin:

- Set **`VITEPRESS_SITE_URL`** to the public origin with **no trailing slash** (example: `https://design.example.com`) when running `vitepress build` (e.g. in CI or Netlify env vars). If it is unset, sharing tags still emit **titles and descriptions**, but **`og:url`**, **`link[rel=canonical]`**, and absolute **`og:image`** / **`twitter:image`** URLs are omitted—set the env var for production previews in Slack, iMessage, and search.

Optional **frontmatter** overrides:

| Field | Purpose |
| --- | --- |
| `ogTitle` | Open Graph / Twitter title (defaults to page title) |
| `ogDescription` | OG/Twitter description (defaults to page `description`) |
| `image` or `ogImage` | Social image path from site root (e.g. `/og.png`). Defaults to **`/favicon.svg`**; for best results in link previews, add a **1200×630** (or similar) raster under `docs/public/` and point pages at it. |

The **404** page gets **`noindex`** so stray errors are less likely to rank.

## Accessibility

What readers get on this site:

- **Skip link** — first focusable control jumps to **`#VPContent`** (label: **“Skip to main content”** in theme config).
- **Landmarks** — VitePress supplies **`header` / `nav`**; the marketing home page wraps content in **`main`** with **`aria-labelledby`** on major sections; breadcrumbs use **`nav`** + ordered list + **`aria-current="page"`**.
- **External links** — Markdown pages can show the **external-link icon** when `themeConfig.externalLinkIcon` is on; targets that open a new tab should use **`rel="noopener noreferrer"`** and a clear name (optionally **`.sermona-sr-only`** suffix like “opens in new tab”).
- **Focus** — Sermona components use **`:focus-visible`** rings or rings via **border/box-shadow** on form controls; plain **`.vp-doc`** links get a **gold outline** so keyboard paths stay visible. Hero **`pre`** snippets that scroll horizontally are **`role="region"`** with **`aria-labelledby`** and **`tabindex="0"`** so they can receive focus.
- **Motion** — Swiper patterns gate slide animation on **`prefers-reduced-motion`** in `sermona.components.css`; modal/lightbox docs call for **focus management**, **Escape**, and **scroll lock** in real implementations.
- **Contrast** — **On-accent** text on gold fills and token roles are documented in [Foundations](/foundations) and [Using Sermona](/using-sermona) (quality bar).

## See also

- [Good digital design](/good-digital-design) — principles in prose  
- [Voice & copy](/voice-and-copy) — tone, labels, errors  
- [Components](/components) — full CSS index  
- [Tokens](/tokens) — variable reference  
