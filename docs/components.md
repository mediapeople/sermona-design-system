# CSS primitives

Import after tokens:

```css
@import "@sermona/tokens/css";
@import "@sermona/tokens/components.css";
```

**Fonts & icons:** override **`--sermona-font-family-sans`**, **`--sermona-font-family-display`**, **`--sermona-font-family-mono`**, and optionally **`--sermona-icon-font-*`** on `:root` after import — see [Tokens](/tokens#typography-families) and [Iconography](/iconography#icon-fonts-material-symbols-phosphor-etc).

## Editorial layout (dark)

<div class="sermona-root sermona-layout sermona-stack sermona-stack--loose" style="margin: 2rem 0; border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-sm);">

<p class="sermona-display-hero">Sermoná<br/>Poetic</p>

<p class="sermona-body">Mixed media editorial body copy. Links use <a class="sermona-link" href="#">accent gold</a>.</p>

<hr class="sermona-rule" />

<p class="sermona-meta">Issue 1 · Editorial by You</p>

<div class="sermona-card sermona-card--stack">
  <p class="sermona-meta">Featured</p>
  <p class="sermona-h2">Slingshot Engage</p>
  <p class="sermona-body">Subtitle or deck for the featured module.</p>
</div>

<blockquote class="sermona-quote">
  <p class="sermona-quote__text">“Pull quote set in medium weight with accent color.”</p>
  <p class="sermona-quote__cite">—Attribution</p>
</blockquote>

</div>

## Icon-led lists

- **`.sermona-icon-list`** — bullet-style rows with `.sermona-icon-list__marker` + `.sermona-icon-list__body` (optional `__title`, `__body--muted`). Modifiers: **`--compact`**, **`--checks`** (gold marker treatment).  
- **`.sermona-feature-list`** — larger tiles per row for marketing features.

See live demos on [Iconography](/iconography).

## Forms, buttons & CTAs

- **`.sermona-form`**, **`.sermona-field`**, **`.sermona-label`** (optional **`.sermona-label--optional`**) — vertical form stack.  
- **`.sermona-input`**, **`.sermona-textarea`**, **`.sermona-select`** — text-like controls; **`type="file"`** styles the file-selector button.  
- **`.sermona-field__hint`**, **`.sermona-field__error`**, **`.sermona-field--invalid`** — supporting and error text.  
- **`.sermona-choice`** — checkbox / radio row with **`.sermona-choice__text`**, **`__label`**, **`__hint`**.  
- **`.sermona-btn--primary`**, **`--secondary`**, **`--ghost`** — actions; **`.sermona-form__actions`** for button rows (**`--end`** to align right).  
- **`.sermona-cta`** + **`.sermona-cta__actions`** — headline band with primary + secondary actions.

Full guidance: [Forms, buttons & CTAs](/forms-buttons-cta).

## Complex & multi-step forms

- **`.sermona-form--wide`**, **`--full`** — wider or uncapped form rail.  
- **`.sermona-fieldset`**, **`.sermona-fieldset__legend`**, **`__stack`** — semantic groups.  
- **`.sermona-form-section`** — visual section bands with **`__title`**, **`__lede`**, **`__stack`**.  
- **`.sermona-field-row`**, **`--duo`** — multi-column short fields.  
- **`.sermona-field__meta-row`**, **`__counter`** — hint + character count row.  
- **`.sermona-form-summary`** — submit error summary (`__title`, `__list`).  
- **`.sermona-form-stepper`** + **`__item`** (`--current`, `--done`) — wizard chrome.  
- **`.sermona-repeatable`**, **`__row`**, **`__fields`**, **`__remove`**, **`__toolbar`**.  
- **`.sermona-segmented`**, **`__btn`** — mutually exclusive options.  
- **`.sermona-choice-grid`**, **`label.sermona-choice-card`** + **`sermona-sr-only`** radio.

Full guidance: [Complex forms](/complex-forms).

## Cards & horizontal swipers

- **`.sermona-card`** — modifiers **`--flat`**, **`--dense`**, **`--stack`**, **`--interactive`**; **`.sermona-card__footer`** for pinned footers with **`--stack`**.  
- **`.sermona-card-grid`** — responsive editorial card grid.  
- **`.sermona-swiper`**, **`.sermona-swiper__track`**, **`.sermona-swiper__slide`** — scroll-snap horizontal deck; **`--bleed`**, **`--fade`**, **`--peek`**, **`--wide`**.  
- **`.sermona-service-card--interactive`**, **`a.sermona-service-card`** — linked / hover service tiles.

Full guidance: [Cards & horizontal swipers](/cards-and-swipers).

## Ecommerce

- **`.sermona-product-grid`**, **`.sermona-product-card`** (`__media`, `__body`, `__footer`, `__badge`) — PLP tiles; **`a.sermona-product-card`**, **`--interactive`**.  
- **`.sermona-product-badge`** — **`--sale`** (gold fill + on-accent text), **`--neutral`**.  
- **`.sermona-price`** — **`__current`**, **`__was`**, **`__note`**; modifier **`--accent`** for promo emphasis.  
- **`.sermona-variant-row`**, **`.sermona-variant-pill`** — PDP options; **`aria-pressed`**.  
- **`.sermona-promo-banner`** — shipping / sale strip.  
- **`.sermona-trust-strip`** — payments / policy highlights.  
- **`.sermona-cart-line`** — line item; **`.sermona-order-summary`** — checkout totals.

Full guidance: [Ecommerce patterns](/ecommerce-patterns).

## Modals & lightbox

- **`.sermona-modal`**, **`.sermona-modal__backdrop`**, **`.sermona-modal__panel`**, **`.sermona-modal__header`**, **`.sermona-modal__title`**, **`.sermona-modal__body`**, **`.sermona-modal__footer`**. Modifiers **`--wide`**, **`--narrow`**, **`--blur`**, **`--demo`** (docs preview only).  
- **`.sermona-lightbox`**, **`.sermona-lightbox__backdrop`**, **`.sermona-lightbox__content`**, **`.sermona-lightbox__caption`**, **`.sermona-lightbox__close`**, **`--demo`**.  
- **`.sermona-close-btn`** — icon-sized dismiss control (modal + lightbox; lightbox gets inverted hover).

Full guidance: [Modals & lightbox](/modals-and-lightbox).

## Blog & admin

- **`.sermona-post`**, **`.sermona-blog-card`**, **`.sermona-tag-row`**, **`.sermona-author`**, **`.sermona-post-nav`** — article rails, index cards, tags, bios, prev/next.

  Full guidance: [Blog patterns](/blog-patterns).

- **`.sermona-admin-shell`** (+ **`--demo`**, **`--force-sidebar`**), **`.sermona-admin-sidebar`**, **`.sermona-admin-nav__link`** (+ **`--mark`**, active flanking dots), **`.sermona-admin-topbar`**, **`.sermona-admin-dash`** — app chrome; **`.sermona-metric-tile`**, **`.sermona-trend`**, **`.sermona-status-badge`**, **`.sermona-chart-slot`**, **`.sermona-instrument-panel`**, **`.sermona-log-list`** (+ **`--tabular`**, **`__msg`**, tokens / **`code`**) — metrics, status, chart placeholder, structured logs.

  Full guidance: [Admin & instrumentation](/admin-dashboard).

## Tables & data

- **`.sermona-table-wrap`** — horizontal scroll container; wrap **`.sermona-table`**.  
- Modifiers: **`.sermona-table--zebra`**, cell helpers **`.sermona-table__num`**, **`.sermona-table__strong`**.  
- **`.sermona-kv`** — definition list for key–value metadata.  
- **`.sermona-data-pair`** — label + value stack inside cards or cells.

Markdown tables in VitePress are themed via `@sermona/vitepress-theme`. Full guidance: [Data & tables](/data-and-tables).

## Patterns (sections, icons, services)

- [Using Sermona](/using-sermona) — handbook for teams (roles, vocabulary, adoption, quality bar).
- [Section compositions](/sections) — full-page image hero, hero split, two-column + quote, footer strip.
- [Iconography](/iconography) — principles, icon lists (default / compact / checks), chips, tiles, logo row.
- [Voice & copy](/voice-and-copy) — tone, buttons, errors, writing beside icons.
- [Services & pricing](/services) — service grid, CTA strip, metrics.
- [Data & tables](/data-and-tables) — tabular data, Markdown vs HTML, a11y notes.
- [Forms, buttons & CTAs](/forms-buttons-cta) — inputs, files, choices, button variants.
- [Complex forms](/complex-forms) — sections, steppers, repeatables, validation summary.
- [Cards & horizontal swipers](/cards-and-swipers) — card grids, linked cards, snap rails.
- [Ecommerce](/ecommerce-patterns) — product grid, pricing, variants, cart, promos, trust.
- [Modals & lightbox](/modals-and-lightbox) — dialogs, image overlay, close control.
- [Blog patterns](/blog-patterns) — post layout, archive cards, tags, author, adjacent posts.
- [Admin & instrumentation](/admin-dashboard) — dashboard shell, metrics, logs, chart slot.

## Next steps for a “full” system

- **React/Vue wrappers** — thin components mapping class names to props.
- **Markdown / MDX** — map `:::quote` callouts to `.sermona-quote`.
- **Figma parity** — publish Library in Figma + Code Connect for your code components.
