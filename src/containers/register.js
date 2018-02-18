import React from 'react';
import Logo from '../components/logo/logo.js';
import { List, InputItem, WhiteSpace, Button, SegmentedControl } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../actions/user'
import chatForm from '../components/chat-form';

@chatForm
class Register extends React.Component{
	handleRegister = () => {
		this.props.register(this.props.state);
	}
	onSegmentedControlChange = (e) => {
    	this.props.handleChange('type', e.nativeEvent.value);	
  	}
	render() {
		return (
			<div>
				{this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo} /> : null}
				<Logo />
				{this.props.user.msg && <p className='error-msg'>{this.props.user.msg}</p>}
				<List>
					<InputItem 
						onChange={val => this.props.handleChange('username', val)}>
						username</InputItem>
					<WhiteSpace />
					<InputItem 
						type="password"
						onChange={val => this.props.handleChange('passwd', val)}>
						password</InputItem>
					<WhiteSpace />
					<InputItem 
						labelNumber={8}
						type="password"
						onChange={val => this.props.handleChange('confirmpasswd', val)}>
						confirm password</InputItem>
					<WhiteSpace />
					
       				<SegmentedControl 
       					onChange={this.onSegmentedControlChange}
       					selectedIndex={this.props.state.type==='tutor' ? 1 : 0} 
       					values={['student', 'tutor']} 
       				/>
				</List>
				<WhiteSpace />
					<Button 
						type="primary"
						onClick={this.handleRegister} 
					>
						Register
					</Button>
			</div>
		);
	}
}

export default connect(
	state => ({user: state.user }), 
	{ register }
	)(Register);
