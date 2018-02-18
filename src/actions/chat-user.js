import axios from 'axios';
import { USER_LIST } from './types';

// add a list of user to application state
const userList = data => ({ type:USER_LIST, payload:data });
// obtain a list of user with the given user type (Async)
const getUserList = type => {
	return dispatch => {
		axios.get(`/chat/users?type=${type}`)
		.then(res => {
			if (res.data.code===0) {
				dispatch(userList(res.data.data));
			}
		})
	};
};

export { userList, getUserList };