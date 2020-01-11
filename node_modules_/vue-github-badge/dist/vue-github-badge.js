/*!
 * vue-github-badge v1.0.1
 * (c) 2017-present egoist <0x142857@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.GitHubBadge = factory());
}(this, (function () { 'use strict';

var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/;

var index$1 = function mergeJSXProps(objs) {
  return objs.reduce(function (a, b) {
    var aa, bb, key, nestedKey, temp;
    for (key in b) {
      aa = a[key];
      bb = b[key];
      if (aa && nestRE.test(key)) {
        // normalize class
        if (key === 'class') {
          if (typeof aa === 'string') {
            temp = aa;
            a[key] = aa = {};
            aa[temp] = true;
          }
          if (typeof bb === 'string') {
            temp = bb;
            b[key] = bb = {};
            bb[temp] = true;
          }
        }
        if (key === 'on' || key === 'nativeOn' || key === 'hook') {
          // merge functions
          for (nestedKey in bb) {
            aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey]);
          }
        } else if (Array.isArray(aa)) {
          a[key] = aa.concat(bb);
        } else if (Array.isArray(bb)) {
          a[key] = [aa].concat(bb);
        } else {
          for (nestedKey in bb) {
            aa[nestedKey] = bb[nestedKey];
          }
        }
      } else {
        a[key] = b[key];
      }
    }
    return a;
  }, {});
};

function mergeFn(a, b) {
  return function () {
    a.apply(this, arguments);
    b.apply(this, arguments);
  };
}

var index = {
  name: 'github-badge',

  functional: true,

  props: {
    slug: { type: String, required: true },
    width: { type: Number, default: 36 },
    height: { type: Number, default: 36 },
    fill: { type: String, default: 'black' }
  },

  render: function render(h, ctx) {
    var _ctx$props = ctx.props,
        slug = _ctx$props.slug,
        height = _ctx$props.height,
        width = _ctx$props.width,
        fill = _ctx$props.fill;


    var style = {
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 9999
    };

    return h(
      'a',
      index$1([{ style: style, attrs: { href: 'https://github.com/' + slug, target: '_blank' }
      }, ctx.data]),
      [h(
        'svg',
        {
          attrs: { id: 'i-github', viewBox: '0 0 64 64', width: height, height: width }
        },
        [h(
          'path',
          {
            attrs: { 'stroke-width': '0', fill: fill, d: 'M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z' }
          },
          []
        )]
      )]
    );
  }
};

return index;

})));
