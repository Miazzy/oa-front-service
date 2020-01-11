import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import animation from '../_util/openAnimation';
import { getOptionProps, initDefaultProps } from '../_util/props-util';
import VcCollapse, { collapseProps } from '../vc-collapse';
import Icon from '../icon';
export default {
  name: 'ACollapse',
  model: {
    prop: 'activeKey',
    event: 'change'
  },
  props: initDefaultProps(collapseProps, {
    prefixCls: 'ant-collapse',
    bordered: true,
    openAnimation: animation
  }),
  methods: {
    renderExpandIcon: function renderExpandIcon() {
      var h = this.$createElement;

      return h(Icon, {
        attrs: { type: 'right' },
        'class': 'arrow' });
    }
  },
  render: function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls,
        bordered = this.bordered,
        $listeners = this.$listeners;

    var collapseClassName = _defineProperty({}, prefixCls + '-borderless', !bordered);
    var rcCollapeProps = {
      props: _extends({}, getOptionProps(this), {
        expandIcon: this.renderExpandIcon
      }),
      'class': collapseClassName,
      on: $listeners
    };
    return h(
      VcCollapse,
      rcCollapeProps,
      [this.$slots['default']]
    );
  }
};