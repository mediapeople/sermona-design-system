import { readFileSync, mkdirSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "src", "tokens.json");
const dist = join(root, "dist");

mkdirSync(dist, { recursive: true });

const tokens = JSON.parse(readFileSync(src, "utf8"));
copyFileSync(src, join(dist, "tokens.json"));

function segmentKebab(s) {
  return String(s).replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function flatten(obj, prefix = "") {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const seg = segmentKebab(k);
    const key = prefix ? `${prefix}-${seg}` : seg;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flatten(v, key));
    } else {
      out[key] = v;
    }
  }
  return out;
}

const colorFlat = flatten(tokens.color);
const sansFamily = tokens.font.family.sans;
const displayFamily = tokens.font.family.display ?? sansFamily;
const monoFamily =
  tokens.font.family.mono ??
  'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace';
const fontFlat = {
  "font-family-sans": sansFamily,
  "font-family-display": displayFamily,
  "font-family-mono": monoFamily,
  ...Object.fromEntries(
    Object.entries(tokens.font.weight).map(([k, v]) => [`font-weight-${k}`, String(v)])
  ),
  ...Object.fromEntries(
    Object.entries(tokens.font.size).map(([k, v]) => [`font-size-${kebab(k)}`, v])
  ),
  ...Object.fromEntries(
    Object.entries(tokens.font.lineHeight).map(([k, v]) => [`line-height-${kebab(k)}`, String(v)])
  ),
  "letter-spacing-uppercase-label": tokens.font.letterSpacing.uppercaseLabel,
};
function kebab(s) {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
const spaceFlat = Object.fromEntries(
  Object.entries(tokens.space).map(([k, v]) => [`space-${k}`, v])
);
const radiusFlat = Object.fromEntries(
  Object.entries(tokens.radius).map(([k, v]) => [`radius-${k}`, v])
);
const shadowFlat = Object.fromEntries(
  Object.entries(tokens.shadow).map(([k, v]) => [`shadow-${k}`, v])
);

const iconFlat = tokens.icon ? flatten(tokens.icon) : {};
const layoutFlat = tokens.layout ? flatten(tokens.layout) : {};
const motionFlat = tokens.motion ? flatten(tokens.motion) : {};

const all = {
  ...Object.fromEntries(Object.entries(colorFlat).map(([k, v]) => [`color-${k}`, v])),
  ...fontFlat,
  ...spaceFlat,
  ...radiusFlat,
  ...shadowFlat,
  ...Object.fromEntries(Object.entries(iconFlat).map(([k, v]) => [`icon-${k}`, v])),
  ...Object.fromEntries(Object.entries(layoutFlat).map(([k, v]) => [`layout-${k}`, v])),
  ...Object.fromEntries(Object.entries(motionFlat).map(([k, v]) => [`motion-${k}`, v])),
};

const cssVars = Object.entries(all)
  .map(([k, v]) => `  --sermona-${k}: ${v};`)
  .join("\n");

const css = `/**
 * Sermona design tokens (generated). Source: packages/sermona-tokens/src/tokens.json
 * Figma: https://www.figma.com/design/IC2hBpxXtkX9Hzb5IMdwmh/Sermona
 *
 * Product integration: set on :root — --sermona-font-family-sans, --sermona-font-family-display,
 * --sermona-font-family-mono, --sermona-icon-font-family (see Tokens + Iconography docs).
 */
:root {
${cssVars}
  --sermona-font-family-body: var(--sermona-font-family-sans);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.sermona-root {
  font-family: var(--sermona-font-family-body);
  background: var(--sermona-color-bg-page);
  color: var(--sermona-color-text-primary);
  line-height: var(--sermona-line-height-body);
  max-width: 100%;
  overflow-x: clip;
}
`;

writeFileSync(join(dist, "sermona.css"), css, "utf8");

/* Semantic component layer */
const components = `/**
 * Sermona component primitives for documentation / marketing pages.
 * Import after sermona.css: @import "@sermona/tokens/css"; @import "@sermona/tokens/components.css";
 */
.sermona-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-3);
}

.sermona-stack--loose {
  gap: var(--sermona-space-4);
}

.sermona-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sermona-display-light {
  font-family: var(--sermona-font-family-display);
  font-weight: var(--sermona-font-weight-light);
  font-size: clamp(2.75rem, 12vw, var(--sermona-font-size-display-ultraman));
  line-height: 1.06;
  text-transform: capitalize;
  color: var(--sermona-color-text-primary);
  margin: 0;
  /* Avoid overflow-wrap:anywhere in grid columns — reads as broken display type */
  overflow-wrap: break-word;
  word-break: normal;
}

.sermona-display-hero {
  font-family: var(--sermona-font-family-display);
  font-weight: var(--sermona-font-weight-bold);
  font-size: clamp(2.25rem, 10.5vw, var(--sermona-font-size-display-megaman));
  line-height: 1.06;
  text-transform: capitalize;
  color: var(--sermona-color-text-primary);
  margin: 0;
  overflow-wrap: break-word;
  word-break: normal;
}

/* Dual-line editorial headline: ghost layer + solid layer (centered “double exposure”) */
.sermona-editorial-stack {
  display: grid;
  place-items: center;
  justify-items: center;
  position: relative;
  isolation: isolate;
  margin: 0 auto;
  max-width: 100%;
  padding-block: var(--sermona-space-2);
}

.sermona-editorial-stack__layer {
  font-family: var(--sermona-font-family-display);
  font-weight: var(--sermona-font-weight-bold);
  font-size: clamp(2rem, 5.5vw + 0.5rem, 3.25rem);
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: capitalize;
  grid-column: 1;
  grid-row: 1;
  margin: 0;
  overflow-wrap: break-word;
  word-break: normal;
  max-width: 16ch;
  text-align: center;
}

.sermona-editorial-stack__layer--back {
  transform: translate(-0.06em, 0.15em);
  color: rgba(255, 255, 255, 0.22);
  z-index: 0;
}

.sermona-editorial-stack__layer--front {
  transform: translate(0.05em, -0.1em);
  color: var(--sermona-color-text-primary);
  z-index: 1;
}

.sermona-editorial-cell {
  background: var(--sermona-color-bg-card);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-sm);
  padding: var(--sermona-space-6) var(--sermona-space-5);
  box-sizing: border-box;
  text-align: center;
}

.sermona-editorial-cell__stack {
  margin-inline: auto;
}

.sermona-editorial-cell .sermona-body {
  margin: var(--sermona-space-4) auto 0;
  max-width: 36ch;
  color: var(--sermona-color-text-muted);
}

.sermona-editorial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 17.5rem), 1fr));
  gap: var(--sermona-space-4);
}

.sermona-h2 {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: clamp(1.75rem, 5vw, var(--sermona-font-size-h2));
  line-height: var(--sermona-line-height-snug);
  text-transform: capitalize;
  margin: 0;
}

.sermona-h3 {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: clamp(1.25rem, 4.5vw, var(--sermona-font-size-h3));
  line-height: 1.4;
  margin: 0;
}

.sermona-body {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-regular);
  font-size: var(--sermona-font-size-body);
  line-height: var(--sermona-line-height-body);
  margin: 0;
}

.sermona-meta {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-regular);
  font-size: var(--sermona-font-size-meta);
  line-height: var(--sermona-line-height-meta-max);
  color: var(--sermona-color-text-muted);
  margin: 0;
}

.sermona-link {
  color: var(--sermona-color-accent-primary);
  text-decoration: none;
}
.sermona-link:hover {
  text-decoration: underline;
}

.sermona-rule {
  border: 0;
  border-top: 1px solid var(--sermona-color-border-meta);
  margin: 0;
}

.sermona-card {
  background: var(--sermona-color-bg-card);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-sm);
  box-shadow: var(--sermona-shadow-card);
  padding: var(--sermona-space-7);
}

.sermona-card--flat {
  box-shadow: none;
}

.sermona-card--dense {
  padding: var(--sermona-space-4);
}

.sermona-card--stack {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-3);
  align-items: stretch;
}

.sermona-card__footer {
  margin-top: auto;
}

.sermona-card--interactive {
  transition:
    border-color var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard),
    box-shadow var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard),
    transform var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard);
}

.sermona-card--interactive:hover {
  border-color: var(--sermona-color-border-hairline);
  box-shadow: var(--sermona-shadow-lift);
}

.sermona-card--interactive:active {
  transform: translateY(1px);
}

a.sermona-card.sermona-card--interactive {
  text-decoration: none;
  color: inherit;
}

a.sermona-card.sermona-card--interactive:focus-visible {
  outline: 2px solid var(--sermona-color-accent-primary);
  outline-offset: 2px;
}

.sermona-quote {
  border-top: 1px solid var(--sermona-color-border-quote);
  border-bottom: 1px solid var(--sermona-color-border-quote);
  padding: var(--sermona-space-5) var(--sermona-space-6);
}
.sermona-quote__text {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-medium);
  font-size: var(--sermona-font-size-h4);
  line-height: var(--sermona-line-height-relaxed);
  color: var(--sermona-color-accent-primary);
  margin: 0 0 var(--sermona-space-3);
}
.sermona-quote__cite {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  color: var(--sermona-color-text-primary);
  margin: 0;
}

.sermona-layout {
  max-width: var(--sermona-layout-max-content);
  margin: 0 auto;
  padding: var(--sermona-space-9);
}
`;

const sectionPatterns = `
/* ——— Sections, iconography, services (extrapolated from Sermona editorial seed) ——— */

.sermona-layout--wide {
  max-width: var(--sermona-layout-max-wide);
}
.sermona-layout--full {
  max-width: var(--sermona-layout-max-full);
}

.sermona-section {
  padding-block: var(--sermona-layout-section-y-default);
}
.sermona-section--tight {
  padding-block: var(--sermona-layout-section-y-tight);
}
.sermona-section--loose {
  padding-block: var(--sermona-layout-section-y-loose);
}

.sermona-section__header {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-2);
  max-width: var(--sermona-layout-max-content);
  margin-bottom: var(--sermona-space-4);
}

.sermona-kicker {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-meta);
  letter-spacing: var(--sermona-letter-spacing-uppercase-label);
  line-height: var(--sermona-line-height-meta-max);
  text-transform: uppercase;
  color: var(--sermona-color-accent-primary);
  margin: 0;
}

.sermona-lede {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-light);
  font-size: var(--sermona-font-size-h4);
  line-height: var(--sermona-line-height-relaxed);
  color: var(--sermona-color-text-primary);
  margin: 0;
  max-width: min(48ch, 100%);
}

.sermona-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sermona-layout-gap-cols);
  align-items: start;
}
@media (max-width: 700px) {
  .sermona-two-col {
    grid-template-columns: 1fr;
  }
}

/* Inline SVG / IconJar-exported glyphs */
.sermona-icon {
  width: var(--sermona-icon-size-md);
  height: var(--sermona-icon-size-md);
  flex-shrink: 0;
  color: var(--sermona-color-icon-default);
}
.sermona-icon--sm { width: var(--sermona-icon-size-sm); height: var(--sermona-icon-size-sm); }
.sermona-icon--lg { width: var(--sermona-icon-size-lg); height: var(--sermona-icon-size-lg); }
.sermona-icon--xl { width: var(--sermona-icon-size-xl); height: var(--sermona-icon-size-xl); }
.sermona-icon--accent { color: var(--sermona-color-icon-accent); }
.sermona-icon--muted { color: var(--sermona-color-icon-muted); }

/* Icon font / ligature font (Material Symbols, Phosphor fill, etc.): set --sermona-icon-font-* on :root */
.sermona-icon--font {
  font-family: var(--sermona-icon-font-family);
  font-weight: var(--sermona-icon-font-weight);
  font-style: var(--sermona-icon-font-style);
  font-variation-settings: var(--sermona-icon-font-variation-settings);
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.sermona-icon--font svg {
  display: none;
}

.sermona-icon svg {
  display: block;
  width: 100%;
  height: 100%;
}

.sermona-icon-tile {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-3);
  padding: var(--sermona-space-4);
  background: var(--sermona-color-surface-icon-tile);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
  transition:
    background-color var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard),
    border-color var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard),
    box-shadow var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard);
}
.sermona-icon-tile:hover {
  background: var(--sermona-color-surface-icon-tile-hover);
  box-shadow: var(--sermona-shadow-lift);
}

.sermona-icon-tile__glyph {
  width: var(--sermona-icon-tile-lg);
  height: var(--sermona-icon-tile-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--sermona-radius-sm);
  background: var(--sermona-color-bg-page);
  border: 1px solid var(--sermona-color-border-hairline);
  color: var(--sermona-color-icon-accent);
}
.sermona-icon-tile__glyph .sermona-icon {
  width: var(--sermona-icon-size-lg);
  height: var(--sermona-icon-size-lg);
}

.sermona-icon-tile__title {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  line-height: var(--sermona-line-height-snug);
  margin: 0;
  color: var(--sermona-color-text-primary);
}

.sermona-icon-tile__body {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-regular);
  font-size: var(--sermona-font-size-meta);
  line-height: var(--sermona-line-height-meta-max);
  color: var(--sermona-color-text-muted);
  margin: 0;
}

.sermona-icon-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--sermona-layout-gap-icon-row);
}

.sermona-icon-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--sermona-space-2);
  padding: var(--sermona-space-1) var(--sermona-space-3);
  border-radius: var(--sermona-radius-full);
  border: 1px solid var(--sermona-color-border-subtle);
  background: var(--sermona-color-bg-elevated);
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-primary);
}

.sermona-icon-chip .sermona-icon {
  width: var(--sermona-icon-size-sm);
  height: var(--sermona-icon-size-sm);
  color: var(--sermona-color-icon-accent);
}

/* Service / pricing-style cards */
.sermona-service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: var(--sermona-space-4);
}

.sermona-service-card {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-3);
  padding: var(--sermona-space-5);
  background: var(--sermona-color-bg-card);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
  box-shadow: var(--sermona-shadow-card);
}

.sermona-service-card__label {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-meta);
  letter-spacing: var(--sermona-letter-spacing-uppercase-label);
  text-transform: uppercase;
  color: var(--sermona-color-accent-primary);
  margin: 0;
}

.sermona-service-card__title {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-h3);
  line-height: 1.35;
  margin: 0;
}

.sermona-service-card__list {
  margin: 0;
  padding-left: 1.1em;
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  line-height: var(--sermona-line-height-body);
  color: var(--sermona-color-text-muted);
}

.sermona-service-card__cta {
  margin-top: auto;
  padding-top: var(--sermona-space-2);
}

.sermona-service-card--interactive {
  transition:
    border-color var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard),
    box-shadow var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard),
    transform var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard);
}
.sermona-service-card--interactive:hover {
  border-color: var(--sermona-color-border-hairline);
  box-shadow: var(--sermona-shadow-lift);
}
.sermona-service-card--interactive:active {
  transform: translateY(1px);
}
a.sermona-service-card {
  text-decoration: none;
  color: inherit;
}
a.sermona-service-card:focus-visible {
  outline: 2px solid var(--sermona-color-accent-primary);
  outline-offset: 2px;
}

/* Ecommerce: PLP cards, PDP variants, cart, promos */
.sermona-product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
  gap: var(--sermona-space-4);
}

.sermona-product-card {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-3);
  padding: 0 0 var(--sermona-space-4);
  background: var(--sermona-color-bg-card);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
  overflow: hidden;
  box-shadow: var(--sermona-shadow-card);
}

.sermona-product-card--interactive {
  transition:
    border-color var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard),
    box-shadow var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard);
}
.sermona-product-card--interactive:hover {
  border-color: var(--sermona-color-border-hairline);
  box-shadow: var(--sermona-shadow-lift);
}

a.sermona-product-card {
  text-decoration: none;
  color: inherit;
}
a.sermona-product-card:focus-visible {
  outline: 2px solid var(--sermona-color-accent-primary);
  outline-offset: 2px;
}

.sermona-product-card__media {
  position: relative;
  aspect-ratio: 1;
  background: var(--sermona-color-bg-page);
  border-bottom: 1px solid var(--sermona-color-border-subtle);
}

.sermona-product-card__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sermona-product-card__badge {
  position: absolute;
  top: var(--sermona-space-2);
  left: var(--sermona-space-2);
  z-index: 1;
}

.sermona-product-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-2);
  padding: 0 var(--sermona-space-4);
  flex: 1 1 auto;
}

.sermona-product-card__vendor {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  margin: 0;
  line-height: var(--sermona-line-height-meta-max);
}

.sermona-product-card__title {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  line-height: var(--sermona-line-height-snug);
  margin: 0;
  color: var(--sermona-color-text-primary);
}

.sermona-product-card__meta {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  margin: 0;
  line-height: var(--sermona-line-height-meta-max);
}

.sermona-product-card__footer {
  margin-top: auto;
  padding: var(--sermona-space-2) var(--sermona-space-4) 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--sermona-space-2);
}

.sermona-product-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px var(--sermona-space-2);
  border-radius: var(--sermona-radius-sm);
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-xs);
  font-weight: var(--sermona-font-weight-bold);
  letter-spacing: var(--sermona-letter-spacing-uppercase-label);
  text-transform: uppercase;
  line-height: 1.2;
}

.sermona-product-badge--sale {
  background: var(--sermona-color-accent-primary);
  color: var(--sermona-color-accent-on-accent);
}

.sermona-product-badge--neutral {
  background: var(--sermona-color-bg-elevated);
  color: var(--sermona-color-text-primary);
  border: 1px solid var(--sermona-color-border-hairline);
}

.sermona-price {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--sermona-space-2);
  font-family: var(--sermona-font-family-sans);
  font-variant-numeric: tabular-nums;
}

.sermona-price__current {
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  color: var(--sermona-color-text-primary);
}

.sermona-price__was {
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  text-decoration: line-through;
  text-decoration-color: var(--sermona-color-border-meta);
}

.sermona-price__note {
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  width: 100%;
  margin: 0;
  line-height: var(--sermona-line-height-meta-max);
}

.sermona-price--accent .sermona-price__current {
  color: var(--sermona-color-accent-primary);
}

.sermona-variant-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sermona-space-2);
  margin: var(--sermona-space-2) 0 var(--sermona-space-4);
}

.sermona-variant-pill {
  min-height: 44px;
  padding: 0 var(--sermona-space-3);
  border-radius: var(--sermona-radius-sm);
  border: 1px solid var(--sermona-color-border-hairline);
  background: var(--sermona-color-bg-page);
  color: var(--sermona-color-text-primary);
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  font-weight: var(--sermona-font-weight-bold);
  cursor: pointer;
  transition:
    border-color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard),
    background-color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard);
}

.sermona-variant-pill:hover {
  border-color: var(--sermona-color-accent-primary);
}

.sermona-variant-pill[aria-pressed="true"],
.sermona-variant-pill--selected {
  border-color: var(--sermona-color-accent-primary);
  background: rgba(255, 214, 0, 0.1);
}

.sermona-variant-pill:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.sermona-promo-banner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--sermona-space-2) var(--sermona-space-4);
  padding: var(--sermona-space-3) var(--sermona-space-4);
  background: linear-gradient(
    90deg,
    rgba(255, 214, 0, 0.11) 0%,
    rgba(255, 214, 0, 0.05) 50%,
    rgba(255, 214, 0, 0.11) 100%
  );
  border: 1px solid rgba(255, 214, 0, 0.22);
  border-radius: var(--sermona-radius-sm);
  text-align: center;
}

.sermona-promo-banner__text {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  font-weight: var(--sermona-font-weight-bold);
  color: var(--sermona-color-text-primary);
  margin: 0;
}

.sermona-promo-banner__detail {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  margin: 0;
}

.sermona-trust-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--sermona-space-4) var(--sermona-space-6);
  padding: var(--sermona-space-4) var(--sermona-space-3);
  border-top: 1px solid var(--sermona-color-border-meta);
  border-bottom: 1px solid var(--sermona-color-border-meta);
}

.sermona-trust-strip__item {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  display: inline-flex;
  align-items: center;
  gap: var(--sermona-space-2);
  line-height: var(--sermona-line-height-meta-max);
}

.sermona-trust-strip__item .sermona-icon {
  color: var(--sermona-color-icon-accent);
}

.sermona-cart-line {
  display: grid;
  grid-template-columns: 72px 1fr auto;
  grid-template-areas: "thumb details aside";
  gap: var(--sermona-space-3) var(--sermona-space-4);
  align-items: start;
  padding: var(--sermona-space-4) 0;
  border-bottom: 1px solid var(--sermona-color-border-subtle);
}

.sermona-cart-line__thumb {
  grid-area: thumb;
  width: 72px;
  height: 72px;
  border-radius: var(--sermona-radius-sm);
  border: 1px solid var(--sermona-color-border-subtle);
  background: var(--sermona-color-bg-page);
  overflow: hidden;
}
.sermona-cart-line__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.sermona-cart-line__details {
  grid-area: details;
  min-width: 0;
}

.sermona-cart-line__title {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-body);
  font-weight: var(--sermona-font-weight-bold);
  margin: 0 0 var(--sermona-space-1);
  color: var(--sermona-color-text-primary);
  line-height: var(--sermona-line-height-snug);
}

.sermona-cart-line__variant {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  margin: 0 0 var(--sermona-space-2);
  line-height: var(--sermona-line-height-meta-max);
}

.sermona-cart-line__qty {
  font-family: var(--sermona-font-family-sans);
  font-variant-numeric: tabular-nums;
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  margin: 0;
}

.sermona-cart-line__aside {
  grid-area: aside;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--sermona-space-1);
  text-align: right;
}

.sermona-cart-line__total {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  font-variant-numeric: tabular-nums;
  color: var(--sermona-color-text-primary);
  margin: 0;
}

.sermona-order-summary {
  padding: var(--sermona-space-4);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
  background: var(--sermona-color-bg-elevated);
}

.sermona-order-summary__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--sermona-space-3);
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  margin: 0 0 var(--sermona-space-2);
  font-variant-numeric: tabular-nums;
}

.sermona-order-summary__row strong {
  font-weight: var(--sermona-font-weight-bold);
  color: var(--sermona-color-text-primary);
}

.sermona-order-summary__total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--sermona-space-3);
  margin: var(--sermona-space-4) 0 0;
  padding-top: var(--sermona-space-3);
  border-top: 1px solid var(--sermona-color-border-subtle);
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-body);
  font-weight: var(--sermona-font-weight-bold);
  font-variant-numeric: tabular-nums;
  color: var(--sermona-color-text-primary);
}

/* Modal dialog + image lightbox (use JS for open state, focus trap, scroll lock, Escape) */
.sermona-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: max(var(--sermona-space-4), env(safe-area-inset-top)) max(var(--sermona-space-4), env(safe-area-inset-right))
    max(var(--sermona-space-4), env(safe-area-inset-bottom)) max(var(--sermona-space-4), env(safe-area-inset-left));
  box-sizing: border-box;
}

.sermona-modal[hidden] {
  display: none !important;
}

.sermona-modal__backdrop {
  position: absolute;
  inset: 0;
  background: var(--sermona-color-surface-scrim);
}

@media (prefers-reduced-transparency: no-preference) {
  .sermona-modal--blur .sermona-modal__backdrop {
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
}

.sermona-modal__panel {
  position: relative;
  z-index: 1;
  width: min(100%, 520px);
  max-height: min(88dvh, 800px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: var(--sermona-color-bg-card);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
  box-shadow: var(--sermona-shadow-lift);
  padding: var(--sermona-space-5);
  color: var(--sermona-color-text-primary);
}

.sermona-modal--wide .sermona-modal__panel {
  width: min(100%, 720px);
}

.sermona-modal--narrow .sermona-modal__panel {
  width: min(100%, 400px);
}

.sermona-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--sermona-space-3);
  margin-bottom: var(--sermona-space-4);
}

.sermona-modal__title {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-h3);
  line-height: 1.35;
  margin: 0;
  padding-right: var(--sermona-space-2);
}

.sermona-modal__body {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-body);
  line-height: var(--sermona-line-height-body);
  color: var(--sermona-color-text-muted);
}

.sermona-modal__body :first-child {
  margin-top: 0;
}
.sermona-modal__body :last-child {
  margin-bottom: 0;
}

.sermona-modal__footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sermona-space-2);
  justify-content: flex-end;
  margin-top: var(--sermona-space-5);
  padding-top: var(--sermona-space-4);
  border-top: 1px solid var(--sermona-color-border-subtle);
}

.sermona-close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  margin: -6px -6px 0 0;
  padding: 0;
  border: none;
  border-radius: var(--sermona-radius-sm);
  background: transparent;
  color: var(--sermona-color-text-muted);
  cursor: pointer;
  transition:
    background-color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard),
    color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard);
}

.sermona-close-btn:hover {
  background: var(--sermona-color-surface-icon-tile);
  color: var(--sermona-color-text-primary);
}

.sermona-close-btn:focus-visible {
  outline: 2px solid var(--sermona-color-accent-primary);
  outline-offset: 2px;
}

.sermona-close-btn .sermona-icon {
  width: var(--sermona-icon-size-md);
  height: var(--sermona-icon-size-md);
}

.sermona-lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: max(var(--sermona-space-5), env(safe-area-inset-top)) max(var(--sermona-space-4), env(safe-area-inset-right))
    max(var(--sermona-space-5), env(safe-area-inset-bottom)) max(var(--sermona-space-4), env(safe-area-inset-left));
  box-sizing: border-box;
}

.sermona-lightbox[hidden] {
  display: none !important;
}

.sermona-lightbox__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
}

.sermona-lightbox__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: min(96vw, 1400px);
  max-height: 100%;
}

.sermona-lightbox__content img {
  max-width: 100%;
  max-height: min(82dvh, 900px);
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  border-radius: var(--sermona-radius-sm);
  box-shadow: var(--sermona-shadow-lift);
}

.sermona-lightbox__caption {
  margin: var(--sermona-space-3) 0 0;
  padding: 0 var(--sermona-space-3);
  text-align: center;
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  line-height: var(--sermona-line-height-meta-max);
  color: rgba(255, 255, 255, 0.72);
  max-width: 56ch;
}

.sermona-lightbox__close {
  position: absolute;
  top: max(var(--sermona-space-3), env(safe-area-inset-top));
  right: max(var(--sermona-space-3), env(safe-area-inset-right));
  z-index: 2;
}

.sermona-lightbox .sermona-close-btn {
  color: rgba(255, 255, 255, 0.88);
  margin: 0;
}

.sermona-lightbox .sermona-close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.sermona-modal--demo {
  position: relative;
  inset: auto;
  z-index: 0;
  min-height: 240px;
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
  background: var(--sermona-color-bg-elevated);
}

.sermona-modal--demo .sermona-modal__backdrop {
  border-radius: inherit;
}

.sermona-lightbox--demo {
  position: relative;
  inset: auto;
  z-index: 0;
  min-height: 260px;
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
  overflow: hidden;
}

.sermona-lightbox--demo .sermona-lightbox__backdrop {
  border-radius: inherit;
}

.sermona-lightbox--demo .sermona-lightbox__content img {
  max-height: 200px;
}

/* Blog / journal: article, index cards, tags, byline, series */
.sermona-post {
  max-width: var(--sermona-layout-max-content);
  margin: 0 auto;
}

.sermona-post__header {
  margin-bottom: var(--sermona-space-6);
  padding-bottom: var(--sermona-space-5);
  border-bottom: 1px solid var(--sermona-color-border-meta);
}

.sermona-post__eyebrow {
  margin: 0 0 var(--sermona-space-2);
}

.sermona-post__title {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: clamp(1.75rem, 5vw, var(--sermona-font-size-h2));
  line-height: var(--sermona-line-height-snug);
  margin: 0 0 var(--sermona-space-3);
  color: var(--sermona-color-text-primary);
  text-transform: capitalize;
}

.sermona-post__deck {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-light);
  font-size: var(--sermona-font-size-h4);
  line-height: var(--sermona-line-height-relaxed);
  color: var(--sermona-color-text-primary);
  margin: 0;
  max-width: min(42ch, 100%);
}

.sermona-post__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sermona-space-2) var(--sermona-space-4);
  align-items: center;
  margin-top: var(--sermona-space-4);
}

.sermona-post__byline {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  line-height: var(--sermona-line-height-meta-max);
  margin: 0;
}

.sermona-post__byline strong {
  color: var(--sermona-color-text-primary);
  font-weight: var(--sermona-font-weight-bold);
}

.sermona-series-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--sermona-space-2);
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  font-weight: var(--sermona-font-weight-bold);
  letter-spacing: var(--sermona-letter-spacing-uppercase-label);
  text-transform: uppercase;
  color: var(--sermona-color-accent-primary);
  margin: 0 0 var(--sermona-space-2);
}

.sermona-post__cover {
  margin: 0 0 var(--sermona-space-6);
  border-radius: var(--sermona-radius-sm);
  overflow: hidden;
  border: 1px solid var(--sermona-color-border-subtle);
  aspect-ratio: 21 / 9;
  background: var(--sermona-color-bg-page);
}

.sermona-post__cover--bleed {
  margin-left: calc(-1 * var(--sermona-space-4));
  margin-right: calc(-1 * var(--sermona-space-4));
  border-radius: var(--sermona-radius-md);
}

.sermona-post__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.sermona-post__body {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-body);
  line-height: var(--sermona-line-height-body);
  color: var(--sermona-color-text-primary);
}

.sermona-post__body > * + * {
  margin-top: var(--sermona-space-3);
}

.sermona-post__footer {
  margin-top: var(--sermona-space-7);
  padding-top: var(--sermona-space-5);
  border-top: 1px solid var(--sermona-color-border-meta);
}

.sermona-tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sermona-space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.sermona-tag-row li {
  margin: 0;
}

a.sermona-tag,
span.sermona-tag {
  display: inline-flex;
  align-items: center;
  padding: var(--sermona-space-1) var(--sermona-space-3);
  border-radius: var(--sermona-radius-full);
  border: 1px solid var(--sermona-color-border-subtle);
  background: var(--sermona-color-bg-elevated);
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  font-weight: var(--sermona-font-weight-bold);
  color: var(--sermona-color-text-primary);
  text-decoration: none;
  transition:
    border-color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard),
    color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard);
}

a.sermona-tag:hover {
  border-color: var(--sermona-color-accent-primary);
  color: var(--sermona-color-accent-primary);
}

a.sermona-tag:focus-visible {
  outline: 2px solid var(--sermona-color-accent-primary);
  outline-offset: 2px;
}

.sermona-author {
  display: flex;
  gap: var(--sermona-space-3);
  align-items: flex-start;
  padding: var(--sermona-space-4);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
  background: var(--sermona-color-bg-elevated);
}

.sermona-author__avatar {
  width: var(--sermona-icon-tile-md);
  height: var(--sermona-icon-tile-md);
  border-radius: var(--sermona-radius-full);
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid var(--sermona-color-border-hairline);
}

.sermona-author__body {
  min-width: 0;
}

.sermona-author__name {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  margin: 0 0 var(--sermona-space-1);
  color: var(--sermona-color-text-primary);
}

.sermona-author__bio {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  line-height: var(--sermona-line-height-body);
  margin: 0;
}

.sermona-post-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sermona-space-4);
  margin-top: var(--sermona-space-6);
}

a.sermona-post-nav__link {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-1);
  padding: var(--sermona-space-4);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
  background: var(--sermona-color-bg-card);
  text-decoration: none;
  color: inherit;
  min-height: 5.5rem;
  transition:
    border-color var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard),
    box-shadow var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard);
}

a.sermona-post-nav__link:hover {
  border-color: var(--sermona-color-border-hairline);
  box-shadow: var(--sermona-shadow-lift);
}

a.sermona-post-nav__link:focus-visible {
  outline: 2px solid var(--sermona-color-accent-primary);
  outline-offset: 2px;
}

.sermona-post-nav__dir {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  font-weight: var(--sermona-font-weight-bold);
  letter-spacing: var(--sermona-letter-spacing-uppercase-label);
  text-transform: uppercase;
  color: var(--sermona-color-accent-primary);
}

.sermona-post-nav__title {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  margin: 0;
  color: var(--sermona-color-text-primary);
  line-height: var(--sermona-line-height-snug);
}

.sermona-blog-card {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-3);
  height: 100%;
  padding: 0 0 var(--sermona-space-4);
  border-radius: var(--sermona-radius-md);
  border: 1px solid var(--sermona-color-border-subtle);
  overflow: hidden;
  background: var(--sermona-color-bg-card);
  box-shadow: var(--sermona-shadow-card);
}

a.sermona-blog-card {
  text-decoration: none;
  color: inherit;
  transition:
    border-color var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard),
    box-shadow var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard);
}

a.sermona-blog-card:hover {
  border-color: var(--sermona-color-border-hairline);
  box-shadow: var(--sermona-shadow-lift);
}

a.sermona-blog-card:focus-visible {
  outline: 2px solid var(--sermona-color-accent-primary);
  outline-offset: 2px;
}

.sermona-blog-card__media {
  aspect-ratio: 16 / 10;
  background: var(--sermona-color-bg-page);
  border-bottom: 1px solid var(--sermona-color-border-subtle);
}

.sermona-blog-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.sermona-blog-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-2);
  padding: 0 var(--sermona-space-4);
  flex: 1 1 auto;
}

.sermona-blog-card__meta {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  margin: 0;
  line-height: var(--sermona-line-height-meta-max);
}

.sermona-blog-card__title {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  line-height: var(--sermona-line-height-snug);
  margin: 0;
  color: var(--sermona-color-text-primary);
}

.sermona-blog-card__excerpt {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  line-height: var(--sermona-line-height-body);
  margin: 0;
}

.sermona-blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: var(--sermona-space-4);
}

a.sermona-blog-card,
a.sermona-blog-card:hover {
  color: inherit;
}

a.sermona-post-nav__link,
a.sermona-post-nav__link:hover {
  color: inherit;
}

@media (max-width: 600px) {
  .sermona-post-nav {
    grid-template-columns: 1fr;
  }
  .sermona-post__cover--bleed {
    margin-left: 0;
    margin-right: 0;
  }
}

/* Admin dashboard & instrumentation */
.sermona-admin-shell {
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  max-width: 100%;
  background: var(--sermona-color-bg-page);
}

.sermona-admin-shell--demo {
  min-height: auto;
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
  overflow: hidden;
}

.sermona-admin-shell--demo .sermona-admin-main {
  min-height: 340px;
}

.sermona-admin-sidebar {
  flex: 0 0 15rem;
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-2);
  padding: var(--sermona-space-4) var(--sermona-space-3);
  border-right: 1px solid var(--sermona-color-border-subtle);
  background: var(--sermona-color-bg-elevated);
}

.sermona-admin-sidebar__brand {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  margin: 0 0 var(--sermona-space-4);
  color: var(--sermona-color-text-primary);
}

.sermona-admin-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-1);
}

.sermona-admin-nav__link {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: var(--sermona-space-2) var(--sermona-space-3);
  border-radius: var(--sermona-radius-sm);
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  font-weight: var(--sermona-font-weight-bold);
  color: var(--sermona-color-text-muted);
  text-decoration: none;
  transition:
    background-color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard),
    color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard);
}

.sermona-admin-nav__link:hover {
  background: var(--sermona-color-surface-icon-tile);
  color: var(--sermona-color-text-primary);
}

.sermona-admin-nav__link[aria-current="page"],
.sermona-admin-nav__link--active {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  background: rgba(255, 214, 0, 0.12);
  color: var(--sermona-color-accent-primary);
}

.sermona-admin-nav__link[aria-current="page"]::before,
.sermona-admin-nav__link[aria-current="page"]::after,
.sermona-admin-nav__link--active::before,
.sermona-admin-nav__link--active::after {
  content: "";
  width: 4px;
  height: 4px;
  border-radius: var(--sermona-radius-full);
  background: var(--sermona-color-text-primary);
  flex-shrink: 0;
  opacity: 0.85;
}

/* Optional rail marker for non-active entries (ops nav rhythm) */
.sermona-admin-nav__link--mark {
  position: relative;
  padding-inline-start: calc(var(--sermona-space-3) + 10px);
}

.sermona-admin-nav__link--mark::before {
  content: "";
  position: absolute;
  left: var(--sermona-space-3);
  top: 50%;
  translate: 0 -50%;
  width: 4px;
  height: 4px;
  border-radius: var(--sermona-radius-full);
  background: var(--sermona-color-text-primary);
  opacity: 0.55;
}

.sermona-admin-main {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.sermona-admin-topbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--sermona-space-3);
  padding: var(--sermona-space-3) var(--sermona-space-5);
  border-bottom: 1px solid var(--sermona-color-border-subtle);
  background: var(--sermona-color-bg-page);
}

.sermona-admin-topbar__title {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-h3);
  line-height: 1.2;
  margin: 0;
  color: var(--sermona-color-text-primary);
  letter-spacing: -0.02em;
}

.sermona-admin-body {
  flex: 1 1 auto;
  padding: var(--sermona-space-5);
  overflow: auto;
}

.sermona-admin-dash {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-5);
  max-width: var(--sermona-layout-max-full);
  margin: 0 auto;
}

.sermona-dash-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--sermona-space-3);
  justify-content: space-between;
}

.sermona-dash-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sermona-space-2);
  align-items: center;
}

.sermona-dash-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 12.5rem), 1fr));
  gap: var(--sermona-space-4);
}

.sermona-metric-tile {
  padding: var(--sermona-space-4);
  border-radius: var(--sermona-radius-md);
  border: 1px solid var(--sermona-color-border-subtle);
  background: var(--sermona-color-bg-card);
  box-shadow: var(--sermona-shadow-card);
}

.sermona-metric-tile__label {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  font-weight: var(--sermona-font-weight-bold);
  color: var(--sermona-color-text-muted);
  margin: 0 0 var(--sermona-space-2);
  letter-spacing: var(--sermona-letter-spacing-uppercase-label);
  text-transform: uppercase;
}

.sermona-metric-tile__value {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-h3);
  line-height: 1.2;
  margin: 0 0 var(--sermona-space-2);
  color: var(--sermona-color-text-primary);
  font-variant-numeric: tabular-nums;
}

.sermona-metric-tile__hint {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  margin: 0;
  line-height: var(--sermona-line-height-meta-max);
}

.sermona-trend {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  font-weight: var(--sermona-font-weight-bold);
  font-variant-numeric: tabular-nums;
}

.sermona-trend--up {
  color: #86efac;
}

.sermona-trend--down {
  color: #f87171;
}

.sermona-trend--flat {
  color: var(--sermona-color-text-muted);
}

.sermona-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px var(--sermona-space-2);
  border-radius: var(--sermona-radius-full);
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-xs);
  font-weight: var(--sermona-font-weight-bold);
  letter-spacing: var(--sermona-letter-spacing-uppercase-label);
  text-transform: uppercase;
  line-height: 1.2;
  border: 1px solid transparent;
}

.sermona-status-badge--neutral {
  background: var(--sermona-color-bg-elevated);
  color: var(--sermona-color-text-muted);
  border-color: var(--sermona-color-border-hairline);
}

.sermona-status-badge--ok {
  background: rgba(22, 101, 52, 0.55);
  color: #4ade80;
  border-color: rgba(74, 222, 128, 0.5);
}

.sermona-status-badge--warn {
  background: rgba(253, 224, 71, 0.12);
  color: #fde047;
  border-color: rgba(253, 224, 71, 0.35);
}

.sermona-status-badge--crit {
  background: rgba(248, 113, 113, 0.12);
  color: #f87171;
  border-color: rgba(248, 113, 113, 0.35);
}

.sermona-status-badge--info {
  background: rgba(255, 214, 0, 0.1);
  color: var(--sermona-color-accent-primary);
  border-color: rgba(255, 214, 0, 0.28);
}

.sermona-status-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: var(--sermona-radius-full);
  background: currentColor;
  flex-shrink: 0;
}

.sermona-chart-slot {
  position: relative;
  min-height: 12.5rem;
  border: 1px dashed var(--sermona-color-border-meta);
  border-radius: var(--sermona-radius-md);
  background: var(--sermona-color-bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sermona-space-4);
}

.sermona-chart-slot__label {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  margin: 0;
  text-align: center;
  max-width: 28ch;
  line-height: var(--sermona-line-height-body);
}

.sermona-instrument-panel {
  padding: var(--sermona-space-4);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
  background: var(--sermona-color-bg-card);
}

.sermona-instrument-panel__header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--sermona-space-2);
  margin-bottom: var(--sermona-space-4);
}

.sermona-instrument-panel__title {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-h3);
  line-height: 1.2;
  margin: 0;
  color: var(--sermona-color-text-primary);
  letter-spacing: -0.02em;
}

.sermona-log-list {
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: var(--sermona-font-family-mono);
  font-size: 12px;
  line-height: 1.5;
  color: var(--sermona-color-text-muted);
}

.sermona-log-list__item {
  padding: var(--sermona-space-3) var(--sermona-space-3);
  border-bottom: 1px solid var(--sermona-color-border-subtle);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

/* Wide dashboards: optional single-line density */
@media (min-width: 720px) {
  .sermona-log-list--tabular .sermona-log-list__item {
    display: grid;
    grid-template-columns: 5.5rem 3.75rem 1fr;
    gap: var(--sermona-space-3);
    align-items: baseline;
  }
}

.sermona-log-list__time {
  color: var(--sermona-color-text-muted);
  font-variant-numeric: tabular-nums;
}

.sermona-log-list__level {
  font-weight: var(--sermona-font-weight-bold);
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.06em;
}

.sermona-log-list__msg {
  margin: 0;
  color: var(--sermona-color-text-primary);
  font-weight: var(--sermona-font-weight-regular);
  line-height: 1.55;
}

.sermona-log-list__token,
.sermona-log-list code {
  font-family: inherit;
  font-size: inherit;
  font-weight: var(--sermona-font-weight-bold);
  padding: 0.12em 0.4em;
  border-radius: var(--sermona-radius-sm);
  background: rgba(0, 0, 0, 0.35);
  color: var(--sermona-color-accent-primary);
  border: 1px solid rgba(255, 214, 0, 0.18);
}

.sermona-log-list__level--info {
  color: #60a5fa;
}

.sermona-log-list__level--warn {
  color: #facc15;
}

.sermona-log-list__level--error {
  color: #f87171;
}

@media (max-width: 900px) {
  .sermona-admin-shell:not(.sermona-admin-shell--force-sidebar) {
    flex-direction: column;
  }
  .sermona-admin-sidebar {
    flex: none;
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--sermona-color-border-subtle);
  }
  .sermona-admin-nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--sermona-space-2);
  }

  .sermona-admin-nav__link {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 44px;
  }

  .sermona-admin-nav__link[aria-current="page"],
  .sermona-admin-nav__link--active {
    justify-content: center;
  }

  .sermona-admin-nav__link--mark {
    padding-inline-start: var(--sermona-space-3);
    justify-content: flex-start;
    text-align: left;
  }

  .sermona-admin-nav__link--mark::before {
    left: var(--sermona-space-2);
  }
}

@media (max-width: 480px) {
  .sermona-admin-shell:not(.sermona-admin-shell--force-sidebar) .sermona-admin-nav {
    grid-template-columns: 1fr;
  }
}

/* Responsive grid of editorial cards (issues, teasers, tiles) */
.sermona-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: var(--sermona-space-4);
}

/* Horizontal swiper: scroll-snap row for distinct “deck” content */
.sermona-swiper {
  --sermona-swiper-fade-bg: var(--sermona-color-bg-page);
  position: relative;
  margin: var(--sermona-space-4) 0;
}

.sermona-swiper__label {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  font-weight: var(--sermona-font-weight-bold);
  color: var(--sermona-color-text-muted);
  margin: 0 0 var(--sermona-space-3);
  letter-spacing: var(--sermona-letter-spacing-uppercase-label);
  text-transform: uppercase;
}

.sermona-swiper__track {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: var(--sermona-space-4);
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--sermona-space-3);
  -webkit-overflow-scrolling: touch;
  scrollbar-color: var(--sermona-color-border-meta) transparent;
  padding-bottom: var(--sermona-space-2);
}

@media (prefers-reduced-motion: no-preference) {
  .sermona-swiper__track {
    scroll-behavior: smooth;
  }
}

.sermona-swiper__track:focus-visible {
  outline: 2px solid var(--sermona-color-accent-primary);
  outline-offset: 4px;
}

.sermona-swiper__slide {
  flex: 0 0 min(
    320px,
    calc(
      100vw - var(--sermona-space-6) - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px)
    )
  );
  scroll-snap-align: start;
  min-width: 0;
}

.sermona-swiper--wide .sermona-swiper__slide {
  flex-basis: min(
    400px,
    calc(
      100vw - var(--sermona-space-6) - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px)
    )
  );
}

/* Peek: slightly narrower slides so the next card “reads” as tappable */
.sermona-swiper--peek .sermona-swiper__slide {
  flex-basis: min(280px, calc(100% - var(--sermona-space-5)));
}

/* Break out of centered measure to full viewport width (still padded for safe areas) */
.sermona-swiper--bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  padding-inline: max(var(--sermona-space-5), env(safe-area-inset-left));
  padding-right: max(var(--sermona-space-5), env(safe-area-inset-right));
  box-sizing: border-box;
}

.sermona-swiper--bleed .sermona-swiper__track {
  scroll-padding-inline: max(var(--sermona-space-3), env(safe-area-inset-left));
}

.sermona-swiper--fade::after {
  content: "";
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: var(--sermona-space-2);
  width: min(56px, 12vw);
  background: linear-gradient(to left, var(--sermona-swiper-fade-bg), transparent);
  z-index: 1;
}

/* Media row (slides / mixed media) */
.sermona-media-feature {
  position: relative;
  border-radius: var(--sermona-radius-sm);
  border: 1px solid var(--sermona-color-border-hairline);
  overflow: hidden;
  background: var(--sermona-color-bg-slide);
  aspect-ratio: 16 / 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sermona-media-feature__play {
  width: var(--sermona-icon-tile-xl);
  height: var(--sermona-icon-tile-xl);
  border: 2px solid var(--sermona-color-accent-primary);
  border-radius: var(--sermona-radius-sm);
  color: var(--sermona-color-accent-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--sermona-color-surface-scrim);
  cursor: pointer;
  transition: transform var(--sermona-motion-duration-base) var(--sermona-motion-easing-emphasis);
}
.sermona-media-feature__play:hover {
  transform: scale(1.04);
}
.sermona-media-feature__play .sermona-icon {
  width: var(--sermona-icon-size-xl);
  height: var(--sermona-icon-size-xl);
}

/* CTA strip */
.sermona-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--sermona-space-4);
  padding: var(--sermona-space-5) var(--sermona-space-6);
  background: var(--sermona-color-bg-elevated);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
}

.sermona-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sermona-space-2);
}

.sermona-btn {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-meta);
  line-height: 1.2;
  padding: var(--sermona-space-2) var(--sermona-space-4);
  border-radius: var(--sermona-radius-sm);
  border: 1px solid var(--sermona-color-border-hairline);
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sermona-space-2);
  min-height: 44px;
  touch-action: manipulation;
  transition:
    background-color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard),
    color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard);
}

.sermona-btn--primary {
  background: var(--sermona-color-accent-primary);
  color: var(--sermona-color-accent-on-accent);
  border-color: transparent;
}
.sermona-btn--primary:hover {
  filter: brightness(1.06);
}

/* Anchor sermona-btn in prose wrappers: .vp-doc a beats one-class .sermona-btn--primary — pin label color. */
a.sermona-btn.sermona-btn--primary,
a.sermona-btn.sermona-btn--primary:hover {
  color: var(--sermona-color-accent-on-accent);
}
a.sermona-btn.sermona-btn--secondary,
a.sermona-btn.sermona-btn--secondary:hover {
  color: var(--sermona-color-text-primary);
}
a.sermona-btn.sermona-btn--ghost,
a.sermona-btn.sermona-btn--ghost:hover {
  color: var(--sermona-color-text-primary);
}

.sermona-btn--ghost {
  background: transparent;
  color: var(--sermona-color-text-primary);
}
.sermona-btn--ghost:hover {
  background: var(--sermona-color-surface-icon-tile);
}

.sermona-btn--secondary {
  background: var(--sermona-color-bg-elevated);
  color: var(--sermona-color-text-primary);
  border-color: var(--sermona-color-border-subtle);
}
.sermona-btn--secondary:hover {
  background: var(--sermona-color-surface-icon-tile-hover);
  border-color: var(--sermona-color-border-hairline);
}

.sermona-btn:focus-visible {
  outline: 2px solid var(--sermona-color-accent-primary);
  outline-offset: 2px;
}

.sermona-btn:disabled,
.sermona-btn[aria-disabled="true"] {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

/* Forms */
.sermona-form {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-4);
  max-width: min(32rem, 100%);
}

.sermona-field {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-2);
}

.sermona-label {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  font-weight: var(--sermona-font-weight-bold);
  line-height: var(--sermona-line-height-meta-max);
  color: var(--sermona-color-text-primary);
}

.sermona-label--optional {
  font-weight: var(--sermona-font-weight-regular);
  color: var(--sermona-color-text-muted);
}

.sermona-input,
.sermona-textarea,
.sermona-select {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-body);
  line-height: var(--sermona-line-height-snug);
  color: var(--sermona-color-text-primary);
  background: var(--sermona-color-bg-page);
  border: 1px solid var(--sermona-color-border-hairline);
  border-radius: var(--sermona-radius-sm);
  padding: var(--sermona-space-2) var(--sermona-space-3);
  width: 100%;
  min-height: 44px;
  transition:
    border-color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard),
    box-shadow var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard);
}

.sermona-textarea {
  min-height: 7.5rem;
  resize: vertical;
  line-height: var(--sermona-line-height-body);
}

.sermona-input::placeholder,
.sermona-textarea::placeholder {
  color: var(--sermona-color-text-muted);
  opacity: 1;
}

.sermona-input:hover,
.sermona-textarea:hover,
.sermona-select:hover {
  border-color: rgba(255, 255, 255, 0.28);
}

.sermona-input:focus-visible,
.sermona-textarea:focus-visible,
.sermona-select:focus-visible {
  outline: none;
  border-color: var(--sermona-color-accent-primary);
  box-shadow: 0 0 0 1px var(--sermona-color-accent-primary);
}

.sermona-input:disabled,
.sermona-textarea:disabled,
.sermona-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sermona-select {
  appearance: none;
  -webkit-appearance: none;
  padding-right: var(--sermona-space-6);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba%28255,255,255,0.5%29' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--sermona-space-3) center;
  background-size: 16px;
  cursor: pointer;
}

input.sermona-input[type="file"] {
  min-height: auto;
  padding: var(--sermona-space-2);
  cursor: pointer;
  font-size: var(--sermona-font-size-meta);
  line-height: var(--sermona-line-height-meta-max);
  color: var(--sermona-color-text-muted);
}

input.sermona-input[type="file"]::file-selector-button {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-meta);
  line-height: 1.2;
  margin-right: var(--sermona-space-3);
  padding: var(--sermona-space-2) var(--sermona-space-4);
  border-radius: var(--sermona-radius-sm);
  border: 1px solid var(--sermona-color-border-hairline);
  background: var(--sermona-color-bg-elevated);
  color: var(--sermona-color-text-primary);
  cursor: pointer;
  min-height: 40px;
  transition:
    background-color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard),
    border-color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard);
}

input.sermona-input[type="file"]::file-selector-button:hover {
  background: var(--sermona-color-surface-icon-tile-hover);
}

.sermona-field__hint {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  line-height: var(--sermona-line-height-meta-max);
  color: var(--sermona-color-text-muted);
  margin: 0;
}

.sermona-field__error {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  line-height: var(--sermona-line-height-meta-max);
  color: #f87171;
  margin: 0;
}

.sermona-field--invalid .sermona-input,
.sermona-field--invalid .sermona-textarea,
.sermona-field--invalid .sermona-select {
  border-color: #f87171;
}

.sermona-field--invalid .sermona-input:focus-visible,
.sermona-field--invalid .sermona-textarea:focus-visible,
.sermona-field--invalid .sermona-select:focus-visible {
  box-shadow: 0 0 0 1px #f87171;
}

.sermona-choice {
  display: flex;
  align-items: flex-start;
  gap: var(--sermona-space-3);
  cursor: pointer;
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-body);
  line-height: var(--sermona-line-height-body);
  color: var(--sermona-color-text-primary);
}

.sermona-choice input[type="checkbox"],
.sermona-choice input[type="radio"] {
  width: 1.125rem;
  height: 1.125rem;
  margin: 0.2rem 0 0;
  flex-shrink: 0;
  accent-color: var(--sermona-color-accent-primary);
  cursor: pointer;
}

.sermona-choice__text {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-1);
  min-width: 0;
}

.sermona-choice__label {
  font-weight: var(--sermona-font-weight-medium);
}

.sermona-choice__hint {
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  line-height: var(--sermona-line-height-meta-max);
  margin: 0;
}

.sermona-form__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--sermona-space-2);
  margin-top: var(--sermona-space-2);
}

.sermona-form__actions--end {
  justify-content: flex-end;
}

.sermona-form--wide {
  max-width: min(42rem, 100%);
}

.sermona-form--full {
  max-width: 100%;
}

.sermona-fieldset {
  margin: 0;
  padding: 0;
  border: none;
  min-width: 0;
}

.sermona-fieldset__legend {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  line-height: var(--sermona-line-height-snug);
  color: var(--sermona-color-text-primary);
  padding: 0;
  margin: 0 0 var(--sermona-space-4);
}

.sermona-fieldset__stack {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-4);
}

.sermona-form-section {
  padding: var(--sermona-space-4);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
  background: var(--sermona-color-bg-elevated);
}

.sermona-form-section__title {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  margin: 0 0 var(--sermona-space-2);
  color: var(--sermona-color-text-primary);
}

.sermona-form-section__lede {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  margin: 0 0 var(--sermona-space-4);
  line-height: var(--sermona-line-height-body);
}

.sermona-form-section__stack {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-4);
}

.sermona-field-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
  gap: var(--sermona-space-3) var(--sermona-space-4);
  align-items: start;
}

.sermona-field-row--duo {
  grid-template-columns: 1fr 1fr;
}

.sermona-field__meta-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--sermona-space-2);
}

.sermona-field__counter {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-xs);
  color: var(--sermona-color-text-muted);
  font-variant-numeric: tabular-nums;
  margin: 0;
  line-height: var(--sermona-line-height-meta-max);
}

.sermona-form-summary {
  padding: var(--sermona-space-3) var(--sermona-space-4);
  border: 1px solid #f87171;
  border-radius: var(--sermona-radius-sm);
  background: rgba(248, 113, 113, 0.08);
  margin: 0 0 var(--sermona-space-4);
}

.sermona-form-summary__title {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  font-weight: var(--sermona-font-weight-bold);
  color: #f87171;
  margin: 0 0 var(--sermona-space-2);
}

.sermona-form-summary__list {
  font-family: var(--sermona-font-family-sans);
  margin: 0;
  padding-left: 1.2em;
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-primary);
  line-height: var(--sermona-line-height-body);
}

.sermona-form-stepper {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sermona-space-3) var(--sermona-space-4);
  margin: 0 0 var(--sermona-space-5);
  padding: 0;
  list-style: none;
}

.sermona-form-stepper__item {
  display: flex;
  align-items: center;
  gap: var(--sermona-space-2);
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  line-height: var(--sermona-line-height-meta-max);
}

.sermona-form-stepper__item--current {
  color: var(--sermona-color-accent-primary);
  font-weight: var(--sermona-font-weight-bold);
}

.sermona-form-stepper__item--done {
  color: var(--sermona-color-text-primary);
}

.sermona-form-stepper__index {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: var(--sermona-radius-full);
  border: 1px solid var(--sermona-color-border-hairline);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-variant-numeric: tabular-nums;
  font-size: var(--sermona-font-size-xs);
  flex-shrink: 0;
  font-weight: var(--sermona-font-weight-bold);
}

.sermona-form-stepper__item--current .sermona-form-stepper__index {
  border-color: var(--sermona-color-accent-primary);
  background: rgba(255, 214, 0, 0.12);
  color: var(--sermona-color-accent-primary);
}

.sermona-repeatable {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-3);
  padding: var(--sermona-space-4);
  border: 1px dashed var(--sermona-color-border-meta);
  border-radius: var(--sermona-radius-md);
  background: var(--sermona-color-bg-page);
}

.sermona-repeatable__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sermona-space-3);
  align-items: flex-end;
  padding-bottom: var(--sermona-space-3);
  border-bottom: 1px solid var(--sermona-color-border-subtle);
}

.sermona-repeatable__row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.sermona-repeatable__fields {
  flex: 1 1 14rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 7.5rem), 1fr));
  gap: var(--sermona-space-3);
}

.sermona-repeatable__remove {
  flex-shrink: 0;
}

.sermona-repeatable__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sermona-space-2);
  margin-top: var(--sermona-space-2);
}

.sermona-segmented {
  display: inline-flex;
  flex-wrap: wrap;
  border-radius: var(--sermona-radius-sm);
  border: 1px solid var(--sermona-color-border-hairline);
  overflow: hidden;
  background: var(--sermona-color-bg-page);
}

.sermona-segmented__btn {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  font-weight: var(--sermona-font-weight-bold);
  padding: var(--sermona-space-2) var(--sermona-space-4);
  min-height: 44px;
  border: none;
  border-right: 1px solid var(--sermona-color-border-hairline);
  background: transparent;
  color: var(--sermona-color-text-muted);
  cursor: pointer;
  transition:
    background-color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard),
    color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard);
}

.sermona-segmented__btn:last-child {
  border-right: none;
}

.sermona-segmented__btn:hover {
  background: var(--sermona-color-surface-icon-tile);
  color: var(--sermona-color-text-primary);
}

.sermona-segmented__btn[aria-pressed="true"],
.sermona-segmented__btn--selected {
  background: rgba(255, 214, 0, 0.12);
  color: var(--sermona-color-accent-primary);
}

.sermona-segmented__btn:focus-visible {
  outline: 2px solid var(--sermona-color-accent-primary);
  outline-offset: -2px;
  position: relative;
  z-index: 1;
}

.sermona-choice-card {
  position: relative;
  display: block;
  padding: var(--sermona-space-4);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-md);
  background: var(--sermona-color-bg-elevated);
  cursor: pointer;
  transition:
    border-color var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard),
    box-shadow var(--sermona-motion-duration-fast) var(--sermona-motion-easing-standard);
}

.sermona-choice-card:hover {
  border-color: var(--sermona-color-border-hairline);
}

.sermona-choice-card:has(input:checked),
.sermona-choice-card--checked {
  border-color: var(--sermona-color-accent-primary);
  box-shadow: 0 0 0 1px var(--sermona-color-accent-primary);
}

.sermona-choice-card:focus-within {
  outline: 2px solid var(--sermona-color-accent-primary);
  outline-offset: 2px;
}

.sermona-choice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  gap: var(--sermona-space-3);
}

.sermona-choice-card .sermona-choice__label {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  display: block;
  margin-bottom: var(--sermona-space-1);
  color: var(--sermona-color-text-primary);
}

.sermona-choice-card .sermona-choice__hint {
  font-family: var(--sermona-font-family-sans);
  display: block;
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  line-height: var(--sermona-line-height-meta-max);
}

/* CTA strip: let copy column shrink/wrap in flex row */
.sermona-cta > div:first-child {
  flex: 1 1 240px;
  min-width: 0;
}

/* Logo / wordmark row (icon + text) */
.sermona-brand-lockup {
  display: inline-flex;
  align-items: center;
  gap: var(--sermona-space-3);
}
.sermona-brand-lockup__mark {
  width: var(--sermona-icon-tile-md);
  height: var(--sermona-icon-tile-md);
  color: var(--sermona-color-icon-accent);
  flex-shrink: 0;
}
.sermona-brand-lockup__word {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  line-height: var(--sermona-line-height-tight);
  text-transform: capitalize;
  margin: 0;
  color: var(--sermona-color-text-primary);
}

/* Footer micro */
.sermona-footer-mini {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sermona-space-4);
  justify-content: space-between;
  align-items: center;
  padding-block: var(--sermona-layout-section-y-tight);
  border-top: 1px solid var(--sermona-color-border-meta);
}
.sermona-footer-mini__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sermona-space-3);
}

/* Metrics / stats row */
.sermona-stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 140px), 1fr));
  gap: var(--sermona-space-4);
}
.sermona-stat {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-2);
  padding: var(--sermona-space-4);
  border-radius: var(--sermona-radius-md);
  border: 1px solid var(--sermona-color-border-subtle);
  background: var(--sermona-color-bg-elevated);
}
.sermona-stat__value {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-h2);
  line-height: var(--sermona-line-height-tight);
  margin: 0;
  color: var(--sermona-color-accent-primary);
}
.sermona-stat__label {
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  line-height: var(--sermona-line-height-meta-max);
  color: var(--sermona-color-text-muted);
  margin: 0;
}
.sermona-stat__meta {
  display: flex;
  align-items: center;
  gap: var(--sermona-space-2);
  margin-top: var(--sermona-space-1);
}
.sermona-stat__meta .sermona-icon {
  color: var(--sermona-color-icon-accent);
}

/* Icon-led feature list */
.sermona-feature-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-4);
}
.sermona-feature-list__item {
  display: grid;
  grid-template-columns: var(--sermona-icon-tile-md) 1fr;
  gap: var(--sermona-space-3);
  align-items: start;
}
@media (max-width: 500px) {
  .sermona-feature-list__item {
    grid-template-columns: 1fr;
  }
}
.sermona-feature-list__icon {
  width: var(--sermona-icon-tile-md);
  height: var(--sermona-icon-tile-md);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--sermona-radius-sm);
  border: 1px solid var(--sermona-color-border-hairline);
  background: var(--sermona-color-bg-page);
  color: var(--sermona-color-icon-accent);
}
.sermona-feature-list__icon .sermona-icon {
  width: var(--sermona-icon-size-md);
  height: var(--sermona-icon-size-md);
}
.sermona-feature-list__title {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  line-height: var(--sermona-line-height-snug);
  margin: 0 0 var(--sermona-space-1);
  color: var(--sermona-color-text-primary);
}
.sermona-feature-list__body {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-regular);
  font-size: var(--sermona-font-size-meta);
  line-height: var(--sermona-line-height-body);
  margin: 0;
  color: var(--sermona-color-text-muted);
}

/* Icon-led simple lists (bullets, checks, custom glyphs) */
.sermona-icon-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-3);
}
.sermona-icon-list--compact {
  gap: var(--sermona-space-2);
}
.sermona-icon-list__item {
  display: grid;
  grid-template-columns: var(--sermona-icon-tile-sm) 1fr;
  gap: var(--sermona-space-3);
  align-items: start;
}
.sermona-icon-list--compact .sermona-icon-list__item {
  grid-template-columns: var(--sermona-icon-size-lg) 1fr;
}
.sermona-icon-list__marker {
  width: var(--sermona-icon-tile-sm);
  height: var(--sermona-icon-tile-sm);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--sermona-radius-sm);
  border: 1px solid var(--sermona-color-border-hairline);
  background: var(--sermona-color-bg-elevated);
  color: var(--sermona-color-icon-accent);
}
.sermona-icon-list--compact .sermona-icon-list__marker {
  width: var(--sermona-icon-size-lg);
  height: var(--sermona-icon-size-lg);
  border: none;
  background: transparent;
}
.sermona-icon-list__marker .sermona-icon {
  width: var(--sermona-icon-size-sm);
  height: var(--sermona-icon-size-sm);
}
.sermona-icon-list--compact .sermona-icon-list__marker .sermona-icon {
  width: var(--sermona-icon-size-md);
  height: var(--sermona-icon-size-md);
}
.sermona-icon-list__body {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-regular);
  font-size: var(--sermona-font-size-body);
  line-height: var(--sermona-line-height-body);
  margin: 0;
  color: var(--sermona-color-text-primary);
}
.sermona-icon-list__body--muted {
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  line-height: var(--sermona-line-height-meta-max);
}
.sermona-icon-list__title {
  font-family: var(--sermona-font-family-sans);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-meta);
  line-height: var(--sermona-line-height-snug);
  margin: 0 0 var(--sermona-space-1);
  color: var(--sermona-color-text-primary);
}
.sermona-icon-list--checks .sermona-icon-list__marker {
  border-color: var(--sermona-color-accent-primary);
  background: rgba(255, 214, 0, 0.08);
}

/* Partner / logo strip (SVG marks at uniform height) */
.sermona-logo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--sermona-layout-gap-icon-row);
  padding-block: var(--sermona-space-3);
}
.sermona-logo-row__item {
  height: var(--sermona-icon-tile-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.72;
  filter: grayscale(1);
  transition: opacity var(--sermona-motion-duration-base) var(--sermona-motion-easing-standard);
}
.sermona-logo-row__item:hover {
  opacity: 1;
}
.sermona-logo-row__item svg,
.sermona-logo-row__item img {
  display: block;
  max-height: 28px;
  width: auto;
  height: auto;
}

/* Tables & structured data (HTML + reference for Markdown tables in theme) */
.sermona-table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: var(--sermona-space-4) 0;
  border-radius: var(--sermona-radius-sm);
  border: 1px solid var(--sermona-color-border-subtle);
  background: var(--sermona-color-bg-elevated);
}
.sermona-table {
  width: 100%;
  min-width: 520px;
  border-collapse: collapse;
  font-family: var(--sermona-font-family-sans);
  font-size: var(--sermona-font-size-meta);
  line-height: var(--sermona-line-height-meta-max);
}
.sermona-table caption {
  caption-side: top;
  text-align: left;
  padding: var(--sermona-space-3) var(--sermona-space-4);
  font-weight: var(--sermona-font-weight-bold);
  font-size: var(--sermona-font-size-body);
  line-height: var(--sermona-line-height-snug);
  color: var(--sermona-color-text-primary);
  border-bottom: 1px solid var(--sermona-color-border-subtle);
}
.sermona-table th,
.sermona-table td {
  padding: var(--sermona-space-2) var(--sermona-space-3);
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--sermona-color-border-subtle);
  border-right: 1px solid var(--sermona-color-border-subtle);
}
.sermona-table th:last-child,
.sermona-table td:last-child {
  border-right: none;
}
.sermona-table tbody tr:last-child th,
.sermona-table tbody tr:last-child td {
  border-bottom: none;
}
.sermona-table th {
  font-weight: var(--sermona-font-weight-bold);
  color: var(--sermona-color-text-primary);
  background: var(--sermona-color-bg-card);
  white-space: nowrap;
}
.sermona-table td {
  color: var(--sermona-color-text-muted);
}
.sermona-table--zebra tbody tr:nth-child(even) td,
.sermona-table--zebra tbody tr:nth-child(even) th {
  background: rgba(255, 255, 255, 0.03);
}
.sermona-table__num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: var(--sermona-color-text-primary);
}
.sermona-table__strong {
  color: var(--sermona-color-text-primary);
  font-weight: var(--sermona-font-weight-medium);
}

/* Definition list / key–value (lightweight “data panel”) */
.sermona-kv {
  display: grid;
  grid-template-columns: minmax(7.5rem, 0.9fr) minmax(0, 2.1fr);
  gap: var(--sermona-space-2) var(--sermona-space-4);
  margin: var(--sermona-space-4) 0;
  padding: var(--sermona-space-4);
  border: 1px solid var(--sermona-color-border-subtle);
  border-radius: var(--sermona-radius-sm);
  background: var(--sermona-color-bg-elevated);
  font-size: var(--sermona-font-size-meta);
  line-height: var(--sermona-line-height-body);
}
.sermona-kv dt {
  margin: 0;
  color: var(--sermona-color-text-muted);
  font-weight: var(--sermona-font-weight-bold);
}
.sermona-kv dd {
  margin: 0;
  color: var(--sermona-color-text-primary);
  font-variant-numeric: tabular-nums;
}
@media (max-width: 520px) {
  .sermona-kv {
    grid-template-columns: 1fr;
  }
}

/* Inline metric (label / value stack) */
.sermona-data-pair {
  display: flex;
  flex-direction: column;
  gap: var(--sermona-space-1);
}
.sermona-data-pair__label {
  font-size: var(--sermona-font-size-meta);
  color: var(--sermona-color-text-muted);
  margin: 0;
  line-height: var(--sermona-line-height-meta-max);
}
.sermona-data-pair__value {
  font-size: var(--sermona-font-size-body);
  font-weight: var(--sermona-font-weight-bold);
  color: var(--sermona-color-text-primary);
  margin: 0;
  font-variant-numeric: tabular-nums;
}

/* Split hero: headline + aside (e.g. services teaser) */
.sermona-hero-split {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(1.5rem, 3.5vw, var(--sermona-layout-gap-cols));
  align-items: start;
}
.sermona-hero-split__aside {
  border-left: 1px solid var(--sermona-color-border-hairline);
  padding-left: var(--sermona-space-5);
}
@media (max-width: 900px) {
  .sermona-hero-split {
    grid-template-columns: 1fr;
    gap: var(--sermona-space-4);
  }
  .sermona-hero-split__aside {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid var(--sermona-color-border-hairline);
    padding-top: var(--sermona-space-5);
  }
}

/* Full-viewport image hero: set --sermona-hero-image: url(...) on the section */
.sermona-hero-full {
  --sermona-hero-scrim-a: rgba(26, 26, 26, 0.9);
  --sermona-hero-scrim-b: rgba(26, 26, 26, 0.28);
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  min-height: 100vh;
  min-height: 100dvh;
  padding: var(--sermona-space-9) max(var(--sermona-space-5), env(safe-area-inset-left))
    max(calc(var(--sermona-space-8) + env(safe-area-inset-bottom)), env(safe-area-inset-bottom))
    max(var(--sermona-space-5), env(safe-area-inset-right));
  background-color: var(--sermona-color-bg-page);
}

.sermona-hero-full::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  background-color: var(--sermona-color-bg-page);
  background-image: var(--sermona-hero-image);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.sermona-hero-full::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to top,
    var(--sermona-hero-scrim-a) 0%,
    var(--sermona-hero-scrim-b) 52%,
    rgba(26, 26, 26, 0.14) 100%
  );
  pointer-events: none;
}

.sermona-hero-full--center {
  justify-content: center;
}

.sermona-hero-full--top {
  justify-content: flex-start;
  padding-bottom: var(--sermona-space-8);
  padding-top: max(var(--sermona-space-7), env(safe-area-inset-top));
}

.sermona-hero-full--short {
  min-height: 72vh;
  min-height: 72dvh;
}

.sermona-hero-full--cap {
  min-height: min(100dvh, 880px);
  min-height: min(100vh, 880px);
}

.sermona-hero-full--scrim-heavy {
  --sermona-hero-scrim-a: rgba(26, 26, 26, 0.96);
  --sermona-hero-scrim-b: rgba(26, 26, 26, 0.52);
}

.sermona-hero-full--scrim-light {
  --sermona-hero-scrim-a: rgba(26, 26, 26, 0.78);
  --sermona-hero-scrim-b: rgba(26, 26, 26, 0.12);
}

.sermona-hero-full__inner {
  position: relative;
  z-index: 0;
  width: 100%;
  max-width: var(--sermona-layout-max-full);
  margin: 0 auto;
}

.sermona-hero-full__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--sermona-space-2);
  margin-top: var(--sermona-space-4);
}

/* ——— Narrow viewports (mobile / small tablets) ——— */
@media (max-width: 639px) {
  .sermona-layout {
    padding: var(--sermona-space-5) max(var(--sermona-space-3), env(safe-area-inset-left)) var(--sermona-space-6) max(var(--sermona-space-3), env(safe-area-inset-right));
  }
  .sermona-section {
    padding-block: var(--sermona-layout-section-y-tight);
  }
  .sermona-section--loose {
    padding-block: var(--sermona-layout-section-y-default);
  }
  .sermona-card {
    padding: var(--sermona-space-4);
  }
  .sermona-quote {
    padding: var(--sermona-space-4) var(--sermona-space-3);
  }
  .sermona-quote__text {
    font-size: clamp(1.0625rem, 3.8vw, var(--sermona-font-size-h4));
  }
  .sermona-cta {
    flex-direction: column;
    align-items: stretch;
    padding: var(--sermona-space-4) var(--sermona-space-3);
  }
  .sermona-cta__actions {
    width: 100%;
    flex-direction: column;
  }
  .sermona-cta__actions .sermona-btn {
    width: 100%;
  }
  .sermona-form__actions {
    flex-direction: column;
    align-items: stretch;
  }
  .sermona-form__actions .sermona-btn {
    width: 100%;
  }
  .sermona-modal__footer {
    flex-direction: column;
    align-items: stretch;
  }
  .sermona-modal__footer .sermona-btn {
    width: 100%;
  }
  .sermona-two-col {
    gap: var(--sermona-space-4);
  }
  .sermona-icon-strip {
    gap: var(--sermona-space-3);
  }
  .sermona-stat-row {
    grid-template-columns: 1fr;
  }
  .sermona-stat__value {
    font-size: clamp(1.75rem, 9vw, var(--sermona-font-size-h2));
  }
  .sermona-footer-mini {
    flex-direction: column;
    align-items: flex-start;
  }
  .sermona-hero-full {
    padding: var(--sermona-space-6) max(var(--sermona-space-3), env(safe-area-inset-left))
      max(calc(var(--sermona-space-5) + env(safe-area-inset-bottom)), env(safe-area-inset-bottom))
      max(var(--sermona-space-3), env(safe-area-inset-right));
  }
  .sermona-hero-full--top {
    padding-top: max(var(--sermona-space-5), env(safe-area-inset-top));
  }
  .sermona-hero-full__actions {
    flex-direction: column;
    align-items: stretch;
  }
  .sermona-hero-full__actions .sermona-btn {
    width: 100%;
  }
  .sermona-dash-toolbar {
    align-items: flex-start;
    gap: var(--sermona-space-2);
  }
  .sermona-admin-topbar {
    padding-left: max(var(--sermona-space-3), env(safe-area-inset-left));
    padding-right: max(var(--sermona-space-3), env(safe-area-inset-right));
  }
  .sermona-admin-topbar__title {
    min-width: 0;
  }
  .sermona-admin-body {
    padding-left: max(var(--sermona-space-4), env(safe-area-inset-left));
    padding-right: max(var(--sermona-space-4), env(safe-area-inset-right));
    padding-bottom: max(var(--sermona-space-5), env(safe-area-inset-bottom));
  }
  .sermona-admin-sidebar {
    padding-left: max(var(--sermona-space-3), env(safe-area-inset-left));
    padding-right: max(var(--sermona-space-3), env(safe-area-inset-right));
  }
  .sermona-service-card,
  .sermona-icon-tile {
    padding: var(--sermona-space-4);
  }
  .sermona-kicker {
    line-height: 1.35;
  }
}

@media (max-width: 520px) {
  .sermona-icon-list:not(.sermona-icon-list--compact) .sermona-icon-list__item {
    grid-template-columns: 1fr;
  }
  .sermona-cart-line {
    grid-template-columns: 56px 1fr;
    grid-template-areas:
      "thumb details"
      "aside aside";
    gap: var(--sermona-space-2);
  }
  .sermona-cart-line__thumb {
    width: 56px;
    height: 56px;
  }
  .sermona-cart-line__aside {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding-top: var(--sermona-space-1);
  }
  .sermona-field-row--duo {
    grid-template-columns: 1fr;
  }
}
`;

writeFileSync(join(dist, "sermona.components.css"), components + sectionPatterns, "utf8");

console.log("Built dist/sermona.css, dist/sermona.components.css, dist/tokens.json");
