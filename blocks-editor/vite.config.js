import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    outDir: "../dist/editor",
    rollupOptions: {
      input: path.resolve(__dirname, "src/index.js"),
      output: {
        format: "iife", // <-- important : bundle autonome, pas de imports
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@wordpress/blocks": "wp.blocks",
          "@wordpress/element": "wp.element",
          "@wordpress/block-editor": "wp.blockEditor",
          "@wordpress/components": "wp.components",
        },
        entryFileNames: "index.js",
      },
      external: [
        "react",
        "react-dom",
        "@wordpress/blocks",
        "@wordpress/block-editor",
        "@wordpress/components",
        "@wordpress/element",
      ],
    },
    emptyOutDir: true,
    assetsDir: "", // pour ne pas créer de sous-dossier assets
    sourcemap: false,
    assetsInlineLimit: 0,
    manifest: false,
  },
  esbuild: {
    jsxFactory: "createElement", // wp.element.createElement
    jsxFragment: "Fragment", // wp.element.Fragment
    jsxInject: `import { createElement, Fragment } from "@wordpress/element";`,
  },
});
