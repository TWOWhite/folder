const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config.js');

const compile = webpack(config);

const server = new webpackDevServer(compile, {
    publicPath: path.resolve(__dirname, '/'),
    historyApiFallback: true,
});


server.listen(3000);