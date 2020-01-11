import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import Checkbox from './Checkbox';
import hasProp from '../_util/props-util';
function noop() {}
export default {
  name: 'ACheckboxGroup',
  model: {
    prop: 'value'
  },
  props: {
    prefixCls: {
      'default': 'ant-checkbox',
      type: String
    },
    defaultValue: {
      'default': undefined,
      type: Array
    },
    value: {
      'default': undefined,
      type: Array
    },
    options: {
      'default': function _default() {
        return [];
      },
      type: Array
    },
    disabled: Boolean
  },
  provide: function provide() {
    return {
      checkboxGroupContext: this
    };
  },
  data: function data() {
    var value = this.value,
        defaultValue = this.defaultValue;

    return {
      sValue: value || defaultValue || []
    };
  },

  watch: {
    value: function value(val) {
      this.sValue = val;
    }
  },
  methods: {
    getOptions: function getOptions() {
      var options = this.options,
          $scopedSlots = this.$scopedSlots;

      return options.map(function (option) {
        if (typeof option === 'string') {
          return {
            label: option,
            value: option
          };
        }
        var label = option.label;
        if (label === undefined && $scopedSlots.label) {
          label = $scopedSlots.label(option);
        }
        return _extends({}, option, { label: label });
      });
    },
    toggleOption: function toggleOption(option) {
      var optionIndex = this.sValue.indexOf(option.value);
      var value = [].concat(_toConsumableArray(this.sValue));
      if (optionIndex === -1) {
        value.push(option.value);
      } else {
        value.splice(optionIndex, 1);
      }
      if (!hasProp(this, 'value')) {
        this.sValue = value;
      }
      this.$emit('input', value);
      this.$emit('change', value);
    }
  },
  render: function render() {
    var h = arguments[0];
    var props = this.$props,
        state = this.$data,
        $slots = this.$slots;
    var prefixCls = props.prefixCls,
        options = props.options;

    var children = $slots['default'];
    var groupPrefixCls = prefixCls + '-group';
    if (options && options.length > 0) {
      children = this.getOptions().map(function (option) {
        return h(
          Checkbox,
          {
            attrs: {
              prefixCls: prefixCls,

              disabled: 'disabled' in option ? option.disabled : props.disabled,
              value: option.value,
              checked: state.sValue.indexOf(option.value) !== -1
            },
            key: option.value.toString(), on: {
              'change': option.onChange || noop
            },

            'class': groupPrefixCls + '-item'
          },
          [option.label]
        );
      });
    }
    return h(
      'div',
      { 'class': groupPrefixCls },
      [children]
    );
  }
};