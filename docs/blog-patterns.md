---
title: Blog patterns
description: Article layout, index cards, tags, author bios, and post navigation — editorial blog chrome in Sermona.
---

# Blog patterns

Long-form posts sit on the **content rail** (`--sermona-layout-max-content`). Pair **`.sermona-post`** with existing primitives: **`.sermona-quote`**, **`.sermona-media-feature`** (inline embeds), [Iconography](/iconography) lists, and [Sections](/sections) for special bands.

## Article (`sermona-post`)

| Block | Class |
| --- | --- |
| Root | **`.sermona-post`** |
| Header band | **`.sermona-post__header`** — title, deck, meta |
| Kicker / issue | **`.sermona-post__eyebrow`** — wrap **`.sermona-kicker`** or series |
| Series label | **`.sermona-series-badge`** — optional line above title |
| Title | **`.sermona-post__title`** |
| Deck | **`.sermona-post__deck`** — light subhead |
| Meta row | **`.sermona-post__meta`** — date, reading time, etc. |
| Byline | **`.sermona-post__byline`** — use **`<strong>`** for author name |
| Cover | **`.sermona-post__cover`** (+ **`--bleed`** for slight breakout when wrapped in padded layout) |
| Body | **`.sermona-post__body`** — prose; child spacing uses `* + *` |
| Footer | **`.sermona-post__footer`** — tags, author, CTAs, related |

## Index & archive

**`.sermona-blog-grid`** wraps **`.sermona-blog-card`** (optionally **`a.sermona-blog-card`**). Structure: **`__media`**, **`__body`**, **`__meta`**, **`__title`**, **`__excerpt`**.

## Tags

**`.sermona-tag-row`** as **`ul`** with **`li`** → **`a.sermona-tag`** (or **`span.sermona-tag`** when not linking). Keeps chips on one wrap-friendly row.

## Author

**`.sermona-author`** with **`img.sermona-author__avatar`**, **`.sermona-author__name`**, **`.sermona-author__bio`**.

## Prev / next

**`.sermona-post-nav`** — two **`a.sermona-post-nav__link`** cells; **`__dir`** (Previous / Next), **`__title`**. On **≤600px** the grid stacks. Hide one side on first/last post in your template.

---

## Demo: index row

<div class="sermona-root sermona-layout sermona-layout--wide" style="margin: 1.5rem 0; padding: var(--sermona-space-5); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<ul class="sermona-blog-grid" style="list-style: none; margin: 0; padding: 0;">
<li style="margin:0;">
<a class="sermona-blog-card" href="#">
<div class="sermona-blog-card__media"><img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&amp;fit=crop&amp;w=800&amp;q=75" width="800" height="500" alt="" loading="lazy" /></div>
<div class="sermona-blog-card__body">
<p class="sermona-blog-card__meta">14 Apr 2026 · 6 min</p>
<p class="sermona-blog-card__title">Why we tokenize before components</p>
<p class="sermona-blog-card__excerpt">Decisions that scale start as named contracts, not as one-off styles in a PR.</p>
</div>
</a>
</li>
<li style="margin:0;">
<article class="sermona-blog-card">
<div class="sermona-blog-card__media"><img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&amp;fit=crop&amp;w=800&amp;q=75" width="800" height="500" alt="" loading="lazy" /></div>
<div class="sermona-blog-card__body">
<p class="sermona-blog-card__meta">2 Apr 2026 · 4 min</p>
<p class="sermona-blog-card__title">Iconography that survives handoff</p>
<p class="sermona-blog-card__excerpt">SVG, semantic list patterns, and copy beside glyphs — without icon fonts.</p>
</div>
</article>
</li>
</ul>

</div>

## Demo: article shell

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0; padding: var(--sermona-space-5); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<article class="sermona-post">
<header class="sermona-post__header">
<p class="sermona-series-badge">Field notes · Systems</p>
<h1 class="sermona-post__title">Rhythm beats novelty</h1>
<p class="sermona-post__deck">When every screen invents spacing from scratch, the brand never lands.</p>
<div class="sermona-post__meta">
<p class="sermona-post__byline"><strong>Ada Marin</strong> · Editor</p>
<p class="sermona-meta" style="margin:0;">18 Apr 2026 · 8 min read</p>
</div>
</header>
<div class="sermona-post__cover">
<img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&amp;fit=crop&amp;w=1400&amp;q=80" width="1400" height="600" alt="Microphone and warm stage lights" loading="lazy" />
</div>
<div class="sermona-post__body">
<p>Editorial voice needs predictable gutters, type roles, and one accent story — gold in Sermona — or readers fatigue before the idea lands.</p>
<blockquote class="sermona-quote">
<p class="sermona-quote__text">“Systems are choreography: every move should know its beat.”</p>
<p class="sermona-quote__cite">—Internal design critique</p>
</blockquote>
<p>Ship the **post** with semantic headings (`h1` once, `h2` for sections), then layer these classes for presentation.</p>
</div>
<footer class="sermona-post__footer">
<ul class="sermona-tag-row" aria-label="Topics">
<li><a class="sermona-tag" href="#">Tokens</a></li>
<li><a class="sermona-tag" href="#">Editorial</a></li>
<li><span class="sermona-tag">Draft</span></li>
</ul>
<div class="sermona-author" style="margin-top: var(--sermona-space-5);">
<img class="sermona-author__avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&amp;fit=crop&amp;w=96&amp;h=96&amp;q=70" width="96" height="96" alt="" />
<div class="sermona-author__body">
<p class="sermona-author__name">Ada Marin</p>
<p class="sermona-author__bio">Runs editorial systems at the studio — previously product writing at a climate nonprofit.</p>
</div>
</div>
<nav class="sermona-post-nav" aria-label="Adjacent posts">
<a class="sermona-post-nav__link" href="#"><span class="sermona-post-nav__dir">Previous</span><span class="sermona-post-nav__title">The case for dark-first docs</span></a>
<a class="sermona-post-nav__link" href="#"><span class="sermona-post-nav__dir">Next</span><span class="sermona-post-nav__title">Checklists that teams actually use</span></a>
</nav>
</footer>
</article>

</div>

**Covers:** Optional **`sermona-post__cover--bleed`** breaks out of horizontal padding equal to **`var(--sermona-space-4)`** — align with your layout shell or remove for a flush measure.

## Accessibility

- One **`h1`** per post; **`header`** / **`footer`** / **`nav`** landmarks as above.  
- Cover **`img`**: meaningful **`alt`** or **empty `alt`** only if the title/deck conveys the same intent.  
- **Tag row**: **`aria-label`** on the **`ul`** when links are topics.  
- **Prev/next**: real **`href`** targets; don’t use **`#`** in production.

## See also

- [Voice & copy](/voice-and-copy) — headlines, meta, quotes  
- [Using Sermona](/using-sermona) — handbook and vocabulary  
- [Cards & horizontal swipers](/cards-and-swipers) — optional horizontal topic rails  
