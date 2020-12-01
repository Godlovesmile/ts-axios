import axios, { AxiosTransformer } from '../../core-axios/src/index';

// 1.
// axios.defaults.headers.common['testCommon'] = 123;

// axios({
// 	url: '/config/post',
// 	method: 'post',
// 	data: JSON.stringify({ a: 1 }),
// 	headers: { test: '321' },
// }).then((res) => {
// 	console.log('--- res ---', res);
// });

// 2. 添加自定义 transformRequest, transformResponse
// axios({
// 	transformRequest: [
// 		function (data) {
// 			return JSON.stringify(data);
// 		},
// 		...(axios.defaults.transformRequest as AxiosTransformer[]),
// 	],
// 	transformResponse: [
// 		...(axios.defaults.transformResponse as AxiosTransformer[]),
// 		function (data) {
// 			if (typeof data === 'object') {
// 				data.b = 2;
// 			}
// 			return data;
// 		},
// 	],
// 	url: '/config/post',
// 	method: 'post',
// 	data: { a: 1 },
// }).then((res) => {
// 	console.log('--- res ---', res);
// });

// 3.
const instance = axios.create({
	transformRequest: [
		function (data) {
			return JSON.stringify(data);
		},
		...(axios.defaults.transformRequest as AxiosTransformer[]),
	],
	transformResponse: [
		...(axios.defaults.transformResponse as AxiosTransformer[]),
		function (data) {
			if (typeof data === 'object') {
				data.b = 2;
			}
			return data;
		},
	],
});

instance({
	url: '/config/post',
	method: 'post',
	data: { c: 2 },
}).then((res) => {
	console.log(res);
});
