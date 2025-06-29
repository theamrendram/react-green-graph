import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "fs";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    {
      name: "react-green-graph",
      writeBundle() {
        copyFileSync("index.d.ts", "dist/index.d.ts");
      },
    },
  ],
  build: {
    lib: {
      entry: "index.js",
      name: "ReactGreenGraph",
      fileName: (format) => `react-green-graph.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
