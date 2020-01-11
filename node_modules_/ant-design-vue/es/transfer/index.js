import _extends from 'babel-runtime/helpers/extends';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import PropTypes from '../_util/vue-types';
import { hasProp, initDefaultProps, getOptionProps, getComponentFromProp } from '../_util/props-util';
import BaseMixin from '../_util/BaseMixin';
import classNames from 'classnames';
import List from './list';
import Operation from './operation';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import warning from '../_util/warning';

export var TransferDirection = 'left' | 'right';

export var TransferItem = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  disabled: PropTypes.bool
};

export var TransferProps = {
  prefixCls: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.shape(TransferItem).loose),
  disabled: PropTypes.boolean,
  targetKeys: PropTypes.arrayOf(PropTypes.string),
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  render: PropTypes.func,
  listStyle: PropTypes.object,
  operationStyle: PropTypes.object,
  titles: PropTypes.arrayOf(PropTypes.string),
  operations: PropTypes.arrayOf(PropTypes.string),
  showSearch: PropTypes.bool,
  filterOption: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  notFoundContent: PropTypes.any,
  locale: PropTypes.object,
  rowKey: PropTypes.func,
  lazy: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};

export var TransferLocale = {
  titles: PropTypes.arrayOf(PropTypes.string),
  notFoundContent: PropTypes.string,
  itemUnit: PropTypes.string,
  itemsUnit: PropTypes.string
};

