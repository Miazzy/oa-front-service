import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import classNames from 'classnames';
import Input from './Input';
import Icon from '../icon';
import inputProps from './inputProps';
import Button from '../button';
import { cloneElement } from '../_util/vnode';
import { getOptionProps, getComponentFromProp, isValidElement } from '../_util/props-util';
import PropTypes from '../_util/vue-types';

export default {
  name: 'AInputSearch',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change.value'
  },
  props: _extends({}, inputProps, {
    prefixCls: {
      'default': 'ant-input-search',
      type: String
    },
    inputPrefixCls: {
      'default': 'ant-input',
      type: String
    },
    enterButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object])
  }),
  methods: {
    onSearch: function onSearch(e) {
      this.$emit('search', this.$refs.input.stateValue, e);
      this.$refs.input.focus();
    },
    focus: function focus() {
      this.$refs.input.focus();
    },
    blur: function blur() {
      this.$refs.input.blur();
    },
    getButtonOrIcon: function getButtonOrIcon() {
      var h = this.$createElement;
      var prefixCls = this.prefixCls,
          size = this.size,
          disabled = this.disabled;

      var enterButton = getComponentFromProp(this, 'enterButton');
      var enterButtonAsElement = Array.isArray(enterButton) ? enterButton[0] : enterButton;
      var node = void 0;
      if (!enterButton) {
        node = h(Icon, { 'class': prefixCls + '-icon', attrs: { type: 'search' },
          key: 'searchIcon' });
      } else if (enterButtonAsElement.tag === 'button' || enterButtonAsElement.componentOptions && enterButtonAsElement.componentOptions.Ctor.extendOptions.__ANT_BUTTON) {
        node = cloneElement(enterButtonAsElement, {
          'class': prefixCls + '-button',
          props: { size: size }
        });
      } else {
        node = h(
          Button,
          {
            'class': prefixCls + '-button',
            attrs: { type: 'primary',
              size: size,
              disabled: disabled
            },
            key: 'enterButton'
          },
          [enterButton === true ? h(Icon, {
            attrs: { type: 'search' }
          }) : enterButton]
        );
      }
      return cloneElement(node, {
        on: {
          click: this.onSearch
        }
      });
    }
  },
  render: function render() {
    var _classNames;

    var h = arguments[0];

    var _getOptionProps = getOptionProps(this),
        prefixCls = _getOptionProps.prefixCls,
        inputPrefixCls = _getOptionProps.inputPrefixCls,
        size = _getOptionProps.size,
        others = _objectWithoutProperties(_getOptionProps, ['prefixCls', 'inputPrefixCls', 'size']);

    var suffix = getComponentFromProp(this, 'suffix');
    var enterButton = getComponentFromProp(this, 'enterButton');
    var addonAfter = getComponentFromProp(this, 'addonAfter');
    var addonBefore = getComponentFromProp(this, 'addonBefore');
    var buttonOrIcon = this.getButtonOrIcon();
    var searchSuffix = suffix ? [suffix, buttonOrIcon] : buttonOrIcon;
    if (Array.isArray(searchSuffix)) {
      searchSuffix = searchSuffix.map(function (item, index) {
        if (!isValidElement(item) || item.key) {
          return item;
        }
        return cloneElement(item, { key: index });
      });
    }
    var inputClassName = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-enter-button', !!enterButton), _defineProperty(_classNames, prefixCls + '-' + size, !!size), _classNames));
    var on = _extends({}, this.$listeners);
    delete on.search;
    var inputProps = {
      props: _extends({}, others, {
        prefixCls: inputPrefixCls,
        size: size,
        suffix: searchSuffix,
        addonAfter: addonAfter,
        addonBefore: addonBefore
      }),
      attrs: this.$attrs,
      on: _extends({
        pressEnter: this.onSearch
      }, on)
    };
    return h(Input, _mergeJSXProps([inputProps, { 'class': inputClassName, ref: 'input' }]));
  }
};