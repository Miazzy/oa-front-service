import _extends from 'babel-runtime/helpers/extends';
import { TreeNode } from '../../vc-tree';
/**
 * SelectNode wrapped the tree node.
 * Let's use SelectNode instead of TreeNode
 * since TreeNode is so confuse here.
 */
export default {
  name: 'SelectNode',
  functional: true,
  isTreeNode: true,
  props: TreeNode.props,
  render: function render(h, context) {
    var props = context.props,
        slots = context.slots,
        listeners = context.listeners,
        data = context.data;

    var $slots = slots();
    var children = $slots['default'];
    delete $slots['default'];
    var treeNodeProps = _extends({}, data, {
      on: _extends({}, listeners, data.nativeOn),
      props: props
    });
    var slotsKey = Object.keys($slots);
    return h(
      TreeNode,
      treeNodeProps,
      [children, slotsKey.length ? slotsKey.map(function (name) {
        return h(
          'template',
          { slot: name },
          [$slots[name]]
        );
      }) : null]
    );
  }
};