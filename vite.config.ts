import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "hobby",
      project: "tutorials",
    }),
  ],

  /** @see https://vitejs-kr.github.io/config/server-options.html */
  server: {
    port: 3000,
    host: true,
    open: "/",
  },

  resolve: {
    alias: [
      {
        find: "~",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },

  build: {
    sourcemap: true,
  },
});
