'use strict';

var Refs = require('../../');

function trace(fn) {
  var time = Date.now();

  fn();

  return Date.now() - time;
}


describe.skip('performance characteristics', function() {

  it('refs access', function() {

    var refs = new Refs({ name: 'foos', collection: true }, { name: 'bar' });

    var foos = [];

    var a = {}, b;
    refs.bind(a, 'foos');

    for (var i = 0; i < 50000; i++) {
      b = {};
      foos.push(b);
      a.foos.add(b);
    }

    var time = trace(function() {

      for (var i = 0; i < foos.length; i++) {
        foos[i].bar;
      }
    });

    console.log('refs access (ms)', time);
  });


  it('default access', function() {

    var foos = [];

    var a = {}, b;

    for (var i = 0; i < 50000; i++) {
      b = { bar: a };
      foos.push(b);
    }

    var time = trace(function() {

      for (var i = 0; i < foos.length; i++) {
        foos[i].bar;
      }
    });

    console.log('default access (ms)', time);
  });
});