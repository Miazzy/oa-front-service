# Changelog

All notable changes to [didi](https://github.com/nikku/didi) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 4.0.0

### Breaking Changes

* `FIX`: remove browser field again; it confuses modern module bundlers. This partially reverts `v3.1.0`

## 3.2.0

* `CHORE`: mark library as side-effect free via `sideEffects: false`

## 3.1.0

* `CHORE`: add `browser` field

## 3.0.0

### Breaking Changes

* `CHORE`: don't expose `lib` folder; library consumers should use API exposed via bundled artifacts

### Other Improvements

* `FEAT`: allow local overrides on `Injector#invoke`
* `CHORE`: babelify all produced bundles

## 2.0.1

* `FIX`: make injection work on constructor less ES2015 `class`

## 2.0.0

* `FEAT`: support ES2015 `class` as injection targets, too
* `FEAT`: always instantiate `type` using `new`
* `CHORE`: bundle `es`, `cjs` and `umd` distributions via rollup

## 1.0.1 - 1.0.3

* `FIX`: properly include resources in bundle

## 1.0.0

* `FEAT`: port to ES2015

## ...

Check `git log` for earlier history.
