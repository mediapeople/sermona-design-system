---
title: Iconography
description: SVG workflow, list patterns, and when to pair icons with labels — IconJar-friendly utilities and demos.
---

# Iconography

Sermona defaults to **inline SVG** icons (IconJar, Figma, etc.). Tokens own **size**, **stroke weight**, **tile size**, **color**, and optional **icon-font** variables so you can stay on SVGs or layer a glyph font with one `:root` override.

## Principles

1. **One stroke family** — Pick ~1.5–2px stroke at 24px frame (align with `--sermona-icon-stroke`) so glyphs feel like one kit.  
2. **currentColor** — Let `stroke="currentColor"` / `fill="currentColor"` inherit from `.sermona-icon` so gold / white / muted swap with one class.  
3. **Metaphor beats novelty** — Use familiar shapes (clock, shield, play) before clever abstractions.  
4. **Label first** — Icons **support** scanning; they rarely replace visible text except universally understood controls (play, close, menu).

## Icon fonts (Material Symbols, Phosphor, etc.)

When you prefer a **hosted icon font**, set the token variables once; components keep the same size utilities.

| Token | Typical use |
| --- | --- |
| `--sermona-icon-font-family` | e.g. `"Material Symbols Outlined"`, `"Phosphor Icons"` |
| `--sermona-icon-font-weight` | Variable-font axis or static weight |
| `--sermona-icon-font-style` | `normal` / `italic` |
| `--sermona-icon-font-variation-settings` | e.g. `FILL 0, wght 400, GRAD 0, opsz 24` (Material Symbols) |

**Markup:** add **`.sermona-icon--font`** next to **`.sermona-icon`**. The utility applies the font metrics, line-height, and **hides a nested `svg`** so you can ship SVG for environments without the font and glyph text or ligatures where the font loads.

```html
<span class="sermona-icon sermona-icon--font" aria-hidden="true">home</span>
<!-- or ligature / codepoint per your font’s docs -->
```

Default in tokens is **`font.family: inherit`** — icons match the UI face until you override. Pair with `@font-face` or your provider’s stylesheet. **[Tokens](/tokens)** lists the same variables for fonts and mono stacks.

**When to skip icons:** Dense legal copy, noisy dashboards where icons compete with charts, or one-off ornament with no semantic tie — use type and space instead.

## Sizes & modifiers

| Class | Typical use |
| --- | --- |
| `.sermona-icon` | Default **24px** |
| `.sermona-icon--sm` | Meta rows, chips |
| `.sermona-icon--lg` | Tile headers |
| `.sermona-icon--xl` | Media controls, hero markers |
| `.sermona-icon--accent` | Gold glyph |
| `.sermona-icon--muted` | De-emphasized or “avoid” lists |
| `.sermona-icon--font` | Icon **font** / variable font (see section above); hides child `svg` |

**SVG checklist:** `viewBox` set; no hard-coded hex; `aria-hidden="true"` when paired with visible text; meaningful `aria-label` on the **button or link**, not only on the SVG.

## Icon-led lists

Use **`.sermona-icon-list`** for scan-friendly bullets with a consistent marker column. Variants:

- **Default** — bordered tile markers (`--sermona-icon-tile-sm`).  
- **`.sermona-icon-list--compact`** — smaller column, no tile; for dense prose or sidebars.  
- **`.sermona-icon-list--checks`** — gold-tinted marker for success / “do” lists.

Markup shape:

```html
<ul class="sermona-icon-list">
  <li class="sermona-icon-list__item">
    <span class="sermona-icon-list__marker" aria-hidden="true">
      <span class="sermona-icon">…svg…</span>
    </span>
    <p class="sermona-icon-list__body">Short line of body text.</p>
  </li>
</ul>
```

Optional **title + body** inside the text column:

- `.sermona-icon-list__title` — bold meta line  
- `.sermona-icon-list__body` — primary line  
- `.sermona-icon-list__body--muted` — supporting line in meta color  

### Demo: default list

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0; padding: var(--sermona-space-5); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<p class="sermona-kicker">Shipping checklist</p>
<ul class="sermona-icon-list">
<li class="sermona-icon-list__item">
<span class="sermona-icon-list__marker" aria-hidden="true"><span class="sermona-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span></span>
<div>
<p class="sermona-icon-list__title">Accessibility pass</p>
<p class="sermona-icon-list__body sermona-icon-list__body--muted">Focus order, contrast, and labels on icon-only controls.</p>
</div>
</li>
<li class="sermona-icon-list__item">
<span class="sermona-icon-list__marker" aria-hidden="true"><span class="sermona-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span></span>
<div>
<p class="sermona-icon-list__title">Performance budget</p>
<p class="sermona-icon-list__body sermona-icon-list__body--muted">Keep icon SVGs lean; prefer strokes over massive paths.</p>
</div>
</li>
<li class="sermona-icon-list__item">
<span class="sermona-icon-list__marker" aria-hidden="true"><span class="sermona-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span></span>
<div>
<p class="sermona-icon-list__title">Content review</p>
<p class="sermona-icon-list__body sermona-icon-list__body--muted">Labels beside icons; no orphan glyphs. See <a class="sermona-link" href="/voice-and-copy">Voice &amp; copy</a>.</p>
</div>
</li>
</ul>

</div>

### Demo: compact + checks

<div class="sermona-root sermona-layout sermona-two-col" style="margin: 1.5rem 0; padding: var(--sermona-space-5); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md); align-items: start;">

