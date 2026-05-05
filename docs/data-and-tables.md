---
title: Data & tables
description: Presenting tabular data, metrics, and key–value panels in Sermona — Markdown tables, HTML primitives, and copy guidance.
---

# Data & tables

Tables are for **comparison**, **lookup**, and **scanning**. In Sermona they stay **quiet**: muted cell text, **tabular numerals** for digits, and gold reserved for links — not for random cell highlights.

## When to use what

| Pattern | Best for |
| --- | --- |
| **Markdown table** | Specs, token matrices, light comparison in docs (VitePress styles them via the theme). |
| **`.sermona-table` in `.sermona-table-wrap`** | Wide or dense grids; **horizontal scroll** on small screens. |
| **`.sermona-kv`** | A handful of **key → value** fields (release metadata, API params). |
| **`.sermona-stat-row`** | Highlighted **metrics** (already in components). |

Avoid tables for **narrative**; use prose or **icon-led lists** instead.

## Markdown tables

Regular GitHub-style tables pick up Sermona spacing and colors automatically in this site:

| Token | Value | Notes |
| --- | --- | --- |
| `--sermona-space-3` | 22px | Vertical rhythm between blocks |
| `--sermona-radius-sm` | 4px | Chips, inputs, media |
| Motion base | 250ms | Prefer on color / border |

## HTML: scroll-safe table

Wrap wide tables and use **`sermona-table__num`** for numeric columns. Optional **`sermona-table--zebra`** for dense datasets.

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0;">

<div class="sermona-table-wrap" tabindex="0" role="region" aria-label="Sample usage metrics">
<table class="sermona-table sermona-table--zebra">
<caption>Usage by week (demo)</caption>
<thead>
<tr>
<th scope="col">Week</th>
<th scope="col">Sessions</th>
<th scope="col">Docs views</th>
<th scope="col">Change</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">W14</th>
<td class="sermona-table__num">12,400</td>
<td class="sermona-table__num">3,210</td>
<td class="sermona-table__num"><span class="sermona-meta" style="margin:0; color: var(--sermona-color-accent-primary);">+4.2%</span></td>
</tr>
<tr>
<th scope="row">W15</th>
<td class="sermona-table__num">13,080</td>
<td class="sermona-table__num">3,512</td>
<td class="sermona-table__num"><span class="sermona-meta" style="margin:0;">+5.5%</span></td>
</tr>
<tr>
<th scope="row">W16</th>
<td class="sermona-table__num">12,910</td>
<td class="sermona-table__num">3,698</td>
<td class="sermona-table__num"><span class="sermona-meta" style="margin:0;">−1.3%</span></td>
</tr>
</tbody>
</table>
</div>
<p class="sermona-meta" style="margin-top: var(--sermona-space-2);">Scroll horizontally on narrow viewports. Prefer a <strong>caption</strong> or <code>aria-label</code> on the wrapper for screen readers.</p>

</div>

For a caption visible to all users, use `<caption>` inside the table (styled in `sermona.components.css`).

## Key–value panel

Good for **releases**, **builds**, or **entity** summaries — not full spreadsheets.

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0;">

<dl class="sermona-kv">
<dt>Build</dt>
<dd>2026-04-30T14:22Z</dd>
<dt>Tokens package</dt>
<dd>@sermona/tokens@0.1.0</dd>
<dt>Contrast (body / bg)</dt>
<dd>12.6 : 1</dd>
<dt>License</dt>
<dd>Proprietary / Figma source</dd>
</dl>

</div>

## Inline metric pairs

Stack a **label** and **value** inside a cell or card:

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0;">

<div class="sermona-card" style="max-width: 280px;">
<div class="sermona-data-pair">
<p class="sermona-data-pair__label">Mean time to docs</p>
<p class="sermona-data-pair__value">48s</p>
</div>
<p class="sermona-meta" style="margin-top: var(--sermona-space-3); margin-bottom: 0;">p50 over last 7 days</p>
</div>

</div>

## Copy & accessibility

1. **Header row** — Short labels; avoid wrapping unless necessary.  
2. **Row headers** — Use `<th scope="row">` when the first column identifies the record.  
3. **Units** — Put units in the header (`Sessions (k)`) or one column; don’t mix in-cell.  
4. **Alignment** — Numbers **right** (`.sermona-table__num`); text **left**.  
5. **Don’t encode meaning by color alone** — Pair “+4%” with words if color is used.

## See also

- [Using Sermona](/using-sermona) — team handbook and vocabulary  
- [Tokens](/tokens) — spacing and radii used in table chrome  
- [Components](/components) — index of CSS classes  
- [Voice & copy](/voice-and-copy) — how to label metrics in prose  
- [Forms, buttons & CTAs](/forms-buttons-cta) — field labels, buttons, CTA copy  
