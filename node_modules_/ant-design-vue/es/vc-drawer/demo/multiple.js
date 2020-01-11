import Drawer from '../src/index';
import Button from '../../button/index';
import '../assets/index.less';
import '../../menu/style/index';
import '../../icon/style/index';
import '../../button/style/index';

export default {
  data: function data() {
    return {
      open: false,
      openChild: false,
      openChildren: false
    };
  },

  methods: {
    onClick: function onClick() {
      this.open = !this.open;
    },
    onChildClick: function onChildClick() {
      this.openChild = !this.openChild;
    },
    onChildrenClick: function onChildrenClick() {
      this.openChildren = !this.openChildren;
    },
    getLevelMove: function getLevelMove(e) {
      var target = e.target;
      if (target.className.indexOf('drawer1') >= 0) {
        return [200, 100];
      }
      return 100;
    }
  },
  render: function render() {
    var h = arguments[0];

    return h('div', [h(
      'div',
      {
        style: {
          width: '100%',
          height: 667,
          background: '#fff000',
          color: '#fff',
          textAlign: 'center',
          lineHeight: '667px'
        }
      },
      [h(
        Button,
        {
          on: {
            'click': this.onClick
          }
        },
        ['\u6253\u5F00\u62BD\u5C49']
      )]
    ), h(
      Drawer,
      {
        attrs: {
          width: '20vw',
          handler: false,
          open: this.open,

          placement: 'right'
        },
        on: {
          'maskClick': this.onClick
        },

        'class': 'drawer1' },
      [h('div', [h(
        Button,
        {
          on: {
            'click': this.onChildClick
          }
        },
        ['\u6253\u5F00\u5B50\u7EA7']
      ), h(
        Drawer,
        {
          attrs: {
            handler: false,
            open: this.openChild,

            level: '.drawer1',
            placement: 'right',
            levelMove: 100
          },
          on: {
            'maskClick': this.onChildClick
          },

          'class': 'drawer2' },
        [h(
          'div',
          { style: { width: 200 } },
          ['\u4E8C\u7EA7\u62BD\u5C49', h(
            Button,
            {
              on: {
                'click': this.onChildrenClick
              }
            },
            ['\u6253\u5F00\u5B50\u7EA7']
          ), h(
            Drawer,
            {
              attrs: {
                handler: false,
                open: this.openChildren,

                level: ['.drawer1', '.drawer2'],
                placement: 'right',
                levelMove: this.getLevelMove
              },
              on: {
                'maskClick': this.onChildrenClick
              }
            },
            [h(
              'div',
              { style: { width: 200 } },
              ['\u4E09\u7EA7\u62BD\u5C49']
            )]
          )]
        )]
      )])]
    )]);
  }
};