'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineProps = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _vueTypes = require('../_util/vue-types');

var _vueTypes2 = _interopRequireDefault(_vueTypes);

var _propsUtil = require('../_util/props-util');

var _vnode = require('../_util/vnode');

var _TimelineItem = require('./TimelineItem');

var _TimelineItem2 = _interopRequireDefault(_TimelineItem);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TimelineProps = exports.TimelineProps = {
  prefixCls: _vueTypes2['default'].string,
  /** 指定最后一个幽灵节点是否存在或内容 */
  pending: _vueTypes2['default'].any,
  pendingDot: _vueTypes2['default'].string,
  reverse: _vueTypes2['default'].bool,
  mode: _vueTypes2['default'].oneOf(['left', 'alternate', 'right'])
};

exports['default'] = {
  name: 'ATimeline',
  props: (0, _propsUtil.initDefaultProps)(TimelineProps, {
    prefixCls: 'ant-timeline',
    reverse: false
  }),
  render: function render() {
    var _classNames;

    var h = arguments[0];

    var _getOptionProps = (0, _propsUtil.getOptionProps)(this),
        prefixCls = _getOptionProps.prefixCls,
        reverse = _getOptionProps.reverse,
        mode = _getOptionProps.mode,
        restProps = (0, _objectWithoutProperties3['default'])(_getOptionProps, ['prefixCls', 'reverse', 'mode']);

    var pendingDot = (0, _propsUtil.getComponentFromProp)(this, 'pendingDot');
    var pending = (0, _propsUtil.getComponentFromProp)(this, 'pending');
    var pendingNode = typeof pending === 'boolean' ? null : pending;
    var classString = (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-pending', !!pending), (0, _defineProperty3['default'])(_classNames, prefixCls + '-reverse', !!reverse), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + mode, !!mode), _classNames));
    var children = (0, _propsUtil.filterEmpty)(this.$slots['default']);
    // // Remove falsy items
    // const falsylessItems = filterEmpty(this.$slots.default)
    // const items = falsylessItems.map((item, idx) => {
    //   return cloneElement(item, {
    //     props: {
    //       last: falsylessItems.length - 1 === idx,
    //     },
    //   })
    // })
    var pendingItem = !!pending ? h(
      _TimelineItem2['default'],
      {
        attrs: { pending: !!pending }
      },
      [h(
        'template',
        { slot: 'dot' },
        [pendingDot || h(_icon2['default'], {
          attrs: { type: 'loading' }
        })]
      ), pendingNode]
    ) : null;

    var timeLineItems = !!reverse ? [pendingItem].concat((0, _toConsumableArray3['default'])(children.reverse())) : [].concat((0, _toConsumableArray3['default'])(children), [pendingItem]);

    // Remove falsy items
    var truthyItems = timeLineItems.filter(function (item) {
      return !!item;
    });
    var itemsCount = truthyItems.length;
    var lastCls = prefixCls + '-item-last';
    var items = truthyItems.map(function (ele, idx) {
      return (0, _vnode.cloneElement)(ele, {
        'class': (0, _classnames2['default'])([!reverse && !!pending ? idx === itemsCount - 2 ? lastCls : '' : idx === itemsCount - 1 ? lastCls : '', mode === 'alternate' ? idx % 2 === 0 ? prefixCls + '-item-left' : prefixCls + '-item-right' : mode === 'right' ? prefixCls + '-item-right' : ''])
      });
    });

    var timelineProps = {
      props: (0, _extends3['default'])({}, restProps),
      'class': classString,
      on: this.$listeners
    };
    return h(
      'ul',
      timelineProps,
      [items]
    );
  }
};