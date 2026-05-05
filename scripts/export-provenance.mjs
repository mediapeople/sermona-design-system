#!/usr/bin/env node
/**
 * Copy the entire Sermona monorepo to a folder for archival / provenance.
 *
 * Usage:
 *   node scripts/export-provenance.mjs /path/to/export [--force] [--with-git]
 *
 * Excludes: node_modules, docs/.vitepress/cache|dist, .DS_Store
 * Optional: --with-git keeps the .git directory for full history / hash provenance.
 */

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

function parseArgs(argv) {
  let force = false;
  let withGit = false;
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--force") {
      force = true;
      continue;
    }
    if (argv[i] === "--with-git") {
      withGit = true;
      continue;
    }
    if (argv[i].startsWith("-")) {
      console.error(`Unknown flag: ${argv[i]}`);
      process.exit(1);
    }
    positional.push(argv[i]);
  }
  return { target: positional[0], force, withGit };
}

function gitMeta(cwd) {
  try {
    const commit = execSync("git rev-parse HEAD", {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const dirty =
      execSync("git status --porcelain", {
        cwd,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim().length > 0;
    return { commit, dirty };
  } catch {
    return null;
  }
}

function shouldCopy(src, withGit) {
  const rel = relative(repoRoot, src);
  const norm = rel.split(/[/\\]/).join("/");

  if (norm === "" || norm === ".") return true;
  if (norm.endsWith(".DS_Store")) return false;
  if (norm === "node_modules" || norm.startsWith("node_modules/")) return false;
  if (norm.includes("/node_modules/") || norm.includes("\\node_modules\\")) return false;

  if (!withGit && (norm === ".git" || norm.startsWith(".git/"))) return false;

  if (norm.includes("/.vitepress/cache") || norm.includes("/.vitepress/dist")) return false;

  return true;
}

const { target: targetRaw, force, withGit } = parseArgs(process.argv.slice(2));

if (!targetRaw) {
  console.error(`Usage: node scripts/export-provenance.mjs <target-dir> [--force] [--with-git]`);
  process.exit(1);
}

const target = resolve(targetRaw);

if (existsSync(target)) {
  const entries = readdirSync(target);
  if (entries.length > 0) {
    if (!force) {
      console.error(`Target is not empty: ${target}\nUse --force to replace it.`);
      process.exit(1);
    }
    rmSync(target, { recursive: true });
  }
} else {
  mkdirSync(target, { recursive: true });
}

const manifest = {
  exportedAt: new Date().toISOString(),
  sourceRoot: repoRoot,
  destination: target,
  nodeVersion: process.version,
  git: gitMeta(repoRoot),
  includesGitDir: withGit,
  excludes: [
    "**/node_modules",
    "docs/.vitepress/cache",
    "docs/.vitepress/dist",
    ".DS_Store",
    ...(!withGit ? [".git"] : []),
  ],
};

cpSync(repoRoot, target, {
  recursive: true,
  filter: (src) => shouldCopy(src, withGit),
});

writeFileSync(join(target, "PROVENANCE.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(`Exported to ${target}`);
console.log(`Wrote ${join(target, "PROVENANCE.json")}`);
console.log(withGit ? "Included .git for commit-level provenance." : "Excluded .git (pass --with-git to include).");
console.log("Run `npm install && npm run build` in the export to reproduce artifacts.");
