import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../actions/chat';
import UserCard from '../components/usercard';

class Tutor extends React.Component{
	componentDidMount(){
		this.props.getUserList('student');
	}
	render(){
		return (
			<UserCard userList={this.props.userList} />
		)
	}
}

const mapStateToProps = state => ({	userList: state.chat.userList });

export default connect(
		mapStateToProps,
		{ getUserList }
	)(Tutor);