import Drawer from '../src/index';
import Menu from '../../menu/index';
import Icon from '../../icon/index';
import '../assets/index.less';
import '../../menu/style/index';
import '../../icon/style/index';
import '../../button/style/index';
import '../../select/style/index';

var SubMenu = Menu.SubMenu;
var MenuItemGroup = Menu.ItemGroup;

export default {
  data: function data() {
    return {
      placement: 'right',
      childShow: true,
      width: '20vw',
      height: null
    };
  },

  methods: {
    onChange: function onChange(event) {
      var _this = this;

      var value = event.target.value;
      this.placement = value;
      this.width = value === 'right' || value === 'left' ? '20vw' : null;
      this.height = value === 'right' || value === 'left' ? null : '20vh';
      this.childShow = false; // 删除子级，删除切换时的过渡动画。。。
      this.$nextTick(function () {
        _this.childShow = true;
      });
    }
  },
  render: function render() {
    var h = arguments[0];

    return h('div', [this.childShow && h(
      Drawer,
      {
        attrs: { placement: this.placement, width: this.width, height: this.height }
      },
      [h(
        Menu,
        {
          attrs: { defaultSelectedKeys: ['1'], defaultOpenKeys: ['sub1'], mode: 'inline' }
        },
        [h(
          SubMenu,
          {
            key: 'sub1',
            attrs: { title: h('span', [h(Icon, {
                attrs: { type: 'mail' }
              }), h('span', ['Navigation One'])])
            }
          },
          [h(
            MenuItemGroup,
            { key: 'g1', attrs: { title: 'Item 1' }
            },
            [h(
              Menu.Item,
              { key: '1' },
              ['Option 1']
            ), h(
              Menu.Item,
              { key: '2' },
              ['Option 2']
            )]
          ), h(
            MenuItemGroup,
            { key: 'g2', attrs: { title: 'Item 2' }
            },
            [h(
              Menu.Item,
              { key: '3' },
              ['Option 3']
            ), h(
              Menu.Item,
              { key: '4' },
              ['Option 4']
            )]
          )]
        ), h(
          SubMenu,
          {
            key: 'sub2',
            attrs: { title: h('span', [h(Icon, {
                attrs: { type: 'appstore' }
              }), h('span', ['Navigation Two'])])
            }
          },
          [h(
            Menu.Item,
            { key: '5' },
            ['Option 5']
          ), h(
            Menu.Item,
            { key: '6' },
            ['Option 6']
          ), h(
            SubMenu,
            { key: 'sub3', attrs: { title: 'Submenu' }
            },
            [h(
              Menu.Item,
              { key: '7' },
              ['Option 7']
            ), h(
              Menu.Item,
              { key: '8' },
              ['Option 8']
            )]
          )]
        ), h(
          SubMenu,
          {
            key: 'sub4',
            attrs: { title: h('span', [h(Icon, {
                attrs: { type: 'setting' }
              }), h('span', ['Navigation Three'])])
            }
          },
          [h(
            Menu.Item,
            { key: '9' },
            ['Option 9']
          ), h(
            Menu.Item,
            { key: '10' },
            ['Option 10']
          ), h(
            Menu.Item,
            { key: '11' },
            ['Option 11']
          ), h(
            Menu.Item,
            { key: '12' },
            ['Option 12']
          )]
        )]
      )]
    ), h(
      'div',
      {
        style: {
          width: '100%',
          height: 667,
          background: '#fff000',
          color: '#000',
          textAlign: 'center',
          lineHeight: '667px'
        }
      },
      ['\u9009\u62E9\u4F4D\u7F6E\uFF1A', h(
        'select',
        {
          style: { width: '120px', marginLeft: '20px' },
          domProps: {
            'value': this.placement
          },
          on: {
            'change': this.onChange
          }
        },
        [h(
          'option',
          {
            attrs: { value: 'left' }
          },
          ['\u5DE6\u8FB9 left']
        ), h(
          'option',
          {
            attrs: { value: 'top' }
          },
          ['\u4E0A\u9762 top']
        ), h(
          'option',
          {
            attrs: { value: 'right' }
          },
          ['\u53F3\u8FB9 right']
        ), h(
          'option',
          {
            attrs: { value: 'bottom' }
          },
          ['\u4E0B\u9762 bottom']
        )]
      )]
    )]);
  }
};