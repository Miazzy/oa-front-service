import Drawer from '../src/index';
import Menu from '../../menu/index';
import Icon from '../../icon/index';
import '../assets/index.less';
import '../../menu/style/index';
import '../../icon/style/index';

var SubMenu = Menu.SubMenu;
var MenuItemGroup = Menu.ItemGroup;

export default {
  methods: {
    getContainer: function getContainer() {
      return this.$refs.container;
    }
  },
  render: function render() {
    var h = arguments[0];

    return h('div', [h('div', { ref: 'container' }), h(
      Drawer,
      {
        attrs: { width: '20vw', getContainer: this.getContainer }
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
    )]);
  }
};