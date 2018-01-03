import { MSG_LIST, MSG_READ, MSG_RECV } from '../actions/types';

const initState = {
	chatMsg:[],
	users:{},
	unread:0
};
const chatReducer = (state=initState, action) => {
	switch(action.type){
		case MSG_LIST:
			return { ...state, 
				users: action.payload.users,
				chatMsg: action.payload.msgs, 
				unread: action.payload.msgs.filter(val => !val.has_read && val.to === action.payload.userid).length 
			};
		case MSG_RECV:
			const n = action.payload.to === action.userid ? 1 : 0
			return { ...state, chatMsg:[...state.chatMsg, action.payload], unread:state.unread + n };
		case MSG_READ:
			const {fromId, num} = action.payload;
			return  { 
				...state, 
				chatMsg: state.chatMsg.map(val => ({
					...val,
					has_read : fromId === val.from ? true : val.has_read
				})), 
				unread:state.unread - num 
			};
		default:
			return state;
	}
};

export default chatReducer;