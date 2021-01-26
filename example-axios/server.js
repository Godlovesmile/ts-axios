const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');
const path = require('path');

const app = express();
const compiler = webpack(WebpackConfig);
const router = express.Router();

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: '/__build__/',
		stats: {
			colors: true,
			chunks: false,
		},
	})
);

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use(
// 	express.static(__dirname, {
// 		setHeaders(res) {
// 			console.log('---', res);
// 			res.cookie('XSRF-TOKEN-D', '1234ABC');
// 		},
// 	})
// );

router.get('/simple/get', (req, res) => {
	res.json({ msg: 'hello, world ' });
});
router.get('/base/get', (req, res) => {
	res.json(req.query);
});
router.post('/base/post', (req, res) => {
	res.json(req.body);
});
router.get('/error/get', (req, res) => {
	if (Math.random() > 0.5) {
		res.json({
			msg: `hello world`,
		});
	} else {
		res.status(500);
		res.end();
	}
});
router.get('/error/timeout', function (req, res) {
	setTimeout(() => {
		res.json({
			msg: `hello world`,
		});
	}, 3000);
});
router.post('/extend/get', (req, res) => {
	res.json({ test: '测试extend' });
});
router.get('/interceptor/get', (req, res) => {
	res.json({ data: 1 });
});
router.post('/config/post', (req, res) => {
	res.json({ test: '测试config' });
});
router.get('/cancel/get', (req, res) => {
	res.json({ cancel: '取消测试 get 方式' });
});
router.post('/cancel/post', (req, res) => {
	res.json({ cancel: '取消测试 post 方式' });
});
router.get('/more/get', (req, res) => {
	res.cookie('XSRF-TOKEN-D', '1234ABC');
	res.json({ more: 'more get' });
});
router.post('/more/server', (req, res) => {
	res.json({ more: 'more post' });
});

const multipart = require('connect-multiparty');

app.use(
	multipart({
		uploadDir: path.resolve(__dirname, 'upload-file'),
	})
);

router.post('/more/upload', function (req, res) {
	console.log(req.body, req.files);
	res.end('upload success!');
});

app.use(router);

const port = process.env.PORT || 8080;
module.exports = app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});
