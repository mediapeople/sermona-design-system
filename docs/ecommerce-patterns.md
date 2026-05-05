---
title: Ecommerce patterns
description: Product grids, cards, pricing, variants, cart lines, promos, and trust strips in Sermona — discovery through checkout affordances.
---

# Ecommerce patterns

Sermona stays **dark-first**: charcoal surfaces, **gold** for sale state and key actions, **tabular numerals** for money. These primitives are **CSS-only** — wire them to your cart, inventory, and analytics in the stack you already use.

## Product listing

**`.sermona-product-grid`** fills the row with **`.sermona-product-card`** tiles. Cards support **`<article>`** or **`a.sermona-product-card`** (whole-card link). Add **`.sermona-product-card--interactive`** for hover lift on non-anchor cards.

Structure: **`.sermona-product-card__media`** (optional **`.sermona-product-card__badge`**), **`.sermona-product-card__body`**, **`.sermona-product-card__footer`** (price + optional control).

<div class="sermona-root sermona-layout sermona-layout--wide" style="margin: 1.5rem 0; padding: var(--sermona-space-5); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<div class="sermona-promo-banner" style="margin-bottom: var(--sermona-space-4);">
<p class="sermona-promo-banner__text">Free shipping over $75 · Ends Sunday</p>
<p class="sermona-promo-banner__detail">Applied at checkout · Exclusions apply</p>
</div>

<div class="sermona-product-grid">
<article class="sermona-product-card sermona-product-card--interactive">
<div class="sermona-product-card__media">
<span class="sermona-product-badge sermona-product-badge--sale sermona-product-card__badge" aria-label="On sale">Sale</span>
<img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&amp;fit=crop&amp;w=600&amp;h=600&amp;q=80" width="600" height="600" alt="Minimal watch on dark surface" loading="lazy" />
</div>
<div class="sermona-product-card__body">
<p class="sermona-product-card__vendor">Maison orbit</p>
<p class="sermona-product-card__title">Ceramic bezel field watch</p>
<p class="sermona-product-card__meta">38 mm · Sapphire · 5 ATM</p>
</div>
<div class="sermona-product-card__footer">
<div class="sermona-price sermona-price--accent" aria-label="Sale price 428 dollars, was 520 dollars">
<span class="sermona-price__current">$428</span>
<span class="sermona-price__was">$520</span>
</div>
<button type="button" class="sermona-btn sermona-btn--ghost" style="padding-inline: var(--sermona-space-3);">Quick add</button>
</div>
</article>
<a class="sermona-product-card sermona-product-card--interactive" href="#">
<div class="sermona-product-card__media">
<span class="sermona-product-badge sermona-product-badge--neutral sermona-product-card__badge">New</span>
<img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&amp;fit=crop&amp;w=600&amp;h=600&amp;q=80" width="600" height="600" alt="Headphones product still life" loading="lazy" />
</div>
<div class="sermona-product-card__body">
<p class="sermona-product-card__vendor">Null audio</p>
<p class="sermona-product-card__title">Closed-back studio set</p>
</div>
<div class="sermona-product-card__footer">
<span class="sermona-price"><span class="sermona-price__current">$210</span></span>
<span class="sermona-meta" style="margin:0;">4.8 ★</span>
</div>
</a>
<article class="sermona-product-card">
<div class="sermona-product-card__media">
<img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&amp;fit=crop&amp;w=600&amp;h=600&amp;q=80" width="600" height="600" alt="Red running shoe" loading="lazy" />
</div>
<div class="sermona-product-card__body">
<p class="sermona-product-card__vendor">Tracksmith adjacent</p>
<p class="sermona-product-card__title">Knit daily trainer</p>
<p class="sermona-product-card__meta">Ships in 2–3 days</p>
</div>
<div class="sermona-product-card__footer">
<div class="sermona-price">
<span class="sermona-price__current">$168</span>
<p class="sermona-price__note">Members: extra 10% this week</p>
</div>
</div>
</article>
</div>

</div>

## PDP-style variants

**`.sermona-variant-row`** wraps **`.sermona-variant-pill`** controls. Use **`aria-pressed="true"`** on the selected option (or **`.sermona-variant-pill--selected"`** if you mirror state with a class).

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0; padding: var(--sermona-space-4); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md); max-width: 420px;">

