
const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist/'),
		filename: 'jsCalendar.js'
	},
	resolve: {
		alias: {
			jsCalendar: 'vue/dist/vue.js'
		}
	}
};
