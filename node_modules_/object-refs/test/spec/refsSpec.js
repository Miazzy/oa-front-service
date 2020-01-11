'use strict';

var expect = require('chai').expect;

var Refs = require('../../');

var hasProperty = require('./has-property');


describe('refs', function() {

  describe('one-to-one', function() {

    var refs = new Refs({ name: 'foo' }, { name: 'bar' });


    it('should keep already set property', function() {

      // given
      var b = { };
      var a = { foo: b };

      // when
      refs.bind(a, 'foo');

      // then
      expect(a.foo).to.equal(b);
    });


    it('should define property invisibly', function() {

      // given
      var a = {};

      // when
      refs.bind(a, 'foo');

      // then
      expect(a.foo).not.to.exist;
      expect(hasProperty(a, 'foo')).to.equal(true);
    });


    it('should define non-enumerable property per default', function() {

      // given
      var a = {};

      refs.bind(a, 'foo');
      a.foo = {};

      // when
      var json = JSON.stringify(a);
      expect(json).to.equal('{}');
    });


    it('should define enumerable property', function() {

      // given
      var enumerableRefs = new Refs({ name: 'foo', enumerable: true }, { name: 'bar' });

      var a = {};

      enumerableRefs.bind(a, 'foo');
      a.foo = {};

      // when
      var json = JSON.stringify(a);
      expect(json).to.equal('{"foo":{}}');
    });


    it('should define non-configurable property per default', function() {

      // given
      var refs = new Refs({ name: 'foo' }, { name: 'bar' });

      var a = {};

      refs.bind(a, 'foo');
      a.foo = {};

      // when
      expect(function() {
        delete a.foo;
      }).to.throw;
    });


    it('should define configurable property', function() {

      // given
      var configurableRefs = new Refs(
        { name: 'foo', configurable: true },
        { name: 'bar' }
      );

      var a = {};

      configurableRefs.bind(a, 'foo');
      a.foo = {};

      // when
      delete a.foo;

      expect(a.foo).to.not.exist;
    });


    it('should create bi-directional configurable property', function() {

      // given
      var configurableRefs = new Refs(
        { name: 'foo', configurable: true },
        { name: 'bar', configurable: true }
      );

      var a = {};

      configurableRefs.bind(a, 'foo');
      a.foo = {};

      // when
      delete a.foo.bar;

      expect(a.foo.bar).to.not.exist;
    });


    it('should create bi-directional reference', function() {

      // given
      var a = {}, b = {};

      refs.bind(a, 'foo');
      refs.bind(b, 'bar');

      // when
      a.foo = b;

      // then
      expect(a.foo).to.equal(b);
      expect(b.bar).to.equal(a);
    });


    it('should unset property', function() {

      // given
      var a = {}, b = {};

      refs.bind(a, 'foo');
      refs.bind(b, 'bar');

      // when
      a.foo = b;
      a.foo = null;

      expect(a.foo).to.equal(null);
      expect(b.bar).to.equal(undefined);
    });


    it('should transitively define properties', function() {

      // given
      var a = {}, b = {};

      refs.bind(a, 'foo');

      // when
      a.foo = b;
      b.bar = null;

      // then
      expect(a.foo).to.equal(undefined);
    });


    it('should not allow property deletion', function() {

      // given
      var a = {};

      refs.bind(a, 'foo');

      expect(function() {
        // when
        delete a.foo;
      }).to.throw('Cannot delete property \'foo\' of #<Object>');
    });

  });


  describe('one-to-many', function() {

    var refs = new Refs({ name: 'foos', collection: true }, { name: 'bar' });


    it('should define non-enumerable property per default', function() {

      // given
      var a = {};

      refs.bind(a, 'foos');
      a.foos.push({});

      // when
      var json = JSON.stringify(a);
      expect(json).to.equal('{}');
    });


    it('should define enumerable property', function() {

      // given
      var enumerableRefs = new Refs({ name: 'foos', enumerable: true, collection: true }, { name: 'bar' });

      var a = {};

      enumerableRefs.bind(a, 'foos');
      a.foos.push({});

      // when
      var json = JSON.stringify(a);
      expect(json).to.equal('{"foos":[{}]}');
    });


    it('should keep already set property', function() {

      // given
      var b = { };
      var a = { foos: [ b ] };

      // when
      refs.bind(a, 'foos');

      // then
      expect(a.foos).to.eql([ b ]);
    });


    it('should define collection property as array', function() {

      // given
      var a = {};

      // when
      refs.bind(a, 'foos');

      // then
      expect(a.foos).to.eql([]);
    });


    it('should auto-populate collection', function() {

      // given
      var a = {};
      var b1 = {}, b2 = {};

      refs.bind(b1, 'bar');
      refs.bind(b2, 'bar');

      // when
      b1.bar = a;
      b2.bar = a;

      // then
      expect(a.foos).to.eql([ b1, b2 ]);
    });


    it('should auto-remove from collection', function() {

      // given
      var a = {};
      var b1 = {}, b2 = {};

      refs.bind(b1, 'bar');
      refs.bind(b2, 'bar');

      b1.bar = a;
      b2.bar = a;

      // when
      b1.bar = null;

      // then
      expect(a.foos).to.eql([ b2 ]);
    });


    it('should transitively bind one property', function() {

      // given
      var a = {}, b = {};

      refs.bind(a, 'foos');

      // when
      a.foos.add(b);
      b.bar = null;

      // then
      expect(a.foos).to.eql([]);
    });


    it('should transitively bind many property', function() {

      // given
      var b = { };
      var c = { };
      var a = { foos: [ c ] };

      refs.bind(b, 'bar');

      // when
      b.bar = a;

      // then
      expect(a.foos).to.eql([ c, b ]);
    });


    it('should transitively bind many-to-one inverse reference', function() {

      // given
      var b = { };
      var c = { };
      var a = { foos: [ b, c ] };

      // when
      refs.bind(a, 'foos');

      // then
      expect(b.bar).to.eql(a);
      expect(c.bar).to.eql(a);

      expect(a.foos).to.eql([ b, c ]);
    });

  });


  describe('many-to-many', function() {

    var refs = new Refs({ name: 'foos', collection: true }, { name: 'bars', collection: true });


    it('should define property invisibly', function() {
      // given
      var b = {};

      // when
      refs.bind(b, 'bars');

      // then
      expect(b.bars).to.eql([]);
    });


    it('should inverse add', function() {
      // given
      var a = {}, b = {};

      refs.bind(a, 'foos');
      refs.bind(b, 'bars');

      // when
      a.foos.add(b);

      // then
      expect(b.bars).to.eql([ a ]);
    });


    it('should add many-to-many', function() {
      // given
      var a1 = {}, a2 = {},
          b1 = {}, b2 = {};

      refs.bind(a1, 'foos');
      refs.bind(a2, 'foos');

      // when
      a1.foos.add(b1);
      a1.foos.add(b2);

      a2.foos.add(b2);

      // then
      expect(b2.bars.contains(a2)).to.equal(true);

      expect(b1.bars).to.eql([ a1 ]);
      expect(b2.bars).to.eql([ a1, a2 ]);
    });


    it('should inverse remove', function() {
      // given
      var a1 = {}, a2 = {},
          b1 = {}, b2 = {};

      refs.bind(a1, 'foos');
      refs.bind(a2, 'foos');

      // when
      a1.foos.add(b1);
      a1.foos.add(b2);

      a2.foos.add(b2);

      b2.bars.remove(a1);

      // then
      expect(b1.bars).to.eql([ a1 ]);
      expect(b2.bars).to.eql([ a2 ]);
    });


    it('should transitively define properties', function() {

      // given
      var a = {}, b = {};

      refs.bind(a, 'foos');

      // when
      a.foos.add(b);
      b.bars.remove(a);

      // then
      expect(a.foos).to.eql([]);
      expect(b.bars).to.eql([]);
    });
  });
});