<p class="sermona-meta" style="margin:0 0 var(--sermona-space-2);">Size</p>
<div class="sermona-variant-row" role="group" aria-label="Size">
<button type="button" class="sermona-variant-pill" aria-pressed="false">S</button>
<button type="button" class="sermona-variant-pill" aria-pressed="true">M</button>
<button type="button" class="sermona-variant-pill" aria-pressed="false">L</button>
<button type="button" class="sermona-variant-pill" aria-pressed="false" disabled>XL</button>
</div>
<p class="sermona-meta" style="margin:var(--sermona-space-3) 0 0;">Pair with <a class="sermona-link" href="/forms-buttons-cta">Forms &amp; CTAs</a> for quantity and <strong>Add to cart</strong>.</p>

</div>

## Cart + order summary

**`.sermona-cart-line`** uses **`grid-template-areas`** so **`.sermona-cart-line__aside`** (line total) drops **full width** under **narrow** viewports.

**`.sermona-order-summary`** holds subtotal / shipping / tax rows and **`.sermona-order-summary__total`**.

<div class="sermona-root sermona-layout sermona-layout--wide" style="margin: 1.5rem 0; padding: var(--sermona-space-5); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<div class="sermona-two-col" style="gap: var(--sermona-space-5); align-items: start;">
<div>
<h2 class="sermona-h3" style="margin:0 0 var(--sermona-space-4);">Cart</h2>
<div class="sermona-cart-line">
<div class="sermona-cart-line__thumb"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=70" width="200" height="200" alt="" /></div>
<div class="sermona-cart-line__details">
<p class="sermona-cart-line__title">Ceramic bezel field watch</p>
<p class="sermona-cart-line__variant">Color: Graphite</p>
<p class="sermona-cart-line__qty">Qty 1</p>
</div>
<div class="sermona-cart-line__aside">
<p class="sermona-cart-line__total">$428</p>
</div>
</div>
<div class="sermona-cart-line">
<div class="sermona-cart-line__thumb"><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=70" width="200" height="200" alt="" /></div>
<div class="sermona-cart-line__details">
<p class="sermona-cart-line__title">Knit daily trainer</p>
<p class="sermona-cart-line__variant">Size: M · Wide</p>
<p class="sermona-cart-line__qty">Qty 2</p>
</div>
<div class="sermona-cart-line__aside">
<p class="sermona-cart-line__total">$336</p>
</div>
</div>
</div>
<div class="sermona-order-summary">
<h3 class="sermona-h3" style="margin:0 0 var(--sermona-space-3); font-size: var(--sermona-font-size-body);">Summary</h3>
<p class="sermona-order-summary__row">Subtotal <strong>$764</strong></p>
<p class="sermona-order-summary__row">Shipping <strong>$0</strong></p>
<p class="sermona-order-summary__row">Estimated tax <strong>$61</strong></p>
<div class="sermona-order-summary__total"><span>Total</span><span>$825</span></div>
<button type="button" class="sermona-btn sermona-btn--primary" style="width:100%; margin-top: var(--sermona-space-4);">Checkout</button>
</div>
</div>

</div>

## Trust strip

**`.sermona-trust-strip`** — centered row of **`.sermona-trust-strip__item`** (short label + optional **`.sermona-icon`**). Use for payments, returns, or support — **not** a substitute for legal pages.

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0;">

<div class="sermona-trust-strip">
<span class="sermona-trust-strip__item"><span class="sermona-icon sermona-icon--sm" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></span> Secure checkout</span>
<span class="sermona-trust-strip__item"><span class="sermona-icon sermona-icon--sm" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span> 30-day returns</span>
<span class="sermona-trust-strip__item"><span class="sermona-icon sermona-icon--sm" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></span> Human support</span>
</div>

</div>

`img` with empty `alt` in cart thumbnails is acceptable when the **line title** names the product.

## Copy & accessibility

- **Sale vs list** — State **both** in text or **`aria-label`** on **`.sermona-price`**; don’t rely on color alone (**`.sermona-price--accent`** is supplementary).  
- **Currency** — Keep one currency symbol convention per locale; use **tabular nums** (already on price classes).  
- **Stock / errors** — Follow [Voice & copy](/voice-and-copy) for recovery paths (“Ships Mar 12” not “Error”).  
- **Quick add** — After add, move focus to cart or announce via a live region (implementation-specific).

## See also

- [Data & tables](/data-and-tables) — order history, SKUs, specs  
- [Forms, buttons & CTAs](/forms-buttons-cta) — checkout fields, primary actions  
- [Cards & horizontal swipers](/cards-and-swipers) — editorial product rails  
