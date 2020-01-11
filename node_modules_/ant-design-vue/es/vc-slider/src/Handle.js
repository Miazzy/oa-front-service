import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import classNames from 'classnames';
import PropTypes from '../../_util/vue-types';
import BaseMixin from '../../_util/BaseMixin';
import { getOptionProps } from '../../_util/props-util';
import addEventListener from '../../_util/Dom/addEventListener';

export default {
  name: 'Handle',
  mixins: [BaseMixin],
  props: {
    prefixCls: PropTypes.string,
    vertical: PropTypes.bool,
    offset: PropTypes.number,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    tabIndex: PropTypes.number,
    className: PropTypes.string
    // handleFocus: PropTypes.func.def(noop),
    // handleBlur: PropTypes.func.def(noop),
  },
  data: function data() {
    return {
      clickFocused: false
    };
  },
  mounted: function mounted() {
    // mouseup won't trigger if mouse moved out of handle
    // so we listen on document here.
    this.onMouseUpListener = addEventListener(document, 'mouseup', this.handleMouseUp);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.onMouseUpListener) {
      this.onMouseUpListener.remove();
    }
  },

  methods: {
    setClickFocus: function setClickFocus(focused) {
      this.setState({ clickFocused: focused });
    },
    handleMouseUp: function handleMouseUp() {
      if (document.activeElement === this.$refs.handle) {
        this.setClickFocus(true);
      }
    },
    handleBlur: function handleBlur(e) {
      this.setClickFocus(false);
      this.__emit('blur', e);
    },
    handleKeyDown: function handleKeyDown() {
      this.setClickFocus(false);
    },
    clickFocus: function clickFocus() {
      this.setClickFocus(true);
      this.focus();
    },
    focus: function focus() {
      this.$refs.handle.focus();
    },
    blur: function blur() {
      this.$refs.handle.blur();
    },

    // when click can not focus in vue, use mousedown trigger focus
    handleMousedown: function handleMousedown(e) {
      this.focus();
      this.__emit('mousedown', e);
    }
  },
  render: function render() {
    var h = arguments[0];

    var _getOptionProps = getOptionProps(this),
        prefixCls = _getOptionProps.prefixCls,
        vertical = _getOptionProps.vertical,
        offset = _getOptionProps.offset,
        disabled = _getOptionProps.disabled,
        min = _getOptionProps.min,
        max = _getOptionProps.max,
        value = _getOptionProps.value,
        tabIndex = _getOptionProps.tabIndex;

    var className = classNames(this.$props.className, _defineProperty({}, prefixCls + '-handle-click-focused', this.clickFocused));

    var postionStyle = vertical ? { bottom: offset + '%' } : { left: offset + '%' };

    var ariaProps = {
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': value,
      'aria-disabled': !!disabled
    };

    var handleProps = {
      attrs: _extends({
        role: 'slider',
        tabIndex: disabled ? null : tabIndex || 0
      }, ariaProps),
      'class': className,
      on: _extends({}, this.$listeners, {
        blur: this.handleBlur,
        keydown: this.handleKeyDown,
        mousedown: this.handleMousedown
      }),
      ref: 'handle',
      style: postionStyle
    };
    return h('div', handleProps);
  }
};