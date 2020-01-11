import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import omit from 'omit.js';
import VcMenu, { Divider, ItemGroup, SubMenu } from '../vc-menu';
import PropTypes from '../_util/vue-types';
import animation from '../_util/openAnimation';
import warning from '../_util/warning';
import Item from './MenuItem';
import { hasProp } from '../_util/props-util';
import BaseMixin from '../_util/BaseMixin';
import commonPropsType from '../vc-menu/commonPropsType';

export var MenuMode = PropTypes.oneOf(['vertical', 'vertical-left', 'vertical-right', 'horizontal', 'inline']);

export var menuProps = _extends({}, commonPropsType, {
  theme: PropTypes.oneOf(['light', 'dark']).def('light'),
  mode: MenuMode.def('vertical'),
  selectable: PropTypes.bool,
  selectedKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  defaultSelectedKeys: PropTypes.array,
  openKeys: PropTypes.array,
  defaultOpenKeys: PropTypes.array,
  openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  openTransitionName: PropTypes.string,
  prefixCls: PropTypes.string.def('ant-menu'),
  multiple: PropTypes.bool,
  inlineIndent: PropTypes.number.def(24),
  inlineCollapsed: PropTypes.bool,
  isRootMenu: PropTypes.bool.def(true),
  focusable: PropTypes.bool.def(false)
});

