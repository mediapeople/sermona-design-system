# Section compositions

Full-width sections use **vertical rhythm** tokens (`--sermona-layout-section-y-*`) and optional **layout** max widths. Compose headers with `.sermona-kicker` + `.sermona-lede`, then stack grids below.

## Full-page image hero

A **viewport-tall** band with a **cover** background image, **gradient scrim** for legibility, and content anchored to the **bottom** by default (safe-area aware). Set the photo with **`--sermona-hero-image: url('…')`** on **`.sermona-hero-full`**.

**Accessibility:** If the image is **decorative**, use `aria-hidden="true"` on the section and keep meaning in the heading. If it **carries meaning** (e.g. featured work), expose a short description with **`aria-label`** on the section or visible caption copy. For **LCP** on production sites, prefer a real **`<img>`** (e.g. `fetchpriority="high"`) plus a separate scrim layer — this primitive uses CSS `background-image` for simple docs/marketing HTML.

| Modifier | Effect |
| --- | --- |
| **`.sermona-hero-full--center`** | Vertical centering of **`.sermona-hero-full__inner`**. |
| **`.sermona-hero-full--top`** | Content toward the top + **notch** padding. |
| **`.sermona-hero-full--short`** | ~72vh minimum instead of full viewport. |
| **`.sermona-hero-full--cap`** | At most ~880px tall while still filling small screens. |
| **`.sermona-hero-full--scrim-heavy`** / **`--scrim-light`** | Darker or lighter overlay (tweak contrast for busy photos). |

<div class="sermona-root" style="margin: 1.5rem 0; border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md); overflow: hidden; max-height: min(520px, 85vh);">

<section class="sermona-hero-full sermona-hero-full--cap sermona-hero-full--scrim-heavy" aria-label="Sample full-bleed hero: stage lighting" style="--sermona-hero-image: url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&amp;fit=crop&amp;w=1800&amp;q=80'); min-height: min(420px, 70vh);">
<div class="sermona-hero-full__inner">
<p class="sermona-kicker">Campaign</p>
<h1 class="sermona-display-hero" style="max-width: 14ch; margin: 0 0 var(--sermona-space-3);">Light,<br/>Held Still</h1>
<p class="sermona-lede" style="max-width: 36ch; margin: 0; color: rgba(255,255,255,0.82);">Full-page heroes use cover + scrim so display type stays readable without boxing the photo.</p>
<div class="sermona-hero-full__actions">
<a class="sermona-btn sermona-btn--primary" href="/tokens">View tokens</a>
<a class="sermona-btn sermona-btn--ghost" href="/good-digital-design">Principles</a>
</div>
</div>
</section>

</div>

<p class="sermona-meta" style="margin-top: var(--sermona-space-2);">Demo clipped for the docs rail; drop the outer <code>max-height</code> for a true full viewport. Photo: Unsplash.</p>

## Hero split + media

A **split hero** pairs a display title with an aside (services teaser, quote, or metrics). Below, a **media feature** demonstrates the slide / film block with a play control.

<div class="sermona-root sermona-layout sermona-layout--full" style="margin: 1.5rem 0; border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<section class="sermona-section" style="padding-inline: var(--sermona-space-5);">
<div class="sermona-hero-split">
<div>
<p class="sermona-kicker">Issue 04 · Mixed media</p>
<h1 class="sermona-display-light" style="font-size: clamp(2.5rem, 8vw, var(--sermona-font-size-display-megaman)); margin:0;">Poetic<br/>Commerce</h1>
</div>
<aside class="sermona-hero-split__aside">
<p class="sermona-lede" style="max-width:none;">Editorial layouts, icon tiles, and service cards share one token file so marketing and product feel native to Sermona.</p>
<div class="sermona-brand-lockup" style="margin-top: var(--sermona-space-4);">
<span class="sermona-brand-lockup__mark"><span class="sermona-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg></span></span>
<p class="sermona-brand-lockup__word">Sermona studio</p>
</div>
</aside>
</div>
</section>

<section class="sermona-section sermona-section--tight" style="padding-inline: var(--sermona-space-5);">
<div class="sermona-two-col">
<div class="sermona-media-feature" role="img" aria-label="Sample film still">
<button type="button" class="sermona-media-feature__play" aria-label="Play reel"><span class="sermona-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></button>
</div>
<div class="sermona-stack">
<p class="sermona-kicker">Director's cut</p>
<p class="sermona-h3" style="margin:0;">Gold on charcoal, always</p>
<p class="sermona-body">The media frame uses slide background tokens; controls inherit accent color for focus and hover.</p>
</div>
</div>
</section>

<footer class="sermona-footer-mini" style="padding-inline: var(--sermona-space-5);">
<span class="sermona-meta">© Sermona</span>
<div class="sermona-footer-mini__links">
<a class="sermona-link" href="#">Licenses</a>
<a class="sermona-link" href="#">Privacy</a>
<a class="sermona-link" href="https://www.figma.com/design/IC2hBpxXtkX9Hzb5IMdwmh/Sermona">Figma</a>
</div>
</footer>

</div>

## Two-column editorial + quote

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0; border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md); padding: var(--sermona-space-5);">

<div class="sermona-two-col">
<div class="sermona-stack">
<header class="sermona-section__header" style="margin-bottom:0;">
<p class="sermona-kicker">Long-form</p>
<p class="sermona-lede">Short paragraphs and confident headings carry the voice. Links pick up accent gold.</p>
</header>
<p class="sermona-body">Use <code>.sermona-layout--wide</code> when you need room for side-by-side grids without hitting the full 1200px rail.</p>
</div>
<blockquote class="sermona-quote">
<p class="sermona-quote__text">“Sections are compositions of primitives — not one-off CSS.”</p>
<p class="sermona-quote__cite">—Design systems notes</p>
</blockquote>
</div>

</div>
