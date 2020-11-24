import axios from '../../core-axios/src/index';

axios.interceptors.request.use((config) => {
	config.headers.test += '1';
	return config;
});
axios.interceptors.response.use((res) => {
	res.data.data += '111';
	return res;
});
const two_interceptor = axios.interceptors.response.use((res) => {
	res.data.data += '222';
	return res;
});
axios.interceptors.response.use((res) => {
	res.data.data += '333';
	return res;
});

axios.interceptors.response.eject(two_interceptor);

axios({
	url: '/interceptor/get',
	method: 'get',
	params: { age: 12 },
	headers: {
		test: '',
	},
}).then((res) => {
	console.log(res);
});
