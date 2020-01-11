
# delegate

  Low-level event delegation component. Forked from component/delegate for use with browserify.

## Installation

    $ npm install delegate-events

## Example

```js
var delegate = require('delegate-events');
var ul = document.querySelector('ul');
var n = 0;

var fn = delegate.bind(ul, 'li a', 'click', function(e){
  console.log(e.target);
  console.log(e.delegateTarget); // => "<a>"
  if (++n == 3) {
    console.log('unbind');
    delegate.unbind(ul, 'click', fn, false);
  }
}, false);
```

## API

### .bind(el, selector, type, callback, [capture])

  Bind and return a callback which may be passed to `.unbind()`.

### .unbind(el, type, callback, [capture])

  Unbind.

## Tests

* Run `npm test`.
* Open `test/index.html` in a browser.
* Open the js console and verify that interacting with the elements works as they say they should.

## License

  MIT
