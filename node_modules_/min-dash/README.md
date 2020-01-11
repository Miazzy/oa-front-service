# min-dash

[![Build Status](https://travis-ci.org/bpmn-io/min-dash.svg?branch=master)](https://travis-ci.org/bpmn-io/min-dash)

Minimal utility tool belt to be used with [bpmn.io](https://bpmn.io/) related libraries.


## Features

* fine selection of [powerful utilities](./lib) on board
* ES2015 compatible
* complete bundle `< 2 kB` minified and gzipped
* utilities optimized for speed (i.e. sorting and union only by key)


## How to use

```javascript
import {
  find,
  sortBy,
  assign
} from 'min-dash';
```

Your favourite module bundler should apply tree-shaking to only include the components your application requires. If you're using CommonJS modules give [common-shake](https://github.com/indutny/common-shake) a try.


## Related

* [1-liners](https://github.com/1-liners/1-liners) - a slightly more opinionated collection of useful utilities
* [min-dom](https://github.com/bpmn-io/min-dom) - minimal DOM utility toolbelt
* [tiny-svg](https://github.com/bpmn-io/tiny-svg) - tiny SVG utility toolbelt


## License

MIT
