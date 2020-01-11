import _extends from 'babel-runtime/helpers/extends';
import raf from 'raf';
import PropTypes from '../_util/vue-types';
import addEventListener from '../_util/Dom/addEventListener';
import getScroll from '../_util/getScroll';
import BaseMixin from '../_util/BaseMixin';
import getTransitionProps from '../_util/getTransitionProps';

var easeInOutCubic = function easeInOutCubic(t, b, c, d) {
  var cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  } else {
    return cc / 2 * ((t -= 2) * t * t + 2) + b;
  }
};

function getDefaultTarget() {
  return window;
}

var BackTopProps = {
  visibilityHeight: PropTypes.number,
  // onClick?: React.MouseEventHandler<any>;
  target: PropTypes.func,
  prefixCls: PropTypes.string
};

var BackTop = {
  name: 'ABackTop',
  mixins: [BaseMixin],
  props: _extends({}, BackTopProps, {
    visibilityHeight: PropTypes.number.def(400)
  }),
  data: function data() {
    this.scrollEvent = null;
    return {
      visible: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      var getTarget = _this.target || getDefaultTarget;
      _this.scrollEvent = addEventListener(getTarget(), 'scroll', _this.handleScroll);
      _this.handleScroll();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  },

  methods: {
    getCurrentScrollTop: function getCurrentScrollTop() {
      var getTarget = this.target || getDefaultTarget;
      var targetNode = getTarget();
      if (targetNode === window) {
        return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
      }
      return targetNode.scrollTop;
    },
    scrollToTop: function scrollToTop(e) {
      var _this2 = this;

      var scrollTop = this.getCurrentScrollTop();
      var startTime = Date.now();
      var frameFunc = function frameFunc() {
        var timestamp = Date.now();
        var time = timestamp - startTime;
        _this2.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
        if (time < 450) {
          raf(frameFunc);
        } else {
          _this2.setScrollTop(0);
        }
      };
      raf(frameFunc);
      this.$emit('click', e);
    },
    setScrollTop: function setScrollTop(value) {
      var getTarget = this.target || getDefaultTarget;
      var targetNode = getTarget();
      if (targetNode === window) {
        document.body.scrollTop = value;
        document.documentElement.scrollTop = value;
      } else {
        targetNode.scrollTop = value;
      }
    },
    handleScroll: function handleScroll() {
      var visibilityHeight = this.visibilityHeight,
          _target = this.target,
          target = _target === undefined ? getDefaultTarget : _target;

      var scrollTop = getScroll(target(), true);
      this.setState({
        visible: scrollTop > visibilityHeight
      });
    }
  },

  render: function render() {
    var h = arguments[0];
    var _prefixCls = this.prefixCls,
        prefixCls = _prefixCls === undefined ? 'ant-back-top' : _prefixCls,
        $slots = this.$slots,
        $listeners = this.$listeners;


    var defaultElement = h(
      'div',
      { 'class': prefixCls + '-content' },
      [h('div', { 'class': prefixCls + '-icon' })]
    );
    var divProps = {
      on: _extends({}, $listeners, {
        click: this.scrollToTop
      }),
      'class': prefixCls
    };

    var backTopBtn = this.visible ? h(
      'div',
      divProps,
      [$slots['default'] || defaultElement]
    ) : null;
    var transitionProps = getTransitionProps('fade');
    return h(
      'transition',
      transitionProps,
      [backTopBtn]
    );
  }
};

/* istanbul ignore next */
BackTop.install = function (Vue) {
  Vue.component(BackTop.name, BackTop);
};

export default BackTop;