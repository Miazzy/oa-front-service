# matches-selector

Check if an element matches a given selector.  For use with browserify.

[![Dependency Status](https://gemnasium.com/ForbesLindesay/matches-selector.png)](https://gemnasium.com/ForbesLindesay/matches-selector)
[![NPM version](https://badge.fury.io/js/matches-selector.png)](http://badge.fury.io/js/matches-selector)

[![browser support](https://ci.testling.com/ForbesLindesay/matches-selector.png)](https://ci.testling.com/ForbesLindesay/matches-selector)

## Installation

    $ npm install matches-selector

## Example

```js
var matches = require('matches-selector');
matches(el, 'ul li a');
// => true or false
```

## Running Tests

Tests can be easilly run locally in the browser of your choice, and have passed if it ends with `# ok`.  They are also run on testling-ci when pushed to the repository:

```
npm install
npm test
```

To re-run tests after making changes, just refresh your browser

## License

  MIT
