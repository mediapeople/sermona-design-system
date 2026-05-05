---
title: Complex forms
description: Multi-section flows, error summaries, steppers, repeatable rows, segmented controls, and card radios — built on Sermona field primitives.
---

# Complex forms

Start with [Forms, buttons & CTAs](/forms-buttons-cta) for **labels**, **inputs**, and **buttons**. This page adds **layout and orchestration** for long flows: grouped sections, grids of fields, top-level error summaries, **step indicators**, **repeatable** line items, **segmented** toggles, and **radio cards**.

## Wider rail

- **`.sermona-form--wide`** — `max-width` ~42rem (applications, settings).  
- **`.sermona-form--full`** — drop the default cap inside split layouts or modals.

## Fieldsets & sections

Use **`fieldset.sermona-fieldset`** + **`legend.sermona-fieldset__legend`** for **one** group name announced to assistive tech. Wrap nested controls in **`.sermona-fieldset__stack`**.

**`.sermona-form-section`** is a **visual** band (elevated card) with **`.sermona-form-section__title`**, optional **`.sermona-form-section__lede`**, and **`.sermona-form-section__stack`** for fields — use when you are **not** replacing a single fieldset (e.g. “Shipping” vs “Billing”).

## Field rows

**`.sermona-field-row`** — responsive **CSS grid** for short inputs (ZIP, month/year codes). Add **`.sermona-field-row--duo`** for a stable **two-column** row (stacks ≤520px).

## Error summary

Place **`.sermona-form-summary`** **above** the first invalid section after submit. Use **`role="alert"`** + **`tabindex="-1"`** so focus can move to it programmatically. **`aria-labelledby`** the title id.

List issues with **links** (`href` pointing at **`id`** of the field or error message) for keyboard users.

<div class="sermona-root sermona-layout sermona-form--wide" style="margin: 1.5rem 0; padding: var(--sermona-space-5); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<form class="sermona-form sermona-form--wide" onsubmit="return false;">
<div class="sermona-form-summary" role="alert" aria-labelledby="err-summary-title" tabindex="-1">
<p class="sermona-form-summary__title" id="err-summary-title">2 fields need attention</p>
<ul class="sermona-form-summary__list">
<li><a class="sermona-link" href="#inv-company">Company is required for invoice</a></li>
<li><a class="sermona-link" href="#inv-vat">VAT ID format looks invalid</a></li>
</ul>
</div>
<fieldset class="sermona-fieldset">
<legend class="sermona-fieldset__legend">Invoice profile</legend>
<div class="sermona-fieldset__stack">
<div class="sermona-field sermona-field--invalid" id="inv-company">
<label class="sermona-label" for="demo-company">Company legal name</label>
<input class="sermona-input" id="demo-company" type="text" autocomplete="organization" aria-invalid="true" aria-describedby="demo-company-err" />
<p class="sermona-field__error" id="demo-company-err">Required for accounts payable.</p>
</div>
<div class="sermona-field-row">
<div class="sermona-field">
<label class="sermona-label" for="demo-country">Country</label>
<select class="sermona-select" id="demo-country" name="country">
<option>United States</option>
<option>Germany</option>
<option>Japan</option>
</select>
</div>
<div class="sermona-field">
<label class="sermona-label" for="demo-postal">Postal code</label>
<input class="sermona-input" id="demo-postal" name="postal" inputmode="numeric" autocomplete="postal-code" />
</div>
</div>
<div class="sermona-field sermona-field--invalid" id="inv-vat">
<label class="sermona-label" for="demo-vat">VAT ID</label>
<input class="sermona-input" id="demo-vat" type="text" aria-invalid="true" />
<p class="sermona-field__error">Use your country prefix (e.g. DE123…).</p>
</div>
</div>
</fieldset>
</form>

</div>

## Stepper (wizard chrome)

**`.sermona-form-stepper`** is an **ordered list** (`<ol>`) of **`.sermona-form-stepper__item`** with **`.sermona-form-stepper__index`** (step number) and label text. Modifiers: **`--current`**, **`--done`**. Wire **`aria-current="step"`** on the active **`li`** when mimicking a multi-page flow.

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0; padding: var(--sermona-space-4); border: 1px solid var(--sermona-color-border-subtle); border-radius: var(--sermona-radius-md);">

<ol class="sermona-form-stepper">
<li class="sermona-form-stepper__item sermona-form-stepper__item--done" aria-current="false"><span class="sermona-form-stepper__index" aria-hidden="true">1</span> Account</li>
<li class="sermona-form-stepper__item sermona-form-stepper__item--current" aria-current="step"><span class="sermona-form-stepper__index" aria-hidden="true">2</span> Billing</li>
<li class="sermona-form-stepper__item"><span class="sermona-form-stepper__index" aria-hidden="true">3</span> Review</li>
</ol>
<p class="sermona-meta" style="margin:0;">Use one primary per step — “Continue” not “Continue + Save” unless they differ.</p>

