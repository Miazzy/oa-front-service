import _defineProperty from 'babel-runtime/helpers/defineProperty';
import Checkbox from '../checkbox';
import Dropdown from '../dropdown';
import Menu from '../menu';
import Icon from '../icon';
import classNames from 'classnames';
import { SelectionCheckboxAllProps } from './interface';
import BaseMixin from '../_util/BaseMixin';

export default {
  name: 'SelectionCheckboxAll',
  mixins: [BaseMixin],
  props: SelectionCheckboxAllProps,
  data: function data() {
    var props = this.$props;

    this.defaultSelections = props.hideDefaultSelections ? [] : [{
      key: 'all',
      text: props.locale.selectAll,
      onSelect: function onSelect() {}
    }, {
      key: 'invert',
      text: props.locale.selectInvert,
      onSelect: function onSelect() {}
    }];

    return {
      checked: this.getCheckState(props),
      indeterminate: this.getIndeterminateState(props)
    };
  },


  watch: {
    $props: {
      handler: function handler() {
        this.setCheckState();
      },
      deep: true
    }
  },

  mounted: function mounted() {
    this.subscribe();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },

  methods: {
    subscribe: function subscribe() {
      var _this = this;

      var store = this.store;

      this.unsubscribe = store.subscribe(function () {
        _this.setCheckState(_this.$props);
      });
    },
    checkSelection: function checkSelection(props, data, type, byDefaultChecked) {
      var _ref = props || this.$props,
          store = _ref.store,
          getCheckboxPropsByItem = _ref.getCheckboxPropsByItem,
          getRecordKey = _ref.getRecordKey;
      // type should be 'every' | 'some'


      if (type === 'every' || type === 'some') {
        return byDefaultChecked ? data[type](function (item, i) {
          return getCheckboxPropsByItem(item, i).props.defaultChecked;
        }) : data[type](function (item, i) {
          return store.getState().selectedRowKeys.indexOf(getRecordKey(item, i)) >= 0;
        });
      }
      return false;
    },
    setCheckState: function setCheckState(props) {
      var checked = this.getCheckState(props);
      var indeterminate = this.getIndeterminateState(props);
      this.setState(function (prevState) {
        var newState = {};
        if (indeterminate !== prevState.indeterminate) {
          newState.indeterminate = indeterminate;
        }
        if (checked !== prevState.checked) {
          newState.checked = checked;
        }
        return newState;
      });
    },
    getCheckState: function getCheckState(props) {
      var store = this.store,
          data = this.data;

      var checked = void 0;
      if (!data.length) {
        checked = false;
      } else {
        checked = store.getState().selectionDirty ? this.checkSelection(props, data, 'every', false) : this.checkSelection(props, data, 'every', false) || this.checkSelection(props, data, 'every', true);
      }
      return checked;
    },
    getIndeterminateState: function getIndeterminateState(props) {
      var store = this.store,
          data = this.data;

      var indeterminate = void 0;
      if (!data.length) {
        indeterminate = false;
      } else {
        indeterminate = store.getState().selectionDirty ? this.checkSelection(props, data, 'some', false) && !this.checkSelection(props, data, 'every', false) : this.checkSelection(props, data, 'some', false) && !this.checkSelection(props, data, 'every', false) || this.checkSelection(props, data, 'some', true) && !this.checkSelection(props, data, 'every', true);
      }
      return indeterminate;
    },
    handleSelectAllChange: function handleSelectAllChange(e) {
      var checked = e.target.checked;
      this.$emit('select', checked ? 'all' : 'removeAll', 0, null);
    },
    renderMenus: function renderMenus(selections) {
      var _this2 = this;

      var h = this.$createElement;

      return selections.map(function (selection, index) {
        return h(
          Menu.Item,
          { key: selection.key || index },
          [h(
            'div',
            {
              on: {
                'click': function click() {
                  _this2.$emit('select', selection.key, index, selection.onSelect);
                }
              }
            },
            [selection.text]
          )]
        );
      });
    }
  },

  render: function render() {
    var h = arguments[0];
    var disabled = this.disabled,
        prefixCls = this.prefixCls,
        selections = this.selections,
        getPopupContainer = this.getPopupContainer,
        checked = this.checked,
        indeterminate = this.indeterminate;


    var selectionPrefixCls = prefixCls + '-selection';

    var customSelections = null;

    if (selections) {
      var newSelections = Array.isArray(selections) ? this.defaultSelections.concat(selections) : this.defaultSelections;

      var menu = h(
        Menu,
        { 'class': selectionPrefixCls + '-menu', attrs: { selectedKeys: [] }
        },
        [this.renderMenus(newSelections)]
      );

      customSelections = newSelections.length > 0 ? h(
        Dropdown,
        {
          attrs: { getPopupContainer: getPopupContainer }
        },
        [h(
          'template',
          { slot: 'overlay' },
          [menu]
        ), h(
          'div',
          { 'class': selectionPrefixCls + '-down' },
          [h(Icon, {
            attrs: { type: 'down' }
          })]
        )]
      ) : null;
    }

    return h(
      'div',
      { 'class': selectionPrefixCls },
      [h(Checkbox, {
        'class': classNames(_defineProperty({}, selectionPrefixCls + '-select-all-custom', customSelections)),
        attrs: { checked: checked,
          indeterminate: indeterminate,
          disabled: disabled
        },
        on: {
          'change': this.handleSelectAllChange
        }
      }), customSelections]
    );
  }
};