import { getRedirectPath } from '../utils';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOAD_DATA, ERROR_MSG } from '../actions/types';

const initState = {
	redirectTo:'',
	isAuth: false,
	msg:'',
	username:'',
	type:''
};

const userReducer = (state=initState, action) => {
	switch(action.type){
		case REGISTER_SUCCESS:
			return {...state, msg: '', redirectTo:getRedirectPath(action.payload), isAuth: true, ...action.payload};
		case LOGIN_SUCCESS:
			return {...state, msg: '', redirectTo:getRedirectPath(action.payload), isAuth: true, ...action.payload}; 
		case LOAD_DATA:
			return {...state, ...action.payload}
		case ERROR_MSG:
			return {...state, isAuth: false, msg: action.msg}
		default:
			return state
	}
};

export default userReducer;
