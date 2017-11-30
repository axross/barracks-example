const Siema = require('siema');

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
