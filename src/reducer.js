import { combineReducers } from 'redux';
import userReducer from './reducers/user';
import chatUserReducer from './reducers/chat-user';
import chatReducer from './reducers/chat'

export default combineReducers({
	user: userReducer,
	chatUser: chatUserReducer,
	chat: chatReducer
});