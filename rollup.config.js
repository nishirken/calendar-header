const typescript = require("@rollup/plugin-typescript");
const svelte = require("rollup-plugin-svelte");
const sveltePreprocess = require("svelte-preprocess");
const terser = require("@rollup/plugin-terser");
const dtsBundle = require("rollup-plugin-dts-bundle");

module.exports = [
  {
    input: "./src/render.ts",
    output: {
      file: "./dist/index.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      svelte({
        emitCss: false,
        preprocess: sveltePreprocess(),
      }),
      typescript({ tsconfig: "tsconfig.prod.json" }),
      terser(),
      dtsBundle({
        bundle: {
          name: "calendar-header",
          main: "dist/render.d.ts",
          out: "index.d.ts",
          removeSource: true,
        },
      }),
    ],
  },
];
