import axios from '../../core-axios/src/index';

axios.request({
	url: '/extend/get',
	method: 'post',
	data: {
		test: '测试啦啦啦',
	},
});

axios.post('/extend/get', { test: 'hahah' });
