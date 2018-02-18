import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../actions/chat-user';
import UserCard from '../components/usercard';

class Tutor extends React.Component{
	componentDidMount(){
		this.props.getUserList('tutor');
	}
	render(){
		return (
			<UserCard userList={this.props.userList} />
		)
	}
}

export default connect(
		state => ({	userList: state.chatUser.userList }),
		{ getUserList }
	)(Tutor);