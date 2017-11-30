const fs = require('fs-extra');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const uuid = require('uuid');
const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const build = script => {
  const id = uuid();

  return fs
    .writeFile(path.resolve(__dirname, `../temporary/${id}-input.js`), script)
    .then(() =>
      rollup.rollup({
        input: path.resolve(__dirname, `../temporary/${id}-input.js`),
        plugins: [
          nodeResolve({
            browser: true,
          }),
          commonjs(),
        ],
      }),
    )
    .then(bundle => bundle.generate({ name: 'a', format: 'iife' }))
    .then(({ code, map }) => code)
    .catch(err => console.error(err));
};

module.exports = build;
