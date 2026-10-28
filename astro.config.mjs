// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://wonkoly.github.io",
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
