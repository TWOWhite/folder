const path = require('path');
const config = require('./webpack.base.config.js');
const addAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const progressPlugin = require('progress-bar-webpack-plugin');
const dlls = require('./config.js').dlls.map(item=>item.key).reverse();

config.module.rules.push({
    test: /\.less?$/,
    use: ['style-loader', 'css-loader', 'less-loader']
})
config.module.rules.push({
    test: /\.css?$/,
    use: ['style-loader', 'css-loader',]
})

//config.plugins.push(new progressPlugin());

dlls.forEach(key => {
    config.plugins.push(new addAssetHtmlPlugin({
        filepath: path.resolve(__dirname, `./dll/${key}/${key}.js`),
        outputPath: './dll/',
        publicPath: '../dll/',
        includeSourcemap: false,
    }));
});


config.devtool = 'source-map';

module.exports = config;