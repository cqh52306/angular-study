'use strict';

process.argv.push('--dev');

var webpack = require('webpack'),
webpackDevServer = require('webpack-dev-server'),
webpackConfig = require('./webpack.config'),
devServerConfig = webpackConfig.devServer,
port = webpackConfig.devServer.port,
open = require('open');

new webpackDevServer(webpack(webpackConfig),devServerConfig).
	listen(port,'0.0.0.0',function(err){
		if(err){
			console.log(err);
		}
		console.log('开发服务器端口：'+ port);
		console.log('webpack正在编译，打开浏览器中...');
		open('http://localhost:' + port + '/webpack-dev-server/');
	});