'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpinProps = exports.SpinSize = undefined;

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.setDefaultIndicator = setDefaultIndicator;

var _vueTypes = require('../_util/vue-types');

var _vueTypes2 = _interopRequireDefault(_vueTypes);

var _BaseMixin = require('../_util/BaseMixin');

var _BaseMixin2 = _interopRequireDefault(_BaseMixin);

var _propsUtil = require('../_util/props-util');

var _vnode = require('../_util/vnode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SpinSize = exports.SpinSize = _vueTypes2['default'].oneOf(['small', 'default', 'large']);

var SpinProps = exports.SpinProps = function SpinProps() {
  return {
    prefixCls: _vueTypes2['default'].string,
    spinning: _vueTypes2['default'].bool,
    size: SpinSize,
    wrapperClassName: _vueTypes2['default'].string,
    tip: _vueTypes2['default'].string,
    delay: _vueTypes2['default'].number,
    indicator: _vueTypes2['default'].any
  };
};

// Render indicator
var defaultIndicator = void 0;

function shouldDelay(spinning, delay) {
  return !!spinning && !!delay && !isNaN(Number(delay));
}

function setDefaultIndicator(content) {
  defaultIndicator = typeof content.indicator === 'function' ? content.indicator : function (h) {
    return h(content.indicator);
  };
}

exports['default'] = {
  name: 'ASpin',
  mixins: [_BaseMixin2['default']],
  props: (0, _propsUtil.initDefaultProps)(SpinProps(), {
    prefixCls: 'ant-spin',
    size: 'default',
    spinning: true,
    wrapperClassName: ''
  }),
  data: function data() {
    var spinning = this.spinning,
        delay = this.delay;

    this.debounceTimeout = null;
    this.delayTimeout = null;
    return {
      sSpinning: spinning && !shouldDelay(spinning, delay)
    };
  },
  updated: function updated() {
    var _this = this;

    this.$nextTick(function () {
      var delay = _this.delay,
          spinning = _this.spinning,
          sSpinning = _this.sSpinning;

      if (sSpinning === spinning) {
        return;
      }

      if (_this.debounceTimeout) {
        clearTimeout(_this.debounceTimeout);
      }
      if (sSpinning && !spinning) {
        _this.debounceTimeout = window.setTimeout(function () {
          return _this.setState({ sSpinning: spinning });
        }, 200);
        if (_this.delayTimeout) {
          clearTimeout(_this.delayTimeout);
        }
      } else {
        if (shouldDelay(spinning, delay)) {
          if (_this.delayTimeout) {
            clearTimeout(_this.delayTimeout);
          }
          _this.delayTimeout = window.setTimeout(_this.delayUpdateSpinning, delay);
        } else {
          _this.setState({ sSpinning: spinning });
        }
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  },

  methods: {
    delayUpdateSpinning: function delayUpdateSpinning() {
      var spinning = this.spinning,
          sSpinning = this.sSpinning;

      if (sSpinning !== spinning) {
        this.setState({ sSpinning: spinning });
      }
    },
    getChildren: function getChildren() {
      if (this.$slots && this.$slots['default']) {
        return (0, _propsUtil.filterEmpty)(this.$slots['default']);
      }
      return null;
    },
    renderIndicator: function renderIndicator(h, props) {
      // const h = this.$createElement
      var prefixCls = props.prefixCls;

      var dotClassName = prefixCls + '-dot';
      var indicator = (0, _propsUtil.getComponentFromProp)(this, 'indicator');
      if (Array.isArray(indicator)) {
        indicator = (0, _propsUtil.filterEmpty)(indicator);
        indicator = indicator.length === 1 ? indicator[0] : indicator;
      }
      if ((0, _propsUtil.isValidElement)(indicator)) {
        return (0, _vnode.cloneElement)(indicator, { 'class': dotClassName });
      }

      if (defaultIndicator && (0, _propsUtil.isValidElement)(defaultIndicator(h))) {
        return (0, _vnode.cloneElement)(defaultIndicator(h), { 'class': dotClassName });
      }

      return h(
        'span',
        { 'class': dotClassName + ' ' + prefixCls + '-dot-spin' },
        [h('i'), h('i'), h('i'), h('i')]
      );
    }
  },
  render: function render(h) {
    var _spinClassName;

    var _$props = this.$props,
        size = _$props.size,
        prefixCls = _$props.prefixCls,
        tip = _$props.tip,
        wrapperClassName = _$props.wrapperClassName,
        restProps = (0, _objectWithoutProperties3['default'])(_$props, ['size', 'prefixCls', 'tip', 'wrapperClassName']);
    var sSpinning = this.sSpinning;

    var spinClassName = (_spinClassName = {}, (0, _defineProperty3['default'])(_spinClassName, prefixCls, true), (0, _defineProperty3['default'])(_spinClassName, prefixCls + '-sm', size === 'small'), (0, _defineProperty3['default'])(_spinClassName, prefixCls + '-lg', size === 'large'), (0, _defineProperty3['default'])(_spinClassName, prefixCls + '-spinning', sSpinning), (0, _defineProperty3['default'])(_spinClassName, prefixCls + '-show-text', !!tip), _spinClassName);

    var spinElement = h(
      'div',
      (0, _babelHelperVueJsxMergeProps2['default'])([restProps, { 'class': spinClassName }]),
      [this.renderIndicator(h, this.$props), tip ? h(
        'div',
        { 'class': prefixCls + '-text' },
        [tip]
      ) : null]
    );
    var children = this.getChildren();
    if (children) {
      var _containerClassName;

      var containerClassName = (_containerClassName = {}, (0, _defineProperty3['default'])(_containerClassName, prefixCls + '-container', true), (0, _defineProperty3['default'])(_containerClassName, prefixCls + '-blur', sSpinning), _containerClassName);

      return h(
        'div',
        (0, _babelHelperVueJsxMergeProps2['default'])([{ on: this.$listeners }, { 'class': [prefixCls + '-nested-loading', wrapperClassName] }]),
        [sSpinning && h(
          'div',
          { key: 'loading' },
          [spinElement]
        ), h(
          'div',
          { 'class': containerClassName, key: 'container' },
          [children]
        )]
      );
    }
    return spinElement;
  }
};