var Menu = {
  name: 'AMenu',
  props: menuProps,
  Divider: _extends({}, Divider, { name: 'AMenuDivider' }),
  Item: _extends({}, Item, { name: 'AMenuItem' }),
  SubMenu: _extends({}, SubMenu, { name: 'ASubMenu' }),
  ItemGroup: _extends({}, ItemGroup, { name: 'AMenuItemGroup' }),
  provide: function provide() {
    return {
      getInlineCollapsed: this.getInlineCollapsed
    };
  },

  mixins: [BaseMixin],
  inject: {
    layoutSiderContext: { 'default': function _default() {
        return {};
      } },
    configProvider: { 'default': function _default() {
        return {};
      } }
  },
  model: {
    prop: 'selectedKeys',
    event: 'selectChange'
  },
  created: function created() {
    this.preProps = _extends({}, this.$props);
  },
  updated: function updated() {
    this.propsUpdating = false;
  },

  watch: {
    mode: function mode(val, oldVal) {
      if (oldVal === 'inline' && val !== 'inline') {
        this.switchingModeFromInline = true;
      }
    },
    openKeys: function openKeys(val) {
      this.setState({ sOpenKeys: val });
    },
    inlineCollapsed: function inlineCollapsed(val) {
      this.collapsedChange(val);
    },

    'layoutSiderContext.sCollapsed': function layoutSiderContextSCollapsed(val) {
      this.collapsedChange(val);
    }
  },
  data: function data() {
    var props = this.$props;
    warning(!(hasProp(this, 'inlineCollapsed') && props.mode !== 'inline'), "`inlineCollapsed` should only be used when Menu's `mode` is inline.");
    this.switchingModeFromInline = false;
    this.leaveAnimationExecutedWhenInlineCollapsed = false;
    this.inlineOpenKeys = [];
    var sOpenKeys = void 0;

    if (hasProp(this, 'openKeys')) {
      sOpenKeys = props.openKeys;
    } else if (hasProp(this, 'defaultOpenKeys')) {
      sOpenKeys = props.defaultOpenKeys;
    }
    return {
      sOpenKeys: sOpenKeys
    };
  },

  methods: {
    collapsedChange: function collapsedChange(val) {
      if (this.propsUpdating) {
        return;
      }
      this.propsUpdating = true;
      if (!hasProp(this, 'openKeys')) {
        if (val) {
          this.switchingModeFromInline = true;
          this.inlineOpenKeys = this.sOpenKeys;
          this.setState({ sOpenKeys: [] });
        } else {
          this.setState({ sOpenKeys: this.inlineOpenKeys });
          this.inlineOpenKeys = [];
        }
      } else if (val) {
        // 缩起时，openKeys置为空的动画会闪动，react可以通过是否传递openKeys避免闪动，vue不是很方便动态传递openKeys
        this.switchingModeFromInline = true;
      }
    },
    restoreModeVerticalFromInline: function restoreModeVerticalFromInline() {
      if (this.switchingModeFromInline) {
        this.switchingModeFromInline = false;
        this.$forceUpdate();
      }
    },

    // Restore vertical mode when menu is collapsed responsively when mounted
    // https://github.com/ant-design/ant-design/issues/13104
    // TODO: not a perfect solution, looking a new way to avoid setting switchingModeFromInline in this situation
    handleMouseEnter: function handleMouseEnter(e) {
      this.restoreModeVerticalFromInline();
      this.$emit('mouseenter', e);
    },
    handleTransitionEnd: function handleTransitionEnd(e) {
      // when inlineCollapsed menu width animation finished
      // https://github.com/ant-design/ant-design/issues/12864
      var widthCollapsed = e.propertyName === 'width' && e.target === e.currentTarget;
      // Fix for <Menu style={{ width: '100%' }} />, the width transition won't trigger when menu is collapsed
      // https://github.com/ant-design/ant-design-pro/issues/2783
      var iconScaled = e.propertyName === 'font-size' && e.target.className.indexOf('anticon') >= 0;
      if (widthCollapsed || iconScaled) {
        this.restoreModeVerticalFromInline();
      }
    },
    handleClick: function handleClick(e) {
      this.handleOpenChange([]);
      this.$emit('click', e);
    },
    handleSelect: function handleSelect(info) {
      this.$emit('select', info);
      this.$emit('selectChange', info.selectedKeys);
    },
    handleDeselect: function handleDeselect(info) {
      this.$emit('deselect', info);
      this.$emit('selectChange', info.selectedKeys);
    },
    handleOpenChange: function handleOpenChange(openKeys) {
      this.setOpenKeys(openKeys);
      this.$emit('openChange', openKeys);
      this.$emit('update:openKeys', openKeys);
    },
    setOpenKeys: function setOpenKeys(openKeys) {
      if (!hasProp(this, 'openKeys')) {
        this.setState({ sOpenKeys: openKeys });
      }
    },
    getRealMenuMode: function getRealMenuMode() {
      var inlineCollapsed = this.getInlineCollapsed();
      if (this.switchingModeFromInline && inlineCollapsed) {
        return 'inline';
      }
      var mode = this.$props.mode;

      return inlineCollapsed ? 'vertical' : mode;
    },
    getInlineCollapsed: function getInlineCollapsed() {
      var inlineCollapsed = this.$props.inlineCollapsed;

      if (this.layoutSiderContext.sCollapsed !== undefined) {
        return this.layoutSiderContext.sCollapsed;
      }
      return inlineCollapsed;
    },
    getMenuOpenAnimation: function getMenuOpenAnimation(menuMode) {
      var _$props = this.$props,
          openAnimation = _$props.openAnimation,
          openTransitionName = _$props.openTransitionName;

      var menuOpenAnimation = openAnimation || openTransitionName;
      if (openAnimation === undefined && openTransitionName === undefined) {
        if (menuMode === 'horizontal') {
          menuOpenAnimation = 'slide-up';
        } else if (menuMode === 'inline') {
          menuOpenAnimation = { on: animation };
        } else {
          // When mode switch from inline
          // submenu should hide without animation
          if (this.switchingModeFromInline) {
            menuOpenAnimation = '';
            this.switchingModeFromInline = false;
          } else {
            menuOpenAnimation = 'zoom-big';
          }
        }
      }
      return menuOpenAnimation;
    }
  },
  render: function render() {
    var _menuClassName,
        _this = this;

    var h = arguments[0];
    var layoutSiderContext = this.layoutSiderContext,
        $slots = this.$slots,
        $listeners = this.$listeners;
    var collapsedWidth = layoutSiderContext.collapsedWidth;
    var getContextPopupContainer = this.configProvider.getPopupContainer;
    var _$props2 = this.$props,
        prefixCls = _$props2.prefixCls,
        theme = _$props2.theme,
        getPopupContainer = _$props2.getPopupContainer;

    var menuMode = this.getRealMenuMode();
    var menuOpenAnimation = this.getMenuOpenAnimation(menuMode);

    var menuClassName = (_menuClassName = {}, _defineProperty(_menuClassName, prefixCls + '-' + theme, true), _defineProperty(_menuClassName, prefixCls + '-inline-collapsed', this.getInlineCollapsed()), _menuClassName);

    var menuProps = {
      props: _extends({}, omit(this.$props, ['inlineCollapsed']), {
        getPopupContainer: getPopupContainer || getContextPopupContainer,
        openKeys: this.sOpenKeys,
        mode: menuMode
      }),
      on: _extends({}, $listeners, {
        select: this.handleSelect,
        deselect: this.handleDeselect,
        openChange: this.handleOpenChange,
        onMouseenter: this.handleMouseEnter
      }),
      nativeOn: {
        transitionend: this.handleTransitionEnd
      }
    };
    if (!hasProp(this, 'selectedKeys')) {
      delete menuProps.props.selectedKeys;
    }

    if (menuMode !== 'inline') {
      // closing vertical popup submenu after click it
      menuProps.on.click = this.handleClick;
      menuProps.props.openTransitionName = menuOpenAnimation;
    } else {
      menuProps.on.click = function (e) {
        _this.$emit('click', e);
      };
      menuProps.props.openAnimation = menuOpenAnimation;
    }

    // https://github.com/ant-design/ant-design/issues/8587
    if (this.getInlineCollapsed() && (collapsedWidth === 0 || collapsedWidth === '0' || collapsedWidth === '0px')) {
      return null;
    }

    return h(
      VcMenu,
      _mergeJSXProps([menuProps, { 'class': menuClassName }]),
      [$slots['default']]
    );
  }
};

/* istanbul ignore next */
Menu.install = function (Vue) {
  Vue.component(Menu.name, Menu);
  Vue.component(Menu.Item.name, Menu.Item);
  Vue.component(Menu.SubMenu.name, Menu.SubMenu);
  Vue.component(Menu.Divider.name, Menu.Divider);
  Vue.component(Menu.ItemGroup.name, Menu.ItemGroup);
};
export default Menu;