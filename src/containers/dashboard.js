import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { Redirect, Route, Switch } from 'react-router-dom';
import NavLinkBar from '../components/navlinkbar';
import Tutor from './tutor-list';
import Student from './student-list';
import Profile from './profile';
import MessageList from './message-list';
import { getMsgList, recvMsg } from '../actions/chat';
import QueueAnim from 'rc-queue-anim';


class Dashboard extends React.Component{
	componentDidMount(){
		// only get message if there is non
		if (!this.props.chat.chatMsg.length) {
			this.props.getMsgList();
			this.props.recvMsg();
		}
	}
	render(){
		const { pathname } = this.props.location; 
		const user = this.props.user;
		const navList = [
			{
				path:'/tutor',
				text:'tutor',
				icon:'tutor',
				title:'Tutor List',
				component:Tutor,
				hide:user.type === 'tutor' 
			},
			{
				path:'/student',
				text:'student',
				icon:'student',
				title:'Student List',
				component:Student,
				hide:user.type === 'student' 
			},
			{
				path:'/msg',
				text:'message',
				icon:'msg',
				title:'Message List',
				component:MessageList,
			},
			{
				path:'/profile',
				text:'profile',
				icon:'profile',
				title:'User Profile',
				component:Profile,
			}
		]
		const page = navList.find(elem => elem.path === pathname)
		return page ? (
			<div> 
				<NavBar className='fixed-header' mode='dark'>
					{ page.title }
				</NavBar>
				<div  style={{marginTop:15, height:window.innerHeight - 120,  overflow:'scroll'}}>
					<Switch>
						{navList.map(elem => (
							<Route key={ elem.path } path={ elem.path } component={ elem.component } />
						))}	
					</Switch>
				</div>								
				<NavLinkBar unread={ this.props.chat.unread } data={ navList } />
			</div>
		) : <Redirect to='/msg'/>
	};
}

const mapStateToProps = state => ({ chat: state.chat, user: state.user });
export default connect(
		mapStateToProps,
		{ getMsgList, recvMsg }
		)(Dashboard);