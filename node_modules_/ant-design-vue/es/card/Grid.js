import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import PropTypes from '../_util/vue-types';

export default {
  name: 'ACardGrid',
  __ANT_CARD_GRID: true,
  props: {
    prefixCls: PropTypes.string.def('ant-card')
  },
  render: function render() {
    var h = arguments[0];
    var _$props$prefixCls = this.$props.prefixCls,
        prefixCls = _$props$prefixCls === undefined ? 'ant-card' : _$props$prefixCls;

    var classString = _defineProperty({}, prefixCls + '-grid', true);
    return h(
      'div',
      _mergeJSXProps([{ on: this.$listeners }, { 'class': classString }]),
      [this.$slots['default']]
    );
  }
};