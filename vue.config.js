const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

// vue.config.js
module.exports = {
    //可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: true,

    pages: {
        index: {
            entry: 'src/main.js',
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
        },
    },
    configureWebpack: config => {
        //生产环境取消 console.log
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
        }
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
                target: 'https://www.shengtai.club', //请求本地 需要jeecg-boot后台项目
                ws: false,
                changeOrigin: true,
            },
        },
    },

    lintOnSave: undefined,
};