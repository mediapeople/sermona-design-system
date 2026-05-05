---
title: Forms, buttons & CTAs
description: Inputs, file pickers, choices, button variants, and CTA strips — Sermona CSS primitives with copy and accessibility notes.
---

# Forms, buttons & CTAs

Interactive surfaces stay **dark-first**: charcoal fields, hairline borders, and **gold** only for **primary** actions and **focus**. One primary button per view; everything else is secondary, ghost, or plain links.

## Buttons

| Class | Use |
| --- | --- |
| **`.sermona-btn sermona-btn--primary`** | Main action (submit, pay, continue). |
| **`.sermona-btn sermona-btn--secondary`** | Alternate solid control (e.g. *Save draft*) — not competing with primary on the same row. |
| **`.sermona-btn sermona-btn--ghost`** | Low-emphasis actions, nav-style actions in bands. |

Use `<a>` or `<button>` with the same classes. **`min-height: 44px`** keeps tap targets comfortable. **`:focus-visible`** uses the accent outline; **`disabled`** and **`aria-disabled="true"`** dim and block clicks.

Live row:

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0;">

<div class="sermona-form__actions" style="margin-top: 0;">
<button type="button" class="sermona-btn sermona-btn--primary">Publish update</button>
<button type="button" class="sermona-btn sermona-btn--secondary">Save draft</button>
<button type="button" class="sermona-btn sermona-btn--ghost">Cancel</button>
<button type="button" class="sermona-btn sermona-btn--primary" disabled>Disabled</button>
</div>

</div>

Copy for labels: see [Voice & copy → Buttons & links](/voice-and-copy#buttons-links).

## Form stack

**`.sermona-form`** — vertical stack with a readable **max width** (about 32rem).

**`.sermona-field`** wraps a **`.sermona-label`**, control, and optional **`.sermona-field__hint`** or **`.sermona-field__error`**. Add **`.sermona-field--invalid`** when server or client validation fails.

Controls: **`.sermona-input`**, **`.sermona-textarea`**, **`.sermona-select`**. Pair every label with **`for`** / **`id`**.

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0; padding: var(--sermona-space-5); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<form class="sermona-form" action="#" method="get" onsubmit="return false;">
<div class="sermona-field">
<label class="sermona-label" for="demo-email">Work email</label>
<input class="sermona-input" id="demo-email" name="email" type="email" autocomplete="email" placeholder="you@studio.com" />
<p class="sermona-field__hint">We’ll only use this for the trial workspace.</p>
</div>
<div class="sermona-field">
<label class="sermona-label" for="demo-role">Role <span class="sermona-label--optional">Optional</span></label>
<select class="sermona-select" id="demo-role" name="role">
<option value="">Choose one</option>
<option>Design</option>
<option>Engineering</option>
<option>Product</option>
</select>
</div>
<div class="sermona-field">
<label class="sermona-label" for="demo-notes">Project notes</label>
<textarea class="sermona-textarea" id="demo-notes" name="notes" rows="4" placeholder="Goals, timeline, links…"></textarea>
</div>
<div class="sermona-field sermona-field--invalid">
<label class="sermona-label" for="demo-budget">Budget band</label>
<input class="sermona-input" id="demo-budget" name="budget" type="text" value="n/a" aria-invalid="true" aria-describedby="demo-budget-err" />
<p class="sermona-field__error" id="demo-budget-err">Pick a range from the list so we can route you.</p>
</div>
<div class="sermona-form__actions sermona-form__actions--end">
<button type="button" class="sermona-btn sermona-btn--primary">Request access</button>
<button type="button" class="sermona-btn sermona-btn--ghost">Back</button>
</div>
</form>

</div>

## File inputs

Use **`.sermona-input`** on **`input type="file"`**. The **`::file-selector-button`** block is styled like a secondary control; the filename line stays meta-sized.

Keep **accept**, **multiple**, and max-size rules in validation — don’t rely on the picker alone.

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0;">

<div class="sermona-field">
<label class="sermona-label" for="demo-file">Brand guidelines (PDF)</label>
<input class="sermona-input" id="demo-file" name="file" type="file" accept=".pdf,application/pdf" />
<p class="sermona-field__hint">Up to 10 MB for this demo.</p>
</div>

</div>

## Checkboxes & radios

**`.sermona-choice`** on a `<label>` that wraps the input and a **`.sermona-choice__text`** block. Use **`.sermona-choice__label`** + optional **`.sermona-choice__hint`**.

Native controls use **`accent-color`** (gold). For groups of radios, share a **`name`** and paste a **`fieldset`** / **`legend`** in production for screen readers.

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0; padding: var(--sermona-space-5); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<div class="sermona-stack" style="gap: var(--sermona-space-4);">
<label class="sermona-choice">
<input type="checkbox" name="demo-nl" checked />
<span class="sermona-choice__text">
<span class="sermona-choice__label">Product updates</span>
<span class="sermona-choice__hint">Monthly; unsubscribe anytime.</span>
</span>
</label>
<label class="sermona-choice">
<input type="radio" name="demo-plan" value="sprint" checked />
<span class="sermona-choice__text">
<span class="sermona-choice__label">Sprint</span>
<span class="sermona-choice__hint">Fast audit + one surface.</span>
</span>
</label>
<label class="sermona-choice">
<input type="radio" name="demo-plan" value="program" />
<span class="sermona-choice__text">
<span class="sermona-choice__label">Program</span>
<span class="sermona-choice__hint">Library + ongoing support.</span>
</span>
</label>
</div>

</div>

## CTA strip

**`.sermona-cta`** is a flex band: copy on the left (first child), **`.sermona-cta__actions`** on the right with buttons. On narrow screens it stacks and buttons go full width (see [Services](/services)).

Reserve **primary** for the one decisive action. Secondary story belongs in **meta** under the heading.

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0;">

<div class="sermona-cta">
<div>
<p class="sermona-h3" style="margin: 0 0 var(--sermona-space-2);">Brief the studio</p>
<p class="sermona-meta" style="margin: 0;">Attach a deck or Notion link — we reply within two business days.</p>
</div>
<div class="sermona-cta__actions">
<a class="sermona-btn sermona-btn--primary" href="#">Start a brief</a>
<a class="sermona-btn sermona-btn--ghost" href="/voice-and-copy">Writing guide</a>
</div>
</div>

</div>

## Accessibility checklist

1. **Visible focus** — Don’t remove outlines; Sermona uses accent **`focus-visible`** on buttons and fields.  
2. **Names** — Every input has an associated label (visible or **`aria-label`** when space is tight).  
3. **Errors** — Tie messages with **`aria-describedby`**; set **`aria-invalid`** when showing **`.sermona-field__error`**.  
4. **Files** — Announce constraints (“PDF, max 10 MB”) in hint text or errors, not only in `accept`.  
5. **Primary overload** — If two actions feel equal, reconsider copy or use ghost + link instead of two primaries.

## See also

- [Components](/components) — full index of CSS classes  
- [Voice & copy](/voice-and-copy) — tone for labels and errors  
- [Services & pricing](/services) — CTA strip in context  
- [Data & tables](/data-and-tables) — when a form isn’t the right pattern  
- [Complex forms](/complex-forms) — multi-step, grouped, and repeatable flows  
