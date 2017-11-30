const fs = require('fs-extra');
const path = require('path');
const MemoryFS = require('memory-fs');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const uuid = require('uuid');
const webpack = require('webpack');

const main = async script => {
  const id = uuid();
  const mfs = new MemoryFS();

  const compiler = webpack({
    context: path.resolve(__dirname, './workspace'),
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
  });

  compiler.outputFileSystem = mfs;

  await fs.writeFile(`./workspace/${id}-input.js`, script);

  try {
    return await new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) return reject(err);
        if (stats.hasErrors()) return reject(new Error(stats.toJson().errors[0]));

        resolve(mfs.readFileSync(`/${id}-output.js`, 'utf-8'));
      });
    });
  } catch (err) {
    await fs.unlink(`./workspace/${id}-input.js`);
  }
};

main(`var Siema = require('@kaizenplatform-gh-library/siema');

new Siema({
  selector: window.document.getElementById('some-siema-target'),
  duration: 200,
  easing: 'ease-out',
  perPage: 1,
  startIndex: 0,
  draggable: true,
  multipleDrag: true,
  threshold: 20,
  loop: false,
  onInit: function() {},
  onChange: function() {},
});
`).then(result => fs.writeFile('output.js', result));
