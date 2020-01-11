import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import PropTypes from '../_util/vue-types';
import classNames from 'classnames';
import VcCheckbox from '../vc-checkbox';
import { getOptionProps, getAttrs } from '../_util/props-util';
function noop() {}

export default {
  name: 'ACheckbox',
  inheritAttrs: false,
  model: {
    prop: 'checked'
  },
  props: {
    prefixCls: {
      'default': 'ant-checkbox',
      type: String
    },
    defaultChecked: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    isGroup: Boolean,
    value: PropTypes.any,
    name: String,
    id: String,
    indeterminate: Boolean,
    type: PropTypes.string.def('checkbox'),
    autoFocus: Boolean
  },
  inject: {
    checkboxGroupContext: { 'default': function _default() {
        return null;
      } }
  },
  methods: {
    handleChange: function handleChange(event) {
      var targetChecked = event.target.checked;
      this.$emit('input', targetChecked);
      this.$emit('change', event);
    },
    focus: function focus() {
      this.$refs.vcCheckbox.focus();
    },
    blur: function blur() {
      this.$refs.vcCheckbox.blur();
    }
  },

  render: function render() {
    var _this = this,
        _classNames;

    var h = arguments[0];
    var checkboxGroup = this.checkboxGroupContext,
        $listeners = this.$listeners,
        $slots = this.$slots;

    var props = getOptionProps(this);
    var children = $slots['default'];

    var _$listeners$mouseente = $listeners.mouseenter,
        mouseenter = _$listeners$mouseente === undefined ? noop : _$listeners$mouseente,
        _$listeners$mouseleav = $listeners.mouseleave,
        mouseleave = _$listeners$mouseleav === undefined ? noop : _$listeners$mouseleav,
        restListeners = _objectWithoutProperties($listeners, ['mouseenter', 'mouseleave']);

    var prefixCls = props.prefixCls,
        indeterminate = props.indeterminate,
        restProps = _objectWithoutProperties(props, ['prefixCls', 'indeterminate']);

    var checkboxProps = {
      props: _extends({}, restProps, { prefixCls: prefixCls }),
      on: restListeners,
      attrs: getAttrs(this)
    };
    if (checkboxGroup) {
      checkboxProps.on.change = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this.$emit.apply(_this, ['change'].concat(args));
        checkboxGroup.toggleOption({ label: children, value: props.value });
      };
      checkboxProps.props.checked = checkboxGroup.sValue.indexOf(props.value) !== -1;
      checkboxProps.props.disabled = props.disabled || checkboxGroup.disabled;
    } else {
      checkboxProps.on.change = this.handleChange;
    }
    var classString = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-wrapper', true), _defineProperty(_classNames, prefixCls + '-wrapper-checked', checkboxProps.props.checked), _defineProperty(_classNames, prefixCls + '-wrapper-disabled', checkboxProps.props.disabled), _classNames));
    var checkboxClass = classNames(_defineProperty({}, prefixCls + '-indeterminate', indeterminate));
    return h(
      'label',
      { 'class': classString, on: {
          'mouseenter': mouseenter,
          'mouseleave': mouseleave
        }
      },
      [h(VcCheckbox, _mergeJSXProps([checkboxProps, { 'class': checkboxClass, ref: 'vcCheckbox' }])), children !== undefined && h('span', [children])]
    );
  }
};