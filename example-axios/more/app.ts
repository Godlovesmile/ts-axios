import axios from '../../core-axios/src/index';

// 1.
// document.cookie = 'a=b'

// axios.get('/more/get').then((res) => {
// 	console.log(res);
// });

// axios.post('http://127.0.0.1:8088/more/server2', {}, {
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })

// 2.
// const instance = axios.create({
// 	xsrfCookieName: 'XSRF-TOKEN-D',
// 	xsrfHeaderName: 'X-XSRF-TOKEN-D',
// 	withCredentials: true,
// });

// instance.get('/more/get').then((res) => {
// 	console.log(res);
// });

// 3.
// const instance = axios.create();

// function calculatePercentage(loaded: number, total: number): number {
// 	return Math.floor(loaded) / total;
// }

// function loadProgressBar() {
// 	setupStartProgress();
// 	setupUpdateProgress();
// 	setupStopProgress();

// 	function setupStartProgress() {
// 		instance.interceptors.request.use((config) => {
// 			NProgress.start();
// 			return config;
// 		});
// 	}

// 	function setupUpdateProgress() {
// 		const update = (e: ProgressEvent) => {
// 			console.log(e);
// 			NProgress.set(calculatePercentage(e.loaded, e.total));
// 		};
// 		instance.defaults.onDownloadProgress = update;
// 		instance.defaults.onUploadProgress = update;
// 	}

// 	function setupStopProgress() {
// 		instance.interceptors.response.use(
// 			(response) => {
// 				NProgress.done();
// 				return response;
// 			},
// 			(error) => {
// 				NProgress.done();
// 				return Promise.reject(error);
// 			}
// 		);
// 	}
// }

// loadProgressBar();

// const downloadEl = document.getElementById('download');

// downloadEl!.addEventListener('click', (e) => {
// 	instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg');
// });

// const uploadEl = document.getElementById('upload');

// uploadEl!.addEventListener('click', (e) => {
// 	const data = new FormData();
// 	const fileEl = document.getElementById('file') as HTMLInputElement;
// 	if (fileEl.files) {
// 		data.append('file', fileEl.files[0]);

// 		instance.post('/more/upload', data);
// 	}
// });

// 4. 自定义参数序列化
// axios
// 	.get('/more/get', { params: new URLSearchParams('a=b&c=d') })
// 	.then((res) => {
// 		console.log(res);
// 	});

// axios
// 	.get('/more/get', { params: { a: 1, b: 2, c: ['a', 'b', 'c'] } })
// 	.then((res) => {
// 		console.log(res);
// 	});

// const instance = axios.create({
// 	paramsSerializer(params) {
// 		return JSON.stringify(params, { arrayFormat: 'brackets' });
// 	},
// });

// instance
// 	.get('/more/get', {
// 		params: {
// 			a: 1,
// 			b: 2,
// 			c: ['a', 'b', 'c'],
// 		},
// 	})
// 	.then((res) => {
// 		console.log(res);
// 	});

// 5. baseURL
// const instance = axios.create({ baseURL: 'https://img.mukewang.com/' });

// instance.get('5cc01a7b0001a33718720632.jpg');

// instance.get(
// 	'https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg'
// );

// 6. 静态方法扩展
const fakeConfig = {
	baseURL: 'https://www.baidu.com/',
	url: '/user/12345',
	params: {
		idClient: 1,
		idTest: 2,
		testString: 'thisIsATest',
	},
};
console.log(axios.getUri(fakeConfig));
