var webpack = require("webpack");
var vueLoaderConfig = require('./vue-loader.conf.js')

var { resolve } = require("./loader.js")

module.exports = {
	entry: {
		vuefileupload: "./src/vue-file-upload.vue"
	},
	output: {
		path: resolve("production"),
		filename: "[name].min.js",
		library: "vuefileupload",
		libraryTarget: "umd"
	},
	resolve: {
		extensions: [".js", ".vue", ".json"],
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
                include:[resolve('src')],
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
				NODE_ENV: '"production"'
			}
        }),
        new webpack.BannerPlugin({
            banner:"created by marchFantasy",
            raw:false,
            entryOnly:true
        }),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			compress: {
				warnings: false
			}
		}),
	]
};
