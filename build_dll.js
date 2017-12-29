const path = require('path');
const webpack = require('webpack');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const ProgressPlugin = require('progress-bar-webpack-plugin');
const entrys = require('./config.js').dlls;

const getDllObj = ({ key, list, depends }) => {
    const config = {
        entry: { [key]: list },
        output: {
            path: path.resolve(__dirname, `./dll/${key}`),
            filename: `${key}.js`,
            library: key
        },
        devtool: 'source-map',
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, `./dll/${key}/dll-manifest.json`),
                name: key,
            }),
            new UglifyPlugin(),
            new ProgressPlugin(),
        ]
    };
    if (depends) {
        depends.forEach((itemKey) => {
            config.plugins.push(new webpack.DllReferencePlugin({
                manifest: require(`./dll/${itemKey}/dll-manifest.json`)
            }));
        });
    }
    return config;
};

let i = 0;
(function makeDlls() {
    const item = entrys[i];
    if (!item) return;
    const dll = getDllObj(item);
    console.log(`build ${item.key}...`);
    const compiler = webpack(dll);
    compiler.run((err, stats) => {
        if (err) {
            return console.error(err);
        }

        const jsonStats = stats.toJson();

        if (jsonStats.errors.length > 0) {
            jsonStats.errors.forEach((element) => {
                console.log(element);
            }, this);
        }
        i++;
        makeDlls();
        return 0;
    });
}());
