const fs = require('fs-extra');
const path = require('path');
const MemoryFS = require('memory-fs');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const uuid = require('uuid');
const webpack = require('webpack');

const build = async script => {
  const id = uuid();
  const mfs = new MemoryFS();

  const compiler = webpack({
    context: path.resolve(__dirname, '../tmp'),
    entry: `./${id}-input.js`,
    output: {
      path: '/',
      filename: `./${id}-output.js`,
    },
    // resolve: {
    //   alias: {
    //     '@kaizenplatform-gh-library/siema': 'siema',
    //   },
    // },
    plugins: [new UglifyJsPlugin({ cache: false, sourceMap: false })],
    parallelism: 1,
    cache: false,
    watch: false,
  });

  compiler.outputFileSystem = mfs;

  await fs.writeFile(path.resolve(__dirname, `../tmp/${id}-input.js`), script);

  try {
    const output = await new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) return reject(err);
        if (stats.hasErrors()) return reject(new Error(stats.toJson().errors[0]));

        console.log(mfs.data);

        resolve(mfs.readFileSync(`/${id}-output.js`, 'utf-8'));
      });
    });

    await fs.unlink(path.resolve(__dirname, `../tmp/${id}-input.js`));

    return output;
  } catch (err) {
    await fs.unlink(path.resolve(__dirname, `../tmp/${id}-input.js`));

    throw err;
  }
};

module.exports = build;
