var delegate = require('../index');

var test = function (name, fn) { fn(); };

test('basic tests', function () {
  var ul = document.querySelector('ul.basic-test');

  test('binds to child elements', function () {
    delegate.bind(ul, 'li a.unlimited', 'click', function (e) {
      console.log('Clicked:', e.target);
    });
  });

  test('unbinds', function () {
    var n = 0;
    var fn = delegate.bind(ul, 'li a.five-times', 'click', function (e) {
      if (++n >= 5) {
        delegate.unbind(ul, 'click', fn, false);
      }
      console.log("Clicked " + n + " times:", e.target);
    }, false);
  });
});

test('multiple events to same element', function () {
    var ul = document.querySelector('ul.multiple-test');

    delegate.bind(ul, 'li a', 'click', function (e) {
        console.log('');
        console.log('li event triggered on', e.target);
    });
    delegate.bind(ul, 'li.foo a', 'click', function (e) {
        console.log('li.foo event triggered on', e.target);
    });
});


test('Blur and Focus tests', function () {
  var ul = document.querySelector('ul.blur-focus-test');

  test('it binds to multiple delegate targets', function () {
    delegate.bind(ul, 'li.focus input', 'focus', function (e) {
      console.log("Focussed", e.target);
    }, false);

    delegate.bind(ul, 'li.blur input', 'blur', function (e) {
      console.log("Blurred", e.target);
    }, false);
  });
});

