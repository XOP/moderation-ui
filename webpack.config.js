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
        modulesDirectories: ['node_modules', paths.js.src + '/app', paths.js.src + '/lib'],
        alias: {}
    },
    module: {
        noParse: [],
        preLoaders: [
            {test: /modernizr-custom\.js$/, loaders: ['script-loader']},
            {test: /hammer\.js$/, loaders: ['script-loader']}
        ],
        loaders: [
//            {
//                test: /\.js$/,
//                exclude: [
//                    path.resolve(__dirname, "assets/js/lib"),
//                    /node_modules/
//                ],
//                loader: 'eslint-loader'
//            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {test: /\.json$/, loaders: ['json-loader']}
        ]
    },

    debug: true
};

module.exports = config;
