import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import { switchPropTypes } from './PropTypes';
import BaseMixin from '../_util/BaseMixin';
import { hasProp, getOptionProps, getComponentFromProp } from '../_util/props-util';

// function noop () {
// }
export default {
  name: 'VcSwitch',
  mixins: [BaseMixin],
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: _extends({}, switchPropTypes, {
    prefixCls: switchPropTypes.prefixCls.def('rc-switch')
    // onChange: switchPropTypes.onChange.def(noop),
    // onClick: switchPropTypes.onClick.def(noop),
  }),
  data: function data() {
    var checked = false;
    if (hasProp(this, 'checked')) {
      checked = !!this.checked;
    } else {
      checked = !!this.defaultChecked;
    }
    return {
      stateChecked: checked
    };
  },

  watch: {
    checked: function checked(val) {
      this.stateChecked = val;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      var autoFocus = _this.autoFocus,
          disabled = _this.disabled;

      if (autoFocus && !disabled) {
        _this.focus();
      }
    });
  },

  methods: {
    setChecked: function setChecked(checked) {
      if (this.disabled) {
        return;
      }
      if (!hasProp(this, 'checked')) {
        this.stateChecked = checked;
      }
      this.$emit('change', checked);
    },
    toggle: function toggle() {
      var checked = !this.stateChecked;
      this.setChecked(checked);
      this.$emit('click', checked);
    },
    handleKeyDown: function handleKeyDown(e) {
      if (e.keyCode === 37) {
        // Left
        this.setChecked(false);
      } else if (e.keyCode === 39) {
        // Right
        this.setChecked(true);
      }
    },
    handleMouseUp: function handleMouseUp(e) {
      if (this.$refs.refSwitchNode) {
        this.$refs.refSwitchNode.blur();
      }
      this.$emit('mouseup', e);
    },
    focus: function focus() {
      this.$refs.refSwitchNode.focus();
    },
    blur: function blur() {
      this.$refs.refSwitchNode.blur();
    }
  },
  render: function render() {
    var _switchClassName;

    var h = arguments[0];

    var _getOptionProps = getOptionProps(this),
        prefixCls = _getOptionProps.prefixCls,
        disabled = _getOptionProps.disabled,
        loadingIcon = _getOptionProps.loadingIcon,
        restProps = _objectWithoutProperties(_getOptionProps, ['prefixCls', 'disabled', 'loadingIcon']);

    var checked = this.stateChecked;
    var switchClassName = (_switchClassName = {}, _defineProperty(_switchClassName, prefixCls, true), _defineProperty(_switchClassName, prefixCls + '-checked', checked), _defineProperty(_switchClassName, prefixCls + '-disabled', disabled), _switchClassName);
    var spanProps = {
      props: _extends({}, restProps),
      on: _extends({}, this.$listeners, {
        keydown: this.handleKeyDown,
        click: this.toggle,
        mouseup: this.handleMouseUp
      }),
      attrs: {
        type: 'button',
        role: 'switch',
        'aria-checked': checked,
        disabled: disabled
      },
      'class': switchClassName,
      ref: 'refSwitchNode'
    };
    return h(
      'button',
      spanProps,
      [loadingIcon, h(
        'span',
        { 'class': prefixCls + '-inner' },
        [checked ? getComponentFromProp(this, 'checkedChildren') : getComponentFromProp(this, 'unCheckedChildren')]
      )]
    );
  }
};