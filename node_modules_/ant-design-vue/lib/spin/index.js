'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpinProps = undefined;

var _Spin = require('./Spin');

Object.defineProperty(exports, 'SpinProps', {
  enumerable: true,
  get: function get() {
    return _Spin.SpinProps;
  }
});

var _Spin2 = _interopRequireDefault(_Spin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_Spin2['default'].setDefaultIndicator = _Spin.setDefaultIndicator;

/* istanbul ignore next */
_Spin2['default'].install = function (Vue) {
  Vue.component(_Spin2['default'].name, _Spin2['default']);
};

exports['default'] = _Spin2['default'];