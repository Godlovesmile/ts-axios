import axios from '../../core-axios/src/index';

// 1. 数组参数
// axios({
// 	method: 'get',
// 	url: '/base/get',
// 	params: {
// 		test: ['ylz', 'bar'],
// 	},
// });

// 2. 对象参数
// axios({
// 	method: 'get',
// 	url: '/base/get',
// 	params: {
// 		test: { ylz: 'nameylz' },
// 	},
// });

// 3. 参数含时间对象 Date 的处理
// const date = new Date();

// axios({
// 	method: 'get',
// 	url: '/base/get',
// 	params: {
// 		date,
// 	},
// });

// 4.
// axios({
// 	method: 'get',
// 	url: '/base/get',
// 	params: {
// 		foo: '@:$, ',
// 	},
// });

// 5.
// axios({
// 	method: 'get',
// 	url: '/base/get',
// 	params: {
// 		foo: 'bar',
// 		baz: null,
// 	},
// });

// 6.
// axios({
// 	method: 'get',
// 	url: '/base/get#hash',
// 	params: {
// 		foo: 'bar',
// 	},
// });

// 7.
// axios({
// 	method: 'get',
// 	url: '/base/get?foo=bar',
// 	params: {
// 		bar: 'baz',
// 	},
// });

// 8.
// axios({
// 	method: 'post',
// 	url: '/base/post',
// 	data: {
// 		a: 1,
// 		b: 2,
// 	},
// });

// 9.
// axios({
// 	method: 'post',
// 	url: '/base/post',
// 	headers: {
// 		'content-type': 'application/json;',
// 	},
// 	data: {
// 		a: 1,
// 		b: 2,
// 	},
// });

// 10.
axios({
	method: 'post',
	url: '/base/post',
	data: {
		a: 1,
		b: 2,
	},
}).then((res) => {
	console.log(res);
});

// 11.
axios({
	method: 'post',
	url: '/base/post',
	responseType: 'json',
	data: {
		a: 3,
		b: 4,
	},
}).then((res) => {
	console.log(res);
});
