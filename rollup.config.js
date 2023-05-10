const typescript = require("@rollup/plugin-typescript");
const svelte = require("rollup-plugin-svelte");
const sveltePreprocess = require("svelte-preprocess");
const terser = require("@rollup/plugin-terser");
const dtsBundle = require("rollup-plugin-dts-bundle");
const serve = require("rollup-plugin-serve");
const { nodeResolve } = require("@rollup/plugin-node-resolve");

const isDev = process.env.NODE_ENV === "development";

const devPlugins = [
  nodeResolve(),
  serve({
    contentBase: ["public"],
    port: 3000,
  }),
];
const prodPlugins = [
  dtsBundle({
    bundle: {
      name: "calendar-header",
      main: "dist/render.d.ts",
      out: "index.d.ts",
      removeSource: true,
    },
  }),
];

module.exports = [
  {
    input: isDev ? "./src/launch.ts" : "./src/render.ts",
    output: {
      file: isDev ? "./public/index.js" : "./dist/index.js",
      format: isDev ? "iife" : "es",
      sourcemap: true,
    },
    plugins: [
      svelte({
        emitCss: false,
        preprocess: sveltePreprocess(),
      }),
      typescript({ tsconfig: "tsconfig.prod.json" }),
      terser(),
    ].concat(isDev ? devPlugins : prodPlugins),
  },
];