<div class="sermona-stack">
<p class="sermona-meta">Compact</p>
<ul class="sermona-icon-list sermona-icon-list--compact">
<li class="sermona-icon-list__item">
<span class="sermona-icon-list__marker" aria-hidden="true"><span class="sermona-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/></svg></span></span>
<p class="sermona-icon-list__body">Single-line bullets in sidebars or footnotes.</p>
</li>
<li class="sermona-icon-list__item">
<span class="sermona-icon-list__marker" aria-hidden="true"><span class="sermona-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/></svg></span></span>
<p class="sermona-icon-list__body">Tighter vertical rhythm than default tiles.</p>
</li>
</ul>
</div>

<div class="sermona-stack">
<p class="sermona-meta">Checks (do / criteria)</p>
<ul class="sermona-icon-list sermona-icon-list--checks">
<li class="sermona-icon-list__item">
<span class="sermona-icon-list__marker" aria-hidden="true"><span class="sermona-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span></span>
<p class="sermona-icon-list__body">Glyph aligns to <code>--sermona-icon-stroke</code> for visual parity.</p>
</li>
<li class="sermona-icon-list__item">
<span class="sermona-icon-list__marker" aria-hidden="true"><span class="sermona-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span></span>
<p class="sermona-icon-list__body">Markers pick up gold border / soft fill from <code>.sermona-icon-list--checks</code>.</p>
</li>
</ul>
</div>

</div>

### Feature list vs icon list

| Pattern | When to use |
| --- | --- |
| **`.sermona-feature-list`** | Marketing **features** — large icon tile, title + body, more vertical air. |
| **`.sermona-icon-list`** | Prose-adjacent **bullets**, criteria, release notes, settings — denser scan. |

## Chips & strip

Use **`.sermona-icon-chip`** and **`.sermona-icon-strip`** for stacks, integrations, or toolchains — short noun labels beside small icons.

<div class="sermona-root sermona-layout sermona-section sermona-section--tight" style="margin: 1.5rem 0; border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<p class="sermona-kicker">Partners &amp; stack</p>
<div class="sermona-icon-strip">
<span class="sermona-icon-chip"><span class="sermona-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></span>Design</span>
<span class="sermona-icon-chip"><span class="sermona-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></span>Ship</span>
<span class="sermona-icon-chip"><span class="sermona-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></span>Measure</span>
<span class="sermona-icon-chip"><span class="sermona-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></span>Docs</span>
</div>

</div>

## Icon tiles

**`.sermona-icon-tile`** for **section highlights** in a grid — one metaphor per card, title + short supporting copy.

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0; border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<div class="sermona-service-grid" style="padding: var(--sermona-space-5);">
<article class="sermona-icon-tile">
<div class="sermona-icon-tile__glyph"><span class="sermona-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></span></div>
<h3 class="sermona-icon-tile__title">Editorial systems</h3>
<p class="sermona-icon-tile__body">Structured layouts for long-form and mixed media.</p>
</article>
<article class="sermona-icon-tile">
<div class="sermona-icon-tile__glyph"><span class="sermona-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/><circle cx="12" cy="12" r="4"/></svg></span></div>
<h3 class="sermona-icon-tile__title">Motion &amp; media</h3>
<p class="sermona-icon-tile__body">Playback and slide treatments aligned to accent.</p>
</article>
<article class="sermona-icon-tile">
<div class="sermona-icon-tile__glyph"><span class="sermona-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></span></div>
<h3 class="sermona-icon-tile__title">Deployable tokens</h3>
<p class="sermona-icon-tile__body">One CSS bundle for docs, marketing, and prototypes.</p>
</article>
</div>

</div>

## Feature list (large)

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0; padding: var(--sermona-space-5); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<ul class="sermona-feature-list">
<li class="sermona-feature-list__item">
<span class="sermona-feature-list__icon"><span class="sermona-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></span></span>
<div>
<p class="sermona-feature-list__title">IconJar-friendly</p>
<p class="sermona-feature-list__body">Swap glyphs without changing layout; stroke ties to tokens.</p>
</div>
</li>
<li class="sermona-feature-list__item">
<span class="sermona-feature-list__icon"><span class="sermona-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></span></span>
<div>
<p class="sermona-feature-list__title">Touch targets</p>
<p class="sermona-feature-list__body">Tiles and chips use token padding so tappable rows feel comfortable on dark UI.</p>
</div>
</li>
</ul>

</div>

## Logo row

Monochrome marks at a shared optical height — **press**, **integrations**, **trust**.

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0; border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<div class="sermona-logo-row" role="list">
<span class="sermona-logo-row__item" role="listitem" aria-label="Partner Studio"><svg width="80" height="24" viewBox="0 0 80 24" fill="currentColor" aria-hidden="true"><text x="0" y="18" font-family="system-ui" font-size="14" font-weight="600">Studio</text></svg></span>
<span class="sermona-logo-row__item" role="listitem" aria-label="Partner Labs"><svg width="72" height="24" viewBox="0 0 72 24" fill="currentColor" aria-hidden="true"><text x="0" y="18" font-family="system-ui" font-size="14" font-weight="600">Labs</text></svg></span>
<span class="sermona-logo-row__item" role="listitem" aria-label="Partner Collective"><svg width="88" height="24" viewBox="0 0 88 24" fill="currentColor" aria-hidden="true"><text x="0" y="18" font-family="system-ui" font-size="14" font-weight="600">Collective</text></svg></span>
</div>

</div>

## See also

- [Voice & copy](/voice-and-copy) — labels beside icons, errors, buttons  
- [Components](/components) — full CSS primitive index  
- [Foundations](/foundations) — color and type roles  
