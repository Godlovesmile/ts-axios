const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use(router);

const port = process.env.PORT || 8080;
module.exports = app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});
