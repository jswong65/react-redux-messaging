import axios from 'axios';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOAD_DATA, ERROR_MSG } from './types';

const eorrorMsg = (msg) => ({ msg, type:ERROR_MSG });
const registerSuccess = (data) => ({ type: REGISTER_SUCCESS, payload: data});
const loginSuccess = (data) => ({ type: LOGIN_SUCCESS, payload: data});
const loadData = (userInfo) => ({ type: LOAD_DATA, payload: userInfo});

const login = ({username, passwd} = {}) => {
	if (!username || !passwd) {
		return eorrorMsg('username and password are required');
	}
	return dispatch => {
		axios.post('/user/login', {username, passwd})
		.then(res => {
			if (res.status === 200 && res.data.code === 0){
				dispatch(loginSuccess(res.data.data))
			}else{
				dispatch(eorrorMsg(res.data.msg));
			}
		});
	}
}

const register = ({username, passwd, confirmpasswd, type} = {}) => {
	if (!username || !passwd || !type){
		return eorrorMsg('please enter the required info!');
	} else if (passwd !== confirmpasswd) {
		return eorrorMsg('passwords not matched!');
	}
	return dispatch => {
		axios.post('/user/register', {username, passwd, type})
		.then(res => {
			if (res.status === 200 && res.data.code === 0){
				dispatch(registerSuccess({username, passwd, type}));
			}else{
				dispatch(eorrorMsg(res.data.msg));
			}
		});
	}
};

export {register, login, loadData};