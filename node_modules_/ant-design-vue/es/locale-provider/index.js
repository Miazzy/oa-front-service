import _extends from 'babel-runtime/helpers/extends';
import PropTypes from '../_util/vue-types';
import * as moment from 'moment';
import interopDefault from '../_util/interopDefault';
import { changeConfirmLocale } from '../modal/locale';

// export interface Locale {
//   locale: string;
//   Pagination?: Object;
//   DatePicker?: Object;
//   TimePicker?: Object;
//   Calendar?: Object;
//   Table?: Object;
//   Modal?: ModalLocale;
//   Popconfirm?: Object;
//   Transfer?: Object;
//   Select?: Object;
//   Upload?: Object;
// }

function setMomentLocale(locale) {
  if (locale && locale.locale) {
    interopDefault(moment).locale(locale.locale);
  } else {
    interopDefault(moment).locale('en');
  }
}

var LocaleProvider = {
  name: 'ALocaleProvider',
  props: {
    locale: PropTypes.object.def({})
  },
  data: function data() {
    return {
      antLocale: _extends({}, this.locale, {
        exist: true
      })
    };
  },
  provide: function provide() {
    return {
      localeData: this.$data
    };
  },

  watch: {
    locale: function locale(val) {
      this.antLocale = _extends({}, this.locale, {
        exist: true
      });
      setMomentLocale(val);
    }
  },
  created: function created() {
    var locale = this.locale;

    setMomentLocale(locale);
    changeConfirmLocale(locale && locale.Modal);
  },
  updated: function updated() {
    var locale = this.locale;

    changeConfirmLocale(locale && locale.Modal);
  },
  beforeDestroy: function beforeDestroy() {
    changeConfirmLocale();
  },
  render: function render() {
    return this.$slots['default'] ? this.$slots['default'][0] : null;
  }
};

/* istanbul ignore next */
LocaleProvider.install = function (Vue) {
  Vue.component(LocaleProvider.name, LocaleProvider);
};

export default LocaleProvider;