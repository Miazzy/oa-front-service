import _extends from 'babel-runtime/helpers/extends';
import * as moment from 'moment';
import Calendar from '../vc-calendar';
import VcDatePicker from '../vc-calendar/src/Picker';
import Icon from '../icon';
import { hasProp, getOptionProps, initDefaultProps, getComponentFromProp, isValidElement } from '../_util/props-util';
import BaseMixin from '../_util/BaseMixin';
import { WeekPickerProps } from './interface';
import interopDefault from '../_util/interopDefault';
import { cloneElement } from '../_util/vnode';

function formatValue(value, format) {
  return value && value.format(format) || '';
}
function noop() {}

export default {
  // static defaultProps = {
  //   format: 'YYYY-wo',
  //   allowClear: true,
  // };

  // private input: any;
  name: 'AWeekPicker',
  mixins: [BaseMixin],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: initDefaultProps(WeekPickerProps(), {
    format: 'gggg-wo',
    allowClear: true
  }),
  data: function data() {
    var value = this.value || this.defaultValue;
    if (value && !interopDefault(moment).isMoment(value)) {
      throw new Error('The value/defaultValue of DatePicker or MonthPicker must be ' + 'a moment object');
    }
    return {
      _value: value,
      _open: this.open
    };
  },

  watch: {
    value: function value(val) {
      this.setState({ _value: val });
    },
    open: function open(val) {
      this.setState({ _open: val });
    }
  },

  methods: {
    weekDateRender: function weekDateRender(current) {
      var h = this.$createElement;

      var selectedValue = this.$data._value;
      var prefixCls = this.prefixCls;

      if (selectedValue && current.year() === selectedValue.year() && current.week() === selectedValue.week()) {
        return h(
          'div',
          { 'class': prefixCls + '-selected-day' },
          [h(
            'div',
            { 'class': prefixCls + '-date' },
            [current.date()]
          )]
        );
      }
      return h(
        'div',
        { 'class': prefixCls + '-date' },
        [current.date()]
      );
    },
    handleChange: function handleChange(value) {
      if (!hasProp(this, 'value')) {
        this.setState({ _value: value });
      }
      this.$emit('change', value, formatValue(value, this.format));
    },
    handleOpenChange: function handleOpenChange(open) {
      if (!hasProp(this, 'open')) {
        this.setState({ _open: open });
      }
      this.$emit('openChange', open);

      if (!open) {
        this.focus();
      }
    },
    clearSelection: function clearSelection(e) {
      e.preventDefault();
      e.stopPropagation();
      this.handleChange(null);
    },
    focus: function focus() {
      this.$refs.input.focus();
    },
    blur: function blur() {
      this.$refs.input.blur();
    }
  },

  render: function render() {
    var h = arguments[0];

    var props = getOptionProps(this);
    var suffixIcon = getComponentFromProp(this, 'suffixIcon');
    suffixIcon = Array.isArray(suffixIcon) ? suffixIcon[0] : suffixIcon;
    var prefixCls = this.prefixCls,
        disabled = this.disabled,
        pickerClass = this.pickerClass,
        popupStyle = this.popupStyle,
        pickerInputClass = this.pickerInputClass,
        format = this.format,
        allowClear = this.allowClear,
        locale = this.locale,
        localeCode = this.localeCode,
        disabledDate = this.disabledDate,
        $data = this.$data,
        $listeners = this.$listeners,
        $scopedSlots = this.$scopedSlots;
    var pickerValue = $data._value,
        open = $data._open;
    var _$listeners$focus = $listeners.focus,
        focus = _$listeners$focus === undefined ? noop : _$listeners$focus,
        _$listeners$blur = $listeners.blur,
        blur = _$listeners$blur === undefined ? noop : _$listeners$blur;


    if (pickerValue && localeCode) {
      pickerValue.locale(localeCode);
    }

    var placeholder = hasProp(this, 'placeholder') ? this.placeholder : locale.lang.placeholder;
    var weekDateRender = this.dateRender || $scopedSlots.dateRender || this.weekDateRender;
    var calendar = h(Calendar, {
      attrs: {
        showWeekNumber: true,
        dateRender: weekDateRender,
        prefixCls: prefixCls,
        format: format,
        locale: locale.lang,
        showDateInput: false,
        showToday: false,
        disabledDate: disabledDate
      }
    });
    var clearIcon = !disabled && allowClear && $data._value ? h(Icon, {
      attrs: {
        type: 'close-circle',

        theme: 'filled'
      },
      'class': prefixCls + '-picker-clear',
      on: {
        'click': this.clearSelection
      }
    }) : null;

    var inputIcon = suffixIcon && (isValidElement(suffixIcon) ? cloneElement(suffixIcon, {
      'class': prefixCls + '-picker-icon'
    }) : h(
      'span',
      { 'class': prefixCls + '-picker-icon' },
      [suffixIcon]
    )) || h(Icon, {
      attrs: { type: 'calendar' },
      'class': prefixCls + '-picker-icon' });

    var input = function input(_ref) {
      var value = _ref.value;

      return h(
        'span',
        { style: { display: 'inline-block', width: '100%' } },
        [h('input', {
          ref: 'input',
          attrs: { disabled: disabled,
            readOnly: true,

            placeholder: placeholder
          },
          domProps: {
            'value': value && value.format(format) || ''
          },
          'class': pickerInputClass,
          on: {
            'focus': focus,
            'blur': blur
          }
        }), clearIcon, inputIcon]
      );
    };
    var vcDatePickerProps = {
      props: _extends({}, props, {
        calendar: calendar,
        prefixCls: prefixCls + '-picker-container',
        value: pickerValue,
        open: open
      }),
      on: _extends({}, $listeners, {
        change: this.handleChange,
        openChange: this.handleOpenChange
      }),
      style: popupStyle
    };
    return h(
      'span',
      { 'class': pickerClass },
      [h(
        VcDatePicker,
        vcDatePickerProps,
        [input]
      )]
    );
  }
};