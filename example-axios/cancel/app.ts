import CancelToken from '../../core-axios/src/cancel/CancelToken';
import axios, { AxiosTransformer, Canceler } from '../../core-axios/src/index';

// 1.
// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

// axios
// 	.get('/cancel/get', {
// 		cancelToken: source.token,
// 	})
// 	.catch(function (e) {
// 		console.log('--- get ---', axios.isCancel(e));
// 		if (axios.isCancel(e)) {
// 			console.log('Request canceled', e.message);
// 		}
// 	});

// setTimeout(() => {
// 	source.cancel('operation canceled by the user');

// 	axios
// 		.post('/cancel/post', { a: 1 }, { cancelToken: source.token })
// 		.catch(function (e) {
// 			console.log('--- post ---', axios.isCancel(e));
// 			if (axios.isCancel(e)) {
// 				console.log(e.message);
// 			}
// 		});
// }, 100);

// 2.
let cancel: Canceler;

axios
	.get('/cancel/get', {
		cancelToken: new CancelToken((c) => {
			cancel = c;
		}),
    })
    .then(res => {
        console.log(res)
    })
	.catch(function (e) {
		if (axios.isCancel(e)) {
			console.log('request canceled', e);
		}
	});

setTimeout(() => {
    cancel()
}, 0)