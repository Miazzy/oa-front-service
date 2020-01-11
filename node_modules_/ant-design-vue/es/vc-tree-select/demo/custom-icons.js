import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import _extends from 'babel-runtime/helpers/extends';
/* eslint react/no-multi-comp:0, no-console:0, no-alert: 0 */

import '../assets/index.less';
import '../../vc-dialog/assets/index.less';
import TreeSelect from '../src/index';
import { gData } from './util';
import './demo.less';

var bubblePath = 'M632 888H392c-4.4 0-8 3.6-8 8v32c0 ' + '17.7 14.3 32 32 32h192c17.7 0 32-14.3 32-32v-3' + '2c0-4.4-3.6-8-8-8zM512 64c-181.1 0-328 146.9-3' + '28 328 0 121.4 66 227.4 164 284.1V792c0 17.7 1' + '4.3 32 32 32h264c17.7 0 32-14.3 32-32V676.1c98' + '-56.7 164-162.7 164-284.1 0-181.1-146.9-328-32' + '8-328z m127.9 549.8L604 634.6V752H420V634.6l-3' + '5.9-20.8C305.4 568.3 256 484.5 256 392c0-141.4' + ' 114.6-256 256-256s256 114.6 256 256c0 92.5-49' + '.4 176.3-128.1 221.8z';

var clearPath = 'M793 242H366v-74c0-6.7-7.7-10.4-12.9' + '-6.3l-142 112c-4.1 3.2-4.1 9.4 0 12.6l142 112c' + '5.2 4.1 12.9 0.4 12.9-6.3v-74h415v470H175c-4.4' + ' 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h618c35.3 0 64-' + '28.7 64-64V306c0-35.3-28.7-64-64-64z';

var arrowPath = 'M765.7 486.8L314.9 134.7c-5.3-4.1' + '-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l36' + '0 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6' + '.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-3' + '7.6 0-50.4z';

var getSvg = function getSvg(h, path) {
  var iStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return h(
    'i',
    { style: iStyle },
    [h(
      'svg',
      {
        attrs: {
          viewBox: '0 0 1024 1024',
          width: '1em',
          height: '1em',
          fill: 'currentColor'
        },
        style: _extends({ verticalAlign: '-.125em' }, style)
      },
      [h('path', {
        attrs: { d: path }
      })]
    )]
  );
};

export default {
  data: function data() {
    var h = this.$createElement;
    var switcherIcon = function switcherIcon(obj) {
      if (obj.isLeaf) {
        return getSvg(h, arrowPath, { cursor: 'pointer', backgroundColor: 'white' }, { transform: 'rotate(270deg)' });
      }
      return getSvg(h, arrowPath, { cursor: 'pointer', backgroundColor: 'white' }, { transform: 'rotate(' + (obj.expanded ? 90 : 0) + 'deg)' });
    };

    var _inputIcon = getSvg(h, bubblePath);
    var _clearIcon = getSvg(h, clearPath);
    var _removeIcon = getSvg(h, clearPath);
    return {
      iconProps: {
        inputIcon: _inputIcon,
        clearIcon: _clearIcon,
        removeIcon: _removeIcon,
        switcherIcon: switcherIcon
      },

      iconPropsFunction: {
        inputIcon: function inputIcon() {
          return _inputIcon;
        },
        clearIcon: function clearIcon() {
          return _clearIcon;
        },
        removeIcon: function removeIcon() {
          return _removeIcon;
        },
        switcherIcon: switcherIcon
      }
    };
  },
  render: function render() {
    var h = arguments[0];

    return h(
      'div',
      { 'class': 'custom-icon-demo' },
      [h('h2', ['Single']), h(TreeSelect, _mergeJSXProps([{
        attrs: {
          treeData: gData,
          placeholder: h('span', ['Please Select']),
          transitionName: 'rc-tree-select-dropdown-slide-up',

          dropdownStyle: { maxHeight: '200px', overflow: 'auto', zIndex: 1500 },
          showSearch: true,
          allowClear: true
        },
        style: { width: '300px' } }, { props: _extends({}, this.iconProps) }, {
        attrs: {
          __propsSymbol__: Symbol()
        }
      }])), h('br'), h('h2', ['Multiple']), h(TreeSelect, _mergeJSXProps([{
        attrs: {
          treeData: gData,
          multiple: true,
          placeholder: h('span', ['Please Select']),
          transitionName: 'rc-tree-select-dropdown-slide-up',

          dropdownStyle: { maxHeight: '200px', overflow: 'auto', zIndex: 1500 },
          showSearch: true,
          allowClear: true
        },
        style: { width: '300px' } }, { props: _extends({}, this.iconPropsFunction) }, {
        attrs: {
          __propsSymbol__: Symbol()
        }
      }]))]
    );
  }
};