/* eslint no-console:0 */
import Checkbox from '../index';
import '../assets/index.less';

function onChange(e) {
  console.log('Checkbox checked:', e.target.checked);
}

export default {
  data: function data() {
    return {
      disabled: false
    };
  },

  methods: {
    toggle: function toggle() {
      this.disabled = !this.disabled;
    }
  },
  render: function render() {
    var h = arguments[0];

    return h(
      'div',
      { style: { margin: '20px' } },
      [h('div', [h('p', [h('label', [h(Checkbox, {
        attrs: { checked: true, disabled: this.disabled },
        on: {
          'change': onChange
        }
      }), '\xA0 controlled checked rc-checkbox']), '\xA0\xA0']), h('p', [h('label', [h('input', {
        attrs: { checked: true, type: 'checkbox', disabled: this.disabled },
        on: {
          'change': onChange
        }
      }), '\xA0 controlled checked native']), '\xA0\xA0'])]), h('div', [h('p', [h('label', [h(Checkbox, {
        attrs: { defaultChecked: true, disabled: this.disabled },
        on: {
          'change': onChange
        }
      }), '\xA0 defaultChecked rc-checkbox']), '\xA0\xA0'])]), h('div', [h('p', [h('label', [h(Checkbox, {
        attrs: {
          name: 'my-checkbox',
          defaultChecked: true,

          disabled: this.disabled,
          id: 'test'
        },
        on: {
          'change': onChange
        }
      }), '\xA0 defaultChecked rc-checkbox with name']), '\xA0\xA0'])]), h(
        'button',
        {
          on: {
            'click': this.toggle
          }
        },
        ['toggle disabled']
      )]
    );
  }
};