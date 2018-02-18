import axios from 'axios';
import { AUTH_SUCCESS, LOAD_DATA, ERROR_MSG, LOGOUT } from './types';

// add errors message application state (register or login)
const eorrorMsg = (msg) => ({ msg, type:ERROR_MSG });
// successful authentication (register or login)
const authSuccess = (data) => ({ type: AUTH_SUCCESS, payload: data});
// add userInfo to application state
const loadData = (userInfo) => ({ type: LOAD_DATA, payload: userInfo});
// clear the application state for user. 
const logoutSubmit = () => ({ type:LOGOUT });
// update user info (Async)
const profileUpdate = (data) => {
	return async dispatch => {
		const res = await axios.put('/user/update', data)
		if (res.status === 200 && res.data.code === 0){
				dispatch(authSuccess(res.data.data));
			}else{
				dispatch(eorrorMsg(res.data.msg));
			}
	};
};
// action for log in (Async)
const login = ({username, passwd} = {}) => {
	if (!username || !passwd) {
		return eorrorMsg('username and password are required');
	}
	return async dispatch => {
		const res = await axios.post('/user/login', {username, passwd});
		if (res.status === 200 && res.data.code === 0){
			dispatch(authSuccess(res.data.data))
		}else{
			dispatch(eorrorMsg(res.data.msg));
		}
	};
}
// action for registration (Async)
const register = ({username, passwd, confirmpasswd, type} = {}) => {
	if (!username || !passwd || !type){
		return eorrorMsg('please enter the required info!');
	} else if (passwd !== confirmpasswd) {
		return eorrorMsg('passwords not matched!');
	}
	return async dispatch => {
		const res = await axios.post('/user/register', {username, passwd, type});
		if (res.status === 200 && res.data.code === 0){
			dispatch(authSuccess({username, passwd, type}));
		}else{
			dispatch(eorrorMsg(res.data.msg));
		}
	};
};

export {register, login, loadData, profileUpdate, logoutSubmit};