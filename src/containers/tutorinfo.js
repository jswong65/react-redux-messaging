import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AvatarSelector from '../components/avatar-selector';
import { profileUpdate } from '../actions/user'


class TutorInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			avatar: this.props.user.avatar ? this.props.user.avatar : '',
			title:'',
			desct:'',
			company:'',
			salary:''
		}
	}
	handleChange = (key, val) => {
		this.setState(() => ({
			[key]: val
		}));
	}
	render(){
		const path = this.props.location.pathname;
		const redirect = this.props.redirectTo;
		return (
			<div>
				{this.props.location.state !== 'update' && redirect && redirect!==path ? <Redirect to={this.props.user.redirectTo} /> : null}
				<NavBar mode="dark">User Profile</NavBar>
				<AvatarSelector 
					avatar={this.state.avatar}
					selectAvatar={(imgname) => {
						this.setState({	avatar:imgname });
					}} 
				/>
				<InputItem
					onChange={(val) => this.handleChange('title', val)}
				> Title </InputItem>
				<InputItem
					onChange={(val) => this.handleChange('subject', val)}
				> Subject </InputItem>
				<TextareaItem
					onChange={(val) => this.handleChange('desc', val)}
					rows={3}
					autoHeight
					title='Description'
				/> 
				<Button 
					onClick={() => {
						this.props.profileUpdate(this.state);
						this.props.history.push('/tutor')
					}}
					type='primary'
				>save</Button>
			</div>
		)
	}
}

const mapStateToProps = state => ({user: state.user }); 

export default connect(
		mapStateToProps,
		{ profileUpdate }
	)(TutorInfo);