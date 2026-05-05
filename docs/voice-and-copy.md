---
title: Voice & copy
description: How to write in Sermona surfaces — labels, rhythm, errors, and what to say beside icons.
---

# Voice & copy

For **who uses what** and **how to talk about the system** in tickets and reviews, start with [Using Sermona](/using-sermona). This page is the **word-level** craft: tone, labels, errors, and icons.

Sermona reads like a **confident editor**, not a chatbot. Sentences are short. Jargon is earned. The gold accent draws the eye — your words should tell people **where to go next**, not decorate the page.

## Tone

- **Direct** — Lead with the outcome; trim filler (“simply”, “just”, “very”).
- **Warm, not cute** — Human without gimmicks; avoid fake familiarity.
- **Active verbs** — *Save*, *Publish*, *Connect* beat *Submit* when accurate.
- **Specific** — “Saved to Draft” beats “Success!”; say what happened.

## Structure on the page

| Element | Role | Guidance |
| --- | --- | --- |
| **Kicker** | Section label | Uppercase, few words, gold. *Issue 02 · Release notes* |
| **Lede** | Promise | One or two lines; answers “why should I care?” |
| **Heading** | Scan anchor | Nouns or short imperatives; avoid question titles unless FAQ |
| **Body** | Proof | Short paragraphs; one idea each |
| **Meta** | Context | Dates, authors, counts — `.sermona-meta` treatment |

## Buttons & links

- **Primary** — Verb + object when space allows: *Download report*, *Start trial*.
- **Secondary / ghost** — *Learn more* is acceptable if the heading already names the topic; otherwise *Learn about {topic}*.
- **Links in prose** — Prefer descriptive text over *click here*.

Details, live demos, and an a11y checklist: [Forms, buttons & CTAs](/forms-buttons-cta).

## Errors & empty states

1. Say what broke in plain language (no error codes alone).  
2. Say what the user can do next.  
3. Offer one recovery path (retry, contact, link).

*Bad:* “Error 500”  
*Better:* “We couldn’t load this issue. Refresh the page or try again in a minute.”

## Lists in content

- **Short bullets** — Parallel grammar; 3–7 items when possible.
- **With icons** — One short line per item unless you’re in a **feature** pattern (title + supporting line). See [Iconography](/iconography).
- **Numbered** — Use when order matters (steps, rankings).

## Icons + words

Icons **reinforce** text; they rarely replace it unless the symbol is universal (play, close, search). Default pattern:

1. **Glyph** carries recognition.  
2. **Label** carries meaning.  
3. **Optional hint** in meta style for pros.

Screen readers: **`aria-hidden="true"`** on decorative SVG; the visible label or **`aria-label`** on the control carries the name.

## Do / don’t

<div class="sermona-root sermona-two-col" style="margin: 1.25rem 0; gap: var(--sermona-space-4);">

<div class="sermona-card sermona-stack">
<p class="sermona-kicker">Do</p>
<ul class="sermona-icon-list sermona-icon-list--compact sermona-icon-list--checks">
<li class="sermona-icon-list__item">
<span class="sermona-icon-list__marker" aria-hidden="true"><span class="sermona-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span></span>
<p class="sermona-icon-list__body">Front-load the user benefit.</p>
</li>
<li class="sermona-icon-list__item">
<span class="sermona-icon-list__marker" aria-hidden="true"><span class="sermona-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span></span>
<p class="sermona-icon-list__body">Match label length to button width.</p>
</li>
<li class="sermona-icon-list__item">
<span class="sermona-icon-list__marker" aria-hidden="true"><span class="sermona-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span></span>
<p class="sermona-icon-list__body">Reuse the same term for the same concept.</p>
</li>
</ul>
</div>

<div class="sermona-card sermona-stack">
<p class="sermona-meta" style="color: var(--sermona-color-text-muted); text-transform: uppercase; letter-spacing: 0.06em; font-size: 11px;">Avoid</p>
<ul class="sermona-icon-list sermona-icon-list--compact">
<li class="sermona-icon-list__item">
<span class="sermona-icon-list__marker" aria-hidden="true"><span class="sermona-icon sermona-icon--muted"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></span>
<p class="sermona-icon-list__body">Stacking synonyms for “easy” and “fast.”</p>
</li>
<li class="sermona-icon-list__item">
<span class="sermona-icon-list__marker" aria-hidden="true"><span class="sermona-icon sermona-icon--muted"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></span>
<p class="sermona-icon-list__body">Mystery icons with no adjacent label.</p>
</li>
<li class="sermona-icon-list__item">
<span class="sermona-icon-list__marker" aria-hidden="true"><span class="sermona-icon sermona-icon--muted"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></span>
<p class="sermona-icon-list__body">Apologizing in the headline (*Oops!*) without a fix.</p>
</li>
</ul>
</div>

</div>

## See also

- [Using Sermona](/using-sermona) — team vocabulary and adoption  
- [Good digital design](/good-digital-design) — layout and rhythm principles  
- [Foundations](/foundations) — visual roles  
- [Iconography](/iconography) — lists and chips with glyphs  
