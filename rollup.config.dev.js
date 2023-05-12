const typescript = require('@rollup/plugin-typescript');
const svelte = require('rollup-plugin-svelte');
const sveltePreprocess = require('svelte-preprocess');
const terser = require('@rollup/plugin-terser');
const dtsBundle = require('rollup-plugin-dts-bundle');
const serve = require('rollup-plugin-serve');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = [
  {
    input: './src/launch.ts',
    output: {
      file: './public/index.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins: [
      svelte({
        emitCss: false,
        preprocess: sveltePreprocess(),
      }),
      typescript({ tsconfig: 'tsconfig.prod.json' }),
      terser(),
      nodeResolve(),
      commonjs(),
      serve({
        contentBase: ['public'],
        port: 3000,
      }),
    ],
  },
];
