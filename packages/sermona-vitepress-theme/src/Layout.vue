<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import SermonaDocBreadcrumbs from "./SermonaDocBreadcrumbs.vue";
</script>

<template>
  <div class="sermona-root sermona-doc-shell">
    <DefaultTheme.Layout>
      <template #doc-before>
        <SermonaDocBreadcrumbs />
      </template>
    </DefaultTheme.Layout>
  </div>
</template>
