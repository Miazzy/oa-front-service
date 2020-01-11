import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import omit from 'omit.js';
import Tabs from '../tabs';
import Row from '../row';
import Col from '../col';
import PropTypes from '../_util/vue-types';
import addEventListener from '../_util/Dom/addEventListener';
import { getComponentFromProp, getSlotOptions, filterEmpty } from '../_util/props-util';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import BaseMixin from '../_util/BaseMixin';

var TabPane = Tabs.TabPane;

export default {
  name: 'ACard',
  mixins: [BaseMixin],
  props: {
    prefixCls: PropTypes.string.def('ant-card'),
    title: PropTypes.any,
    extra: PropTypes.any,
    bordered: PropTypes.bool.def(true),
    bodyStyle: PropTypes.object,
    headStyle: PropTypes.object,
    loading: PropTypes.bool.def(false),
    hoverable: PropTypes.bool.def(false),
    type: PropTypes.string,
    actions: PropTypes.any,
    tabList: PropTypes.array,
    activeTabKey: PropTypes.string,
    defaultActiveTabKey: PropTypes.string
  },
  data: function data() {
    this.updateWiderPaddingCalled = false;
    return {
      widerPadding: false
    };
  },
  beforeMount: function beforeMount() {
    this.updateWiderPadding = throttleByAnimationFrame(this.updateWiderPadding);
  },
  mounted: function mounted() {
    this.updateWiderPadding();
    this.resizeEvent = addEventListener(window, 'resize', this.updateWiderPadding);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }
    this.updateWiderPadding.cancel && this.updateWiderPadding.cancel();
  },

  methods: {
    updateWiderPadding: function updateWiderPadding() {
      var _this = this;

      var cardContainerRef = this.$refs.cardContainerRef;
      if (!cardContainerRef) {
        return;
      }
      // 936 is a magic card width pixel number indicated by designer
      var WIDTH_BOUNDARY_PX = 936;
      if (cardContainerRef.offsetWidth >= WIDTH_BOUNDARY_PX && !this.widerPadding) {
        this.setState({ widerPadding: true }, function () {
          _this.updateWiderPaddingCalled = true; // first render without css transition
        });
      }
      if (cardContainerRef.offsetWidth < WIDTH_BOUNDARY_PX && this.widerPadding) {
        this.setState({ widerPadding: false }, function () {
          _this.updateWiderPaddingCalled = true; // first render without css transition
        });
      }
    },
    onHandleTabChange: function onHandleTabChange(key) {
      this.$emit('tabChange', key);
    },
    isContainGrid: function isContainGrid() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var containGrid = void 0;
      obj.forEach(function (element) {
        if (element && getSlotOptions(element).__ANT_CARD_GRID) {
          containGrid = true;
        }
      });
      return containGrid;
    },
    getAction: function getAction(actions) {
      var h = this.$createElement;

      if (!actions || !actions.length) {
        return null;
      }
      var actionList = actions.map(function (action, index) {
        return h(
          'li',
          { style: { width: 100 / actions.length + '%' }, key: 'action-' + index },
          [h('span', [action])]
        );
      });
      return actionList;
    }
  },
  render: function render() {
    var _classString;

    var h = arguments[0];
    var _$props = this.$props,
        _$props$prefixCls = _$props.prefixCls,
        prefixCls = _$props$prefixCls === undefined ? 'ant-card' : _$props$prefixCls,
        _$props$headStyle = _$props.headStyle,
        headStyle = _$props$headStyle === undefined ? {} : _$props$headStyle,
        _$props$bodyStyle = _$props.bodyStyle,
        bodyStyle = _$props$bodyStyle === undefined ? {} : _$props$bodyStyle,
        loading = _$props.loading,
        _$props$bordered = _$props.bordered,
        bordered = _$props$bordered === undefined ? true : _$props$bordered,
        type = _$props.type,
        tabList = _$props.tabList,
        hoverable = _$props.hoverable,
        activeTabKey = _$props.activeTabKey,
        defaultActiveTabKey = _$props.defaultActiveTabKey;
    var $slots = this.$slots,
        $scopedSlots = this.$scopedSlots,
        $listeners = this.$listeners;


    var classString = (_classString = {}, _defineProperty(_classString, '' + prefixCls, true), _defineProperty(_classString, prefixCls + '-loading', loading), _defineProperty(_classString, prefixCls + '-bordered', bordered), _defineProperty(_classString, prefixCls + '-hoverable', !!hoverable), _defineProperty(_classString, prefixCls + '-wider-padding', this.widerPadding), _defineProperty(_classString, prefixCls + '-padding-transition', this.updateWiderPaddingCalled), _defineProperty(_classString, prefixCls + '-contain-grid', this.isContainGrid($slots['default'])), _defineProperty(_classString, prefixCls + '-contain-tabs', tabList && tabList.length), _defineProperty(_classString, prefixCls + '-type-' + type, !!type), _classString);

    var loadingBlockStyle = bodyStyle.padding === 0 || bodyStyle.padding === '0px' ? { padding: 24 } : undefined;

    var loadingBlock = h(
      'div',
      { 'class': prefixCls + '-loading-content', style: loadingBlockStyle },
      [h(
        Row,
        {
          attrs: { gutter: 8 }
        },
        [h(
          Col,
          {
            attrs: { span: 22 }
          },
          [h('div', { 'class': prefixCls + '-loading-block' })]
        )]
      ), h(
        Row,
        {
          attrs: { gutter: 8 }
        },
        [h(
          Col,
          {
            attrs: { span: 8 }
          },
          [h('div', { 'class': prefixCls + '-loading-block' })]
        ), h(
          Col,
          {
            attrs: { span: 15 }
          },
          [h('div', { 'class': prefixCls + '-loading-block' })]
        )]
      ), h(
        Row,
        {
          attrs: { gutter: 8 }
        },
        [h(
          Col,
          {
            attrs: { span: 6 }
          },
          [h('div', { 'class': prefixCls + '-loading-block' })]
        ), h(
          Col,
          {
            attrs: { span: 18 }
          },
          [h('div', { 'class': prefixCls + '-loading-block' })]
        )]
      ), h(
        Row,
        {
          attrs: { gutter: 8 }
        },
        [h(
          Col,
          {
            attrs: { span: 13 }
          },
          [h('div', { 'class': prefixCls + '-loading-block' })]
        ), h(
          Col,
          {
            attrs: { span: 9 }
          },
          [h('div', { 'class': prefixCls + '-loading-block' })]
        )]
      ), h(
        Row,
        {
          attrs: { gutter: 8 }
        },
        [h(
          Col,
          {
            attrs: { span: 4 }
          },
          [h('div', { 'class': prefixCls + '-loading-block' })]
        ), h(
          Col,
          {
            attrs: { span: 3 }
          },
          [h('div', { 'class': prefixCls + '-loading-block' })]
        ), h(
          Col,
          {
            attrs: { span: 16 }
          },
          [h('div', { 'class': prefixCls + '-loading-block' })]
        )]
      ), h(
        Row,
        {
          attrs: { gutter: 8 }
        },
        [h(
          Col,
          {
            attrs: { span: 8 }
          },
          [h('div', { 'class': prefixCls + '-loading-block' })]
        ), h(
          Col,
          {
            attrs: { span: 6 }
          },
          [h('div', { 'class': prefixCls + '-loading-block' })]
        ), h(
          Col,
          {
            attrs: { span: 8 }
          },
          [h('div', { 'class': prefixCls + '-loading-block' })]
        )]
      )]
    );

    var hasActiveTabKey = activeTabKey !== undefined;
    var tabsProps = {
      props: _defineProperty({
        size: 'large'
      }, hasActiveTabKey ? 'activeKey' : 'defaultActiveKey', hasActiveTabKey ? activeTabKey : defaultActiveTabKey),
      on: {
        change: this.onHandleTabChange
      },
      'class': prefixCls + '-head-tabs'
    };

    var head = void 0;
    var tabs = tabList && tabList.length ? h(
      Tabs,
      tabsProps,
      [tabList.map(function (item) {
        var temp = item.tab,
            _item$scopedSlots = item.scopedSlots,
            scopedSlots = _item$scopedSlots === undefined ? {} : _item$scopedSlots;

        var name = scopedSlots.tab;
        var tab = temp !== undefined ? temp : $scopedSlots[name] ? $scopedSlots[name](item) : null;
        return h(TabPane, {
          attrs: { tab: tab, disabled: item.disabled },
          key: item.key });
      })]
    ) : null;
    var titleDom = getComponentFromProp(this, 'title');
    var extraDom = getComponentFromProp(this, 'extra');
    if (titleDom || extraDom || tabs) {
      head = h(
        'div',
        { 'class': prefixCls + '-head', style: headStyle },
        [h(
          'div',
          { 'class': prefixCls + '-head-wrapper' },
          [titleDom && h(
            'div',
            { 'class': prefixCls + '-head-title' },
            [titleDom]
          ), extraDom && h(
            'div',
            { 'class': prefixCls + '-extra' },
            [extraDom]
          )]
        ), tabs]
      );
    }

    var children = $slots['default'];
    var cover = getComponentFromProp(this, 'cover');
    var coverDom = cover ? h(
      'div',
      { 'class': prefixCls + '-cover' },
      [cover]
    ) : null;
    var body = h(
      'div',
      { 'class': prefixCls + '-body', style: bodyStyle },
      [loading ? loadingBlock : children]
    );
    var actions = filterEmpty(this.$slots.actions);
    var actionDom = actions && actions.length ? h(
      'ul',
      { 'class': prefixCls + '-actions' },
      [this.getAction(actions)]
    ) : null;

    return h(
      'div',
      _mergeJSXProps([{
        'class': classString,
        ref: 'cardContainerRef'
      }, { on: omit($listeners, ['tabChange', 'tab-change']) }]),
      [head, coverDom, children ? body : null, actionDom]
    );
  }
};