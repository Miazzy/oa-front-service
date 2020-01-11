# Changelog

All notable changes to [min-dom](https://github.com/bpmn-io/min-dom) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 3.1.1

* `FIX`: correct TypeScript export definitions

## 3.1.0

* `FEAT`: add TypeScript definitions

## 3.0.0

### Breaking Changes

* `FIX`: remove browser field again; it confuses modern module bundlers. This partially reverts `v2.1.0`

## 2.2.0

* `CHORE`: mark utils as side-effect free via `sideEffects: false`

## 2.1.0

* `CHORE`: add `browser` field

## 2.0.0

### Breaking Changes

* `CHORE`: expose utils via main entry point only; use imports / destructuring to access them:

  ```javascript
  import { bind } from 'min-dom';
  ```

* `CHORE`: expose `query.all()` as `queryAll`

### Other Improvements

* `CHORE`: migrate libray to ES6
* `CHORE`: build and publish ES6, CommonJS and UMD distributions

## 1.0.0

* `CHORE`: remove `component-query` and rely on native `querySelector(All)`

## ...

Check `git log` for earlier history.
