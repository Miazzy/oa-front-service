import _extends from 'babel-runtime/helpers/extends';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import classNames from 'classnames';
import PropTypes from '../_util/vue-types';
import { getOptionProps, initDefaultProps, filterEmpty, getComponentFromProp } from '../_util/props-util';
import { cloneElement } from '../_util/vnode';
import TimelineItem from './TimelineItem';
import Icon from '../icon';

export var TimelineProps = {
  prefixCls: PropTypes.string,
  /** 指定最后一个幽灵节点是否存在或内容 */
  pending: PropTypes.any,
  pendingDot: PropTypes.string,
  reverse: PropTypes.bool,
  mode: PropTypes.oneOf(['left', 'alternate', 'right'])
};

export default {
  name: 'ATimeline',
  props: initDefaultProps(TimelineProps, {
    prefixCls: 'ant-timeline',
    reverse: false
  }),
  render: function render() {
    var _classNames;

    var h = arguments[0];

    var _getOptionProps = getOptionProps(this),
        prefixCls = _getOptionProps.prefixCls,
        reverse = _getOptionProps.reverse,
        mode = _getOptionProps.mode,
        restProps = _objectWithoutProperties(_getOptionProps, ['prefixCls', 'reverse', 'mode']);

    var pendingDot = getComponentFromProp(this, 'pendingDot');
    var pending = getComponentFromProp(this, 'pending');
    var pendingNode = typeof pending === 'boolean' ? null : pending;
    var classString = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-pending', !!pending), _defineProperty(_classNames, prefixCls + '-reverse', !!reverse), _defineProperty(_classNames, prefixCls + '-' + mode, !!mode), _classNames));
    var children = filterEmpty(this.$slots['default']);
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
      TimelineItem,
      {
        attrs: { pending: !!pending }
      },
      [h(
        'template',
        { slot: 'dot' },
        [pendingDot || h(Icon, {
          attrs: { type: 'loading' }
        })]
      ), pendingNode]
    ) : null;

    var timeLineItems = !!reverse ? [pendingItem].concat(_toConsumableArray(children.reverse())) : [].concat(_toConsumableArray(children), [pendingItem]);

    // Remove falsy items
    var truthyItems = timeLineItems.filter(function (item) {
      return !!item;
    });
    var itemsCount = truthyItems.length;
    var lastCls = prefixCls + '-item-last';
    var items = truthyItems.map(function (ele, idx) {
      return cloneElement(ele, {
        'class': classNames([!reverse && !!pending ? idx === itemsCount - 2 ? lastCls : '' : idx === itemsCount - 1 ? lastCls : '', mode === 'alternate' ? idx % 2 === 0 ? prefixCls + '-item-left' : prefixCls + '-item-right' : mode === 'right' ? prefixCls + '-item-right' : ''])
      });
    });

    var timelineProps = {
      props: _extends({}, restProps),
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