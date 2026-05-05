---
title: Admin & instrumentation
description: Dashboard shell, metrics, status badges, chart placeholders, and structured log lists — Sermona admin UI patterns.
---

# Admin & instrumentation

Utility-first patterns for **internal tools**, **ops dashboards**, and **live instrumentation**. Pair with [Forms, buttons & CTAs](/forms-buttons-cta) for filters and actions, and [Data & tables](/data-and-tables) for dense grids.

## App shell

| Block | Class |
| --- | --- |
| Root | **`.sermona-admin-shell`** — flex row, full viewport height (`100dvh`). |
| Docs / embedded preview | **`.sermona-admin-shell--demo`** — drops fixed viewport height; optional border radius + border. Main column gets a **minimum height** for believable layout in prose. |
| Keep sidebar horizontal on narrow viewports | **`.sermona-admin-shell--force-sidebar`** — opt out of the **≤900px** stack; use when you need a persistent rail (e.g. wide-only layouts). |
| Sidebar | **`.sermona-admin-sidebar`** — narrow rail with **`.sermona-admin-sidebar__brand`**. |
| Nav | **`ul.sermona-admin-nav`** → **`a.sermona-admin-nav__link`**. Mark the active route with **`aria-current="page"`** or **`.sermona-admin-nav__link--active`** (adds **flanking dot** affordance). Optional **`--mark`** for a **single left rail dot** on inactive entries. |
| Main column | **`.sermona-admin-main`** |
| Sticky header band | **`.sermona-admin-topbar`** + **`.sermona-admin-topbar__title`** |
| Scrollable content | **`.sermona-admin-body`** |
| Page stack | **`.sermona-admin-dash`** — vertical rhythm for dashboard sections. |

**Responsive:** At **≤900px** the shell stacks (sidebar on top, nav becomes a **2×2 grid** with centered links), unless **`--force-sidebar`** is on the shell.

## Dashboard chrome

| Block | Class |
| --- | --- |
| Toolbar row | **`.sermona-dash-toolbar`** — space-between row for title/actions and filters. |
| Filter cluster | **`.sermona-dash-filters`** |
| Metric / card grid | **`.sermona-dash-grid`** — `auto-fit` tiles with a **12.5rem** minimum track. |

## Metrics & trends

| Block | Class |
| --- | --- |
| Tile | **`.sermona-metric-tile`** — **`__label`**, **`__value`**, **`__hint`** |
| Delta / comparison | **`.sermona-trend`** — **`--up`**, **`--down`**, **`--flat`** |

## Status

**`.sermona-status-badge`** with optional **`.sermona-status-badge__dot`**. Modifiers: **`--neutral`**, **`--ok`**, **`--warn`**, **`--crit`**, **`--info`**.

## Charts

**`.sermona-chart-slot`** — dashed placeholder with centered **`.sermona-chart-slot__label`**. Swap the interior for SVG/Canvas when you wire a chart library.

## Instrumentation & logs

| Block | Class |
| --- | --- |
| Panel chrome | **`.sermona-instrument-panel`** — **`__header`**, **`__title`** |
| Structured log | **`ul.sermona-log-list`** → **`li.sermona-log-list__item`** with **`__time`**, **`__level`** (`--info` / `--warn` / **`--error`**), **`__msg`** (body copy), and **`code`** or **`span.sermona-log-list__token`** for path/service/deployment chips. |

**Layout:** Default is a **stacked** block per line (timestamp → level → message), matching dense instrumentation mocks. For a **three-column** row on wide viewports, add **`.sermona-log-list--tabular`** to the **`ul`**.

**Semantics:** Treat each **`li`** as one log line; keep levels in **`span.sermona-log-list__level`** so assistive tech can skim. For live regions, wrap the list in an element with **`aria-live="polite"`** when streaming (one new line at a time avoids noisy updates).

---

## Demo

<div class="sermona-root" style="margin: 1.5rem 0;">

<div class="sermona-admin-shell sermona-admin-shell--demo">

