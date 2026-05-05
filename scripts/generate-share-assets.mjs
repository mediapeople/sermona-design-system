/**
 * Rasterize SVG sources into PNGs for favicons, PWA manifest, and Open Graph.
 * Run after changing `docs/public/og-source.svg` or `docs/public/favicon.svg`:
 *   npm run generate:share-assets
 *
 * Requires: sharp (devDependency at repo root).
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(__dirname, "..", "docs", "public");

async function main() {
  await sharp(path.join(pub, "og-source.svg"))
    .resize(1200, 630)
    .png()
    .toFile(path.join(pub, "og.png"));

  const fav = path.join(pub, "favicon.svg");
  await sharp(fav).resize(32, 32).png().toFile(path.join(pub, "favicon-32x32.png"));
  await sharp(fav).resize(180, 180).png().toFile(path.join(pub, "apple-touch-icon.png"));
  await sharp(fav).resize(192, 192).png().toFile(path.join(pub, "icon-192.png"));
  await sharp(fav).resize(512, 512).png().toFile(path.join(pub, "icon-512.png"));

  console.log("Wrote og.png, favicon-32x32.png, apple-touch-icon.png, icon-192.png, icon-512.png → docs/public/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
