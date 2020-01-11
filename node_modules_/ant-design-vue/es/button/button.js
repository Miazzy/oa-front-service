import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import Wave from '../_util/wave';
import Icon from '../icon';
var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
import buttonTypes from './buttonTypes';
import { filterEmpty } from '../_util/props-util';
var props = buttonTypes();
export default {
  name: 'AButton',
  inheritAttrs: false,
  __ANT_BUTTON: true,
  props: props,
  data: function data() {
    return {
      sizeMap: {
        large: 'lg',
        small: 'sm'
      },
      // clicked: false,
      sLoading: !!this.loading,
      hasTwoCNChar: false
    };
  },

  computed: {
    classes: function classes() {
      var _ref;

      var prefixCls = this.prefixCls,
          type = this.type,
          shape = this.shape,
          size = this.size,
          hasTwoCNChar = this.hasTwoCNChar,
          sLoading = this.sLoading,
          ghost = this.ghost,
          block = this.block,
          sizeMap = this.sizeMap,
          icon = this.icon,
          $slots = this.$slots;

      var sizeCls = sizeMap[size] || '';
      var children = filterEmpty($slots['default']);
      return _ref = {}, _defineProperty(_ref, '' + prefixCls, true), _defineProperty(_ref, prefixCls + '-' + type, type), _defineProperty(_ref, prefixCls + '-' + shape, shape), _defineProperty(_ref, prefixCls + '-' + sizeCls, sizeCls), _defineProperty(_ref, prefixCls + '-icon-only', !children && children !== 0 && icon), _defineProperty(_ref, prefixCls + '-loading', sLoading), _defineProperty(_ref, prefixCls + '-background-ghost', ghost || type === 'ghost'), _defineProperty(_ref, prefixCls + '-two-chinese-chars', hasTwoCNChar), _defineProperty(_ref, prefixCls + '-block', block), _ref;
    }
  },
  watch: {
    loading: function loading(val) {
      var _this = this;

      clearTimeout(this.delayTimeout);
      if (typeof val !== 'boolean' && val && val.delay) {
        this.delayTimeout = setTimeout(function () {
          _this.sLoading = !!val;
        }, val.delay);
      } else {
        this.sLoading = !!val;
      }
    }
  },
  mounted: function mounted() {
    this.fixTwoCNChar();
  },
  updated: function updated() {
    this.fixTwoCNChar();
  },
  beforeDestroy: function beforeDestroy() {
    // if (this.timeout) {
    //   clearTimeout(this.timeout)
    // }
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  },

  methods: {
    fixTwoCNChar: function fixTwoCNChar() {
      // Fix for HOC usage like <FormatMessage />
      var node = this.$refs.buttonNode;
      if (!node) {
        return;
      }
      var buttonText = node.textContent || node.innerText;
      if (this.isNeedInserted() && isTwoCNChar(buttonText)) {
        if (!this.hasTwoCNChar) {
          this.hasTwoCNChar = true;
        }
      } else if (this.hasTwoCNChar) {
        this.hasTwoCNChar = false;
      }
    },
    handleClick: function handleClick(event) {
      var sLoading = this.$data.sLoading;

      if (sLoading) {
        return;
      }
      this.$emit('click', event);
    },
    insertSpace: function insertSpace(child, needInserted) {
      var h = this.$createElement;

      var SPACE = needInserted ? ' ' : '';
      if (typeof child.text === 'string') {
        var text = child.text.trim();
        if (isTwoCNChar(text)) {
          text = text.split('').join(SPACE);
        }
        return h('span', [text]);
      }
      return child;
    },
    isNeedInserted: function isNeedInserted() {
      var icon = this.icon,
          $slots = this.$slots;

      return $slots['default'] && $slots['default'].length === 1 && !icon;
    }
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    var htmlType = this.htmlType,
        classes = this.classes,
        icon = this.icon,
        disabled = this.disabled,
        handleClick = this.handleClick,
        sLoading = this.sLoading,
        $slots = this.$slots,
        $attrs = this.$attrs,
        $listeners = this.$listeners;

    var buttonProps = {
      attrs: _extends({}, $attrs, {
        disabled: disabled
      }),
      'class': classes,
      on: _extends({}, $listeners, {
        click: handleClick
      })
    };
    var iconType = sLoading ? 'loading' : icon;
    var iconNode = iconType ? h(Icon, {
      attrs: { type: iconType }
    }) : null;
    var children = filterEmpty($slots['default']);
    var kids = children.map(function (child) {
      return _this2.insertSpace(child, _this2.isNeedInserted());
    });

    if ($attrs.href !== undefined) {
      return h(
        'a',
        _mergeJSXProps([buttonProps, { ref: 'buttonNode' }]),
        [iconNode, kids]
      );
    } else {
      return h(Wave, [h(
        'button',
        _mergeJSXProps([buttonProps, { ref: 'buttonNode', attrs: { type: htmlType || 'button' }
        }]),
        [iconNode, kids]
      )]);
    }
  }
};