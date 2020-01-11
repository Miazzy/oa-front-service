import _extends from 'babel-runtime/helpers/extends';
import PropTypes from '../_util/vue-types';
import { initDefaultProps, getOptionProps, getComponentFromProp } from '../_util/props-util';
import VcRate from '../vc-rate';
import Icon from '../icon';

export var RateProps = {
  prefixCls: PropTypes.string,
  count: PropTypes.number,
  value: PropTypes.value,
  defaultValue: PropTypes.value,
  allowHalf: PropTypes.bool,
  allowClear: PropTypes.bool,
  disabled: PropTypes.bool,
  character: PropTypes.any,
  autoFocus: PropTypes.bool
};

var Rate = {
  name: 'ARate',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: initDefaultProps(RateProps, {
    prefixCls: 'ant-rate'
  }),
  methods: {
    focus: function focus() {
      this.$refs.refRate.focus();
    },
    blur: function blur() {
      this.$refs.refRate.blur();
    }
  },
  render: function render() {
    var h = arguments[0];

    var character = getComponentFromProp(this, 'character') || h(Icon, {
      attrs: { type: 'star', theme: 'filled' }
    });
    var rateProps = {
      props: _extends({
        character: character
      }, getOptionProps(this)),
      on: this.$listeners,
      ref: 'refRate'
    };
    return h(VcRate, rateProps);
  }
};

/* istanbul ignore next */
Rate.install = function (Vue) {
  Vue.component(Rate.name, Rate);
};
export default Rate;