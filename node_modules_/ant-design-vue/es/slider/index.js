import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import PropTypes from '../_util/vue-types';
import BaseMixin from '../_util/BaseMixin';
import { getOptionProps } from '../_util/props-util';
import VcSlider from '../vc-slider/src/Slider';
import VcRange from '../vc-slider/src/Range';
import VcHandle from '../vc-slider/src/Handle';
import Tooltip from '../tooltip';

// export interface SliderMarks {
//   [key]: React.ReactNode | {
//     style: React.CSSProperties,
//     label: React.ReactNode,
//   };
// }
// const SliderMarks = PropTypes.shape({
//   style: PropTypes.object,
//   label: PropTypes.any,
// }).loose

export var SliderProps = function SliderProps() {
  return {
    prefixCls: PropTypes.string,
    tooltipPrefixCls: PropTypes.string,
    range: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.oneOfType([PropTypes.number, PropTypes.any]),
    marks: PropTypes.object,
    dots: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    included: PropTypes.bool,
    disabled: PropTypes.bool,
    vertical: PropTypes.bool,
    tipFormatter: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    tooltipVisible: PropTypes.bool
  };
};

var Slider = {
  name: 'ASlider',
  model: {
    prop: 'value',
    event: 'change'
  },
  mixins: [BaseMixin],
  props: _extends({}, SliderProps(), {
    prefixCls: PropTypes.string.def('ant-slider'),
    tooltipPrefixCls: PropTypes.string.def('ant-tooltip'),
    tipFormatter: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).def(function (value) {
      return value.toString();
    })
  }),
  data: function data() {
    return {
      visibles: {}
    };
  },

  methods: {
    toggleTooltipVisible: function toggleTooltipVisible(index, visible) {
      this.setState(function (_ref) {
        var visibles = _ref.visibles;
        return {
          visibles: _extends({}, visibles, _defineProperty({}, index, visible))
        };
      });
    },
    handleWithTooltip: function handleWithTooltip(_ref2) {
      var _this = this;

      var value = _ref2.value,
          dragging = _ref2.dragging,
          index = _ref2.index,
          directives = _ref2.directives,
          on = _ref2.on,
          restProps = _objectWithoutProperties(_ref2, ['value', 'dragging', 'index', 'directives', 'on']);

      var h = this.$createElement;
      var _$props = this.$props,
          tooltipPrefixCls = _$props.tooltipPrefixCls,
          tipFormatter = _$props.tipFormatter,
          tooltipVisible = _$props.tooltipVisible;
      var visibles = this.visibles;

      var isTipFormatter = tipFormatter ? visibles[index] || dragging : false;
      var visible = tooltipVisible || tooltipVisible === undefined && isTipFormatter;
      var tooltipProps = {
        props: {
          prefixCls: tooltipPrefixCls,
          title: tipFormatter ? tipFormatter(value) : '',
          visible: visible,
          placement: 'top',
          transitionName: 'fade'
        },
        key: index
      };
      var handleProps = {
        props: _extends({
          value: value
        }, restProps),
        directives: directives,
        on: _extends({}, on, {
          mouseenter: function mouseenter() {
            return _this.toggleTooltipVisible(index, true);
          },
          mouseleave: function mouseleave() {
            return _this.toggleTooltipVisible(index, false);
          }
        })
      };
      return h(
        Tooltip,
        tooltipProps,
        [h(VcHandle, handleProps)]
      );
    },
    focus: function focus() {
      this.$refs.sliderRef.focus();
    },
    blur: function blur() {
      this.$refs.sliderRef.blur();
    }
  },
  render: function render() {
    var h = arguments[0];

    var _getOptionProps = getOptionProps(this),
        range = _getOptionProps.range,
        restProps = _objectWithoutProperties(_getOptionProps, ['range']);

    if (range) {
      var vcRangeProps = {
        props: _extends({}, restProps, {
          handle: this.handleWithTooltip
        }),
        ref: 'sliderRef',
        on: this.$listeners
      };
      return h(VcRange, vcRangeProps);
    }
    var vcSliderProps = {
      props: _extends({}, restProps, {
        handle: this.handleWithTooltip
      }),
      ref: 'sliderRef',
      on: this.$listeners
    };
    return h(VcSlider, vcSliderProps);
  }
};

/* istanbul ignore next */
Slider.install = function (Vue) {
  Vue.component(Slider.name, Slider);
};

export default Slider;