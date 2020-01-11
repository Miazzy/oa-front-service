'use strict';

var expect = require('chai').expect;

var hasProperty = require('./has-property');


describe('Object.defineProperty mechanics', function() {

  it('should have null property', function() {

    // given
    var a = {};

    // when
    Object.defineProperty(a, 'foo', {
      value: undefined
    });

    // then
    expect(a.value).not.to.exist;
    expect(hasProperty(a, 'foo')).to.equal(true);
  });


  it('should not have property after deletion', function() {

    // given
    var a = {};

    Object.defineProperty(a, 'foo', {
      value: undefined,
      configurable: true
    });

    // when
    delete a.foo;

    // then
    expect(hasProperty(a, 'foo')).to.equal(false);
  });

});