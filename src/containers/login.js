import React from 'react';
import { connect } from 'react-redux';
import { List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import { login } from '../actions/user';
import chatForm from '../components/chat-form';
import Logo from '../components/logo/logo';
import '../index.css'

@chatForm
class Login extends React.Component{
	handleLogin = () => {
		this.props.login(this.props.state);
	}
	register = () => {
		this.props.history.push('/register');
	}
	render() {
		return (
			<div>
				{(this.props.user.redirectTo && this.props.user.redirectTo !== '/login') ? <Redirect to={this.props.user.redirectTo} /> : null}
				<Logo />
				<WingBlank>
					{this.props.user.msg && <p className='error-msg'>{this.props.user.msg}</p>}
					<List>
						<InputItem
							onChange={val => this.props.handleChange('username', val)}
						>
						username</InputItem>
						<WhiteSpace />
						<InputItem
							type="password"
							onChange={val => this.props.handleChange('passwd', val)}
						>
						password</InputItem>
					</List>
					<WhiteSpace />
					<Button onClick={this.handleLogin} type="primary">Log In</Button>
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