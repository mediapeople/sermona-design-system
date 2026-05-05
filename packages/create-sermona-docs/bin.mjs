#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const templateDir = join(__dirname, "template");

function parseArgs(argv) {
  const positional = [];
  let linkRoot = null;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--link" && argv[i + 1]) {
      linkRoot = resolve(argv[i + 1]);
      i++;
      continue;
    }
    if (a.startsWith("-")) {
      console.error(`Unknown flag: ${a}`);
      process.exit(1);
    }
    positional.push(a);
  }
  return { target: positional[0] ?? "my-sermona-docs", linkRoot };
}

const { target, linkRoot } = parseArgs(process.argv.slice(2));
const targetPath = resolve(process.cwd(), target);

if (existsSync(targetPath)) {
  const entries = readdirSync(targetPath);
  if (entries.length > 0) {
    console.error(`Refusing to scaffold: ${targetPath} is not empty.`);
    process.exit(1);
  }
} else {
  mkdirSync(targetPath, { recursive: true });
}

cpSync(templateDir, targetPath, { recursive: true });

const pkgPath = join(targetPath, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const slug =
  basename(targetPath)
    .replace(/[^a-z0-9-]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "sermona-docs";

pkg.name = slug;

if (linkRoot) {
  const tokensPkg = join(linkRoot, "packages", "sermona-tokens").replace(/\\/g, "/");
  const themePkg = join(linkRoot, "packages", "sermona-vitepress-theme").replace(/\\/g, "/");
  pkg.dependencies["@sermona/tokens"] = `file:${tokensPkg}`;
  pkg.dependencies["@sermona/vitepress-theme"] = `file:${themePkg}`;
}

writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

console.log(`
Sermona doc site scaffolded at ${targetPath}

  cd ${target}
  npm install
  npm run dev

Docs:
  • Edit .vitepress/config.ts for title, nav, sidebar
  • Put Markdown in the project root (e.g. index.md)
  • Use Sermona CSS classes from @sermona/tokens/components.css in HTML blocks

${linkRoot ? `Linked @sermona/* to ${linkRoot}\n` : "Using registry versions of @sermona/* (publish packages or re-run with --link <path/to/sermona-design-system>).\n"}
`);
