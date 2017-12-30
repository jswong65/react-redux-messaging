import React from 'react';
import Logo from '../components/logo/logo.js';
import { List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../actions/user'

class Register extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			username:'',
			passwd:'',
			confirmpasswd:'',
			type: 'student'
		};
	}
	handleChange = (key, val) => {
		this.setState(() => ({
			[key]: val
		}));
	}
	handleRegister = () => {
		this.props.register(this.state)
	}
	render() {
		const RadioItem = Radio.RadioItem;
		return (
			<div>
				{this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo} /> : null}
				<Logo />
				{this.props.user.msg && <p className='error-msg'>{this.props.user.msg}</p>}
				<List>
					<InputItem 
						onChange={val => this.handleChange('username', val)}>
						username</InputItem>
					<WhiteSpace />
					<InputItem 
						type="password"
						onChange={val => this.handleChange('passwd', val)}>
						password</InputItem>
					<WhiteSpace />
					<InputItem 
						labelNumber={8}
						type="password"
						onChange={val => this.handleChange('confirmpasswd', val)}>
						confirm password</InputItem>
					<WhiteSpace />
					<RadioItem 
						checked={this.state.type==='student'}
						onChange={() => this.handleChange('type', 'student')}
					>
						student
					</RadioItem>
					<RadioItem 
						checked={this.state.type==='tutor'}
						onChange={() => this.handleChange('type', 'tutor')}
					>
						tutor
					</RadioItem>
					<WhiteSpace />
					<Button 
						type="primary"
						onClick={this.handleRegister} 
					>
						Register
					</Button>
				</List>
			</div>
		);
	}
}

const mapStateToProps = state => ({user: state.user }); 

export default connect(mapStateToProps, { register })(Register);
