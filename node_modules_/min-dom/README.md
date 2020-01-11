# min-dom

[![Build Status](https://travis-ci.org/bpmn-io/min-dom.svg?branch=master)](https://travis-ci.org/bpmn-io/min-dom)

A minimal dom utility toolbelt. Library friendly and based on utilities provided by [component](https://github.com/component).


## Footprint

This library is tiny (`2Kb` in size) and still exposes all fundamental utilities:

```bash
$ browserify index.js \
    --standalone=dom \
    --plugin=tinyify | \
    gzip > min-dom.min.js.gz

$ du -b *.gz
1842    min-dom.min.js.gz
```


## Features

The library exposes the following tiny dom helpers:

* `attr` - get and set node attributes
* `classes` - class name helper
* `clear` - remove children from a node
* `closest` - get the closest parent by selector; [component-closest](https://github.com/component/closest)
* `delegate` - event deletation support; [delegate-events](https://www.npmjs.com/package/delegate-events)
* `domify` - html to elements; [domify](https://github.com/component/domify)
* `event` - event binding; [component-event](https://github.com/component/event)
* `matches` - selector match check; [matches-selector](https://github.com/ForbesLindesay/matches-selector)
* `query` - native selector query support
* `remove` - detach a node from its parent


## Related 

* [min-dash](https://github.com/bpmn-io/min-dash) - minimal lodash inspired utility toolbelt
* [tiny-svg](https://github.com/bpmn-io/tiny-svg) - tiny SVG utility toolbelt


## License

MIT
