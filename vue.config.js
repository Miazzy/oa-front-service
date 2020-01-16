const path = require('path');
const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CompressionWebpackPlugin = require('compression-webpack-plugin');
//const productionGzipExtensions = ['js', 'css'];
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
    },
    css: [],
    js: [
        '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
        '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
        '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
        '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
    ],
};

// vue.config.js
const vueConfig = {
    configureWebpack: {
        // webpack plugins
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ],
        // if prod, add externals
        externals: isProd ? assetsCDN.externals : {},
    },

    pages: {
        index: {
            entry: 'src/main.js',
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
        },
    },

    chainWebpack: config => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@comp', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@layout', resolve('src/layout'))
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
        // if prod is on
        // assets require on cdn
        if (isProd) {}
    },

    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    // less vars，customize ant design theme
                    // 'primary-color': '#F5222D',
                    // 'link-color': '#F5222D',
                    // 'border-radius-base': '4px'
                },
                // DO NOT REMOVE THIS LINE
                javascriptEnabled: true,
            },
        },
    },

    devServer: {
        port: 3000,
        proxy: {
            '/jeecg-boot': {
                target: 'https://www.shengtai.club', //请求本地 需要jeecg-boot后台项目
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
    // add `ThemeColorReplacer` plugin to webpack plugins
    //vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin());
}

// vue.config.js
module.exports = vueConfig;