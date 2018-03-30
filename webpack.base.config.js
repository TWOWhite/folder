const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dlls = require('./config.js').dlls.map(item => item.key);

const config = {
    entry: {
        app: ['babel-polyfill', './src/index.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: ['babel-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name]-[hash].[ext]'
                    }
                }]
            }
        ]
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist/'),
        publicPath: '/'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve('./src/index.html'),
            hash: false,
            filename: 'index.html',
            inject: 'body'
        }),
    ],
    stats: "errors-only",
    resolve: {
        extensions: ['.jsx', '.less', '.js']
    }
};

dlls.forEach(key => {
    config.plugins.push(new webpack.DllReferencePlugin({
        manifest: require(`./dll/${key}/dll-manifest.json`)
    }))
})

module.exports = config;
