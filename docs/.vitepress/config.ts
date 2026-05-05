import path from "node:path";
import { fileURLToPath } from "node:url";
import type { HeadConfig } from "vitepress";
import { defineSermonaDocsConfig } from "@sermona/vitepress-theme/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

/**
 * Public origin for the deployed docs (no trailing slash), e.g. `https://design.example.com`.
 * Used for canonical URLs, Open Graph / Twitter absolute image URLs, and JSON-LD.
 * Set in CI: `VITEPRESS_SITE_URL=https://… npm run build`.
 */
const siteUrl = process.env.VITEPRESS_SITE_URL?.replace(/\/$/, "") ?? "";

/** Default Open Graph / Twitter image (1200×630 PNG in `docs/public/`). */
const DEFAULT_SHARE_IMAGE = {
  path: "/og.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Sermona — design system for dark editorial UI",
} as const;

function docsPathname(relativePath: string): string {
  const stem = relativePath.replace(/\.md$/, "");
  if (stem === "404") return "/404.html";
  if (stem === "index" || stem === "") return "/";
  return `/${stem}.html`;
}

function absolutePublicUrl(
  origin: string,
  vitePressBase: string,
  pathname: string,
): string {
  const o = origin.replace(/\/$/, "");
  const raw = vitePressBase.endsWith("/") ? vitePressBase.slice(0, -1) : vitePressBase;
  const basePrefix = raw === "" || raw === "/" ? "" : raw;
  const p =
    pathname === "/"
      ? "/"
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;
  if (p === "/") return `${o}${basePrefix}/`;
  return `${o}${basePrefix}${p}`;
}

function sharingImagePath(frontmatter: Record<string, unknown>): string {
  const explicit =
    (typeof frontmatter.ogImage === "string" && frontmatter.ogImage.trim()
      ? frontmatter.ogImage
      : undefined) ??
    (typeof frontmatter.image === "string" && frontmatter.image.trim()
      ? frontmatter.image
      : undefined);
  if (!explicit) return DEFAULT_SHARE_IMAGE.path;
  return explicit.startsWith("/") ? explicit : `/${explicit}`;
}

function sharingMetaHead(ctx: {
  siteTitle: string;
  siteDescription: string;
  siteLang: string;
  vitePressBase: string;
  relativePath: string;
  title: string;
  description: string;
  frontmatter: Record<string, unknown>;
  isNotFound?: boolean;
}): HeadConfig[] {
  const fm = ctx.frontmatter;
  const ogTitle =
    typeof fm.ogTitle === "string" && fm.ogTitle.trim()
      ? fm.ogTitle.trim()
      : ctx.title;
  const ogDescription =
    typeof fm.ogDescription === "string" && fm.ogDescription.trim()
      ? fm.ogDescription.trim()
      : ctx.description;

  const pathname = docsPathname(ctx.relativePath);
  const canonical = siteUrl
    ? absolutePublicUrl(siteUrl, ctx.vitePressBase, pathname)
    : null;
  const imagePath = sharingImagePath(fm);
  const ogImage = siteUrl
    ? absolutePublicUrl(siteUrl, ctx.vitePressBase, imagePath)
    : imagePath;

  const localeRaw = ctx.siteLang || "en-US";
  const ogLocale = localeRaw.replace(/-/g, "_");

  const head: HeadConfig[] = [
    ["meta", { property: "og:site_name", content: ctx.siteTitle }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: ogTitle }],
    ["meta", { property: "og:description", content: ogDescription }],
    ["meta", { property: "og:image", content: ogImage }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: ogTitle }],
    ["meta", { name: "twitter:description", content: ogDescription }],
    ["meta", { name: "twitter:image", content: ogImage }],
    ["meta", { property: "og:locale", content: ogLocale }],
  ];

  if (imagePath === DEFAULT_SHARE_IMAGE.path) {
    head.push(
      ["meta", { property: "og:image:width", content: String(DEFAULT_SHARE_IMAGE.width) }],
      ["meta", { property: "og:image:height", content: String(DEFAULT_SHARE_IMAGE.height) }],
      ["meta", { property: "og:image:type", content: DEFAULT_SHARE_IMAGE.type }],
      ["meta", { name: "twitter:image:alt", content: DEFAULT_SHARE_IMAGE.alt }],
    );
  } else {
    head.push(["meta", { name: "twitter:image:alt", content: ogDescription }]);
  }

  if (canonical) {
    head.push(["link", { rel: "canonical", href: canonical }]);
    head.push(["meta", { property: "og:url", content: canonical }]);
  }

  if (ctx.isNotFound) {
    head.push(["meta", { name: "robots", content: "noindex, follow" }]);
  }

  if (ctx.relativePath === "index.md" && canonical) {
    const websiteLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: ctx.siteTitle,
      url: canonical,
      description: ctx.siteDescription,
      image: ogImage,
    };
    head.push([
      "script",
      { type: "application/ld+json" },
      JSON.stringify(websiteLd),
    ]);
  }

  return head;
}

