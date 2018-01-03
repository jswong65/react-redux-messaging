import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './containers/login';
import Register from './containers/register';
import TutorInfo from './containers/tutorinfo';
import StudentInfo from './containers/studentinfo';
import AuthRoute from './components/authroute';
import DashBoard from './containers/dashboard';
import Chat from './containers/chat'
import rootReducer from './reducer';
import './config';
import './index.css';

const store = createStore(rootReducer, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
));


// student tutor me msg 4 pages

ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
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
		</BrowserRouter>
	</Provider>), 
	document.getElementById('root')
);

