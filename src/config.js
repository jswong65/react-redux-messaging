import axios from 'axios';
import { Toast } from 'antd-mobile';

// request interceptors
axios.interceptors.request.use( config => {
	Toast.loading('loading', 0);
	return config;
})

// response interceptors
axios.interceptors.response.use( config => {
	Toast.hide();
	return config;
})