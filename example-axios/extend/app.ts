import axios from '../../core-axios/src/index';

interface ResponseData<T = any> {
	code: number;
	result: T;
	message: string;
}
interface User {
	name: string;
	age: number;
}

// 1.
// axios.request({
// 	url: '/extend/get',
// 	method: 'post',
// 	data: {
// 		test: '测试啦啦啦',
// 	},
// });

// 2.
// axios.post('/extend/get', { test: 'hahah' });

// 3.
// axios('/extend/get', {
// 	method: 'post',
// 	data: {
// 		msg: 'hello world',
// 	},
// });

// 4.
function getUser<T>() {
	return axios<ResponseData<T>>('/extend/get', { method: 'post' })
		.then((res) => res.data)
		.catch((err) => console.error(err));
}

async function test() {
	const user = await getUser<User>();
	if (user) {
		console.log('--- user ---', user);
	}
}

test();
