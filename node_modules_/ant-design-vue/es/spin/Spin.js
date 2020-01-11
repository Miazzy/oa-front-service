import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import PropTypes from '../_util/vue-types';
import BaseMixin from '../_util/BaseMixin';
import { filterEmpty, initDefaultProps, isValidElement, getComponentFromProp } from '../_util/props-util';
import { cloneElement } from '../_util/vnode';

export var SpinSize = PropTypes.oneOf(['small', 'default', 'large']);

export var SpinProps = function SpinProps() {
  return {
    prefixCls: PropTypes.string,
    spinning: PropTypes.bool,
    size: SpinSize,
    wrapperClassName: PropTypes.string,
    tip: PropTypes.string,
    delay: PropTypes.number,
    indicator: PropTypes.any
  };
};

// Render indicator
var defaultIndicator = void 0;

function shouldDelay(spinning, delay) {
  return !!spinning && !!delay && !isNaN(Number(delay));
}

export function setDefaultIndicator(content) {
  defaultIndicator = typeof content.indicator === 'function' ? content.indicator : function (h) {
    return h(content.indicator);
  };
}

export default {
  name: 'ASpin',
  mixins: [BaseMixin],
  props: initDefaultProps(SpinProps(), {
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
        return filterEmpty(this.$slots['default']);
      }
      return null;
    },
    renderIndicator: function renderIndicator(h, props) {
      // const h = this.$createElement
      var prefixCls = props.prefixCls;

      var dotClassName = prefixCls + '-dot';
      var indicator = getComponentFromProp(this, 'indicator');
      if (Array.isArray(indicator)) {
        indicator = filterEmpty(indicator);
        indicator = indicator.length === 1 ? indicator[0] : indicator;
      }
      if (isValidElement(indicator)) {
        return cloneElement(indicator, { 'class': dotClassName });
      }

      if (defaultIndicator && isValidElement(defaultIndicator(h))) {
        return cloneElement(defaultIndicator(h), { 'class': dotClassName });
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
        restProps = _objectWithoutProperties(_$props, ['size', 'prefixCls', 'tip', 'wrapperClassName']);

    var sSpinning = this.sSpinning;

    var spinClassName = (_spinClassName = {}, _defineProperty(_spinClassName, prefixCls, true), _defineProperty(_spinClassName, prefixCls + '-sm', size === 'small'), _defineProperty(_spinClassName, prefixCls + '-lg', size === 'large'), _defineProperty(_spinClassName, prefixCls + '-spinning', sSpinning), _defineProperty(_spinClassName, prefixCls + '-show-text', !!tip), _spinClassName);

    var spinElement = h(
      'div',
      _mergeJSXProps([restProps, { 'class': spinClassName }]),
      [this.renderIndicator(h, this.$props), tip ? h(
        'div',
        { 'class': prefixCls + '-text' },
        [tip]
      ) : null]
    );
    var children = this.getChildren();
    if (children) {
      var _containerClassName;

      var containerClassName = (_containerClassName = {}, _defineProperty(_containerClassName, prefixCls + '-container', true), _defineProperty(_containerClassName, prefixCls + '-blur', sSpinning), _containerClassName);

      return h(
        'div',
        _mergeJSXProps([{ on: this.$listeners }, { 'class': [prefixCls + '-nested-loading', wrapperClassName] }]),
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