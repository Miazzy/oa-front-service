import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import _typeof from 'babel-runtime/helpers/typeof';
import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import PropTypes from '../_util/vue-types';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';
import { initDefaultProps, filterEmpty, getComponentFromProp } from '../_util/props-util';
import { cloneElement } from '../_util/vnode';
import getTransitionProps from '../_util/getTransitionProps';
import isNumeric from '../_util/isNumeric';

export var BadgeProps = {
  /** Number to show in badge */
  count: PropTypes.any,
  showZero: PropTypes.bool,
  /** Max count to show */
  overflowCount: PropTypes.number,
  /** whether to show red dot without number */
  dot: PropTypes.bool,
  prefixCls: PropTypes.string,
  scrollNumberPrefixCls: PropTypes.string,
  status: PropTypes.oneOf(['success', 'processing', 'default', 'error', 'warning']),
  text: PropTypes.string,
  offset: PropTypes.array,
  numberStyle: PropTypes.object.def({}),
  title: PropTypes.string
};

export default {
  name: 'ABadge',
  props: initDefaultProps(BadgeProps, {
    prefixCls: 'ant-badge',
    scrollNumberPrefixCls: 'ant-scroll-number',
    showZero: false,
    dot: false,
    overflowCount: 99
  }),
  methods: {
    getBadgeClassName: function getBadgeClassName() {
      var _classNames;

      var _$props = this.$props,
          prefixCls = _$props.prefixCls,
          status = _$props.status;

      var children = filterEmpty(this.$slots['default']);
      return classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-status', !!status), _defineProperty(_classNames, prefixCls + '-not-a-wrapper', !children.length), _classNames));
    },
    isZero: function isZero() {
      var numberedDispayCount = this.getNumberedDispayCount();
      return numberedDispayCount === '0' || numberedDispayCount === 0;
    },
    isDot: function isDot() {
      var _$props2 = this.$props,
          dot = _$props2.dot,
          status = _$props2.status;

      var isZero = this.isZero();
      return dot && !isZero || status;
    },
    isHidden: function isHidden() {
      var showZero = this.$props.showZero;

      var displayCount = this.getDispayCount();
      var isZero = this.isZero();
      var isDot = this.isDot();
      var isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
      return (isEmpty || isZero && !showZero) && !isDot;
    },
    getNumberedDispayCount: function getNumberedDispayCount() {
      var overflowCount = this.$props.overflowCount;

      var count = this.badgeCount;
      var displayCount = count > overflowCount ? overflowCount + '+' : count;
      return displayCount;
    },
    getDispayCount: function getDispayCount() {
      var isDot = this.isDot();
      // dot mode don't need count
      if (isDot) {
        return '';
      }
      return this.getNumberedDispayCount();
    },
    getScollNumberTitle: function getScollNumberTitle() {
      var title = this.$props.title;

      var count = this.badgeCount;
      if (title) {
        return title;
      }
      return typeof count === 'string' || typeof count === 'number' ? count : undefined;
    },
    getStyleWithOffset: function getStyleWithOffset() {
      var _$props3 = this.$props,
          offset = _$props3.offset,
          numberStyle = _$props3.numberStyle;

      return offset ? _extends({
        right: -parseInt(offset[0], 10) + 'px',
        marginTop: isNumeric(offset[1]) ? offset[1] + 'px' : offset[1]
      }, numberStyle) : numberStyle;
    },
    renderStatusText: function renderStatusText() {
      var h = this.$createElement;
      var _$props4 = this.$props,
          prefixCls = _$props4.prefixCls,
          text = _$props4.text;

      var hidden = this.isHidden();
      return hidden || !text ? null : h(
        'span',
        { 'class': prefixCls + '-status-text' },
        [text]
      );
    },
    renderDispayComponent: function renderDispayComponent() {
      var count = this.badgeCount;
      var customNode = count;
      if (!customNode || (typeof customNode === 'undefined' ? 'undefined' : _typeof(customNode)) !== 'object') {
        return undefined;
      }
      return cloneElement(customNode, {
        style: this.getStyleWithOffset()
      });
    },
    renderBadgeNumber: function renderBadgeNumber() {
      var _scrollNumberCls;

      var h = this.$createElement;
      var _$props5 = this.$props,
          prefixCls = _$props5.prefixCls,
          scrollNumberPrefixCls = _$props5.scrollNumberPrefixCls,
          status = _$props5.status;

      var count = this.badgeCount;
      var displayCount = this.getDispayCount();
      var isDot = this.isDot();
      var hidden = this.isHidden();

      var scrollNumberCls = (_scrollNumberCls = {}, _defineProperty(_scrollNumberCls, prefixCls + '-dot', isDot), _defineProperty(_scrollNumberCls, prefixCls + '-count', !isDot), _defineProperty(_scrollNumberCls, prefixCls + '-multiple-words', !isDot && count && count.toString && count.toString().length > 1), _defineProperty(_scrollNumberCls, prefixCls + '-status-' + status, !!status), _scrollNumberCls);

      return hidden ? null : h(ScrollNumber, {
        attrs: {
          prefixCls: scrollNumberPrefixCls,
          'data-show': !hidden,

          className: scrollNumberCls,
          count: displayCount,
          displayComponent: this.renderDispayComponent() // <Badge status="success" count={<Icon type="xxx" />}></Badge>
          , title: this.getScollNumberTitle()
        },
        directives: [{
          name: 'show',
          value: !hidden
        }],
        style: this.getStyleWithOffset(),
        key: 'scrollNumber'
      });
    }
  },

  render: function render() {
    var _classNames2;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        status = this.status,
        text = this.text,
        $slots = this.$slots;

    var children = filterEmpty($slots['default']);
    var count = getComponentFromProp(this, 'count');
    if (Array.isArray(count)) {
      count = count[0];
    }
    this.badgeCount = count;
    var scrollNumber = this.renderBadgeNumber();
    var statusText = this.renderStatusText();
    var statusCls = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-status-dot', !!status), _defineProperty(_classNames2, prefixCls + '-status-' + status, !!status), _classNames2));

    // <Badge status="success" />
    if (!children.length && status) {
      return h(
        'span',
        _mergeJSXProps([{ on: this.$listeners }, {
          'class': this.getBadgeClassName(),
          style: this.getStyleWithOffset()
        }]),
        [h('span', { 'class': statusCls }), h(
          'span',
          { 'class': prefixCls + '-status-text' },
          [text]
        )]
      );
    }

    var transitionProps = getTransitionProps(children.length ? prefixCls + '-zoom' : '');

    return h(
      'span',
      _mergeJSXProps([{ on: this.$listeners }, { 'class': this.getBadgeClassName() }]),
      [children, h(
        'transition',
        transitionProps,
        [scrollNumber]
      ), statusText]
    );
  }
};