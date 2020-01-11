import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import PropTypes from '../_util/vue-types';
import VcSelect from '../select';
import MiniSelect from './MiniSelect';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { getOptionProps } from '../_util/props-util';
import VcPagination from '../vc-pagination';
import Icon from '../icon';

export var PaginationProps = function PaginationProps() {
  return {
    total: PropTypes.number,
    defaultCurrent: PropTypes.number,
    current: PropTypes.number,
    defaultPageSize: PropTypes.number,
    pageSize: PropTypes.number,
    hideOnSinglePage: PropTypes.bool,
    showSizeChanger: PropTypes.bool,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    buildOptionText: PropTypes.func,
    showSizeChange: PropTypes.func,
    showQuickJumper: PropTypes.bool,
    showTotal: PropTypes.any,
    size: PropTypes.string,
    simple: PropTypes.bool,
    locale: PropTypes.object,
    prefixCls: PropTypes.string,
    selectPrefixCls: PropTypes.string,
    itemRender: PropTypes.any,
    role: PropTypes.string
  };
};

export var PaginationConfig = function PaginationConfig() {
  return _extends({}, PaginationProps(), {
    position: PropTypes.oneOf(['top', 'bottom', 'both'])
  });
};

export default {
  name: 'APagination',
  model: {
    prop: 'current',
    event: 'change.current'
  },
  props: _extends({}, PaginationProps(), {
    prefixCls: PropTypes.string.def('ant-pagination'),
    selectPrefixCls: PropTypes.string.def('ant-select')
  }),
  methods: {
    getIconsProps: function getIconsProps() {
      var h = this.$createElement;
      var prefixCls = this.$props.prefixCls;

      var prevIcon = h(
        'a',
        { 'class': prefixCls + '-item-link' },
        [h(Icon, {
          attrs: { type: 'left' }
        })]
      );
      var nextIcon = h(
        'a',
        { 'class': prefixCls + '-item-link' },
        [h(Icon, {
          attrs: { type: 'right' }
        })]
      );
      var jumpPrevIcon = h(
        'a',
        { 'class': prefixCls + '-item-link' },
        [h(
          'div',
          { 'class': prefixCls + '-item-container' },
          [h(Icon, { 'class': prefixCls + '-item-link-icon', attrs: { type: 'double-left' }
          }), h(
            'span',
            { 'class': prefixCls + '-item-ellipsis' },
            ['\u2022\u2022\u2022']
          )]
        )]
      );
      var jumpNextIcon = h(
        'a',
        { 'class': prefixCls + '-item-link' },
        [h(
          'div',
          { 'class': prefixCls + '-item-container' },
          [h(Icon, { 'class': prefixCls + '-item-link-icon', attrs: { type: 'double-right' }
          }), h(
            'span',
            { 'class': prefixCls + '-item-ellipsis' },
            ['\u2022\u2022\u2022']
          )]
        )]
      );
      return {
        prevIcon: prevIcon,
        nextIcon: nextIcon,
        jumpPrevIcon: jumpPrevIcon,
        jumpNextIcon: jumpNextIcon
      };
    },
    renderPagination: function renderPagination(contextLocale) {
      var h = this.$createElement;

      var _getOptionProps = getOptionProps(this),
          buildOptionText = _getOptionProps.buildOptionText,
          size = _getOptionProps.size,
          customLocale = _getOptionProps.locale,
          restProps = _objectWithoutProperties(_getOptionProps, ['buildOptionText', 'size', 'locale']);

      var isSmall = size === 'small';
      var paginationProps = {
        props: _extends({}, restProps, this.getIconsProps(), {
          selectComponentClass: isSmall ? MiniSelect : VcSelect,
          locale: _extends({}, contextLocale, customLocale),
          buildOptionText: buildOptionText || this.$scopedSlots.buildOptionText
        }),
        'class': {
          mini: isSmall
        },
        on: this.$listeners
      };

      return h(VcPagination, paginationProps);
    }
  },
  render: function render() {
    var h = arguments[0];

    return h(LocaleReceiver, {
      attrs: { componentName: 'Pagination' },
      scopedSlots: { 'default': this.renderPagination } });
  }
};