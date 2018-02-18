import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import rootReducer from './reducer';
import './config';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunk)
));


// student tutor profile msg 4 pages

ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>), 
	document.getElementById('root')
);

