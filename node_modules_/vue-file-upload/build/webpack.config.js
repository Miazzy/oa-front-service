var webpack = require("webpack");
var vueLoaderConfig = require('./vue-loader.conf.js')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var { resolve } = require("./loader.js")

module.exports = {
	entry: {
		app: "./demo/index.js"
	},
	output: {
		path: resolve("dist"),
		publicPath: "dist/",
		filename: "[name].js"
	},
	resolve: {
		extensions: [".js", ".vue",".json"],
        modules: [resolve("node_modules")],
        alias:{
            'vue$': 'vue/dist/vue.js'
        }
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
                loader: "vue-loader",
                options: vueLoaderConfig
			},
			{
				test: /\.js$/,
                exclude: /node_modules/,
                include:[resolve('demo'),resolve('src')],
				loader: "babel-loader"
			},
			{
				// edit this for additional asset file types
				test: /\.(png|jpg|gif)$/,
                loader: "file-loader",
                options:{
                    name:"[name].[ext]?[hash]"
                }
			}
		]
    },
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: '"development"'
			}
		}),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
	],
	devtool: "cheap-source-map"
};
