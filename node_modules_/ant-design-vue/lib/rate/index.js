'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RateProps = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _vueTypes = require('../_util/vue-types');

var _vueTypes2 = _interopRequireDefault(_vueTypes);

var _propsUtil = require('../_util/props-util');

var _vcRate = require('../vc-rate');

var _vcRate2 = _interopRequireDefault(_vcRate);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RateProps = exports.RateProps = {
  prefixCls: _vueTypes2['default'].string,
  count: _vueTypes2['default'].number,
  value: _vueTypes2['default'].value,
  defaultValue: _vueTypes2['default'].value,
  allowHalf: _vueTypes2['default'].bool,
  allowClear: _vueTypes2['default'].bool,
  disabled: _vueTypes2['default'].bool,
  character: _vueTypes2['default'].any,
  autoFocus: _vueTypes2['default'].bool
};

var Rate = {
  name: 'ARate',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: (0, _propsUtil.initDefaultProps)(RateProps, {
    prefixCls: 'ant-rate'
  }),
  methods: {
    focus: function focus() {
      this.$refs.refRate.focus();
    },
    blur: function blur() {
      this.$refs.refRate.blur();
    }
  },
  render: function render() {
    var h = arguments[0];

    var character = (0, _propsUtil.getComponentFromProp)(this, 'character') || h(_icon2['default'], {
      attrs: { type: 'star', theme: 'filled' }
    });
    var rateProps = {
      props: (0, _extends3['default'])({
        character: character
      }, (0, _propsUtil.getOptionProps)(this)),
      on: this.$listeners,
      ref: 'refRate'
    };
    return h(_vcRate2['default'], rateProps);
  }
};

/* istanbul ignore next */
Rate.install = function (Vue) {
  Vue.component(Rate.name, Rate);
};
exports['default'] = Rate;