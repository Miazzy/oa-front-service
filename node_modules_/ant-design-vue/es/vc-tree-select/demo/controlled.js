/* eslint react/no-multi-comp:0, no-console:0, no-alert: 0 */

import BaseMixin from '../../_util/BaseMixin';
import '../assets/index.less';
import '../../vc-dialog/assets/index.less';
import TreeSelect, { TreeNode } from '../src/index';
import './demo.less';

export default {
  mixins: [BaseMixin],
  data: function data() {
    return {
      treeExpandedKeys: []
    };
  },
  methods: {
    onTreeExpand: function onTreeExpand(treeExpandedKeys) {
      this.setState({
        treeExpandedKeys: treeExpandedKeys
      });
    },
    setTreeExpandedKeys: function setTreeExpandedKeys() {
      this.setState({
        treeExpandedKeys: ['000', '0-1-0']
      });
    }
  },

  render: function render() {
    var h = arguments[0];
    var treeExpandedKeys = this.treeExpandedKeys;


    return h('div', [h('h2', ['Conrolled treeExpandedKeys']), h(
      TreeSelect,
      {
        style: { width: '200px' },
        attrs: { dropdownStyle: { maxHeight: '200px', overflow: 'auto' },
          treeExpandedKeys: treeExpandedKeys,

          __propsSymbol__: Symbol()
        },
        on: {
          'treeExpand': this.onTreeExpand
        }
      },
      [h(
        TreeNode,
        {
          attrs: { value: '', title: 'parent 1' },
          key: '000' },
        [h(
          TreeNode,
          {
            attrs: { value: 'parent 1-0', title: 'parent 1-0' },
            key: '0-1-0' },
          [h(TreeNode, {
            attrs: { value: 'leaf1', title: 'my leaf' },
            key: 'random' }), h(TreeNode, {
            attrs: { value: 'leaf2', title: 'your leaf', disabled: true },
            key: 'random1' })]
        ), h(
          TreeNode,
          {
            attrs: { value: 'parent 1-1', title: 'parent 1-1' },
            key: '0-1-1' },
          [h(TreeNode, {
            attrs: {
              value: 'sss',
              title: h(
                'span',
                { style: { color: 'red' } },
                ['sss']
              )
            },
            key: 'random3'
          }), h(
            TreeNode,
            {
              attrs: { value: 'same value1', title: 'same txtle' },
              key: '0-1-1-1' },
            [h(TreeNode, {
              attrs: {
                value: 'same value10',
                title: 'same titlexd'
              },
              key: '0-1-1-1-0',
              style: { color: 'red', background: 'green' }
            })]
          )]
        )]
      ), h(
        TreeNode,
        {
          attrs: { value: 'same value2', title: 'same title' },
          key: '0-2' },
        [h(TreeNode, {
          attrs: { value: '2same value', title: '2same title' },
          key: '0-2-0' })]
      ), h(TreeNode, {
        attrs: { value: 'same value3', title: 'same title' },
        key: '0-3' })]
    ), h(
      'button',
      {
        on: {
          'click': this.setTreeExpandedKeys
        }
      },
      ['Set treeExpandedKeys']
    )]);
  }
};