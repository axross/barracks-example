const fs = require('fs-extra');
const path = require('path');
const MemoryFS = require('memory-fs');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const uuid = require('uuid');
const webpack = require('webpack');

const build = script => {
  const id = uuid();
  const mfs = new MemoryFS();

  const compiler = webpack({
    context: path.resolve(__dirname, '../temporary'),
    entry: `./${id}-input.js`,
    output: {
      path: '/',
      filename: `./${id}-output.js`,
    },
    resolve: {
      alias: {
        '@kaizenplatform-gh-library/siema': 'siema',
      },
    },
    plugins: [new UglifyJsPlugin({ cache: false, sourceMap: false })],
    parallelism: 1,
    cache: false,
    watch: false,
  });

  compiler.outputFileSystem = mfs;

  return fs
    .writeFile(path.resolve(__dirname, `../temporary/${id}-input.js`), script)
    .then(
      () =>
        new Promise((resolve, reject) => {
          compiler.run((err, stats) => {
            if (err) return reject(err);
            if (stats.hasErrors()) return reject(new Error(stats.toJson().errors[0]));

            console.log(mfs.data);

            resolve(mfs.readFileSync(`/${id}-output.js`, 'utf-8'));
          });
        }),
    )
    .then(output => fs.unlink(path.resolve(__dirname, `../temporary/${id}-input.js`)).then(() => output))
    .catch(err => fs.unlink(path.resolve(__dirname, `../temporary/${id}-input.js`)))
    .then(() => console.error(err));
};

module.exports = build;
