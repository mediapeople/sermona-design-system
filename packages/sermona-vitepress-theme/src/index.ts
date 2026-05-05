import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import Layout from "./Layout.vue";
import "./style.css";

const theme = {
  extends: DefaultTheme,
  Layout,
} satisfies Theme;

export default theme;
