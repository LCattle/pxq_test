var path = require('path');
var webpack = require('webpack');

//css�������
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//����HTML
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

//__dirname �е�srcĿ¼,�Դ�����
var APP_PATH = path.resolve(ROOT_PATH, 'src');

//��Ŀ¼�ļ�app.jsx ��ַ
var APP_FILE = path.resolve(APP_PATH, 'app');

//�����ļ�����ŵ�Ŀ¼
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
        //����õ��ļ����ڷ�������·�������Ǿ�̬��Դ����·��
        publicPath: '/pxq_test/dist/',
        //���뵽��ǰĿ¼
        path: BUILD_PATH,
        //�������ļ�����
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
                //������뻷��
                NODE_ENV: JSON.stringify('development')
            }
        }),
        //����ģ�����css/js����������HTML
        new HtmlWebpackPlugin({
            //���ɵ�HTML���·���������path
            filename: '../index.html',
            //HTMLģ��·��
            template: './src/template/index.html',
            inject:'body',
            hash: false
        }),
        new ExtractTextPlugin('[name].css'),
        //��ȡ��������ʽ��common.js���Զ���ӽ�����ģʽ��html�ļ��У�ԭ����htmlû��
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
        //��׺���Զ���ȫ
        extensions: ['', '.js', '.jsx', '.scss', '.css']
    }
}