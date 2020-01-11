# Changelog

All notable changes to [moddle](https://github.com/bpmn-io/moddle) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 5.0.1

* `CHORE`: cleanup pre-built distribution

## 5.0.0

* `CHORE`: expose `{ Moddle }` and utilities
* `CHORE`: provide pre-packaged distribution

### Breaking Changes

* We expose `Moddle` as a named export now.
* We do not publish `lib` folder anymore, destructure the provided default export.
* No need for `esm` to consume the library anymore.

## 4.1.0

* `CHORE`: bump utility toolbelt

## 4.0.0

### Breaking Changes

* `FEAT`: migrate to ES modules. Use `esm` or a ES module aware transpiler to consume this library.

## 3.0.0

* `FEAT`: drop lodash in favor of [min-dash](https://github.com/bpmn-io/min-dash)

## ...

Check `git log` for earlier history.