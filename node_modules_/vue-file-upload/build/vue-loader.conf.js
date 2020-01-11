
var loader = require('./loader');

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    loaders:loader.css({
        isProduction,
        sourceMap: !isProduction 
    })
}