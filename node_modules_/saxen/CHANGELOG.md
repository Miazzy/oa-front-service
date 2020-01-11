# Changelog

All notable changes to [saxen](https://github.com/nikku/saxen) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 8.1.0

* `FEAT`: warn on non-whitespace outside root node ([#11](https://github.com/nikku/saxen/issues/11), [#12](https://github.com/nikku/saxen/issues/12))
* `FEAT`: allow dots in tag names

## 8.0.0

### Breaking Changes

* `CHORE`: rename ES module to `dist/index.esm.js` for improved bundler compatibility
* `FIX`: drop `browser` field for better interoperability with module bundlers

## 7.0.1

* `FIX`: allow `.` in attribute name part

## 7.0.0

### Breaking Changes

* `FEAT`: expose `Parser` and `decode` via single export only. Use `import` or destructuring to access it:

  ```javascript
  var { Parser } = require('saxen');
  ```

### Other Improvements

* `FEAT`: generate pre-built distributions for CommonJS and Browser targets
* `FEAT`: generate UMD bundle
* `CHORE`: Migrate code base to ES6

## 6.0.1

_This is a re-publish of the broken `v6.0.0` version._

* `FEAT`: recover from attribute parse errors ([#13](https://github.com/nikku/saxen/issues/13))

## 6.0.0

_Unpublished; Use `v6.0.1` instead._

## 5.7.0

* `FEAT`: detect and gracefully handle local attribute re-declarations that are forbidden via the XML spec: We'll now emit a warning and ignore the offending attribute ([`7d0c8629`](https://github.com/nikku/saxen/commit/7d0c8629c6b7afe82953e86b7351ae30be41730c))

## 5.6.0

_This release accidently introduced backwards incompatible changes; use `>= 5.7.0` instead._

## 5.5.0

* `FEAT`: expose `getContext` on all hooks ([`634857b0`](https://github.com/nikku/saxen/commit/634857b0db8ac91d87520dfa6314cb67a4d05e5f))

## 5.4.1

* `FIX`: bundle `decode.js` with published package ([`528cd1c0`](https://github.com/nikku/saxen/commit/528cd1c0bbc1f2a76812b626cce87b3362ab1bb3))

## 5.4.0

* `CHORE`: configure hooks only if actually used ([`5ab3e2ee`](https://github.com/nikku/saxen/commit/066e712dd89f15f913387b40f0198575e1083d2f))

## 5.3.1

* `FIX`: properly handle missing open tags `</a>`

## 5.3.0

* `CHORE`: simplify and speed up entity decoding ([`066e712d`](https://github.com/nikku/saxen/commit/066e712dd89f15f913387b40f0198575e1083d2f))

## 5.2.0

* `CHORE`: properly compile with [Google Closure compiler](https://github.com/google/closure-compiler)

## 5.1.0

* `FEAT`: proxy mode exposes clonable view ([`73c6c44a`](https://github.com/nikku/saxen/commit/73c6c44ade3127f3819ceb825e241bb39d74fd93))

## 5.0.1

* `FIX`: return `{}` on non-existing attributes, too

## 5.0.0

* `CHORE`: don't return `true` on empty attrs ([`f7360b11`](https://github.com/nikku/saxen/commit/f7360b115b651b9eb9ca3488a48e827d974deae1))

## 4.0.1

* `DOCS`: improve readme

## 4.0.0

* `FEAT`: fully support anonymous elements in namespace mode ([`2f48744a`](https://github.com/nikku/saxen/commit/2f48744a077ec096a411d60f3f948903fa53bfc2))
* `FEAT`: emit `<warn>` for all attribute parse issues ([`a5014b25`](https://github.com/nikku/saxen/commit/a5014b257cc4635d55daa2df9d38ce6e3b0da13d))

## 3.1.0

* `FEAT`: keep non-decodeable entities _as is_
* `FEAT`: decode only [required sub-set](https://www.w3.org/TR/REC-xml/#sec-predefined-ent) of named entities

## 3.0.1

* `CHORE`: add license field to `package.json`

## 3.0.0

* `FEAT`: throw on handler errors ([`4b0ebb1`](https://github.com/nikku/saxen/commit/4b0ebb12edb6f98064f33f555d519f58a8ec3a63))
* `FEAT`: expose current namespaces in proxy mode
* `FEAT`: normalize `xsi:type` attribute values ([#4](https://github.com/nikku/saxen/issues/4))
* `FEAT`: add `warn` event, informing about recoverable errors ([`7fce2151`](https://github.com/nikku/saxen/commit/7fce2151acc9bf006feab6cb3d892a004504c6ce))

## 2.0.0

* `FEAT`: rename events

  * `textNode -> text`
  * `startNode -> openTag`
  * `endNode -> closeTag`

## 1.1.0

* `FEAT`: handle non-xml input

## 1.0.4

* `DOCS`: better `@type` annotations
* `CHORE`: save a few bytes in decoding logic

## 1.0.3

* `DOCS`: correct `@type` and `@return` annotations in parser

## 1.0.2

* `FIX`: properly handle namespace prefix collisions ([#1](https://github.com/nikku/saxen/issues/1))

## 1.0.1

* `CHORE`: improve test coverage and documentation

## 1.0.0

* `FEAT`: don't skip unknown namespace nodes
* `FEAT`: expose parse context in `startNode`, `endNode` and `error`
* `FEAT`: introduce parser object mode
* `FEAT`: pipe handler errors to `error` handler
* `FEAT`: allow non-args `#ns` call
* `FIX`: various namespace handling errors
* `STYLE`: unify code style
* `CHORE`: rename library to _saxen_
* `CHORE`: improve test coverage
* `CHORE`: add linting
* `DOCS`: move to english language for documentation and README

## ...

Check `git log` for earlier history.
