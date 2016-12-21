var path = require('path');
var webpack = require('webpack');

//css单独打包
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//生成HTML
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

//__dirname 中的src目录,以此类推
var APP_PATH = path.resolve(ROOT_PATH, 'src');

//根目录文件app.jsx 地址
var APP_FILE = path.resolve(APP_PATH, 'app');

//发布文件所存放的目录
var BUILD_PATH = path.resolve(ROOT_PATH, '/pxq_test/dist');

module.exports = {
    entry: {
        app: APP_FILE,
        common: [
            'react',
            'react-dom',
            'react-router',
            'redux',
            'react-redux',
            'redux-thunk',
            'immutable'
        ]
    },
    output: {
        //编译好的文件，在服务器的路径，这是静态资源引用路径
        publicPath: '/pxq_test/dist/',
        //编译到当前目录
        path: BUILD_PATH,
        //编译后的文件名字
        filename: '[name].js',
        //
        chunkFilename: '[name].[chunkhash:8].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                loader: 'babel',
                include: [APP_PATH]
            },
            {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer']),
                include: [APP_PATH]
            },
            {
                test:/\.scss$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'sass']),
                include: [APP_PATH]
            },
            {
                test:/\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].ext',
                include: [APP_PATH]
            },
            {
                test: /\.jsx$/,
                exclude:/^node_modules$/,
                loaders: ['jsx', 'babel'],
                include: [APP_PATH]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                //定义编译环境
                NODE_ENV: JSON.stringify('development')
            }
        }),
        //根据模板插入css/js等生成最终HTML
        new HtmlWebpackPlugin({
            //生成的HTML存放路径，相对于path
            filename: '../index.html',
            //HTML模板路径
            template: './src/template/index.html',
            inject:'body',
            hash: false
        }),
        new ExtractTextPlugin('[name].css'),
        //提取出来的样式和common.js会自动添加进发布模式的html文件中，原来的html没有
        new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js'),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        //后缀名自动补全
        extensions: ['', '.js', '.jsx', '.scss', '.css']
    }
}