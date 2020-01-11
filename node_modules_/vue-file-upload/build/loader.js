var path = require("path");

exports.css = function(options) {
	options = options || {};

	var cssLoader = {
		loader: "css-loader",
		options: {
			minimize: options.isProduction || process.env.NODE_ENV === "production",
			sourceMap: options.sourceMap
		}
	};
    /**
     * 生产loader
     * @param {string} loader  例如 sass,less,stylus
     * @param {*} loaderOptions 
     */
	function generateLoaders(loader, loaderOptions) {
		var loaders = [cssLoader];
		if (loader) {
			loaders.push({
				loader: loader + "-loader",
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap
				})
			});
		}
        //输出css
		
        return ["vue-style-loader"].concat(loaders);
    
	}

	return {
		css: generateLoaders(),
		//stylus: generateLoaders("stylus")
	};
};

exports.resolve = function resolve(dir) {
	return path.join(__dirname, "..", dir);
}
