import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import classNames from 'classnames';
import PropTypes from '../_util/vue-types';
import Radio from './Radio';
import { getOptionProps, filterEmpty, hasProp } from '../_util/props-util';
function noop() {}

export default {
  name: 'ARadioGroup',
  model: {
    prop: 'value'
  },
  props: {
    prefixCls: {
      'default': 'ant-radio',
      type: String
    },
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    size: {
      'default': 'default',
      validator: function validator(value) {
        return ['large', 'default', 'small'].includes(value);
      }
    },
    options: {
      'default': function _default() {
        return [];
      },
      type: Array
    },
    disabled: Boolean,
    name: String,
    buttonStyle: PropTypes.string.def('outline')
  },
  data: function data() {
    var value = this.value,
        defaultValue = this.defaultValue;

    return {
      stateValue: value === undefined ? defaultValue : value
    };
  },
  provide: function provide() {
    return {
      radioGroupContext: this
    };
  },

  computed: {
    radioOptions: function radioOptions() {
      var disabled = this.disabled;

      return this.options.map(function (option) {
        return typeof option === 'string' ? { label: option, value: option } : _extends({}, option, { disabled: option.disabled === undefined ? disabled : option.disabled });
      });
    },
    classes: function classes() {
      var _ref;

      var prefixCls = this.prefixCls,
          size = this.size;

      return _ref = {}, _defineProperty(_ref, '' + prefixCls, true), _defineProperty(_ref, prefixCls + '-' + size, size), _ref;
    }
  },
  watch: {
    value: function value(val) {
      this.stateValue = val;
    }
  },
  methods: {
    onRadioChange: function onRadioChange(ev) {
      var lastValue = this.stateValue;
      var value = ev.target.value;

      if (!hasProp(this, 'value')) {
        this.stateValue = value;
      }
      if (value !== lastValue) {
        this.$emit('input', value);
        this.$emit('change', ev);
      }
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    var _$listeners = this.$listeners,
        _$listeners$mouseente = _$listeners.mouseenter,
        mouseenter = _$listeners$mouseente === undefined ? noop : _$listeners$mouseente,
        _$listeners$mouseleav = _$listeners.mouseleave,
        mouseleave = _$listeners$mouseleav === undefined ? noop : _$listeners$mouseleav;

    var props = getOptionProps(this);
    var prefixCls = props.prefixCls,
        options = props.options,
        buttonStyle = props.buttonStyle;

    var groupPrefixCls = prefixCls + '-group';
    var classString = classNames(groupPrefixCls, groupPrefixCls + '-' + buttonStyle, _defineProperty({}, groupPrefixCls + '-' + props.size, props.size));

    var children = filterEmpty(this.$slots['default']);

    // 如果存在 options, 优先使用
    if (options && options.length > 0) {
      children = options.map(function (option, index) {
        if (typeof option === 'string') {
          return h(
            Radio,
            {
              key: index,
              attrs: { prefixCls: prefixCls,
                disabled: props.disabled,
                value: option,

                checked: _this.stateValue === option
              },
              on: {
                'change': _this.onRadioChange
              }
            },
            [option]
          );
        } else {
          return h(
            Radio,
            {
              key: index,
              attrs: { prefixCls: prefixCls,
                disabled: option.disabled || props.disabled,
                value: option.value,

                checked: _this.stateValue === option.value
              },
              on: {
                'change': _this.onRadioChange
              }
            },
            [option.label]
          );
        }
      });
    }

    return h(
      'div',
      { 'class': classString, on: {
          'mouseenter': mouseenter,
          'mouseleave': mouseleave
        }
      },
      [children]
    );
  }
};