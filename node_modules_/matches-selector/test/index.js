'use strict';

var test = require('tape');
var domify = require('domify');
var matches = require('../');

var ul = domify('<ul><li><em>foo</em></li></ul>');
var li = ul.children[0];
var em = li.children[0];

test('matchesSelector(el, selector)', function (t) {
  t.plan(12);

  t.assert(true === matches(em, 'ul li em'), 'em = "ul li em"');
  t.assert(true === matches(em, 'ul em'), 'em = "ul em"');
  t.assert(true === matches(em, 'ul > li > em'), 'em = "ul > li > em"');
  t.assert(false === matches(em, 'ul ul em'), 'em != "ul ul em"');

  t.assert(true === matches(li, 'ul li'), 'li = "ul li"');
  t.assert(true === matches(li, 'ul > li'), 'li = "ul > li"');
  t.assert(true === matches(li, 'li'), 'li = "li"');
  t.assert(false === matches(li, 'div > li'), 'li != "div > li"');

  t.assert(true == matches(ul, 'ul', 'ul = "ul"'), 'ul = "ul"');
  t.assert(false == matches(ul, 'body > ul'), 'ul != "body > ul"');

  t.assert(false === matches(em.firstChild, 'ul'), 'match on textNode is false');
  t.assert(false === matches(null, 'ul'), 'match on null is false');
})
