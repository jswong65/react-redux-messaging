import React from 'react';
import { NavBar, InputItem, TextareaItem, Button, Picker, List } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AvatarSelector from '../components/avatar-selector';
import { profileUpdate } from '../actions/user'


class StudentInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			avatar: this.props.user.avatar ? this.props.user.avatar : '',
			display: this.props.user.display ? this.props.user.display : '',
			major: this.props.user.major ? this.props.user.major : '',
			year: this.props.user.year ? this.props.user.year : '',
			desc: this.props.user.desc ? this.props.user.desc: '',
		}
		this.year = [
			{label: 'Freshman', value: 'Freshman'},
			{label: 'Sophomore', value: 'Sophomore'}, 
			{label: 'Junior', value: 'Junior'}, 
			{label: 'Senior', value: 'Senior'},  
		]
	}
	handleChange = (key, val) => {
		this.setState(() => ({
			[key]: val
		}));
	}
	render(){
		const path = this.props.location.pathname;
		const redirect = this.props.user.redirectTo;
		const user = this.props.user;
		return (
			<div>
				{this.props.location.state !== 'update' && redirect && redirect !== path ? <Redirect to={this.props.user.redirectTo} /> : null}
				<NavBar mode="dark">User Profile</NavBar>
				<AvatarSelector 
					avatar={this.state.avatar}
					selectAvatar={
						(imgname) => {
						this.setState({
							avatar:imgname
						})
					}} 
				/>
				<InputItem
					onChange={(val) => this.handleChange('major', val)}
					value={this.state.major}
				> Major </InputItem>
				<Picker 
					data={this.year} 
					cols={1} 
					className="forss"
					extra={this.state.year ? this.state.year : "Select"}
					okText="Save"
					dismissText="Cancel"
					onChange={val => this.setState({ year: val })}
          			onOk={val => this.setState({ year: val })}
				>
		          <List.Item arrow="horizontal">Year</List.Item>
		        </Picker>
				<TextareaItem
					onChange={(val) => this.handleChange('desc', val)}
					value={this.state.desc}
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

export default connect(
		state => ({user: state.user }),
		{ profileUpdate }
	)(StudentInfo);