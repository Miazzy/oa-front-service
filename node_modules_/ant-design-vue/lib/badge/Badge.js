'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BadgeProps = undefined;

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _vueTypes = require('../_util/vue-types');

var _vueTypes2 = _interopRequireDefault(_vueTypes);

var _ScrollNumber = require('./ScrollNumber');

var _ScrollNumber2 = _interopRequireDefault(_ScrollNumber);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propsUtil = require('../_util/props-util');

var _vnode = require('../_util/vnode');

var _getTransitionProps = require('../_util/getTransitionProps');

var _getTransitionProps2 = _interopRequireDefault(_getTransitionProps);

var _isNumeric = require('../_util/isNumeric');

var _isNumeric2 = _interopRequireDefault(_isNumeric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var BadgeProps = exports.BadgeProps = {
  /** Number to show in badge */
  count: _vueTypes2['default'].any,
  showZero: _vueTypes2['default'].bool,
  /** Max count to show */
  overflowCount: _vueTypes2['default'].number,
  /** whether to show red dot without number */
  dot: _vueTypes2['default'].bool,
  prefixCls: _vueTypes2['default'].string,
  scrollNumberPrefixCls: _vueTypes2['default'].string,
  status: _vueTypes2['default'].oneOf(['success', 'processing', 'default', 'error', 'warning']),
  text: _vueTypes2['default'].string,
  offset: _vueTypes2['default'].array,
  numberStyle: _vueTypes2['default'].object.def({}),
  title: _vueTypes2['default'].string
};

exports['default'] = {
  name: 'ABadge',
  props: (0, _propsUtil.initDefaultProps)(BadgeProps, {
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

      var children = (0, _propsUtil.filterEmpty)(this.$slots['default']);
      return (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-status', !!status), (0, _defineProperty3['default'])(_classNames, prefixCls + '-not-a-wrapper', !children.length), _classNames));
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

      return offset ? (0, _extends3['default'])({
        right: -parseInt(offset[0], 10) + 'px',
        marginTop: (0, _isNumeric2['default'])(offset[1]) ? offset[1] + 'px' : offset[1]
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
      if (!customNode || (typeof customNode === 'undefined' ? 'undefined' : (0, _typeof3['default'])(customNode)) !== 'object') {
        return undefined;
      }
      return (0, _vnode.cloneElement)(customNode, {
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

      var scrollNumberCls = (_scrollNumberCls = {}, (0, _defineProperty3['default'])(_scrollNumberCls, prefixCls + '-dot', isDot), (0, _defineProperty3['default'])(_scrollNumberCls, prefixCls + '-count', !isDot), (0, _defineProperty3['default'])(_scrollNumberCls, prefixCls + '-multiple-words', !isDot && count && count.toString && count.toString().length > 1), (0, _defineProperty3['default'])(_scrollNumberCls, prefixCls + '-status-' + status, !!status), _scrollNumberCls);

      return hidden ? null : h(_ScrollNumber2['default'], {
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

    var children = (0, _propsUtil.filterEmpty)($slots['default']);
    var count = (0, _propsUtil.getComponentFromProp)(this, 'count');
    if (Array.isArray(count)) {
      count = count[0];
    }
    this.badgeCount = count;
    var scrollNumber = this.renderBadgeNumber();
    var statusText = this.renderStatusText();
    var statusCls = (0, _classnames2['default'])((_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, prefixCls + '-status-dot', !!status), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-status-' + status, !!status), _classNames2));

    // <Badge status="success" />
    if (!children.length && status) {
      return h(
        'span',
        (0, _babelHelperVueJsxMergeProps2['default'])([{ on: this.$listeners }, {
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

    var transitionProps = (0, _getTransitionProps2['default'])(children.length ? prefixCls + '-zoom' : '');

    return h(
      'span',
      (0, _babelHelperVueJsxMergeProps2['default'])([{ on: this.$listeners }, { 'class': this.getBadgeClassName() }]),
      [children, h(
        'transition',
        transitionProps,
        [scrollNumber]
      ), statusText]
    );
  }
};