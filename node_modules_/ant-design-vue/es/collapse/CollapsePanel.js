import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import { getOptionProps, getComponentFromProp } from '../_util/props-util';
import VcCollapse, { panelProps } from '../vc-collapse';

export default {
  name: 'ACollapsePanel',
  props: _extends({}, panelProps),
  render: function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls,
        _showArrow = this.showArrow,
        showArrow = _showArrow === undefined ? true : _showArrow,
        $listeners = this.$listeners;

    var collapsePanelClassName = _defineProperty({}, prefixCls + '-no-arrow', !showArrow);
    var rcCollapePanelProps = {
      props: _extends({}, getOptionProps(this)),
      'class': collapsePanelClassName,
      on: $listeners
    };
    var header = getComponentFromProp(this, 'header');
    return h(
      VcCollapse.Panel,
      rcCollapePanelProps,
      [this.$slots['default'], header ? h(
        'template',
        { slot: 'header' },
        [header]
      ) : null]
    );
  }
};