</div>

## Repeatable rows

**`.sermona-repeatable`** wraps **`.sermona-repeatable__row`** blocks. Each row has **`.sermona-repeatable__fields`** (grid of `.sermona-field` children) and optional **`.sermona-repeatable__remove`** (**ghost** button). **`.sermona-repeatable__toolbar`** holds **Add line** (secondary).

<div class="sermona-root sermona-layout sermona-form--wide" style="margin: 1.5rem 0;">

<div class="sermona-repeatable">
<div class="sermona-repeatable__row">
<div class="sermona-repeatable__fields">
<div class="sermona-field">
<label class="sermona-label" for="r1-sku">SKU</label>
<input class="sermona-input" id="r1-sku" type="text" />
</div>
<div class="sermona-field">
<label class="sermona-label" for="r1-qty">Qty</label>
<input class="sermona-input" id="r1-qty" type="number" min="1" inputmode="numeric" />
</div>
</div>
<button type="button" class="sermona-btn sermona-btn--ghost sermona-repeatable__remove" aria-label="Remove line 1">Remove</button>
</div>
<div class="sermona-repeatable__row">
<div class="sermona-repeatable__fields">
<div class="sermona-field">
<label class="sermona-label" for="r2-sku">SKU</label>
<input class="sermona-input" id="r2-sku" type="text" />
</div>
<div class="sermona-field">
<label class="sermona-label" for="r2-qty">Qty</label>
<input class="sermona-input" id="r2-qty" type="number" min="1" inputmode="numeric" />
</div>
</div>
<button type="button" class="sermona-btn sermona-btn--ghost sermona-repeatable__remove" aria-label="Remove line 2">Remove</button>
</div>
<div class="sermona-repeatable__toolbar">
<button type="button" class="sermona-btn sermona-btn--secondary">Add line</button>
</div>
</div>

</div>

## Segmented control

**`.sermona-segmented`** groups **`.sermona-segmented__btn`** buttons for **mutually exclusive** options (e.g. individual vs company). Use **`role="group"`** + **`aria-label`**, **`aria-pressed="true"`** on the selected button (or **`--selected`**).

Not a **tablist** — if steps change the whole panel, use real tabs or route-level steps instead.

<div class="sermona-root sermona-layout" style="margin: 1.5rem 0;">

<p class="sermona-label" id="seg-tax">Tax profile</p>
<div class="sermona-segmented" role="group" aria-labelledby="seg-tax">
<button type="button" class="sermona-segmented__btn" aria-pressed="true">Consumer</button>
<button type="button" class="sermona-segmented__btn" aria-pressed="false">Business</button>
<button type="button" class="sermona-segmented__btn" aria-pressed="false">Non-profit</button>
</div>

</div>

## Radio / choice cards

**`.sermona-choice-grid`** lays out **`label.sermona-choice-card`** tiles. Put the **`input type="radio"`** first with **`.sermona-sr-only`** so the **entire** card is the hit target; selected state uses **`:checked`** (add **`.sermona-choice-card--checked`** from JS if you must support browsers without **`:has`** — the CSS also styles **`:has(input:checked)`**).

<div class="sermona-root sermona-layout sermona-form--wide" style="margin: 1.5rem 0;">

<fieldset class="sermona-fieldset">
<legend class="sermona-fieldset__legend">Payout method</legend>
<div class="sermona-choice-grid">
<label class="sermona-choice-card">
<input class="sermona-sr-only" type="radio" name="payout" value="ach" checked />
<span class="sermona-choice__label">ACH</span>
<span class="sermona-choice__hint">2–3 business days · No fee</span>
</label>
<label class="sermona-choice-card">
<input class="sermona-sr-only" type="radio" name="payout" value="wire" />
<span class="sermona-choice__label">Wire</span>
<span class="sermona-choice__hint">Same day · Bank fees may apply</span>
</label>
</div>
</fieldset>

</div>

## Meta row (hint + counter)

**`.sermona-field__meta-row`** wraps **`.sermona-field__hint`** and **`.sermona-field__counter`** on one line (e.g. bio character count).

<div class="sermona-root sermona-layout sermona-form--wide" style="margin: 1.5rem 0;">

<div class="sermona-field">
<label class="sermona-label" for="demo-bio">Public bio</label>
<textarea class="sermona-textarea" id="demo-bio" rows="3" maxlength="280"></textarea>
<div class="sermona-field__meta-row">
<p class="sermona-field__hint" style="margin:0;">Shown on your speaker page.</p>
<p class="sermona-field__counter" aria-live="polite">0 / 280</p>
</div>
</div>

</div>

## See also

- [Forms, buttons & CTAs](/forms-buttons-cta) — core controls and CTAs  
- [Modals & lightbox](/modals-and-lightbox) — dialogs for sub-flows  
- [Data & tables](/data-and-tables) — read-only review tables  
- [Voice & copy](/voice-and-copy) — errors and labels  