export default defineSermonaDocsConfig(
  {
    lang: "en-US",
    title: "Sermona Design System",
    description: "Handbook, tokens, patterns, and voice — Sermona design system for editorial dark UI.",
    head: [
      [
        "meta",
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover",
        },
      ],
      ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
      ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
      ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }],
      ["link", { rel: "manifest", href: "/site.webmanifest" }],
      ["link", { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#ffd600" }],
      ["meta", { name: "theme-color", content: "#1a1a1a" }],
      ["meta", { name: "msapplication-TileColor", content: "#1a1a1a" }],
      [
        "meta",
        { name: "apple-mobile-web-app-capable", content: "yes" },
      ],
      [
        "meta",
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
      ["meta", { name: "application-name", content: "Sermona" }],
      ["meta", { name: "apple-mobile-web-app-title", content: "Sermona" }],
    ],
    themeConfig: {
      /** Short navbar label — full site name stays in `title` / OG. */
      siteTitle: "Sermona",
      sidebarMenuLabel: "All pages",
      outline: {
        label: "On this page",
        level: [2, 3],
      },
      docFooter: {
        prev: "Previous",
        next: "Next",
      },
      returnToTopLabel: "Back to top",
      skipToContentLabel: "Skip to main content",
      externalLinkIcon: true,
      /* VPNavBarExtra (⋯) is shown 768–1279px when site.appearance is set; with force-dark
       * the theme hides locale/appearance inside that flyout, so socialLinks keep it from rendering empty. */
      socialLinks: [
        { icon: "github", link: "https://github.com/mediapeople/sermona-design-system" },
      ],
      nav: [
        { text: "Home", link: "/" },
        {
          text: "Handbook",
          activeMatch:
            "/(using-sermona|good-digital-design|foundations|voice-and-copy)",
          items: [
            { text: "Using Sermona", link: "/using-sermona" },
            { text: "Good digital design", link: "/good-digital-design" },
            { text: "Foundations", link: "/foundations" },
            { text: "Voice & copy", link: "/voice-and-copy" },
          ],
        },
        {
          text: "CSS",
          activeMatch: "/(tokens|components)",
          items: [
            { text: "Tokens", link: "/tokens" },
            { text: "Components", link: "/components" },
          ],
        },
        {
          text: "Patterns",
          activeMatch:
            "/(sections|iconography|services|data-and-tables|forms-buttons-cta|complex-forms|cards-and-swipers|ecommerce-patterns|modals-and-lightbox|blog-patterns|admin-dashboard)",
          items: [
            { text: "Sections", link: "/sections" },
            { text: "Iconography", link: "/iconography" },
            { text: "Services & pricing", link: "/services" },
            { text: "Data & tables", link: "/data-and-tables" },
            { text: "Forms & CTAs", link: "/forms-buttons-cta" },
            { text: "Complex forms", link: "/complex-forms" },
            { text: "Cards & swipers", link: "/cards-and-swipers" },
            { text: "Ecommerce", link: "/ecommerce-patterns" },
            { text: "Modals & lightbox", link: "/modals-and-lightbox" },
            { text: "Blog patterns", link: "/blog-patterns" },
            { text: "Admin & instrumentation", link: "/admin-dashboard" },
          ],
        },
        { text: "Figma", link: "https://www.figma.com/design/IC2hBpxXtkX9Hzb5IMdwmh/Sermona" },
      ],
      sidebar: [
        {
          text: "Introduction",
          items: [
            { text: "Overview", link: "/" },
            { text: "Using Sermona", link: "/using-sermona" },
            { text: "Good digital design", link: "/good-digital-design" },
            { text: "Foundations", link: "/foundations" },
          ],
        },
        {
          text: "Systems",
          items: [
            { text: "Tokens", link: "/tokens" },
            { text: "Components (CSS)", link: "/components" },
          ],
        },
        {
          text: "Patterns",
          items: [
            { text: "Sections", link: "/sections" },
            { text: "Iconography", link: "/iconography" },
            { text: "Services & pricing", link: "/services" },
            { text: "Data & tables", link: "/data-and-tables" },
            { text: "Forms & CTAs", link: "/forms-buttons-cta" },
            { text: "Complex forms", link: "/complex-forms" },
            { text: "Cards & swipers", link: "/cards-and-swipers" },
            { text: "Ecommerce", link: "/ecommerce-patterns" },
            { text: "Modals & lightbox", link: "/modals-and-lightbox" },
            { text: "Blog patterns", link: "/blog-patterns" },
            { text: "Admin & instrumentation", link: "/admin-dashboard" },
          ],
        },
        {
          text: "Content",
          items: [{ text: "Voice & copy", link: "/voice-and-copy" }],
        },
        {
          text: "Reference",
          collapsed: true,
          items: [
            {
              text: "Figma — Sermona file",
              link: "https://www.figma.com/design/IC2hBpxXtkX9Hzb5IMdwmh/Sermona",
            },
          ],
        },
      ],
    },

    transformHead(ctx) {
      return sharingMetaHead({
        siteTitle: ctx.siteData.title,
        siteDescription: ctx.siteData.description,
        siteLang: ctx.siteData.lang,
        vitePressBase: ctx.siteData.base,
        relativePath: ctx.pageData.relativePath,
        title: ctx.title,
        description: ctx.description,
        frontmatter: ctx.pageData.frontmatter,
        isNotFound: ctx.pageData.isNotFound,
      });
    },
  },
  projectRoot,
);
