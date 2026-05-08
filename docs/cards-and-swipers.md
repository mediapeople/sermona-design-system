---
title: Cards & horizontal swipers
description: Editorial cards, high-density and variable-data examples, grids, interactive surfaces, and scroll-snap horizontal decks — when to use a grid vs a swiper and how to keep them accessible.
---

# Cards & horizontal swipers

**Cards** bundle one idea: a title, proof, and optional action. **Swipers** (horizontal snap rows) are for **peer content** where each slide is **whole** — issues, episodes, comparable tiers — not for stacking unrelated widgets.

## Base card (`.sermona-card`)

Default: elevated surface, hairline border, **card shadow**, generous padding.

| Modifier | Use |
| --- | --- |
| **`.sermona-card--flat`** | Quiet cards on already-elevated bands; removes shadow. |
| **`.sermona-card--dense`** | Tighter padding in dense dashboards or nested layouts. |
| **`.sermona-card--stack`** | Flex column + gap; pair with **`.sermona-card__footer`** and `margin-top: auto` on the footer for **pinned footers** (e.g. CTA at bottom). |
| **`.sermona-card--interactive`** | Hover lift + border brightening; use on **`<a>`** for whole-card links — add **`focus-visible`** outline (included for `a.sermona-card`). |

## Core to card (exemplified)

A **card** is one **subject** with a scannable spine: **label → value**, then proof or action. Editorial cards breathe; **dashboard / ops** cards tighten **padding** (**`--dense`**), often drop shadow (**`--flat`**) when they sit on an already-elevated band, and lean on **caption/meta** plus **tabular numerals** for **variable data** (amounts, IDs, dates). Prefer **`.sermona-data-pair`** stacks or [key–value panels](/data-and-tables) over long paragraphs; use **em dash** or muted copy for missing fields so length doesn’t jump.

**Accommodations at a glance**

| Need | Lever |
| --- | --- |
| Tighter vertical rhythm | **`--dense`**, smaller gaps on inner stacks (`gap: var(--sermona-space-2)`) |
| Wall of metrics on a band | **`--flat`** to avoid shadow noise |
| Label / value scan | **`.sermona-data-pair`**, **`.sermona-meta`** kicker, **`font-variant-numeric`** on values (pairs / `.sermona-kv`) |
| Optional / empty fields | Muted **—** or **“Not set”**, same line height as filled rows |
| Whole-card drill-down | **`--interactive`**; don’t bury competing links inside |

### Editorial vs dense variable data (live)

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0; padding: var(--sermona-space-5); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<p class="sermona-meta" style="margin: 0 0 var(--sermona-space-4);">Same chrome, different density — default padding and story-led copy vs <code>--dense</code> <code>--flat</code> and data pairs.</p>

<div class="sermona-card-grid">
<article class="sermona-card sermona-card--stack" aria-label="Editorial card example">
<p class="sermona-kicker" style="margin:0;">Field notes</p>
<p class="sermona-h3" style="margin:0;">When the card is the story</p>
<p class="sermona-body" style="margin:0;">One idea, a short proof, and a single next step. Default padding and shadow separate this block from the page.</p>
<footer class="sermona-card__footer"><a class="sermona-link" href="/voice-and-copy">Voice & copy</a></footer>
</article>

<article class="sermona-card sermona-card--dense sermona-card--flat sermona-card--stack" aria-label="Dense variable data card example">
<div style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: var(--sermona-space-3);">
<div>
<p class="sermona-meta" style="margin:0;">Shipment · SYD→MEL</p>
<p class="sermona-h3" style="margin: var(--sermona-space-1) 0 0; font-size: var(--sermona-font-size-h4);">Batch 2026-05-08441</p>
</div>
<span class="sermona-status-badge sermona-status-badge--warn"><span class="sermona-status-badge__dot" aria-hidden="true"></span>Delayed</span>
</div>

<div class="sermona-stack" style="margin-top: var(--sermona-space-3); gap: var(--sermona-space-2);">
<div class="sermona-data-pair">
<p class="sermona-data-pair__label">SKU</p>
<p class="sermona-data-pair__value" style="font-family: var(--sermona-font-family-mono); font-size: var(--sermona-font-size-caption); font-weight: 500;">SER-MTL-GLD-009</p>
</div>
<div class="sermona-data-pair">
<p class="sermona-data-pair__label">Units</p>
<p class="sermona-data-pair__value">1,024</p>
</div>
<div class="sermona-data-pair">
<p class="sermona-data-pair__label">ET warehouse</p>
<p class="sermona-data-pair__value">May 09 · 06:40</p>
</div>
<div class="sermona-data-pair">
<p class="sermona-data-pair__label">PO number</p>
<p class="sermona-data-pair__value" style="font-weight: 400; color: var(--sermona-color-text-muted);">—</p>
</div>
</div>

<p class="sermona-meta" style="margin: var(--sermona-space-3) 0 0;">Last event · Customs hold · 2h ago · Operator N.D.</p>
</article>
</div>

</div>

Overflowing or comparing many rows of variable data belongs in a [table](/data-and-tables) or dedicated admin pattern — keep the **card** as the summary surface.

## Grid vs swiper

| Pattern | When |
| --- | --- |
| **`.sermona-card-grid`** | Two or more cards that **can wrap**; same hierarchy; no strong “peek” of the next item. |
| **`.sermona-swiper`** | **Ordered deck** (carousel of equals), **mobile-first** exploration, or **full-bleed** editorial rails where the next card should peek. |
| **`.sermona-service-grid`** | Pricing / tier columns (already paired with **`.sermona-service-card`**). |

