import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { Route } from 'react-router-dom';
import NavLinkBar from '../components/navlinkbar';
import Tutor from './tutor';
import Student from './student';
import User from './user';

const Message = () => {
	return <h2>Message</h2>
}
class Dashboard extends React.Component{
	render(){
		const { pathname } = this.props.location; 
		const user = this.props.user;
		const navList = [
			{
				path:'/tutor',
				text:'tutor',
				icon:'tutor',
				title:'Student List',
				component:Tutor,
				hide:user.type==='student' 
			},
			{
				path:'/student',
				text:'student',
				icon:'student',
				title:'Tutor List',
				component:Student,
				hide:user.type==='tutor' 
			},
			{
				path:'/msg',
				text:'message',
				icon:'msg',
				title:'Message List',
				component:Message,
			},
			{
				path:'/profile',
				text:'profile',
				icon:'profile',
				title:'User Profile',
				component:User,
			}
		]
		return (
			<div> 
				<NavBar className='fixed-header' mode='dark'>
					{navList.find(elem => elem.path === pathname).title}
				</NavBar>
				<div style={{marginTop:45}}>
					{navList.map(elem => (
						<Route key={elem.path} path={elem.path} component={elem.component} />
					))}
				</div>								
				<NavLinkBar data={navList} />
			</div>
		)
	};
}

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(Dashboard);