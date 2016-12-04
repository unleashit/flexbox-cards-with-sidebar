var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var NODE_ENV = process.env.NODE_ENV || 'development';
var devtoolConfig = (NODE_ENV === 'production') ? false : '#source-map';

console.log('node_env: ' + NODE_ENV);
console.log('devtool config: ' + devtoolConfig);

var configuration = {

    devtool: devtoolConfig,

    entry: {
        global: ['babel-polyfill', './app/modules/communityNews/index.js']
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].min.js',
        publicPath: ''
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader?sourceMap'
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap',
                    includePaths: [path.resolve(__dirname, './app/scss')]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file-loader?hash=sha512&digest=hex&name=images/[name].[ext]']
            },
            {
                test: /\.(eot|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app', 'index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin('css/[name].min.css'),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: '/',
                postcss: [
                    require('autoprefixer')({
                        browsers: ['> 2%', 'IE 10']
                    })
                ]
            }
        }),
        new CopyWebpackPlugin([
            {context: './images', from: '*.jpg', to: 'images'},
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        }),
        new BrowserSyncPlugin(
            // BrowserSync options
            {
                host: 'localhost',
                port: 3100,
                proxy: 'http://localhost:8080',
                browser: process.platform === 'win32' ? 'chrome' : 'google chrome',
                files: [
                    'app/**/*.html',
                    'app/**/*.js',
                    'app/**/*.scss'
                ],
            },
            // plugin options
            {
                reload: true
            }
        )
    ]
};

module.exports = configuration;
