---
title: Modals & lightbox
description: Dialog overlays, dismiss controls, and full-bleed image lightboxes — Sermona surfaces with accessibility expectations and JS hooks.
---

# Modals & lightbox

Overlays sit **above** page content with a **scrim** (and optional **blur**). The **modal** pattern is for decisions, forms, and confirmations; the **lightbox** pattern is for **enlarged stills** (editorial, product, evidence).

CSS handles **layout, type, and motion** — you still need a small amount of **JavaScript** to toggle **`hidden`**, trap **focus**, lock **body scroll**, and close on **Escape** / backdrop click.

## Modal dialog

Root: **`.sermona-modal`** (typically `role="dialog"` + **`aria-modal="true"`** + **`aria-labelledby`** pointing at **`.sermona-modal__title`**).

Children:

1. **`button.sermona-modal__backdrop`** or clickable **`div`** — optional; many teams attach **click-outside** on the backdrop element with **`aria-hidden="true"`** if it is purely visual. If the backdrop is a **button**, label it **“Close”** or use **`aria-label`** and match the dismiss action.
2. **`.sermona-modal__panel`** — scrollable card surface.
3. **`.sermona-modal__header`** with **`.sermona-modal__title`** and **`.sermona-close-btn`**.
4. **`.sermona-modal__body`** — primary message.
5. **`.sermona-modal__footer`** — **`.sermona-btn`** actions (primary + secondary).

| Modifier | Use |
| --- | --- |
| **`.sermona-modal--wide`** / **`--narrow`** | Wider confirmation vs compact destructive confirm. |
| **`.sermona-modal--blur`** | Backdrop blur when **`prefers-reduced-transparency: no-preference`**. |
| **`.sermona-modal--demo`** | **Docs only:** `position: relative` so the composition renders inside the page. **Remove** in production. |

Static preview (not focus-trapped — **do not** copy `role="dialog"` from this embedded demo without wiring behavior):

<div class="sermona-root" style="margin: 1.5rem 0;">

<div class="sermona-modal sermona-modal--demo sermona-modal--blur" aria-hidden="true">
<div class="sermona-modal__backdrop" aria-hidden="true"></div>
<div class="sermona-modal__panel">
<div class="sermona-modal__header">
<h2 class="sermona-modal__title" id="demo-modal-title">Save changes?</h2>
<button type="button" class="sermona-close-btn" aria-label="Close dialog (demo only)" tabindex="-1"><span class="sermona-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></span></button>
</div>
<div class="sermona-modal__body">
<p style="margin:0;">You have unsold draft edits. Discard them or keep editing — one clear primary action.</p>
</div>
<div class="sermona-modal__footer">
<button type="button" class="sermona-btn sermona-btn--ghost" tabindex="-1">Keep editing</button>
<button type="button" class="sermona-btn sermona-btn--primary" tabindex="-1">Save</button>
</div>
</div>
</div>
<p class="sermona-meta" style="margin-top: var(--sermona-space-2);">Demo uses <code>sermona-modal--demo</code> + <code tabindex="-1"</code> so nested controls don’t steal focus on this page.</p>

</div>

## Image lightbox

**`.sermona-lightbox`** — near-black **`.sermona-lightbox__backdrop`**, **`.sermona-lightbox__content`** wrapping **`img`**, optional **`.sermona-lightbox__caption`**, **`.sermona-lightbox__close`** with **`.sermona-close-btn`** (light-on-dark treatment is scoped).

Use a single **`img`** with a meaningful **`alt`**. The caption may repeat tone for context but should not replace **`alt`** for non-decorative images.

<div class="sermona-root" style="margin: 1.5rem 0;">

<div class="sermona-lightbox sermona-lightbox--demo" aria-hidden="true">
<div class="sermona-lightbox__backdrop" aria-hidden="true"></div>
<button type="button" class="sermona-lightbox__close sermona-close-btn" aria-label="Close lightbox (demo only)" tabindex="-1"><span class="sermona-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></span></button>
<div class="sermona-lightbox__content">
<img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&amp;fit=crop&amp;w=1200&amp;q=80" width="1200" height="750" alt="Earth from space with thin blue atmosphere" loading="lazy" />
<p class="sermona-lightbox__caption">Full-width visual proof — pair with keyboard scroll lock and focus return in production.</p>
</div>
</div>

</div>

## Close control

**`.sermona-close-btn`** — 44×44px target, **`focus-visible`** ring. Use **`aria-label="Close"`** (or **“Close dialog”**) and hide the icon with **`aria-hidden="true"`**.

## Behavior checklist (implementation)

1. **Open** — Remove **`hidden`**, move **focus** to the first focusable control (often **Close** or primary action).  
2. **Close** — Restore focus to the **opener**; set **`hidden`** again.  
3. **Escape** — Close modal / lightbox.  
4. **Scroll** — Set **`overflow: hidden`** on **`document.body`** (or `padding-inline` trick) while open.  
5. **Tab** — Keep **focus cycle** inside the overlay (first/last focusable handling).  
6. **Reduced transparency** — Blur on **`.sermona-modal--blur`** is omitted when the user prefers reduced transparency.

## See also

- [Forms, buttons & CTAs](/forms-buttons-cta) — inputs and actions inside dialogs  
- [Voice & copy](/voice-and-copy) — confirmation and error copy  
- [Ecommerce patterns](/ecommerce-patterns) — product imagery workflows  
