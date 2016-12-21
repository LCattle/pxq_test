var webpack  = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.hot');

//���������
var proxy = [{
    path: '/*/*',   //�������һ���ļ���ַ����������ļ������ֲ�ͬ������/*����
    target: 'http://shopro.putaoevent.com',
    host: 'shopro.putaoevent.com',
    secure: false
}];

var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    inline: true,
    progress: true,
    stats:{
        colors: true
    },
    proxy
});

//������·�ɣ�ȫ������index.html
server.app.get('*', function(req, res){
    res.sendFile(__dirname + '/index.html')
});
server.listen('8081', function(){
    console.log('������8081�˿�')
})