<aside class="sermona-admin-sidebar" aria-label="Product navigation">
<p class="sermona-admin-sidebar__brand">Sermona · Ops</p>
<nav aria-label="Primary">
<ul class="sermona-admin-nav">
<li><a class="sermona-admin-nav__link" href="#" aria-current="page">Overview</a></li>
<li><a class="sermona-admin-nav__link" href="#">Deployments</a></li>
<li><a class="sermona-admin-nav__link sermona-admin-nav__link--mark" href="#">Incidents</a></li>
<li><a class="sermona-admin-nav__link sermona-admin-nav__link--mark" href="#">Settings</a></li>
</ul>
</nav>
</aside>

<div class="sermona-admin-main">
<header class="sermona-admin-topbar">
<h1 class="sermona-admin-topbar__title">Production · us-east</h1>
<div class="sermona-dash-filters">
<span class="sermona-status-badge sermona-status-badge--ok"><span class="sermona-status-badge__dot" aria-hidden="true"></span>Healthy</span>
<button type="button" class="sermona-btn sermona-btn--ghost">Refresh</button>
</div>
</header>
<div class="sermona-admin-body">
<div class="sermona-admin-dash">
<div class="sermona-dash-toolbar">
<p class="sermona-meta" style="margin:0;">Last 24 hours</p>
<div class="sermona-dash-filters">
<button type="button" class="sermona-btn sermona-btn--ghost">1h</button>
<button type="button" class="sermona-btn sermona-btn--secondary">24h</button>
<button type="button" class="sermona-btn sermona-btn--ghost">7d</button>
</div>
</div>
<div class="sermona-dash-grid">
<div class="sermona-metric-tile">
<p class="sermona-metric-tile__label">Requests</p>
<p class="sermona-metric-tile__value">1.24M</p>
<p class="sermona-metric-tile__hint"><span class="sermona-trend sermona-trend--up">+12.4%</span> vs prior window</p>
</div>
<div class="sermona-metric-tile">
<p class="sermona-metric-tile__label">p95 latency</p>
<p class="sermona-metric-tile__value">186ms</p>
<p class="sermona-metric-tile__hint"><span class="sermona-trend sermona-trend--down">−8ms</span> after cache warm</p>
</div>
<div class="sermona-metric-tile">
<p class="sermona-metric-tile__label">Error budget</p>
<p class="sermona-metric-tile__value">94.2%</p>
<p class="sermona-metric-tile__hint"><span class="sermona-trend sermona-trend--flat">Flat</span> · SLO on track</p>
</div>
<div class="sermona-metric-tile">
<p class="sermona-metric-tile__label">Deploys</p>
<p class="sermona-metric-tile__value">3</p>
<p class="sermona-metric-tile__hint"><span class="sermona-status-badge sermona-status-badge--info">Canary</span> on API</p>
</div>
</div>
<div class="sermona-chart-slot" role="img" aria-label="Chart placeholder">
<p class="sermona-chart-slot__label">Mount your chart component here — this slot keeps rhythm and dashed affordance until data renders.</p>
</div>
<div class="sermona-instrument-panel">
<div class="sermona-instrument-panel__header">
<h2 class="sermona-instrument-panel__title">Structured logs</h2>
<span class="sermona-status-badge sermona-status-badge--neutral">Paused</span>
</div>
<ul class="sermona-log-list" aria-label="Recent events">
<li class="sermona-log-list__item">
<span class="sermona-log-list__time">14:02:01</span>
<span class="sermona-log-list__level sermona-log-list__level--info">info</span>
<p class="sermona-log-list__msg">Edge cache warmed for <code>/api/v2/catalog</code></p>
</li>
<li class="sermona-log-list__item">
<span class="sermona-log-list__time">14:02:44</span>
<span class="sermona-log-list__level sermona-log-list__level--warn">warn</span>
<p class="sermona-log-list__msg">Retry 2/5 — upstream <code>payments</code> timeout 1500ms</p>
</li>
<li class="sermona-log-list__item">
<span class="sermona-log-list__time">14:03:09</span>
<span class="sermona-log-list__level sermona-log-list__level--error">error</span>
<p class="sermona-log-list__msg">Rollback marker written — deployment <span class="sermona-log-list__token">7f3a9c</span> aborted</p>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>

</div>
