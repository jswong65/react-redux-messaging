import { getRedirectPath } from '../utils';
import { AUTH_SUCCESS, LOAD_DATA, ERROR_MSG, LOGOUT } from '../actions/types';

const initState = {
	redirectTo:'',
	msg:'',
	username:'',
	type:''
};

const userReducer = (state=initState, action) => {
	switch(action.type){
		case AUTH_SUCCESS:
			return { ...state, msg: '', redirectTo:getRedirectPath(action.payload), ...action.payload }; 
		case LOAD_DATA:
			return { ...state, ...action.payload };
		case LOGOUT:
			return { ...initState, redirectTo:'/login' };
		case ERROR_MSG:
			return { ...state, isAuth: false, msg: action.msg };
		default:
			return state
	}
};

export default userReducer;