var Transfer = {
  name: 'ATransfer',
  mixins: [BaseMixin],
  props: initDefaultProps(TransferProps, {
    dataSource: [],
    locale: {},
    showSearch: false
  }),
  data: function data() {
    // vue 中 通过slot，不方便传递，保留notFoundContent及searchPlaceholder
    // warning(
    //   !(getComponentFromProp(this, 'notFoundContent') || hasProp(this, 'searchPlaceholder')),
    //   'Transfer[notFoundContent] and Transfer[searchPlaceholder] will be removed, ' +
    //   'please use Transfer[locale] instead.',
    // )

    this.separatedDataSource = {
      leftDataSource: [],
      rightDataSource: []
    } | null;
    var _selectedKeys = this.selectedKeys,
        selectedKeys = _selectedKeys === undefined ? [] : _selectedKeys,
        _targetKeys = this.targetKeys,
        targetKeys = _targetKeys === undefined ? [] : _targetKeys;

    return {
      leftFilter: '',
      rightFilter: '',
      sourceSelectedKeys: selectedKeys.filter(function (key) {
        return targetKeys.indexOf(key) === -1;
      }),
      targetSelectedKeys: selectedKeys.filter(function (key) {
        return targetKeys.indexOf(key) > -1;
      })
    };
  },
  mounted: function mounted() {
    // this.currentProps = { ...this.$props }
  },

  watch: {
    targetKeys: function targetKeys() {
      this.updateState();
      if (this.selectedKeys) {
        var targetKeys = this.targetKeys || [];
        this.setState({
          sourceSelectedKeys: this.selectedKeys.filter(function (key) {
            return !targetKeys.includes(key);
          }),
          targetSelectedKeys: this.selectedKeys.filter(function (key) {
            return targetKeys.includes(key);
          })
        });
      }
    },
    dataSource: function dataSource() {
      this.updateState();
    },
    selectedKeys: function selectedKeys() {
      if (this.selectedKeys) {
        var targetKeys = this.targetKeys || [];
        this.setState({
          sourceSelectedKeys: this.selectedKeys.filter(function (key) {
            return !targetKeys.includes(key);
          }),
          targetSelectedKeys: this.selectedKeys.filter(function (key) {
            return targetKeys.includes(key);
          })
        });
      }
    }
  },
  methods: {
    updateState: function updateState() {
      var sourceSelectedKeys = this.sourceSelectedKeys,
          targetSelectedKeys = this.targetSelectedKeys;

      this.separatedDataSource = null;
      if (!this.selectedKeys) {
        // clear key nolonger existed
        // clear checkedKeys according to targetKeys
        var dataSource = this.dataSource,
            _targetKeys2 = this.targetKeys,
            targetKeys = _targetKeys2 === undefined ? [] : _targetKeys2;


        var newSourceSelectedKeys = [];
        var newTargetSelectedKeys = [];
        dataSource.forEach(function (_ref) {
          var key = _ref.key;

          if (sourceSelectedKeys.includes(key) && !targetKeys.includes(key)) {
            newSourceSelectedKeys.push(key);
          }
          if (targetSelectedKeys.includes(key) && targetKeys.includes(key)) {
            newTargetSelectedKeys.push(key);
          }
        });
        this.setState({
          sourceSelectedKeys: newSourceSelectedKeys,
          targetSelectedKeys: newTargetSelectedKeys
        });
      }
    },
    separateDataSource: function separateDataSource(props) {
      if (this.separatedDataSource) {
        return this.separatedDataSource;
      }

      var dataSource = props.dataSource,
          rowKey = props.rowKey,
          _props$targetKeys = props.targetKeys,
          targetKeys = _props$targetKeys === undefined ? [] : _props$targetKeys;


      var leftDataSource = [];
      var rightDataSource = new Array(targetKeys.length);
      dataSource.forEach(function (record) {
        if (rowKey) {
          record.key = rowKey(record);
        }

        // rightDataSource should be ordered by targetKeys
        // leftDataSource should be ordered by dataSource
        var indexOfKey = targetKeys.indexOf(record.key);
        if (indexOfKey !== -1) {
          rightDataSource[indexOfKey] = record;
        } else {
          leftDataSource.push(record);
        }
      });

      this.separatedDataSource = {
        leftDataSource: leftDataSource,
        rightDataSource: rightDataSource
      };

      return this.separatedDataSource;
    },
    moveTo: function moveTo(direction) {
      var _$props = this.$props,
          _$props$targetKeys = _$props.targetKeys,
          targetKeys = _$props$targetKeys === undefined ? [] : _$props$targetKeys,
          _$props$dataSource = _$props.dataSource,
          dataSource = _$props$dataSource === undefined ? [] : _$props$dataSource;
      var sourceSelectedKeys = this.sourceSelectedKeys,
          targetSelectedKeys = this.targetSelectedKeys;

      var moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
      // filter the disabled options
      var newMoveKeys = moveKeys.filter(function (key) {
        return !dataSource.some(function (data) {
          return !!(key === data.key && data.disabled);
        });
      });
      // move items to target box
      var newTargetKeys = direction === 'right' ? newMoveKeys.concat(targetKeys) : targetKeys.filter(function (targetKey) {
        return newMoveKeys.indexOf(targetKey) === -1;
      });

      // empty checked keys
      var oppositeDirection = direction === 'right' ? 'left' : 'right';
      this.setState(_defineProperty({}, this.getSelectedKeysName(oppositeDirection), []));
      this.handleSelectChange(oppositeDirection, []);

      this.$emit('change', newTargetKeys, direction, newMoveKeys);
    },
    moveToLeft: function moveToLeft() {
      this.moveTo('left');
    },
    moveToRight: function moveToRight() {
      this.moveTo('right');
    },
    handleSelectChange: function handleSelectChange(direction, holder) {
      var sourceSelectedKeys = this.sourceSelectedKeys,
          targetSelectedKeys = this.targetSelectedKeys;


      if (direction === 'left') {
        this.$emit('selectChange', holder, targetSelectedKeys);
      } else {
        this.$emit('selectChange', sourceSelectedKeys, holder);
      }
    },
    handleSelectAll: function handleSelectAll(direction, filteredDataSource, checkAll) {
      var originalSelectedKeys = this[this.getSelectedKeysName(direction)] || [];
      var currentKeys = filteredDataSource.map(function (item) {
        return item.key;
      });
      // Only operate current keys from original selected keys
      var newKeys1 = originalSelectedKeys.filter(function (key) {
        return currentKeys.indexOf(key) === -1;
      });
      var newKeys2 = [].concat(_toConsumableArray(originalSelectedKeys));
      currentKeys.forEach(function (key) {
        if (newKeys2.indexOf(key) === -1) {
          newKeys2.push(key);
        }
      });
      var holder = checkAll ? newKeys1 : newKeys2;
      this.handleSelectChange(direction, holder);

      if (!this.selectedKeys) {
        this.setState(_defineProperty({}, this.getSelectedKeysName(direction), holder));
      }
    },
    handleLeftSelectAll: function handleLeftSelectAll(filteredDataSource, checkAll) {
      this.handleSelectAll('left', filteredDataSource, checkAll);
    },
    handleRightSelectAll: function handleRightSelectAll(filteredDataSource, checkAll) {
      this.handleSelectAll('right', filteredDataSource, checkAll);
    },
    handleFilter: function handleFilter(direction, e) {
      var value = e.target.value;
      this.setState(_defineProperty({}, direction + 'Filter', value));
      if (this.$listeners.searchChange) {
        warning(false, '`searchChange` in Transfer is deprecated. Please use `search` instead.');
        this.$emit('searchChange', direction, e);
      }
      this.$emit('search', direction, value);
    },
    handleLeftFilter: function handleLeftFilter(e) {
      this.handleFilter('left', e);
    },
    handleRightFilter: function handleRightFilter(e) {
      this.handleFilter('right', e);
    },
    handleClear: function handleClear(direction) {
      this.setState(_defineProperty({}, direction + 'Filter', ''));
      this.$emit('search', direction, '');
    },
    handleLeftClear: function handleLeftClear() {
      this.handleClear('left');
    },
    handleRightClear: function handleRightClear() {
      this.handleClear('right');
    },
    handleSelect: function handleSelect(direction, selectedItem, checked) {
      var sourceSelectedKeys = this.sourceSelectedKeys,
          targetSelectedKeys = this.targetSelectedKeys;

      var holder = direction === 'left' ? [].concat(_toConsumableArray(sourceSelectedKeys)) : [].concat(_toConsumableArray(targetSelectedKeys));
      var index = holder.indexOf(selectedItem.key);
      if (index > -1) {
        holder.splice(index, 1);
      }
      if (checked) {
        holder.push(selectedItem.key);
      }
      this.handleSelectChange(direction, holder);

      if (!this.selectedKeys) {
        this.setState(_defineProperty({}, this.getSelectedKeysName(direction), holder));
      }
    },
    handleLeftSelect: function handleLeftSelect(selectedItem, checked) {
      return this.handleSelect('left', selectedItem, checked);
    },
    handleRightSelect: function handleRightSelect(selectedItem, checked) {
      return this.handleSelect('right', selectedItem, checked);
    },
    handleScroll: function handleScroll(direction, e) {
      this.$emit('scroll', direction, e);
    },
    handleLeftScroll: function handleLeftScroll(e) {
      this.handleScroll('left', e);
    },
    handleRightScroll: function handleRightScroll(e) {
      this.handleScroll('right', e);
    },
    getTitles: function getTitles(transferLocale) {
      if (this.titles) {
        return this.titles;
      }
      return transferLocale.titles || ['', ''];
    },
    getSelectedKeysName: function getSelectedKeysName(direction) {
      return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
    },
    getLocale: function getLocale(transferLocale) {
      // Keep old locale props still working.
      var oldLocale = {};
      var notFoundContent = getComponentFromProp(this, 'notFoundContent');
      if (notFoundContent) {
        oldLocale.notFoundContent = notFoundContent;
      }
      if (hasProp(this, 'searchPlaceholder')) {
        oldLocale.searchPlaceholder = this.$props.searchPlaceholder;
      }

      return _extends({}, transferLocale, oldLocale, this.$props.locale);
    },
    renderTransfer: function renderTransfer(transferLocale) {
      var h = this.$createElement;

      var props = getOptionProps(this);
      var _props$prefixCls = props.prefixCls,
          prefixCls = _props$prefixCls === undefined ? 'ant-transfer' : _props$prefixCls,
          disabled = props.disabled,
          _props$operations = props.operations,
          operations = _props$operations === undefined ? [] : _props$operations,
          showSearch = props.showSearch,
          listStyle = props.listStyle,
          operationStyle = props.operationStyle,
          filterOption = props.filterOption,
          lazy = props.lazy;

      var locale = this.getLocale(transferLocale);
      var leftFilter = this.leftFilter,
          rightFilter = this.rightFilter,
          sourceSelectedKeys = this.sourceSelectedKeys,
          targetSelectedKeys = this.targetSelectedKeys,
          $scopedSlots = this.$scopedSlots;
      var body = $scopedSlots.body,
          footer = $scopedSlots.footer;

      var renderItem = props.render;

      var _separateDataSource = this.separateDataSource(this.$props),
          leftDataSource = _separateDataSource.leftDataSource,
          rightDataSource = _separateDataSource.rightDataSource;

      var leftActive = targetSelectedKeys.length > 0;
      var rightActive = sourceSelectedKeys.length > 0;

      var cls = classNames(prefixCls, disabled && prefixCls + '-disabled');

      var titles = this.getTitles(locale);
      return h(
        'div',
        { 'class': cls },
        [h(List, {
          attrs: {
            prefixCls: prefixCls + '-list',
            titleText: titles[0],
            dataSource: leftDataSource,
            filter: leftFilter,
            filterOption: filterOption,

            checkedKeys: sourceSelectedKeys,
            handleFilter: this.handleLeftFilter,
            handleClear: this.handleLeftClear,
            handleSelect: this.handleLeftSelect,
            handleSelectAll: this.handleLeftSelectAll,
            renderItem: renderItem,
            showSearch: showSearch,
            body: body,
            footer: footer,
            lazy: lazy,

            disabled: disabled,
            itemUnit: locale.itemUnit,
            itemsUnit: locale.itemsUnit,
            notFoundContent: locale.notFoundContent,
            searchPlaceholder: locale.searchPlaceholder
          },
          style: listStyle, on: {
            'scroll': this.handleLeftScroll
          }
        }), h(Operation, {
          'class': prefixCls + '-operation',
          attrs: { rightActive: rightActive,
            rightArrowText: operations[0],
            moveToRight: this.moveToRight,
            leftActive: leftActive,
            leftArrowText: operations[1],
            moveToLeft: this.moveToLeft,

            disabled: disabled
          },
          style: operationStyle }), h(List, {
          attrs: {
            prefixCls: prefixCls + '-list',
            titleText: titles[1],
            dataSource: rightDataSource,
            filter: rightFilter,
            filterOption: filterOption,

            checkedKeys: targetSelectedKeys,
            handleFilter: this.handleRightFilter,
            handleClear: this.handleRightClear,
            handleSelect: this.handleRightSelect,
            handleSelectAll: this.handleRightSelectAll,
            renderItem: renderItem,
            showSearch: showSearch,
            body: body,
            footer: footer,
            lazy: lazy,

            disabled: disabled,
            itemUnit: locale.itemUnit,
            itemsUnit: locale.itemsUnit,
            notFoundContent: locale.notFoundContent,
            searchPlaceholder: locale.searchPlaceholder
          },
          style: listStyle, on: {
            'scroll': this.handleRightScroll
          }
        })]
      );
    }
  },
  render: function render() {
    var h = arguments[0];

    return h(LocaleReceiver, {
      attrs: {
        componentName: 'Transfer',
        defaultLocale: defaultLocale.Transfer
      },
      scopedSlots: { 'default': this.renderTransfer }
    });
  }
};

/* istanbul ignore next */
Transfer.install = function (Vue) {
  Vue.component(Transfer.name, Transfer);
};

export default Transfer;