Avoid swipers for **tabular** or **long-form** content — use [Data & tables](/data-and-tables) or prose.

## Card grid (demo)

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0; padding: var(--sermona-space-5); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<div class="sermona-card-grid">
<article class="sermona-card sermona-card--dense sermona-card--stack">
<p class="sermona-kicker" style="margin:0;">Issue 04</p>
<p class="sermona-h3" style="margin:0;">Systems in the wild</p>
<p class="sermona-body" style="margin:0;">How tokens stay honest when the product ships every week.</p>
<footer class="sermona-card__footer"><a class="sermona-link" href="/good-digital-design">Read essay</a></footer>
</article>
<article class="sermona-card sermona-card--dense sermona-card--flat sermona-card--stack">
<p class="sermona-meta" style="margin:0;">Workshop</p>
<p class="sermona-h3" style="margin:0;">Audit to library</p>
<p class="sermona-body" style="margin:0;">A repeatable pass from Figma audit to published CSS.</p>
<footer class="sermona-card__footer"><span class="sermona-meta" style="margin:0;">Sold out · Next quarter</span></footer>
</article>
<article class="sermona-card sermona-card--dense sermona-card--interactive">
<p class="sermona-h3" style="margin:0 0 var(--sermona-space-2);">Interactive</p>
<p class="sermona-body" style="margin:0;">Whole-card affordance for drill-down (not nested links — one destination).</p>
</article>
</div>

</div>

## Horizontal swiper

Structure:

1. **`.sermona-swiper`** — optional **`.sermona-swiper--bleed`** (full viewport width inside a centered layout), **`.sermona-swiper--fade`** (right-edge gradient hint), **`.sermona-swiper--peek`** (narrower slides so the next card shows), **`.sermona-swiper--wide`** (wider default slide width).
2. Optional **`.sermona-swiper__label`** — kicker-style row title.
3. **`.sermona-swiper__track`** — **`tabindex="0"`** when it should be keyboard-scrollable; label with **`aria-label`** or **`aria-labelledby`**.
4. **`.sermona-swiper__slide`** — one logical unit per slide (card, tile, or quote block).

On **non–page backgrounds**, set the fade to match the band, e.g. `style="--sermona-swiper-fade-bg: var(--sermona-color-bg-elevated)"` on **`.sermona-swiper`**.

<div class="sermona-root sermona-layout sermona-layout--wide" style="margin: 1.5rem 0;">

<p class="sermona-meta" style="margin-bottom: var(--sermona-space-3);">Contained track (no bleed): three service-style slides with snap.</p>

<div class="sermona-swiper sermona-swiper--peek sermona-swiper--fade" style="padding: var(--sermona-space-4); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md); --sermona-swiper-fade-bg: var(--sermona-color-bg-page);">
<p class="sermona-swiper__label" id="swiper-engagements">Engagements · swipe</p>
<div class="sermona-swiper__track" tabindex="0" role="region" aria-labelledby="swiper-engagements">
<div class="sermona-swiper__slide">
<article class="sermona-service-card" style="height: 100%;">
<p class="sermona-service-card__label">Sprint</p>
<h3 class="sermona-service-card__title" style="font-size: var(--sermona-font-size-h4);">Fast audit</h3>
<p class="sermona-meta" style="margin:0;">Tokens + one composed surface.</p>
<div class="sermona-service-card__cta"><a class="sermona-btn sermona-btn--ghost" href="/services">Details</a></div>
</article>
</div>
<div class="sermona-swiper__slide">
<article class="sermona-service-card sermona-service-card--interactive" style="height: 100%;">
<p class="sermona-service-card__label">Program</p>
<h3 class="sermona-service-card__title" style="font-size: var(--sermona-font-size-h4);">Library pass</h3>
<p class="sermona-meta" style="margin:0;">Components + iconography spec.</p>
<div class="sermona-service-card__cta"><span class="sermona-meta" style="margin:0;">Most common</span></div>
</article>
</div>
<div class="sermona-swiper__slide">
<article class="sermona-service-card" style="height: 100%;">
<p class="sermona-service-card__label">Residency</p>
<h3 class="sermona-service-card__title" style="font-size: var(--sermona-font-size-h4);">Embedded</h3>
<p class="sermona-meta" style="margin:0;">Design + front-end pair weekly.</p>
<div class="sermona-service-card__cta"><a class="sermona-btn sermona-btn--ghost" href="/services">Ask</a></div>
</article>
</div>
</div>
</div>

</div>

### Full-bleed rail

Use **`.sermona-swiper--bleed`** when the section lives inside **`.sermona-layout`** (or any centered measure) but the **scroll rail** should run **edge to edge**. Keep **`tabindex` + `role="region"`** + visible or screen-reader title.

## Service cards as links

**`<a class="sermona-service-card">`** is supported: no underline, **`focus-visible`** ring, inherited text color. Don’t nest interactive elements that steal the same gesture (no button inside a card-link without `tabindex="-1"` / careful a11y).

## Motion & accessibility

- **Scroll snap** is not disabled under **`prefers-reduced-motion`**; only **smooth** scrolling is limited to users who allow motion.  
- Prefer **visible focus** on the track when it’s focusable.  
- Don’t rely on the **fade** alone to imply “more” — peeks and partial slides do most of the work; fade is cosmetic.  
- For **carousels** that **auto-advance**, provide pause and respect **reduced motion** (out of scope for this CSS-only primitive — use JS deliberately).

## See also

- [Components](/components) — class index  
- [Sections](/sections) — bands and editorial rhythm  
- [Services & pricing](/services) — static service grids and CTAs  
- [Good digital design](/good-digital-design) — density and clarity  
