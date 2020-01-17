//import Vue from 'vue';
import App from './App.vue';
import Storage from 'vue-ls';
import router from './router';
import store from './store/';

import {
    VueAxios
} from '@/utils/request';

import antd from 'ant-design-vue';
import Viser from 'viser-vue';
import 'ant-design-vue/dist/antd.less'; // or 'ant-design-vue/dist/antd.less'

import '@/permission'; // permission control
import '@/utils/filter'; // base filter
import Print from 'vue-print-nb-jeecg';
/*import '@babel/polyfill'*/
import VueApexCharts from 'vue-apexcharts';

import preview from 'vue-photo-preview';
import 'vue-photo-preview/dist/skin.css';
import '@jeecg/antd-onine';
import '@jeecg/antd-onine/dist/OnlineForm.css';

//import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import formCreate from '@form-create/element-ui';

//import EleForm from 'vue-ele-form';
//import F2 from '@antv/f2';

//import axios from 'axios';
import qs from 'qs';

try {
    axios.defaults.headers.post['Content-Type'] =
        'application/x-www-form-urlencoded';
} catch (error) {
    console.log(error);
}

try {
    Vue.prototype.$axios = axios;
    Vue.prototype.$qs = qs;
} catch (error) {
    console.log(error);
}

import {
    ACCESS_TOKEN,
    DEFAULT_COLOR,
    DEFAULT_THEME,
    DEFAULT_LAYOUT_MODE,
    DEFAULT_COLOR_WEAK,
    SIDEBAR_TYPE,
    DEFAULT_FIXED_HEADER,
    DEFAULT_FIXED_HEADER_HIDDEN,
    DEFAULT_FIXED_SIDEMENU,
    DEFAULT_CONTENT_WIDTH_TYPE,
    DEFAULT_MULTI_PAGE,
} from '@/store/mutation-types';
import config from '@/defaultSettings';

import JDictSelectTag from './components/dict/index.js';
import hasPermission from '@/utils/hasPermission';
import vueBus from '@/utils/vueBus';
import JeecgComponents from '@/components/jeecg/index';
import VuePreview from 'vue-preview';


try {
    Vue.config.productionTip = false;
} catch (error) {
    console.log(error);
}

try {
    //Vue注册组件
    Vue.use(Storage, config.storageOptions);
} catch (error) {
    console.log(error);
}

try {
    //注册AntDVue前端组件
    Vue.use(antd);
} catch (error) {
    console.log(error);
}

try {
    Vue.use(VueAxios, router);
} catch (error) {
    console.log(error);
}

try {
    Vue.use(Viser);
} catch (error) {
    console.log(error);
}

try {
    Vue.use(hasPermission);
} catch (error) {
    console.log(error);
}

try {
    Vue.use(JDictSelectTag);
} catch (error) {
    console.log(error);
}

try {
    Vue.use(Print);
} catch (error) {
    console.log(error);
}

try {
    Vue.use(VueApexCharts);
} catch (error) {
    console.log(error);
}

try {
    Vue.component('apexchart', VueApexCharts);
} catch (error) {
    console.log(error);
}

try {
    Vue.use(preview);
} catch (error) {
    console.log(error);
}

try {
    Vue.use(vueBus);
} catch (error) {
    console.log(error);
}

try {
    Vue.use(JeecgComponents);
} catch (error) {
    console.log(error);
}

try {
    //注册ViewUI前端组件
    Vue.use(ViewUI);
} catch (error) {
    console.log(error);
}

try {
    Vue.use(VuePreview, {
        mainClass: 'pswp--minimal--dark',
        barsSize: {
            top: 0,
            bottom: 0,
        },
        captionEl: true,
        fullscreenEl: true,
        shareEl: false,
        bgOpacity: 0.99,
        tapToClose: true,
        tapToToggleControls: false,
    });
} catch (error) {
    console.log(error);
}

try {
    //ElementUI也会注册这个函数，提前改名
    Vue.prototype.$confirm_ = Vue.prototype.$confirm;
    Vue.prototype.$message_ = Vue.prototype.$message;
} catch (error) {
    console.log(error);
}

try {
    //注册ElementUI
    Vue.use(Element);
} catch (error) {
    console.log(error);
}

try {
    //Vue.use(EleForm);
} catch (error) {
    console.log(error);
}

try {
    //注册表单生成控件
    Vue.use(formCreate);
} catch (error) {
    console.log(error);
}

try {
    //注册F2可视化组件
    Vue.use(F2);
} catch (error) {
    console.log(error);
}

new Vue({
    router,
    store,
    mounted() {
        store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, true));
        store.commit('TOGGLE_THEME', Vue.ls.get(DEFAULT_THEME, config.navTheme));
        store.commit(
            'TOGGLE_LAYOUT_MODE',
            Vue.ls.get(DEFAULT_LAYOUT_MODE, config.layout)
        );
        store.commit(
            'TOGGLE_FIXED_HEADER',
            Vue.ls.get(DEFAULT_FIXED_HEADER, config.fixedHeader)
        );
        store.commit(
            'TOGGLE_FIXED_SIDERBAR',
            Vue.ls.get(DEFAULT_FIXED_SIDEMENU, config.fixSiderbar)
        );
        store.commit(
            'TOGGLE_CONTENT_WIDTH',
            Vue.ls.get(DEFAULT_CONTENT_WIDTH_TYPE, config.contentWidth)
        );
        store.commit(
            'TOGGLE_FIXED_HEADER_HIDDEN',
            Vue.ls.get(DEFAULT_FIXED_HEADER_HIDDEN, config.autoHideHeader)
        );
        store.commit(
            'TOGGLE_WEAK',
            Vue.ls.get(DEFAULT_COLOR_WEAK, config.colorWeak)
        );
        store.commit(
            'TOGGLE_COLOR',
            Vue.ls.get(DEFAULT_COLOR, config.primaryColor)
        );
        store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN));
        store.commit('SET_MULTI_PAGE', Vue.ls.get(DEFAULT_MULTI_PAGE, true));
    },
    render: h => h(App),
}).$mount('#app');