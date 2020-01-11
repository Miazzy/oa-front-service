import PACKAGE_JSON from 'RootDir/package';
import * as ESM from 'src/index';
import * as WEB from 'dist/v-click-outside-x';
import * as MIN from 'dist/v-click-outside-x.min';

const ESMREQ = require('src/index');
const WEBREQ = require('dist/v-click-outside-x');
const MINREQ = require('dist/v-click-outside-x.min');

const namePrefix = 'vClickOutside';
const methods = [
  {method: ESM, name: `${namePrefix} ESM`},
  {method: WEB, name: `${namePrefix} WEB`},
  {method: MIN, name: `${namePrefix} MIN`},
  {method: ESMREQ, name: `${namePrefix} ESMREQ`},
  {method: WEBREQ, name: `${namePrefix} WEBREQ`},
  {method: MINREQ, name: `${namePrefix} MINREQ`},
  {method: ESM, name: `${namePrefix} ESM no document`, noDoc: true},
];

const doc = window.document;

methods.forEach(({method, name, noDoc}) => {
  const {directive, install} = method;
  let calls = 1;

  describe(`${name}`, () => {
    beforeAll(() => {
      if (noDoc) {
        calls = 0;
        delete window.document;
      }
    });

    beforeEach(() => {
      doc.addEventListener = jest.fn();
      doc.removeEventListener = jest.fn();
    });

    afterEach(() => {
      doc.addEventListener = undefined;
      doc.removeEventListener = undefined;
    });

    describe('plugin', () => {
      it('the directive is an object', () => {
        expect.assertions(1);

        expect(directive).toBeInstanceOf(Object);
      });

      it('it has all hook functions available', () => {
        expect.assertions(2);

        ['bind', 'unbind'].forEach(functionName => {
          expect(directive[functionName]).toBeInstanceOf(Function);
        });
      });

      it('$_captureInstances is an empty Map', () => {
        expect.assertions(1);

        expect(Object.keys(directive.$_captureInstances)).toHaveLength(0);
      });

      it('$_nonCaptureInstances is an empty Map', () => {
        expect.assertions(1);

        expect(Object.keys(directive.$_nonCaptureInstances)).toHaveLength(0);
      });

      it('$_onCaptureEvent to be a function', () => {
        expect.assertions(1);

        expect(directive.$_onCaptureEvent).toBeInstanceOf(Function);
      });

      it('$_onNonCaptureEvent to be a function', () => {
        expect.assertions(1);

        expect(directive.$_onNonCaptureEvent).toBeInstanceOf(Function);
      });

      it('version to be a string', () => {
        expect.assertions(1);

        expect(typeof directive.version).toStrictEqual('string');
      });

      it('version to be as per package.json', () => {
        expect.assertions(1);

        expect(directive.version).toStrictEqual(PACKAGE_JSON.version);
      });

      it('version to be enumerable', () => {
        expect.assertions(1);

        expect(
          Object.prototype.propertyIsEnumerable.call(directive, 'version'),
        ).toBe(true);
      });

      it('install the directive into the vue instance', () => {
        expect.assertions(2);

        const vue = {
          directive: jest.fn(),
        };

        install(vue);

        expect(vue.directive).toHaveBeenCalledWith('click-outside', directive);
        expect(vue.directive).toHaveBeenCalledTimes(1);
      });
    });

    describe('directive', () => {
      describe('bind/unbind', () => {
        describe('bind exceptions', () => {
          it('throws an error if value is not a function', () => {
            expect.assertions(1);

            const div1 = doc.createElement('div');

            const bindWithNoFunction = () => directive.bind(div1, {});

            expect(bindWithNoFunction).toThrowErrorMatchingSnapshot();
          });
        });

        describe('single', () => {
          const div1 = doc.createElement('div');

          it('adds to the list and event listener', () => {
            expect.assertions(6);

            const eventHandler = jest.fn();

            directive.bind(div1, {value: eventHandler});

            expect(Object.keys(directive.$_nonCaptureInstances)).toHaveLength(
              1,
            );
            expect(directive.$_nonCaptureInstances).toHaveProperty('click');

            const clickInstances = directive.$_nonCaptureInstances.click;

            expect(clickInstances).toBeInstanceOf(Array);
            expect(clickInstances).toHaveLength(1);
            expect(clickInstances.find(item => item.el === div1)).toBeDefined();
            expect(doc.addEventListener.mock.calls).toHaveLength(calls);
          });

          it('removes from the list and event listener', () => {
            expect.assertions(2);

            directive.unbind(div1);

            expect(Object.keys(directive.$_nonCaptureInstances)).toHaveLength(
              0,
            );
            expect(doc.removeEventListener.mock.calls).toHaveLength(calls);
          });
        });

        describe('multiple', () => {
          const div1 = doc.createElement('div');
          const div2 = doc.createElement('div');

          it('adds to the list and event listener', () => {
            expect.assertions(7);

            const eventHandler1 = jest.fn();
            const eventHandler2 = jest.fn();

            directive.bind(div1, {value: eventHandler1});
            directive.bind(div2, {arg: 'click', value: eventHandler2});

            expect(Object.keys(directive.$_nonCaptureInstances)).toHaveLength(
              1,
            );
            expect(directive.$_nonCaptureInstances).toHaveProperty('click');

            const clickInstances = directive.$_nonCaptureInstances.click;

            expect(clickInstances).toBeInstanceOf(Array);
            expect(clickInstances).toHaveLength(2);

            expect(clickInstances.find(item => item.el === div1)).toBeDefined();
            expect(clickInstances.find(item => item.el === div2)).toBeDefined();
            expect(doc.addEventListener.mock.calls).toHaveLength(calls);
          });

          it('removes from the list and the event listener', () => {
            expect.assertions(7);

            directive.unbind(div1);

            expect(Object.keys(directive.$_nonCaptureInstances)).toHaveLength(
              1,
            );
            expect(directive.$_nonCaptureInstances).toHaveProperty('click');

            const clickInstances = directive.$_nonCaptureInstances.click;

            expect(clickInstances).toBeInstanceOf(Array);
            expect(clickInstances).toHaveLength(1);
            expect(clickInstances.find(item => item.el === div2)).toBeDefined();

            directive.unbind(div2);

            expect(Object.keys(directive.$_nonCaptureInstances)).toHaveLength(
              0,
            );

            expect(doc.removeEventListener.mock.calls).toHaveLength(calls);
          });
        });

        describe('bind', () => {
          it('saves the instance binding and element', () => {
            expect.assertions(11);

            const div1 = doc.createElement('div');
            const div2 = doc.createElement('div');
            const div3 = doc.createElement('div');
            const eventHandler1 = jest.fn();
            const eventHandler2 = jest.fn();

            directive.bind(div1, {
              arg: 'pointerdown',
              modifiers: {capture: true},
              value: eventHandler1,
            });
            directive.bind(div2, {
              arg: 'pointerdown',
              modifiers: {stop: true},
              value: eventHandler2,
            });
            directive.bind(div3, {
              arg: 'pointerdown',
              modifiers: {prevent: true},
              value: eventHandler2,
            });

            expect(Object.keys(directive.$_captureInstances)).toHaveLength(1);
            expect(directive.$_captureInstances).toHaveProperty('pointerdown');

            const clickCaptureInstances =
              directive.$_captureInstances.pointerdown;

            expect(clickCaptureInstances).toBeInstanceOf(Array);
            expect(clickCaptureInstances).toHaveLength(1);

            expect(
              clickCaptureInstances.find(item => item.el === div1),
            ).toStrictEqual({
              binding: {
                arg: 'pointerdown',
                modifiers: {
                  capture: true,
                  prevent: false,
                  stop: false,
                },
                value: eventHandler1,
              },
              el: div1,
            });

            expect(Object.keys(directive.$_nonCaptureInstances)).toHaveLength(
              1,
            );
            expect(directive.$_nonCaptureInstances).toHaveProperty(
              'pointerdown',
            );

            const clickNonCaptureInstances =
              directive.$_nonCaptureInstances.pointerdown;

            expect(clickNonCaptureInstances).toBeInstanceOf(Array);
            expect(clickNonCaptureInstances).toHaveLength(2);

            expect(
              clickNonCaptureInstances.find(item => item.el === div2),
            ).toStrictEqual({
              binding: {
                arg: 'pointerdown',
                modifiers: {
                  capture: false,
                  prevent: false,
                  stop: true,
                },
                value: eventHandler2,
              },
              el: div1,
            });

            expect(
              clickNonCaptureInstances.find(item => item.el === div3),
            ).toStrictEqual({
              binding: {
                arg: 'pointerdown',
                modifiers: {
                  capture: false,
                  prevent: true,
                  stop: false,
                },
                value: eventHandler2,
              },
              el: div1,
            });

            directive.unbind(div1);
            directive.unbind(div2);
            directive.unbind(div3);
          });
        });
      });

      describe('$_onCaptureEvent', () => {
        const div1 = doc.createElement('div');
        const span = doc.createElement('span');
        div1.appendChild(span);

        it('calls the callback if the element is not the same and does not contain the event target', () => {
          expect.assertions(10);

          const a = doc.createElement('a');
          const event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            target: a,
          };

          const eventHandler1 = jest.fn();

          directive.bind(div1, {value: eventHandler1});
          directive.$_onNonCaptureEvent(event);

          expect(eventHandler1).toHaveBeenCalledWith(event);
          expect(eventHandler1.mock.instances).toHaveLength(1);
          expect(eventHandler1.mock.instances[0]).toBe(directive);

          expect(event.preventDefault).not.toHaveBeenCalled();
          expect(event.stopPropagation).not.toHaveBeenCalled();

          directive.unbind(div1);

          const eventHandler2 = jest.fn();

          directive.bind(div1, {
            arg: 'touchdown',
            modifiers: {capture: true, prevent: true, stop: true},
            value: eventHandler2,
          });
          directive.$_onCaptureEvent(event);

          expect(eventHandler2).toHaveBeenCalledWith(event);
          expect(eventHandler2.mock.instances).toHaveLength(1);
          expect(eventHandler2.mock.instances[0]).toBe(directive);

          expect(event.preventDefault).toHaveBeenCalled();
          expect(event.stopPropagation).toHaveBeenCalled();

          directive.unbind(div1);
        });

        it('does not execute the callback if the event target its the element from the instance', () => {
          expect.assertions(2);

          const event = {
            target: div1,
          };

          const eventHandler = jest.fn();

          directive.bind(div1, {value: eventHandler});
          directive.$_onNonCaptureEvent(event);

          expect(eventHandler).not.toHaveBeenCalled();
          expect(eventHandler.mock.instances).toHaveLength(0);

          directive.unbind(div1);
        });

        it('does not execute the callback if the event target is contained in the element from the instance', () => {
          expect.assertions(2);

          const event = {
            target: span,
          };

          const eventHandler = jest.fn();

          directive.bind(div1, {value: eventHandler});
          directive.$_onNonCaptureEvent(event);

          expect(eventHandler).not.toHaveBeenCalled();
          expect(eventHandler.mock.instances).toHaveLength(0);

          directive.unbind(div1);
        });
      });
    });
  });
});
