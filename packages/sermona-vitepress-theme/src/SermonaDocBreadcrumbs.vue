<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme";
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import { useSidebar } from "vitepress/theme";
import { isActive, isExternal } from "vitepress/dist/client/shared.js";

type Crumb = { text: string; link?: string };

function findTrail(
  items: DefaultTheme.SidebarItem[],
  relativePath: string,
  ancestors: Crumb[],
): Crumb[] | null {
  for (const item of items) {
    const text = item.text?.trim() || "…";
    if (item.items?.length) {
      const nextAncestors: Crumb[] =
        item.link && !isExternal(item.link)
          ? [...ancestors, { text, link: item.link }]
          : [...ancestors, { text }];
      const hit = findTrail(item.items, relativePath, nextAncestors);
      if (hit) return hit;
    } else if (
      item.link &&
      !isExternal(item.link) &&
      isActive(relativePath, item.link)
    ) {
      return [...ancestors, { text, link: item.link }];
    }
  }
  return null;
}

const { page, frontmatter } = useData();
const { hasSidebar, sidebar } = useSidebar();

const trail = computed(() => {
  if (!hasSidebar.value) return null;
  if (frontmatter.value.layout === "home") return null;
  if (page.value.layout === "page" && frontmatter.value.sidebar === false) {
    return null;
  }
  if (page.value.isNotFound) return null;
  const items = sidebar.value;
  if (!items?.length) return null;
  return findTrail(items, page.value.relativePath, []);
});

const show = computed(() => (trail.value?.length ?? 0) > 0);

const currentLabel = computed(() => {
  const t = trail.value;
  if (!t?.length) return "";
  const last = t[t.length - 1]!;
  return page.value.title?.trim() || last.text;
});
</script>

<template>
  <nav
    v-if="show"
    class="sermona-doc-breadcrumbs"
    aria-label="Breadcrumb"
  >
    <ol class="sermona-doc-breadcrumbs__list">
      <li
        v-for="(crumb, i) in trail"
        :key="`${i}-${crumb.text}`"
        class="sermona-doc-breadcrumbs__item"
      >
        <template v-if="i === trail!.length - 1">
          <span
            class="sermona-doc-breadcrumbs__current"
            aria-current="page"
          >{{ currentLabel }}</span>
        </template>
        <a
          v-else-if="crumb.link"
          class="sermona-doc-breadcrumbs__link"
          :href="withBase(crumb.link)"
        >{{ crumb.text }}</a>
        <span
          v-else
          class="sermona-doc-breadcrumbs__text"
        >{{ crumb.text }}</span>
      </li>
    </ol>
  </nav>
</template>
