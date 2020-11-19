import axios, { AxiosError } from '../../core-axios/src/index';

// 1.
// axios({
// 	method: 'get',
// 	url: '/error/get',
// })
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

// 2.
// setTimeout(() => {
// 	axios({
// 		method: 'get',
// 		url: '/error/get',
// 	})
// 		.then((res) => {
// 			console.log(res);
// 		})
// 		.catch((e) => {
// 			console.log(e);
// 		});
// }, 5000);

// 3.
axios({
	method: 'get',
	url: '/error/timeout',
	timeout: 2000,
})
	.then((res) => {
		console.log(res);
	})
	.catch((e: AxiosError) => {
		console.log(e.message);
		console.log(e.code);
	});
