const fs = require('fs-extra');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const uuid = require('uuid');
const { FuseBox } = require('fuse-box');

const build = script => {
  const id = uuid();

  const fuse = new FuseBox({
    homeDir: path.resolve(__dirname, '../temporary'),
    output: `${id}-output.js`,
    cache: false,
    shim: {
      '@kaizenplatform-gh-library/siema': { exports: 'require("siema")' },
    },
  });

  return fs.writeFile(path.resolve(__dirname, `../temporary/${id}-input.js`), script).then(() => fuse.initiateBundle(`>${id}-input.js`).then(() => {}));
};

module.exports = build;
