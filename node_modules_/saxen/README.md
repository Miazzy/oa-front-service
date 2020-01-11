# `/saxen/` parser <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Coat_of_arms_of_Saxony.svg/220px-Coat_of_arms_of_Saxony.svg.png" align="right" />

[![Build Status](https://travis-ci.org/nikku/saxen.svg?branch=master)](https://travis-ci.org/nikku/saxen)

A tiny, super fast, namespace aware [sax-style](https://en.wikipedia.org/wiki/Simple_API_for_XML) XML parser written in plain JavaScript.


## Features

* (optional) entity decoding and attribute parsing
* (optional) namespace aware
* element / attribute normalization in namespaced mode
* tiny (`2.6Kb` minified + gzipped)
* [pretty damn fast](https://github.com/nikku/js-sax-parser-tests)


## Usage

```javascript
var {
  Parser
} = require('saxen');

var parser = new Parser();

// enable namespace parsing: element prefixes will
// automatically adjusted to the ones configured here
// elements in other namespaces will still be processed
parser.ns({
  'http://foo': 'foo',
  'http://bar': 'bar'
});

parser.on('openTag', function(elementName, attrGetter, decodeEntities, selfClosing, getContext) {

  elementName;
  // with prefix, i.e. foo:blub

  var attrs = attrGetter();
  // { 'bar:aa': 'A', ... }
});

parser.parse('<blub xmlns="http://foo" xmlns:bar="http://bar" bar:aa="A" />');
```


## Supported Hooks

We support the following parse hooks:

* `openTag(elementName, attrGetter, decodeEntities, selfClosing, contextGetter)`
* `closeTag(elementName, decodeEntities, selfClosing, contextGetter)`
* `error(err, contextGetter)`
* `warn(warning, contextGetter)`
* `text(value, decodeEntities, contextGetter)`
* `cdata(value, contextGetter)`
* `comment(value, decodeEntities, contextGetter)`
* `attention(str, decodeEntities, contextGetter)`
* `question(str, contextGetter)`

In contrast to `error`, `warn` receives recoverable errors, such as malformed attributes.

In [proxy mode](#proxy-mode), `openTag` and `closeTag` a view of the current element replaces the raw element name. In addition element attributes are not passed as a getter to `openTag`. Instead, they get exposed via the `element.attrs`:

* `openTag(element, decodeEntities, selfClosing, contextGetter)`
* `closeTag(element, selfClosing, contextGetter)`


## Namespace Handling

In namespace mode, the parser will adjust tag and attribute namespace prefixes before
passing the elements name to `openTag` or `closeTag`. To do that, you need to
configure default prefixes for wellknown namespaces:

```javascript
parser.ns({
  'http://foo': 'foo',
  'http://bar': 'bar'
});
```

To skip the adjustment and still process namespace information:

```javascript
parser.ns();
```


## Proxy Mode

In this mode, the first argument passed to `openTag` and `closeTag` is an object that exposes more internal XML parse state. This needs to be explicity enabled by instantiating the parser with `{ proxy: true }`.

```javascript
// instantiate parser with proxy=true
var parser = new Parser({ proxy: true });

parser.ns({
  'http://foo-ns': 'foo'
});

parser.on('openTag', function(el, decodeEntities, selfClosing, getContext) {
  el.originalName; // root
  el.name; // foo:root
  el.attrs; // { 'xmlns:foo': ..., id: '1' }
  el.ns; // { xmlns: 'foo', foo: 'foo', foo$uri: 'http://foo-ns' }
});

parser.parse('<root xmlns:foo="http://foo-ns" id="1" />')
```

Proxy mode comes with a performance penelty of roughly five percent.

__Caution!__ For performance reasons the exposed element is a simple view into the current parser state. Because of that, it will change with the parser advancing and cannot be cached. If you would like to retain a persistent copy of the values, create a shallow clone:

```javascript
parser.on('openTag', function(el) {
  var copy = Object.assign({}, el);
  // copy, ready to keep around
});
```


## Non-Features

`/saxen/` lacks some features known in other XML parsers such as [sax-js](https://github.com/isaacs/sax-js):

* no support for parsing loose documents, such as arbitrary HTML snippets
* no support for text trimming
* no automatic entity decoding
* no automatic attribute parsing

...and that is ok ❤.


## Credits

We build on the awesome work done by [easysax](https://github.com/vflash/easysax).

`/saxen/` is named after [Sachsen](https://en.wikipedia.org/wiki/Saxony), a federal state of Germany. So geht sächsisch!


## LICENSE

MIT
