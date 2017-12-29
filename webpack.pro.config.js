const path = require('path');
const config=require('./webpack.base.config.js');
const addAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const dlls = require('./config.js').dlls.map(item=>item.key).reverse();

config.module.rules.push({
    test: /\.less?$/,
    use: extractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [
            'css-loader',
            'less-loader',
        ]
    })
});
config.module.rules.push({
    test: /\.css?$/,
    use: extractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [
            'css-loader'
        ]
    })
});

config.plugins.push(new extractTextWebpackPlugin('css/style-[hash].css'));

dlls.forEach(key=>{
    config.plugins.push(new addAssetHtmlPlugin({
        filepath: path.resolve(__dirname, `./dll/${key}/${key}.js`),
        outputPath: './dll',
        publicPath: '/dll/',
        includeSourcemap: false,
    }));
})

config.stats='normal';
config.devtools=null;
module.exports=config;