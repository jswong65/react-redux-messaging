import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../actions/chat-user';
import UserCard from '../components/usercard';

class Student extends React.Component{
	componentDidMount(){
		this.props.getUserList('student');
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
	)(Student);