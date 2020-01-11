import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _typeof from 'babel-runtime/helpers/typeof';
import Icon from '../icon';
import ScrollableInkTabBar from '../vc-tabs/src/ScrollableInkTabBar';
import { cloneElement } from '../_util/vnode';
var TabBar = {
  functional: true,
  render: function render(h, context) {
    var _cls;

    var _context$props = context.props,
        tabBarStyle = _context$props.tabBarStyle,
        _context$props$animat = _context$props.animated,
        animated = _context$props$animat === undefined ? true : _context$props$animat,
        renderTabBar = _context$props.renderTabBar,
        tabBarExtraContent = _context$props.tabBarExtraContent,
        tabPosition = _context$props.tabPosition,
        prefixCls = _context$props.prefixCls,
        _context$props$type = _context$props.type,
        type = _context$props$type === undefined ? 'line' : _context$props$type,
        size = _context$props.size;

    var inkBarAnimated = (typeof animated === 'undefined' ? 'undefined' : _typeof(animated)) === 'object' ? animated.inkBar : animated;

    var isVertical = tabPosition === 'left' || tabPosition === 'right';
    var prevIconType = isVertical ? 'up' : 'left';
    var nextIconType = isVertical ? 'down' : 'right';
    var prevIcon = h(
      'span',
      { 'class': prefixCls + '-tab-prev-icon' },
      [h(Icon, {
        attrs: { type: prevIconType },
        'class': prefixCls + '-tab-prev-icon-target' })]
    );
    var nextIcon = h(
      'span',
      { 'class': prefixCls + '-tab-next-icon' },
      [h(Icon, {
        attrs: { type: nextIconType },
        'class': prefixCls + '-tab-next-icon-target' })]
    );

    // Additional className for style usage
    var cls = (_cls = {}, _defineProperty(_cls, prefixCls + '-' + tabPosition + '-bar', true), _defineProperty(_cls, prefixCls + '-' + size + '-bar', !!size), _defineProperty(_cls, prefixCls + '-card-bar', type && type.indexOf('card') >= 0), _cls);

    var renderProps = {
      props: _extends({}, context.props, {
        inkBarAnimated: inkBarAnimated,
        extraContent: tabBarExtraContent,
        prevIcon: prevIcon,
        nextIcon: nextIcon
      }),
      style: tabBarStyle,
      on: context.listeners,
      'class': cls
    };

    var RenderTabBar = void 0;

    if (renderTabBar) {
      RenderTabBar = renderTabBar(renderProps, ScrollableInkTabBar);
    } else {
      RenderTabBar = h(ScrollableInkTabBar, renderProps);
    }

    return cloneElement(RenderTabBar, renderProps);
  }
};

export default TabBar;