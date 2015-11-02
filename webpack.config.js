var webpack = require('webpack');
var path = require('path');
var paths = require('./config.json').paths;
var srcPath = path.join(__dirname, paths.js.src);

var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp(path));
    },
    entry: path.join(srcPath, 'index.js'),
    output: {
        path: path.join(__dirname, paths.js.dest),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    resolve: {
        root: srcPath,
        extensions: ['', '.js', '.jsx', '.json', '.html'],
        modulesDirectories: ['node_modules', paths.js.src + '/app'],
        alias: {}
    },
    module: {
        noParse: [],
        loaders: [
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {test: /\.jsx$/, loaders: ['jsx-loader', 'imports-loader?React=react&ReactDOM=react-dom']},
            {test: /\.json$/, loaders: ['json-loader']}
        ]
    },

    debug: true
};

module.exports = config;