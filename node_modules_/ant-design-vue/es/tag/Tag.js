import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import PropTypes from '../_util/vue-types';
import Icon from '../icon';
import getTransitionProps from '../_util/getTransitionProps';
import omit from 'omit.js';
import Wave from '../_util/wave';
import { hasProp } from '../_util/props-util';
import BaseMixin from '../_util/BaseMixin';

export default {
  name: 'ATag',
  mixins: [BaseMixin],
  model: {
    prop: 'visible',
    event: 'close.visible'
  },
  props: {
    prefixCls: PropTypes.string.def('ant-tag'),
    color: PropTypes.string,
    closable: PropTypes.bool.def(false),
    visible: PropTypes.bool,
    afterClose: PropTypes.func
  },
  data: function data() {
    var _visible = true;
    if (hasProp(this, 'visible')) {
      _visible = this.visible;
    }
    return {
      _visible: _visible
    };
  },

  watch: {
    visible: function visible(val) {
      this.setState({
        _visible: val
      });
    }
  },
  methods: {
    setVisible: function setVisible(visible, e) {
      this.$emit('close', e);
      this.$emit('close.visible', false);
      if (e.defaultPrevented) {
        return;
      }
      if (!hasProp(this, 'visible')) {
        this.setState({ _visible: visible });
      }
    },
    handleIconClick: function handleIconClick(e) {
      this.setVisible(false, e);
    },
    animationEnd: function animationEnd() {
      var afterClose = this.afterClose;
      if (afterClose) {
        afterClose();
      }
    },
    isPresetColor: function isPresetColor(color) {
      if (!color) {
        return false;
      }
      return (/^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(color)
      );
    },
    getTagStyle: function getTagStyle() {
      var color = this.$props.color;

      var isPresetColor = this.isPresetColor(color);
      return {
        backgroundColor: color && !isPresetColor ? color : undefined
      };
    },
    getTagClassName: function getTagClassName() {
      var _ref;

      var _$props = this.$props,
          prefixCls = _$props.prefixCls,
          color = _$props.color;

      var isPresetColor = this.isPresetColor(color);
      return _ref = {}, _defineProperty(_ref, prefixCls, true), _defineProperty(_ref, prefixCls + '-' + color, isPresetColor), _defineProperty(_ref, prefixCls + '-has-color', color && !isPresetColor), _ref;
    },
    renderCloseIcon: function renderCloseIcon() {
      var h = this.$createElement;
      var closable = this.$props.closable;

      return closable ? h(Icon, {
        attrs: { type: 'close' },
        on: {
          'click': this.handleIconClick
        }
      }) : null;
    }
  },

  render: function render() {
    var h = arguments[0];
    var prefixCls = this.$props.prefixCls;
    var visible = this.$data._visible;

    var tag = h(
      'div',
      _mergeJSXProps([{
        directives: [{
          name: 'show',
          value: visible
        }]
      }, { on: omit(this.$listeners, ['close']) }, {
        'class': this.getTagClassName(),
        style: this.getTagStyle()
      }]),
      [this.$slots['default'], this.renderCloseIcon()]
    );
    var transitionProps = getTransitionProps(prefixCls + '-zoom', {
      appear: false,
      afterLeave: this.animationEnd
    });
    return h(Wave, [h(
      'transition',
      transitionProps,
      [tag]
    )]);
  }
};