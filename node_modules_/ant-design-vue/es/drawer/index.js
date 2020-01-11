import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import classnames from 'classnames';
import VcDrawer from '../vc-drawer/src';
import PropTypes from '../_util/vue-types';
import BaseMixin from '../_util/BaseMixin';
import Icon from '../icon';
import { getComponentFromProp, getOptionProps } from '../_util/props-util';

var Drawer = {
  name: 'ADrawer',
  props: {
    closable: PropTypes.bool.def(true),
    destroyOnClose: PropTypes.bool,
    getContainer: PropTypes.any,
    maskClosable: PropTypes.bool.def(true),
    mask: PropTypes.bool.def(true),
    maskStyle: PropTypes.object,
    wrapStyle: PropTypes.object,
    title: PropTypes.any,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).def(256),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).def(256),
    zIndex: PropTypes.number,
    prefixCls: PropTypes.string.def('ant-drawer'),
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).def('right'),
    level: PropTypes.any.def(null),
    wrapClassName: PropTypes.string, // not use class like react, vue will add class to root dom
    handle: PropTypes.any
  },
  mixins: [BaseMixin],
  data: function data() {
    this.destoryClose = false;
    this.preVisible = this.$props.visible;
    return {
      _push: false
    };
  },

  inject: {
    parentDrawer: {
      'default': function _default() {
        return null;
      }
    }
  },
  provide: function provide() {
    return {
      parentDrawer: this
    };
  },
  updated: function updated() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.preVisible !== _this.visible && _this.parentDrawer) {
        if (_this.visible) {
          _this.parentDrawer.push();
        } else {
          _this.parentDrawer.pull();
        }
      }
      _this.preVisible = _this.visible;
    });
  },

  methods: {
    close: function close(e) {
      if (this.visible !== undefined) {
        this.$emit('close', e);
        return;
      }
    },
    onMaskClick: function onMaskClick(e) {
      if (!this.maskClosable) {
        return;
      }
      this.close(e);
    },
    push: function push() {
      this.setState({
        _push: true
      });
    },
    pull: function pull() {
      this.setState({
        _push: false
      });
    },
    onDestoryTransitionEnd: function onDestoryTransitionEnd() {
      var isDestroyOnClose = this.getDestoryOnClose();
      if (!isDestroyOnClose) {
        return;
      }
      if (!this.visible) {
        this.destoryClose = true;
        this.$forceUpdate();
      }
    },
    getDestoryOnClose: function getDestoryOnClose() {
      return this.destroyOnClose && !this.visible;
    },

    // get drawar push width or height
    getPushTransform: function getPushTransform(placement) {
      if (placement === 'left' || placement === 'right') {
        return 'translateX(' + (placement === 'left' ? 180 : -180) + 'px)';
      }
      if (placement === 'top' || placement === 'bottom') {
        return 'translateY(' + (placement === 'top' ? 180 : -180) + 'px)';
      }
    },

    // render drawer body dom
    renderBody: function renderBody() {
      var h = this.$createElement;

      if (this.destoryClose && !this.visible) {
        return null;
      }
      this.destoryClose = false;
      var placement = this.$props.placement;


      var containerStyle = placement === 'left' || placement === 'right' ? {
        overflow: 'auto',
        height: '100%'
      } : {};

      var isDestroyOnClose = this.getDestoryOnClose();
      if (isDestroyOnClose) {
        // Increase the opacity transition, delete children after closing.
        containerStyle.opacity = 0;
        containerStyle.transition = 'opacity .3s';
      }
      var _$props = this.$props,
          prefixCls = _$props.prefixCls,
          closable = _$props.closable;

      var title = getComponentFromProp(this, 'title');
      // is have header dom
      var header = void 0;
      if (title) {
        header = h(
          'div',
          { key: 'header', 'class': prefixCls + '-header' },
          [h(
            'div',
            { 'class': prefixCls + '-title' },
            [title]
          )]
        );
      }
      // is have closer button
      var closer = void 0;
      if (closable) {
        closer = h(
          'button',
          { key: 'closer', on: {
              'click': this.close
            },
            attrs: { 'aria-label': 'Close' },
            'class': prefixCls + '-close' },
          [h(
            'span',
            { 'class': prefixCls + '-close-x' },
            [h(Icon, {
              attrs: { type: 'close' }
            })]
          )]
        );
      }

      return h(
        'div',
        {
          'class': prefixCls + '-wrapper-body',
          style: containerStyle,
          on: {
            'transitionend': this.onDestoryTransitionEnd
          }
        },
        [header, closer, h(
          'div',
          { key: 'body', 'class': prefixCls + '-body' },
          [this.$slots['default']]
        )]
      );
    },
    getRcDrawerStyle: function getRcDrawerStyle() {
      var _$props2 = this.$props,
          zIndex = _$props2.zIndex,
          placement = _$props2.placement,
          maskStyle = _$props2.maskStyle,
          wrapStyle = _$props2.wrapStyle;
      var push = this.$data._push;

      return _extends({}, maskStyle, {
        zIndex: zIndex,
        transform: push ? this.getPushTransform(placement) : undefined
      }, wrapStyle);
    }
  },
  render: function render() {
    var _classnames;

    var h = arguments[0];

    var props = getOptionProps(this);

    var width = props.width,
        height = props.height,
        visible = props.visible,
        placement = props.placement,
        wrapClassName = props.wrapClassName,
        rest = _objectWithoutProperties(props, ['width', 'height', 'visible', 'placement', 'wrapClassName']);

    var haveMask = rest.mask ? '' : 'no-mask';
    var offsetStyle = {};
    if (placement === 'left' || placement === 'right') {
      offsetStyle.width = typeof width === 'number' ? width + 'px' : width;
    } else {
      offsetStyle.height = typeof height === 'number' ? height + 'px' : height;
    }
    var handler = getComponentFromProp(this, 'handle') || false;
    var vcDrawerProps = {
      props: _extends({}, rest, {
        handler: handler
      }, offsetStyle, {
        open: visible,
        showMask: props.mask,
        placement: placement,
        className: classnames((_classnames = {}, _defineProperty(_classnames, wrapClassName, !!wrapClassName), _defineProperty(_classnames, haveMask, !!haveMask), _classnames)),
        wrapStyle: this.getRcDrawerStyle()
      }),
      on: _extends({
        maskClick: this.onMaskClick
      }, this.$listeners)
    };
    return h(
      VcDrawer,
      vcDrawerProps,
      [this.renderBody()]
    );
  }
};

/* istanbul ignore next */
Drawer.install = function (Vue) {
  Vue.component(Drawer.name, Drawer);
};

export default Drawer;