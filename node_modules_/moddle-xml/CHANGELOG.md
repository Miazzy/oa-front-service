# Changelog

All notable changes to [moddle-xml](https://github.com/bpmn-io/moddle-xml) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 8.0.1

* `DOCS`: update documentation
## 8.0.0

* `FEAT`: provide pre-packaged distribution
* `CHORE`: bump to `moddle@5`

## 7.5.0

* `FEAT`: validate ID attributes are [QNames](http://www.w3.org/TR/REC-xml/#NT-NameChar)

## 7.4.1

* `FIX`: make ES5 compliant

## 7.4.0

* `CHORE`: get rid of `tiny-stack` as a dependency ([#38](https://github.com/bpmn-io/moddle-xml/pull/38))

## 7.3.0

* `FEAT`: warn on unexpected body text
* `FEAT`: warn on text outside root node
* `CHORE`: remove `console.log` during import ([#28](https://github.com/bpmn-io/moddle-xml/issues/28))
* `CHORE`: bump to [`saxen@8.1.0`](https://github.com/nikku/saxen/blob/master/CHANGELOG.md#810)

## 7.2.3

* `FIX`: correctly serialize extension attributes along with typed elements

## 7.2.0

* `FEAT`: warn on invalid attributes under well-known namespaces ([#32](https://github.com/bpmn-io/moddle-xml/issues/32))

## 7.1.0

* `CHORE`: bump dependency versions

## 7.0.0

### Breaking Changes

* `FEAT`: migrate to ES modules. Use `esm` or a ES module aware transpiler to consume this library.

## 6.0.0

* `FEAT`: encode entities in body properties (instead of escaping via `CDATA`) ([`5645b582`](https://github.com/bpmn-io/moddle-xml/commit/5645b5822644a461eba9f3da481362475f040984))

## 5.0.2

* `FIX`: properly handle `.` in attribute names

## 5.0.1

* `FIX`: decode entities in `text` nodes

## 5.0.0

* `FEAT`: replace lodash with [min-dash](https://github.com/bpmn-io/min-dash)
* `FEAT`: don't bail out from attribute parsing on parse errors  ([`fd0c8b40`](https://github.com/bpmn-io/moddle-xml/commit/fd0c8b4084b4d92565dd7d3099e283fbb98f1dd0))

## ...

Check `git log` for earlier history.