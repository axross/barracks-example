!(function(e) {
  function t(n) {
    if (i[n]) return i[n].exports;
    var s = (i[n] = { i: n, l: !1, exports: {} });
    return e[n].call(s.exports, s, s.exports, t), (s.l = !0), s.exports;
  }
  var i = {};
  (t.m = e),
    (t.c = i),
    (t.d = function(e, i, n) {
      t.o(e, i) || Object.defineProperty(e, i, { configurable: !1, enumerable: !0, get: n });
    }),
    (t.n = function(e) {
      var i =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return t.d(i, 'a', i), i;
    }),
    (t.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (t.p = ''),
    t((t.s = 0));
})([
  function(e, t, i) {
    new (i(1))({ selector: window.document.getElementById('some-siema-target'), duration: 200, easing: 'ease-out', perPage: 1, startIndex: 0, draggable: !0, multipleDrag: !0, threshold: 20, loop: !1, onInit: function() {}, onChange: function() {} });
  },
  function(e, t, i) {
    !(function(t, i) {
      e.exports = i();
    })(0, function() {
      return (function(e) {
        function t(n) {
          if (i[n]) return i[n].exports;
          var s = (i[n] = { i: n, l: !1, exports: {} });
          return e[n].call(s.exports, s, s.exports, t), (s.l = !0), s.exports;
        }
        var i = {};
        return (
          (t.m = e),
          (t.c = i),
          (t.i = function(e) {
            return e;
          }),
          (t.d = function(e, i, n) {
            t.o(e, i) || Object.defineProperty(e, i, { configurable: !1, enumerable: !0, get: n });
          }),
          (t.n = function(e) {
            var i =
              e && e.__esModule
                ? function() {
                    return e.default;
                  }
                : function() {
                    return e;
                  };
            return t.d(i, 'a', i), i;
          }),
          (t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }),
          (t.p = ''),
          t((t.s = 0))
        );
      })([
        function(e, t, i) {
          'use strict';
          function n(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          }
          Object.defineProperty(t, '__esModule', { value: !0 });
          var s =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function(e) {
                    return typeof e;
                  }
                : function(e) {
                    return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
                  },
            r = (function() {
              function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                  var n = t[i];
                  (n.enumerable = n.enumerable || !1), (n.configurable = !0), 'value' in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
                }
              }
              return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t;
              };
            })(),
            o = (function() {
              function e(t) {
                var i = this;
                n(this, e),
                  (this.config = e.mergeSettings(t)),
                  (this.selector = 'string' == typeof this.config.selector ? document.querySelector(this.config.selector) : this.config.selector),
                  (this.selectorWidth = this.selector.offsetWidth),
                  (this.innerElements = [].slice.call(this.selector.children)),
                  (this.currentSlide = this.config.startIndex),
                  (this.transformProperty = e.webkitOrNot()),
                  ['resizeHandler', 'touchstartHandler', 'touchendHandler', 'touchmoveHandler', 'mousedownHandler', 'mouseupHandler', 'mouseleaveHandler', 'mousemoveHandler'].forEach(function(e) {
                    i[e] = i[e].bind(i);
                  }),
                  this.init();
              }
              return (
                r(
                  e,
                  [
                    {
                      key: 'init',
                      value: function() {
                        if ((window.addEventListener('resize', this.resizeHandler), this.config.draggable && ((this.pointerDown = !1), (this.drag = { startX: 0, endX: 0, startY: 0, letItGo: null }), this.selector.addEventListener('touchstart', this.touchstartHandler), this.selector.addEventListener('touchend', this.touchendHandler), this.selector.addEventListener('touchmove', this.touchmoveHandler, { passive: !0 }), this.selector.addEventListener('mousedown', this.mousedownHandler), this.selector.addEventListener('mouseup', this.mouseupHandler), this.selector.addEventListener('mouseleave', this.mouseleaveHandler), this.selector.addEventListener('mousemove', this.mousemoveHandler)), null === this.selector)) throw new Error('Something wrong with your selector 😭');
                        this.resolveSlidesNumber(), (this.selector.style.overflow = 'hidden'), (this.sliderFrame = document.createElement('div')), (this.sliderFrame.style.width = this.selectorWidth / this.perPage * this.innerElements.length + 'px'), (this.sliderFrame.style.webkitTransition = 'all ' + this.config.duration + 'ms ' + this.config.easing), (this.sliderFrame.style.transition = 'all ' + this.config.duration + 'ms ' + this.config.easing), this.config.draggable && (this.selector.style.cursor = '-webkit-grab');
                        for (var e = document.createDocumentFragment(), t = 0; t < this.innerElements.length; t++) {
                          var i = document.createElement('div');
                          (i.style.cssFloat = 'left'), (i.style.float = 'left'), (i.style.width = 100 / this.innerElements.length + '%'), i.appendChild(this.innerElements[t]), e.appendChild(i);
                        }
                        this.sliderFrame.appendChild(e), (this.selector.innerHTML = ''), this.selector.appendChild(this.sliderFrame), this.slideToCurrent(), this.config.onInit.call(this);
                      },
                    },
                    {
                      key: 'resolveSlidesNumber',
                      value: function() {
                        if ('number' == typeof this.config.perPage) this.perPage = this.config.perPage;
                        else if ('object' === s(this.config.perPage)) {
                          this.perPage = 1;
                          for (var e in this.config.perPage) window.innerWidth >= e && (this.perPage = this.config.perPage[e]);
                        }
                      },
                    },
                    {
                      key: 'prev',
                      value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                          t = arguments[1];
                        if (!(this.innerElements.length <= this.perPage)) {
                          var i = this.currentSlide;
                          0 === this.currentSlide && this.config.loop ? (this.currentSlide = this.innerElements.length - this.perPage) : (this.currentSlide = Math.max(this.currentSlide - e, 0)), i !== this.currentSlide && (this.slideToCurrent(), this.config.onChange.call(this), t && t.call(this));
                        }
                      },
                    },
                    {
                      key: 'next',
                      value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                          t = arguments[1];
                        if (!(this.innerElements.length <= this.perPage)) {
                          var i = this.currentSlide;
                          this.currentSlide === this.innerElements.length - this.perPage && this.config.loop ? (this.currentSlide = 0) : (this.currentSlide = Math.min(this.currentSlide + e, this.innerElements.length - this.perPage)), i !== this.currentSlide && (this.slideToCurrent(), this.config.onChange.call(this), t && t.call(this));
                        }
                      },
                    },
                    {
                      key: 'goTo',
                      value: function(e, t) {
                        this.innerElements.length <= this.perPage || ((this.currentSlide = Math.min(Math.max(e, 0), this.innerElements.length - this.perPage)), this.slideToCurrent(), t && t.call(this));
                      },
                    },
                    {
                      key: 'slideToCurrent',
                      value: function() {
                        this.sliderFrame.style[this.transformProperty] = 'translate3d(-' + this.currentSlide * (this.selectorWidth / this.perPage) + 'px, 0, 0)';
                      },
                    },
                    {
                      key: 'updateAfterDrag',
                      value: function() {
                        var e = this.drag.endX - this.drag.startX,
                          t = Math.abs(e),
                          i = Math.ceil(t / (this.selectorWidth / this.perPage));
                        e > 0 && t > this.config.threshold && this.innerElements.length > this.perPage ? this.prev(i) : e < 0 && t > this.config.threshold && this.innerElements.length > this.perPage && this.next(i), this.slideToCurrent();
                      },
                    },
                    {
                      key: 'resizeHandler',
                      value: function() {
                        this.resolveSlidesNumber(), (this.selectorWidth = this.selector.offsetWidth), (this.sliderFrame.style.width = this.selectorWidth / this.perPage * this.innerElements.length + 'px'), this.slideToCurrent();
                      },
                    },
                    {
                      key: 'clearDrag',
                      value: function() {
                        this.drag = { startX: 0, endX: 0, startY: 0, letItGo: null };
                      },
                    },
                    {
                      key: 'touchstartHandler',
                      value: function(e) {
                        e.stopPropagation(), (this.pointerDown = !0), (this.drag.startX = e.touches[0].pageX), (this.drag.startY = e.touches[0].pageY);
                      },
                    },
                    {
                      key: 'touchendHandler',
                      value: function(e) {
                        e.stopPropagation(), (this.pointerDown = !1), (this.sliderFrame.style.webkitTransition = 'all ' + this.config.duration + 'ms ' + this.config.easing), (this.sliderFrame.style.transition = 'all ' + this.config.duration + 'ms ' + this.config.easing), this.drag.endX && this.updateAfterDrag(), this.clearDrag();
                      },
                    },
                    {
                      key: 'touchmoveHandler',
                      value: function(e) {
                        e.stopPropagation(), null === this.drag.letItGo && (this.drag.letItGo = Math.abs(this.drag.startY - e.touches[0].pageY) < Math.abs(this.drag.startX - e.touches[0].pageX)), this.pointerDown && this.drag.letItGo && ((this.drag.endX = e.touches[0].pageX), (this.sliderFrame.style.webkitTransition = 'all 0ms ' + this.config.easing), (this.sliderFrame.style.transition = 'all 0ms ' + this.config.easing), (this.sliderFrame.style[this.transformProperty] = 'translate3d(' + -1 * (this.currentSlide * (this.selectorWidth / this.perPage) + (this.drag.startX - this.drag.endX)) + 'px, 0, 0)'));
                      },
                    },
                    {
                      key: 'mousedownHandler',
                      value: function(e) {
                        e.preventDefault(), e.stopPropagation(), (this.pointerDown = !0), (this.drag.startX = e.pageX);
                      },
                    },
                    {
                      key: 'mouseupHandler',
                      value: function(e) {
                        e.stopPropagation(), (this.pointerDown = !1), (this.selector.style.cursor = '-webkit-grab'), (this.sliderFrame.style.webkitTransition = 'all ' + this.config.duration + 'ms ' + this.config.easing), (this.sliderFrame.style.transition = 'all ' + this.config.duration + 'ms ' + this.config.easing), this.drag.endX && this.updateAfterDrag(), this.clearDrag();
                      },
                    },
                    {
                      key: 'mousemoveHandler',
                      value: function(e) {
                        e.preventDefault(), this.pointerDown && ((this.drag.endX = e.pageX), (this.selector.style.cursor = '-webkit-grabbing'), (this.sliderFrame.style.webkitTransition = 'all 0ms ' + this.config.easing), (this.sliderFrame.style.transition = 'all 0ms ' + this.config.easing), (this.sliderFrame.style[this.transformProperty] = 'translate3d(' + -1 * (this.currentSlide * (this.selectorWidth / this.perPage) + (this.drag.startX - this.drag.endX)) + 'px, 0, 0)'));
                      },
                    },
                    {
                      key: 'mouseleaveHandler',
                      value: function(e) {
                        this.pointerDown && ((this.pointerDown = !1), (this.selector.style.cursor = '-webkit-grab'), (this.drag.endX = e.pageX), (this.sliderFrame.style.webkitTransition = 'all ' + this.config.duration + 'ms ' + this.config.easing), (this.sliderFrame.style.transition = 'all ' + this.config.duration + 'ms ' + this.config.easing), this.updateAfterDrag(), this.clearDrag());
                      },
                    },
                    {
                      key: 'updateFrame',
                      value: function() {
                        (this.sliderFrame = document.createElement('div')), (this.sliderFrame.style.width = this.selectorWidth / this.perPage * this.innerElements.length + 'px'), (this.sliderFrame.style.webkitTransition = 'all ' + this.config.duration + 'ms ' + this.config.easing), (this.sliderFrame.style.transition = 'all ' + this.config.duration + 'ms ' + this.config.easing), this.config.draggable && (this.selector.style.cursor = '-webkit-grab');
                        for (var e = document.createDocumentFragment(), t = 0; t < this.innerElements.length; t++) {
                          var i = document.createElement('div');
                          (i.style.cssFloat = 'left'), (i.style.float = 'left'), (i.style.width = 100 / this.innerElements.length + '%'), i.appendChild(this.innerElements[t]), e.appendChild(i);
                        }
                        this.sliderFrame.appendChild(e), (this.selector.innerHTML = ''), this.selector.appendChild(this.sliderFrame), this.slideToCurrent();
                      },
                    },
                    {
                      key: 'remove',
                      value: function(e, t) {
                        if (e < 0 || e > this.innerElements.length) throw new Error("Item to remove doesn't exist 😭");
                        this.innerElements.splice(e, 1), (this.currentSlide = e < this.currentSlide ? this.currentSlide - 1 : this.currentSlide), this.updateFrame(), t && t.call(this);
                      },
                    },
                    {
                      key: 'insert',
                      value: function(e, t, i) {
                        if (t < 0 || t > this.innerElements.length + 1) throw new Error('Unable to inset it at this index 😭');
                        if (-1 !== this.innerElements.indexOf(e)) throw new Error('The same item in a carousel? Really? Nope 😭');
                        this.innerElements.splice(t, 0, e), (this.currentSlide = t <= this.currentSlide ? this.currentSlide + 1 : this.currentSlide), this.updateFrame(), i && i.call(this);
                      },
                    },
                    {
                      key: 'prepend',
                      value: function(e, t) {
                        this.insert(e, 0), t && t.call(this);
                      },
                    },
                    {
                      key: 'append',
                      value: function(e, t) {
                        this.insert(e, this.innerElements.length + 1), t && t.call(this);
                      },
                    },
                    {
                      key: 'destroy',
                      value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                          t = arguments[1];
                        if ((window.removeEventListener('resize', this.resizeHandler), (this.selector.style.cursor = 'auto'), this.selector.removeEventListener('touchstart', this.touchstartHandler), this.selector.removeEventListener('touchend', this.touchendHandler), this.selector.removeEventListener('touchmove', this.touchmoveHandler), this.selector.removeEventListener('mousedown', this.mousedownHandler), this.selector.removeEventListener('mouseup', this.mouseupHandler), this.selector.removeEventListener('mouseleave', this.mouseleaveHandler), this.selector.removeEventListener('mousemove', this.mousemoveHandler), e)) {
                          for (var i = document.createDocumentFragment(), n = 0; n < this.innerElements.length; n++) i.appendChild(this.innerElements[n]);
                          (this.selector.innerHTML = ''), this.selector.appendChild(i), this.selector.removeAttribute('style');
                        }
                        t && t.call(this);
                      },
                    },
                  ],
                  [
                    {
                      key: 'mergeSettings',
                      value: function(e) {
                        var t = { selector: '.siema', duration: 200, easing: 'ease-out', perPage: 1, startIndex: 0, draggable: !0, threshold: 20, loop: !1, onInit: function() {}, onChange: function() {} },
                          i = e;
                        for (var n in i) t[n] = i[n];
                        return t;
                      },
                    },
                    {
                      key: 'webkitOrNot',
                      value: function() {
                        return 'string' == typeof document.documentElement.style.transform ? 'transform' : 'WebkitTransform';
                      },
                    },
                  ],
                ),
                e
              );
            })();
          (t.default = o), (e.exports = t.default);
        },
      ]);
    });
  },
]);
