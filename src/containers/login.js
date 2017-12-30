import React from 'react';
import Logo from '../components/logo/logo.js';
import { connect } from 'react-redux';
import { List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import { login } from '../actions/user';
import '../index.css'

class Login extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			username:'',
			passwd:''
		};
	}
	handleChange = (key, val) => {
		this.setState(() => ({
			[key]: val
		}));
	}
	handleLogin = () => {
		this.props.login(this.state);
	}
	register = () => {
		this.props.history.push('/register');
	}
	render() {
		return (
			<div>
				{this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo} /> : null}
				<Logo />
				<WingBlank>
					{this.props.user.msg && <p className='error-msg'>{this.props.user.msg}</p>}
					<List>
						<InputItem
							onChange={val => this.handleChange('username', val)}
						>
						username</InputItem>
						<WhiteSpace />
						<InputItem
							type="password"
							onChange={val => this.handleChange('passwd', val)}
						>
						password</InputItem>
					</List>
				
					<Button onClick={this.handleLogin} type="primary">Log in</Button>
						<WhiteSpace />
					<Button onClick={this.register} type="primary">Register</Button>
				</WingBlank>
			</div>
		);
	}
}

const mapStateToProps = state => ({user: state.user }); 

export default connect(
					mapStateToProps,
					{ login }
				)(Login);