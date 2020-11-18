import axios from '../../core-axios/src/index';

axios({
	method: 'get',
	url: '/simple/get',
	params: {
		a: 1,
		b: 2,
	},
});
