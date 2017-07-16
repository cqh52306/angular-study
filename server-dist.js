var express = require('express'),
	proxyMiddleware = require('http-proxy-middleware'),
	path = require('path'),
	open = require('open');

	var proxy = proxyMiddleware({
		target : 'https://www.baidu.com',
		changeOrigin : true,
		logLevel : 'debug'
	});


	var app = express();

	app.use(express(path.join(__dirname,'/dist')));

	app.use('/api',proxy);

	app.listen(9999,function(){
		console.log();
	})