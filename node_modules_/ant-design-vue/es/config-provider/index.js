import PropTypes from '../_util/vue-types';

var ConfigProvider = {
  name: 'AConfigProvider',
  props: {
    getPopupContainer: PropTypes.func
  },
  provide: function provide() {
    return {
      configProvider: this.$props
    };
  },
  render: function render() {
    return this.$slots['default'] ? this.$slots['default'][0] : null;
  }
};

/* istanbul ignore next */
ConfigProvider.install = function (Vue) {
  Vue.component(ConfigProvider.name, ConfigProvider);
};

export default ConfigProvider;