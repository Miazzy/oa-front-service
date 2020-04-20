const path = require('path');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = [
    'js',
    'css',
    'html',
    'svg',
    'png',
    'less',
    'jpg',
    'jpeg',
    'woff',
    'ttf',
    'woff2',
    'ico',
];
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//const createThemeColorReplacerPlugin = require('./config/plugin.config');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const isProd = process.env.NODE_ENV === 'production';

const assetsCDN = {
    // webpack build externals
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        jquery: '$',
        underscore: '_',
        superagent: 'superagent',
        qs: 'qs',
        moment: 'moment',
        dayjs: 'dayjs',
        'vue-apexcharts': 'VueApexCharts',
        'element-ui': 'Element',
        nprogress: 'NProgress',
        'ant-design-vue': 'antd',
        'mavon-editor': 'MavonEditor',
        'bpmn-js': 'BpmnViewer',
        md5: 'md5',
    },
    css: [],
    js: [],
};
// 'codemirror': 'CodeMirror',
// 'view-design': 'iview',
// 'vue-photo-preview': 'preview',
//lodash: 'lodash',

// vue.config.js
const vueConfig = {
    configureWebpack: {
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: productionGzipExtensions,
                threshold: 0,
                minRatio: 0.8,
            }),
        ],
        externals: assetsCDN.externals,
    },

    pages: {
        index: {
            entry: 'src/main.js',
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
        },
    },

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@comp', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@layout', resolve('src/layout'))
            .set('@config', resolve('src/config'))
            .set('@mixins', resolve('src/mixins'))
            .set('@static', resolve('src/static'));

        const svgRule = config.module.rule('svg');
        svgRule.uses.clear();
        svgRule
            .oneOf('inline')
            .resourceQuery(/inline/)
            .use('vue-svg-icon-loader')
            .loader('vue-svg-icon-loader')
            .end()
            .end()
            .oneOf('external')
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'assets/[name].[hash:8].[ext]',
            });

        //判断是否为生产环境
        if (isProd) {
            console.log('当前环境为生产环境');
        }
    },

    css: {
        loaderOptions: {
            less: {
                modifyVars: {},
                javascriptEnabled: true,
            },
        },
    },

    devServer: {
        port: 3000,
        proxy: {
            '/jeecg-boot': {
                //请求本地 需要jeecg-boot后台项目
                target: 'https://www.shengtai.club',
                ws: true,
                changeOrigin: true,
            },
        },
    },

    //可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    //保存时提示
    lintOnSave: undefined,
    // babel-loader no-ignore node_modules/*
    transpileDependencies: [],
};

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
    console.log('VUE_APP_PREVIEW', true);
}

// vue.config.js
module.exports = vueConfig;