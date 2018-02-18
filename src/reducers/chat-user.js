import { USER_LIST } from '../actions/types';

const initState = {
	userList:[]
}
const chatReducer = (state=initState, action) => {
	switch(action.type){
		case USER_LIST:
			return { ...state, userList:action.payload };
		default:
			return state;
	}

} 

export default chatReducer;