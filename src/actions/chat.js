import axios from 'axios';
import io from 'socket.io-client';
import { MSG_LIST, MSG_READ, MSG_RECV } from '../actions/types';

const socket = io('ws://localhost:9093');

const readMsg = fromId => {
	return (dispatch, getState) => {
		axios.post('/user/readmsg', {fromId})
			.then(res => {
				const userId = getState().user._id;
				if (res.status === 200 && res.data.code === 0) {
					dispatch(msgRead({ fromId, userId, num: res.data.num }))
				}
			})
	}
};
const sendMsg = ({ from, to, msg }) => {
	return dispatch => {
		socket.emit('sendMsg', {from, to, msg});
	}
};
const recvMsg = () => {
	return (dispatch, getState) => {
		socket.on('recvmsg', data => {
			const userid = getState().user._id;
			dispatch(msgRecv(data, userid));
		})
	}
};
const getMsgList = () => {
	return (dispatch, getState) => {
		axios.get('/user/msglist')
			.then(res => {
				if (res.status === 200 && res.data.code === 0){
					const userid = getState().user._id;
					dispatch(msgList(res.data.msgs, res.data.users, userid));
				}
			})
	}
};

// action creators
const msgList = (msgs, users, userid) => { 
	return {type:MSG_LIST, payload:{msgs, users, userid}};
};
const msgRecv = (msg, userid) => {
	return { type:MSG_RECV, payload:msg, userid };
}
const msgRead = ({fromId, userId, num}) => {
	return { type:MSG_READ, payload: {fromId, userId, num} };
}
export { getMsgList, sendMsg, recvMsg, readMsg};