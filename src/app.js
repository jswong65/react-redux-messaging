import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/login';
import Register from './containers/register';
import TutorInfo from './containers/tutorinfo';
import StudentInfo from './containers/studentinfo';
import AuthRoute from './components/authroute';
import DashBoard from './containers/dashboard';
import Chat from './containers/chat'

export default class App extends Component{
	constructor(props){
		super(props);
		this.state={
			hasError:false
		}
	}
	componentDidCatch(err, info){
		this.setState({
			hasError:true
		})
	}
	render(){
		return this.state.hasError 
		? <img src={require('./error.png')} alt='error' />
		: (
			<div>
			 	<AuthRoute />
			 	<Switch>
				 	<Route path='/tutorinfo' component={TutorInfo} />
					<Route path='/studentinfo' component={StudentInfo} />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/chat/:userid' component={Chat} />
					<Route component={DashBoard} />
				</Switch>
			</div>
		)
	}
}