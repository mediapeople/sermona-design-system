import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineSermonaDocsConfig } from "@sermona/vitepress-theme/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

export default defineSermonaDocsConfig(
  {
    title: "Documentation",
    description: "Documentation powered by VitePress + Sermona",
    themeConfig: {
      nav: [
        { text: "Home", link: "/" },
        { text: "Guide", link: "/guide" },
      ],
      sidebar: [
        { text: "Overview", link: "/" },
        { text: "Guide", link: "/guide" },
      ],
    },
  },
  projectRoot,
);
