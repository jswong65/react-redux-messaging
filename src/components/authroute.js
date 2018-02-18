import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from '../actions/user';

class AuthRoute extends React.Component{
	componentDidMount() {
		const publicList = ['/login, /register'];
		const pathname = this.props.location.pathname;
		if (publicList.indexOf(pathname) > -1 ){
			return null;
		}
		//obtain user info
		axios.get('/user/info')
			.then(res => {
				if (res.status === 200){
					if (res.data.code === 0){
						//has log in info
						this.props.loadData(res.data.data);
					}else{
						this.props.history.push('/login');
					}
				}
			});
	}
	render() {
		return null
	}
}

// export default withRouter(AuthRoute);
export default withRouter(connect(null, { loadData })(AuthRoute)); 