import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _typeof from 'babel-runtime/helpers/typeof';
import PropTypes from '../_util/vue-types';

var stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export var ColSize = PropTypes.shape({
  span: stringOrNumber,
  order: stringOrNumber,
  offset: stringOrNumber,
  push: stringOrNumber,
  pull: stringOrNumber
}).loose;

var objectOrNumber = PropTypes.oneOfType([PropTypes.number, ColSize]);

export var ColProps = {
  span: stringOrNumber,
  order: stringOrNumber,
  offset: stringOrNumber,
  push: stringOrNumber,
  pull: stringOrNumber,
  xs: objectOrNumber,
  sm: objectOrNumber,
  md: objectOrNumber,
  lg: objectOrNumber,
  xl: objectOrNumber,
  xxl: objectOrNumber,
  prefixCls: PropTypes.string
};

export default {
  name: 'ACol',
  props: ColProps,
  inject: {
    rowContext: {
      'default': function _default() {
        return null;
      }
    }
  },
  render: function render() {
    var _this = this,
        _extends3;

    var h = arguments[0];
    var span = this.span,
        order = this.order,
        offset = this.offset,
        push = this.push,
        pull = this.pull,
        _prefixCls = this.prefixCls,
        prefixCls = _prefixCls === undefined ? 'ant-col' : _prefixCls,
        $slots = this.$slots,
        $attrs = this.$attrs,
        $listeners = this.$listeners,
        rowContext = this.rowContext;

    var sizeClassObj = {};
    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(function (size) {
      var _extends2;

      var sizeProps = {};
      if (typeof _this[size] === 'number') {
        sizeProps.span = _this[size];
      } else if (_typeof(_this[size]) === 'object') {
        sizeProps = _this[size] || {};
      }

      sizeClassObj = _extends({}, sizeClassObj, (_extends2 = {}, _defineProperty(_extends2, prefixCls + '-' + size + '-' + sizeProps.span, sizeProps.span !== undefined), _defineProperty(_extends2, prefixCls + '-' + size + '-order-' + sizeProps.order, sizeProps.order || sizeProps.order === 0), _defineProperty(_extends2, prefixCls + '-' + size + '-offset-' + sizeProps.offset, sizeProps.offset || sizeProps.offset === 0), _defineProperty(_extends2, prefixCls + '-' + size + '-push-' + sizeProps.push, sizeProps.push || sizeProps.push === 0), _defineProperty(_extends2, prefixCls + '-' + size + '-pull-' + sizeProps.pull, sizeProps.pull || sizeProps.pull === 0), _extends2));
    });
    var classes = _extends((_extends3 = {}, _defineProperty(_extends3, prefixCls + '-' + span, span !== undefined), _defineProperty(_extends3, prefixCls + '-order-' + order, order), _defineProperty(_extends3, prefixCls + '-offset-' + offset, offset), _defineProperty(_extends3, prefixCls + '-push-' + push, push), _defineProperty(_extends3, prefixCls + '-pull-' + pull, pull), _extends3), sizeClassObj);
    var divProps = {
      on: $listeners,
      attrs: $attrs,
      'class': classes,
      style: {}
    };
    if (rowContext) {
      var gutter = rowContext.getGutter();
      if (gutter > 0) {
        divProps.style = {
          paddingLeft: gutter / 2 + 'px',
          paddingRight: gutter / 2 + 'px'
        };
      }
    }
    return h(
      'div',
      divProps,
      [$slots['default']]
    );
  }
};