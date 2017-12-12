module.exports = {
    entry: {
        folder: './src/index.js'
    },
    output:{
        filename:'./dist/folder.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                use: 'babel-loader',
            }
        ]
    },
    devtool:'source-map'
}