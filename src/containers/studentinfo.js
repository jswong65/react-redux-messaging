import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AvatarSelector from '../components/avatar-selector';
import { profileUpdate } from '../actions/user'


class StudentInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title:'',
			desc:''
		}
	}
	handleChange = (key, val) => {
		this.setState(() => ({
			[key]: val
		}));
	}
	render(){
		const path = this.props.location.pathname;
		const redirect = this.props.user.redirectTo;
		return (
			<div>
				{redirect && redirect!==path ? <Redirect to={this.props.user.redirectTo} /> : null}
				<NavBar mode="dark">User Profile</NavBar>
				<AvatarSelector 
					selectAvatar={(imgname) => {
						this.setState({
							avatar:imgname
						})
					}} 
				/>
				<InputItem
					onChange={(val) => this.handleChange('title', val)}
				> Title </InputItem>
				<InputItem
					onChange={(val) => this.handleChange('company', val)}
				> Company </InputItem>
				<InputItem
					onChange={(val) => this.handleChange('money', val)}
				> Salary </InputItem>
				<TextareaItem
					onChange={(val) => this.handleChange('desc', val)}
					rows={3}
					autoHeight
					title='Description'
				/> 
				<Button 
					onClick={() => {
						this.props.profileUpdate(this.state);
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
	)(StudentInfo);