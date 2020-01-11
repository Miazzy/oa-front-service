'use strict';

var expect = require('chai').expect;

var Refs = require('../../');


describe('collection api', function() {

  var refs = new Refs({ name: 'foos', collection: true }, { name: 'bar' });


  describe('#contains', function() {

    it('should not contain', function() {

      // given
      var a = { foos: [] };

      // when
      refs.bind(a, 'foos');

      // then
      expect(a.foos.contains({})).to.equal(false);
    });


    it('should contain', function() {

      // given
      var b = {}, a = { foos: [ b ] };

      // when
      refs.bind(a, 'foos');

      // then
      expect(a.foos.contains(b)).to.equal(true);
    });

  });


  describe('#add', function() {

    it('should add', function() {

      // given
      var a = {};
      var b = { id: 'B' };
      var c = { id: 'C' };

      refs.bind(a, 'foos');

      // when
      a.foos.add(b);
      a.foos.add(c);

      // then
      expect(a.foos).to.eql([ b, c ]);
    });


    it('should add at idx', function() {

      // given
      var a = {};
      var b = { id: 'B' };
      var c = { id: 'C' };
      var d = { id: 'D' };

      refs.bind(a, 'foos');

      a.foos.add(b);
      a.foos.add(c);

      // when
      a.foos.add(d, 1);

      // then
      expect(a.foos).to.eql([ b, d, c ]);
    });


    it('should move to front with idx', function() {

      // given
      var a = {};
      var b = { id: 'B' };
      var c = { id: 'C' };
      var d = { id: 'D' };

      refs.bind(a, 'foos');

      a.foos.add(b);
      a.foos.add(c);
      a.foos.add(d);

      // when
      a.foos.add(c, 0);

      // then
      expect(a.foos).to.eql([ c, b, d ]);
    });


    it('should move to back with idx', function() {

      // given
      var a = {};
      var b = { id: 'B' };
      var c = { id: 'C' };
      var d = { id: 'D' };

      refs.bind(a, 'foos');

      a.foos.add(b);
      a.foos.add(c);
      a.foos.add(d);

      // when
      a.foos.add(b, 2);

      // then
      expect(a.foos).to.eql([ c, d, b ]);
    });


    it('should inverse add', function() {

      // given
      var a = {};
      var b = {};

      refs.bind(a, 'foos');

      // when
      a.foos.add(b);

      // then
      expect(b.bar).to.equal(a);
    });


    it('should inverse add', function() {

      // given
      var a = {};
      var b = {};

      refs.bind(a, 'foos');

      // when
      a.foos.add(b);

      // then
      expect(b.bar).to.equal(a);
    });

  });


  describe('#remove', function() {

    it('should inverse remove', function() {

      // given
      var a = {};
      var b = {};

      refs.bind(a, 'foos');

      // when
      a.foos.add(b);
      a.foos.remove(b);

      // then
      expect(a.foos).to.eql([ ]);
      expect(b.bar).not.to.exist;

    });

  });

});