'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuProps = exports.MenuMode = undefined;

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props');

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

var _vcMenu = require('../vc-menu');

var _vcMenu2 = _interopRequireDefault(_vcMenu);

var _vueTypes = require('../_util/vue-types');

var _vueTypes2 = _interopRequireDefault(_vueTypes);

var _openAnimation = require('../_util/openAnimation');

var _openAnimation2 = _interopRequireDefault(_openAnimation);

var _warning = require('../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _propsUtil = require('../_util/props-util');

var _BaseMixin = require('../_util/BaseMixin');

var _BaseMixin2 = _interopRequireDefault(_BaseMixin);

var _commonPropsType = require('../vc-menu/commonPropsType');

var _commonPropsType2 = _interopRequireDefault(_commonPropsType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var MenuMode = exports.MenuMode = _vueTypes2['default'].oneOf(['vertical', 'vertical-left', 'vertical-right', 'horizontal', 'inline']);

var menuProps = exports.menuProps = (0, _extends3['default'])({}, _commonPropsType2['default'], {
  theme: _vueTypes2['default'].oneOf(['light', 'dark']).def('light'),
  mode: MenuMode.def('vertical'),
  selectable: _vueTypes2['default'].bool,
  selectedKeys: _vueTypes2['default'].arrayOf(_vueTypes2['default'].oneOfType([_vueTypes2['default'].string, _vueTypes2['default'].number])),
  defaultSelectedKeys: _vueTypes2['default'].array,
  openKeys: _vueTypes2['default'].array,
  defaultOpenKeys: _vueTypes2['default'].array,
  openAnimation: _vueTypes2['default'].oneOfType([_vueTypes2['default'].string, _vueTypes2['default'].object]),
  openTransitionName: _vueTypes2['default'].string,
  prefixCls: _vueTypes2['default'].string.def('ant-menu'),
  multiple: _vueTypes2['default'].bool,
  inlineIndent: _vueTypes2['default'].number.def(24),
  inlineCollapsed: _vueTypes2['default'].bool,
  isRootMenu: _vueTypes2['default'].bool.def(true),
  focusable: _vueTypes2['default'].bool.def(false)
});

var Menu = {
  name: 'AMenu',
  props: menuProps,
  Divider: (0, _extends3['default'])({}, _vcMenu.Divider, { name: 'AMenuDivider' }),
  Item: (0, _extends3['default'])({}, _MenuItem2['default'], { name: 'AMenuItem' }),
  SubMenu: (0, _extends3['default'])({}, _vcMenu.SubMenu, { name: 'ASubMenu' }),
  ItemGroup: (0, _extends3['default'])({}, _vcMenu.ItemGroup, { name: 'AMenuItemGroup' }),
  provide: function provide() {
    return {
      getInlineCollapsed: this.getInlineCollapsed
    };
  },

  mixins: [_BaseMixin2['default']],
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
    this.preProps = (0, _extends3['default'])({}, this.$props);
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
    (0, _warning2['default'])(!((0, _propsUtil.hasProp)(this, 'inlineCollapsed') && props.mode !== 'inline'), "`inlineCollapsed` should only be used when Menu's `mode` is inline.");
    this.switchingModeFromInline = false;
    this.leaveAnimationExecutedWhenInlineCollapsed = false;
    this.inlineOpenKeys = [];
    var sOpenKeys = void 0;

    if ((0, _propsUtil.hasProp)(this, 'openKeys')) {
      sOpenKeys = props.openKeys;
    } else if ((0, _propsUtil.hasProp)(this, 'defaultOpenKeys')) {
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
      if (!(0, _propsUtil.hasProp)(this, 'openKeys')) {
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
      if (!(0, _propsUtil.hasProp)(this, 'openKeys')) {
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
          menuOpenAnimation = { on: _openAnimation2['default'] };
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

    var menuClassName = (_menuClassName = {}, (0, _defineProperty3['default'])(_menuClassName, prefixCls + '-' + theme, true), (0, _defineProperty3['default'])(_menuClassName, prefixCls + '-inline-collapsed', this.getInlineCollapsed()), _menuClassName);

    var menuProps = {
      props: (0, _extends3['default'])({}, (0, _omit2['default'])(this.$props, ['inlineCollapsed']), {
        getPopupContainer: getPopupContainer || getContextPopupContainer,
        openKeys: this.sOpenKeys,
        mode: menuMode
      }),
      on: (0, _extends3['default'])({}, $listeners, {
        select: this.handleSelect,
        deselect: this.handleDeselect,
        openChange: this.handleOpenChange,
        onMouseenter: this.handleMouseEnter
      }),
      nativeOn: {
        transitionend: this.handleTransitionEnd
      }
    };
    if (!(0, _propsUtil.hasProp)(this, 'selectedKeys')) {
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
      _vcMenu2['default'],
      (0, _babelHelperVueJsxMergeProps2['default'])([menuProps, { 'class': menuClassName }]),
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
exports['default'] = Menu;