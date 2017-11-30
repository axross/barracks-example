const fs = require('fs');
const path = require('path');
const build = require('./src/build_rollup');

build(`const Siema = require('siema');

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
`)
  .then(result => console.log(result) || fs.writeFileSync(path.resolve(__dirname, './output.js'), result))
  .catch(err => console.error(err));
