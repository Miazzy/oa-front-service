import InputNumber from '../src/index';
import '../assets/index.less';

function getSum(str) {
  var total = 0;
  str.split('').forEach(function (c) {
    var num = Number(c);

    if (!isNaN(num)) {
      total += num;
    }
  });

  return total;
}

export default {
  data: function data() {
    return {
      value: 1000
    };
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];

    return h(
      'div',
      { style: 'margin: 10px;' },
      [h(InputNumber, {
        attrs: {
          defaultValue: 1000,
          formatter: function formatter(value) {
            return ('$ ' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        }
      }), h(InputNumber, {
        attrs: {
          defaultValue: 100,
          formatter: function formatter(value) {
            return value + '%';
          },
          parser: function parser(value) {
            return value.replace('%', '');
          }
        }
      }), h(InputNumber, {
        style: 'width: 100px',
        attrs: { formatter: function formatter(value) {
            return ('' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        }
      }), h('div', [h('h1', ['In Control']), h(InputNumber, {
        attrs: {
          value: this.value,

          formatter: function formatter(value) {
            return ('$ ' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        },
        on: {
          'change': function change(value) {
            _this.value = value;
          }
        }
      })]), h('div', [h('h1', ['Strange Format']), h(InputNumber, {
        attrs: {
          defaultValue: 1000,
          formatter: function formatter(value) {
            return '$ ' + value + ' - ' + getSum(value);
          },
          parser: function parser(value) {
            return (value.match(/^\$ ([\d\.]*) .*$/) || [])[1];
          }
        }
      })])]
    );
  }
};