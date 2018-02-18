import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import{ Result, List, WhiteSpace, Button, Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { logoutSubmit } from '../actions/user';

class User extends React.Component{
	logout = () => {
		const alert = Modal.alert;
		alert('Log out', 'Are you sure?', [
	      { text: 'Cancel', onPress: () => console.log('cancel') },
	      { text: 'Ok', onPress: () => {
	      	browserCookie.erase('userid');
			this.props.logoutSubmit()
	      }},
	    ])
		
	}
	update = () => {
		this.props.history.push('/' + this.props.user.type + 'info', "update");
	}
	render(){
		const user = this.props.user;
		const Item = List.Item;
		const Brief = Item.Brief;
		return user.avatar ? (			
			
			<div>
				<Result
					img={<img src={require(`../../static/images/avatar/${user.avatar}.png`)} style={{width:50}} alt="" />}
					title={user.username}
					message={user.type === 'tutor' ? user.title : 'student'}
				/>
				<List renderHeader={() => 'Personal Information'}>
					<Item multipleLine>
						{user.major && <Brief>Major: {user.major}</Brief>}	
						{user.year && <Brief>Year: {user.year}</Brief>}	
						{user.subject && <Brief>Subject: {user.subject}</Brief>}	
						{user.desc.split('\n').map((line, index) => (
							<Brief key={index}>{line}</Brief>
						))}	
					</Item>
				</List>
				<WhiteSpace />
				<Button
					type="primary"
					onClick={this.update}
				> Update <WhiteSpace />
				</Button>
				<WhiteSpace />
				<Button 
					type="primary"
					onClick={this.logout}
				>Log Out</Button>

			</div>
		) : <Redirect to={user.redirectTo} />
	}
}

const mapStateToProps = state => ({user: state.user});

export default connect(
		mapStateToProps,
		{ logoutSubmit }
		)(User);
