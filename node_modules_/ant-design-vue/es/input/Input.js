import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import classNames from 'classnames';
import TextArea from './TextArea';
import omit from 'omit.js';
import inputProps from './inputProps';
import { hasProp, getComponentFromProp } from '../_util/props-util';
import { isIE, isIE9 } from '../_util/env';

function noop() {}

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

export default {
  name: 'AInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change.value'
  },
  props: _extends({}, inputProps),
  data: function data() {
    var _$props = this.$props,
        value = _$props.value,
        defaultValue = _$props.defaultValue;

    return {
      stateValue: fixControlledValue(!hasProp(this, 'value') ? defaultValue : value)
    };
  },

  watch: {
    value: function value(val) {
      this.stateValue = fixControlledValue(val);
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.autoFocus) {
        _this.focus();
      }
    });
  },

  methods: {
    handleKeyDown: function handleKeyDown(e) {
      if (e.keyCode === 13) {
        this.$emit('pressEnter', e);
      }
      this.$emit('keydown', e);
    },
    handleChange: function handleChange(e) {
      // https://github.com/vueComponent/ant-design-vue/issues/92
      if (isIE && !isIE9 && this.stateValue === e.target.value) {
        return;
      }
      if (!hasProp(this, 'value')) {
        this.stateValue = e.target.value;
      } else {
        this.$forceUpdate();
      }
      if (!e.target.composing) {
        this.$emit('change.value', e.target.value);
      }
      this.$emit('change', e);
      this.$emit('input', e);
    },
    focus: function focus() {
      this.$refs.input.focus();
    },
    blur: function blur() {
      this.$refs.input.blur();
    },
    select: function select() {
      this.$refs.input.select();
    },
    getInputClassName: function getInputClassName() {
      var _ref;

      var _$props2 = this.$props,
          prefixCls = _$props2.prefixCls,
          size = _$props2.size,
          disabled = _$props2.disabled;

      return _ref = {}, _defineProperty(_ref, '' + prefixCls, true), _defineProperty(_ref, prefixCls + '-sm', size === 'small'), _defineProperty(_ref, prefixCls + '-lg', size === 'large'), _defineProperty(_ref, prefixCls + '-disabled', disabled), _ref;
    },
    renderLabeledInput: function renderLabeledInput(children) {
      var _className, _classNames;

      var h = this.$createElement;

      var props = this.$props;
      var addonAfter = getComponentFromProp(this, 'addonAfter');
      var addonBefore = getComponentFromProp(this, 'addonBefore');
      // Not wrap when there is not addons
      if (!addonBefore && !addonAfter) {
        return children;
      }

      var wrapperClassName = props.prefixCls + '-group';
      var addonClassName = wrapperClassName + '-addon';
      addonBefore = addonBefore ? h(
        'span',
        { 'class': addonClassName },
        [addonBefore]
      ) : null;

      addonAfter = addonAfter ? h(
        'span',
        { 'class': addonClassName },
        [addonAfter]
      ) : null;

      var className = (_className = {}, _defineProperty(_className, props.prefixCls + '-wrapper', true), _defineProperty(_className, wrapperClassName, addonBefore || addonAfter), _className);

      var groupClassName = classNames(props.prefixCls + '-group-wrapper', (_classNames = {}, _defineProperty(_classNames, props.prefixCls + '-group-wrapper-sm', props.size === 'small'), _defineProperty(_classNames, props.prefixCls + '-group-wrapper-lg', props.size === 'large'), _classNames));
      return h(
        'span',
        { 'class': groupClassName },
        [h(
          'span',
          { 'class': className },
          [addonBefore, children, addonAfter]
        )]
      );
    },
    renderLabeledIcon: function renderLabeledIcon(children) {
      var _classNames2;

      var h = this.$createElement;
      var _$props3 = this.$props,
          prefixCls = _$props3.prefixCls,
          size = _$props3.size;

      var prefix = getComponentFromProp(this, 'prefix');
      var suffix = getComponentFromProp(this, 'suffix');
      if (!prefix && !suffix) {
        return children;
      }

      prefix = prefix ? h(
        'span',
        { 'class': prefixCls + '-prefix' },
        [prefix]
      ) : null;

      suffix = suffix ? h(
        'span',
        { 'class': prefixCls + '-suffix' },
        [suffix]
      ) : null;
      var affixWrapperCls = classNames(prefixCls + '-affix-wrapper', (_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-affix-wrapper-sm', size === 'small'), _defineProperty(_classNames2, prefixCls + '-affix-wrapper-lg', size === 'large'), _classNames2));
      return h(
        'span',
        { 'class': affixWrapperCls },
        [prefix, children, suffix]
      );
    },
    renderInput: function renderInput() {
      var h = this.$createElement;

      var otherProps = omit(this.$props, ['prefixCls', 'addonBefore', 'addonAfter', 'prefix', 'suffix', 'value', 'defaultValue']);
      var stateValue = this.stateValue,
          getInputClassName = this.getInputClassName,
          handleKeyDown = this.handleKeyDown,
          handleChange = this.handleChange,
          $listeners = this.$listeners;

      var inputProps = {
        domProps: {
          value: stateValue
        },
        attrs: _extends({}, otherProps, this.$attrs),
        on: _extends({}, $listeners, {
          keydown: handleKeyDown,
          input: handleChange,
          change: noop
        }),
        'class': getInputClassName(),
        ref: 'input'
      };
      if ($listeners['change.value']) {
        inputProps.directives = [{ name: 'ant-input' }];
      }
      return this.renderLabeledIcon(h('input', inputProps));
    }
  },
  render: function render() {
    var h = arguments[0];

    if (this.$props.type === 'textarea') {
      var $listeners = this.$listeners;

      var textareaProps = {
        props: this.$props,
        attrs: this.$attrs,
        on: _extends({}, $listeners, {
          change: this.handleChange,
          keydown: this.handleKeyDown
        }),
        directives: [{
          name: 'ant-input'
        }]
      };
      return h(TextArea, _mergeJSXProps([textareaProps, { ref: 'input' }]));
    }
    return this.renderLabeledInput(this.renderInput());
  }
};