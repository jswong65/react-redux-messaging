import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

class MessageList extends React.Component{
	getLastMessage = (arr) => {
		return arr[arr.length - 1];
	} 
	render(){
		if (!this.props.chat.chatMsg.length) {
			return null;
		}

		const Item = List.Item;
		const Brief = Item.Brief;
		const userId = this.props.user._id;
		const msgGroup = {};
		this.props.chat.chatMsg.forEach(val => {
			msgGroup[val.chatId] = msgGroup[val.chatId] || [];
			msgGroup[val.chatId].push(val);
		})
		console.log(userId);
		console.log(msgGroup);
		const chatList = Object.values(msgGroup).sort((a, b) => {
			const a_last = this.getLastMessage(a).create_time;
			const b_last = this.getLastMessage(b).create_time;
			return b_last - a_last;
		});
		console.log(chatList)
		return (
			<div >
					{chatList.map(val => {
						const lastItem = this.getLastMessage(val);
						const targetId = lastItem.from === userId ? lastItem.to : lastItem.from;
						const unreadNum = val.filter(v => !v.has_read && v.to === userId).length;
						const name = this.props.chat.users[targetId] && this.props.chat.users[targetId].username;
						const avatar = this.props.chat.users[targetId] && this.props.chat.users[targetId].avatar;
						return (
							<List key={ lastItem._id }>
								<Item
									extra={<Badge text={ unreadNum } />}
									thumb={require(`../../static/images/avatar/${avatar}.png`)}
									arrow="horizontal"
									onClick={() => {
										this.props.history.push(`/chat/${targetId}`);
									}}
								>
									{ lastItem.content }
									<Brief>{ name }</Brief>
								</Item>
							</List>
						)
					})}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user,
	chat: state.chat
});

export default connect(mapStateToProps)(MessageList);