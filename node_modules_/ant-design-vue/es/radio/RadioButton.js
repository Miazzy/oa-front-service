import _extends from 'babel-runtime/helpers/extends';
import Radio from './Radio';
import { getOptionProps } from '../_util/props-util';

export default {
  name: 'ARadioButton',
  props: _extends({}, Radio.props, {
    prefixCls: {
      'default': 'ant-radio-button',
      type: String
    }
  }),
  inject: {
    radioGroupContext: { 'default': undefined }
  },
  render: function render() {
    var h = arguments[0];

    var props = getOptionProps(this);
    var radioProps = { props: props, on: _extends({}, this.$listeners) };
    if (this.radioGroupContext) {
      radioProps.on.change = this.radioGroupContext.onRadioChange;
      radioProps.props.checked = props.value === this.radioGroupContext.stateValue;
      radioProps.props.disabled = props.disabled || this.radioGroupContext.disabled;
    }
    return h(
      Radio,
      radioProps,
      [this.$slots['default']]
    );
  }
};