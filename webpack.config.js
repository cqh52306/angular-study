var path = require('path'),
    arg = process.argv[2],
    dfltPort = 8282,
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    isDevMode = arg && arg === '--dev',
    publicPath = '/assets/';

var config = {
    entry: isDevMode ? [
        'webpack-dev-server/client?http://127.0.0.1:' + dfltPort,
        'webpack/hot/only-dev-server', './src/app',
    ] : './src/app',
    cache: isDevMode,
    output: {
        path: path.join(__dirname, '/dist/assets'),
        filename: 'app.js',
        publicPath: publicPath
    },
    devServer: {
        contentBase: './src/',
        histroyApiFallback: true,
        port: dfltPort,
        publicPath: publicPath,
        noInfo: false,
        /*proxy : {
         '/api/*' : {
         target : 'https://scout.sf-pay.com'
         }
         }*/
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.css$/,
                loader: isDevMode ? 'style-loader!css-loader!postcss-loader' : ExtractTextPlugin('style-loader', 'css-loader', 'post-css-loader')
            }, {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
            }, {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader?limit=8192&name=images/[name].[ext]'
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loader: 'file-loader?prefix=fonts/&name=fonts/[name].[ext]'
            }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()//允许错误不打断程序
    ]
}

if (!isDevMode) {
    config.plugins = [
        new ExtractTextPlugin("styles/style.css"),
        new HtmlWebpackPlugin({
            template: 'src/prod.html',
            filename: '../index.html',
            inject: 'body'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            conpress: {
                warnings: false
            },
            mangle: false
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin()//允许错误不打断程序
    ];
} else {


}

module.exports = config;