import React from 'react';
import propTypes from 'prop-types';
import { Card, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

class UserCard extends React.Component{
	static propTypes = {
		userList: propTypes.array.isRequired
	}
	handleClick = (val) => {
		this.props.history.push(`/chat/${val._id}`);
	} 
	render(){
		const Header = Card.Header;
		const Body = Card.Body;
		return (<WingBlank>
				{this.props.userList.map(val => (
					val.avatar && (<Card 
							key={val.username}
							onClick={() => this.handleClick(val)}
						>
						<Header
							title={val.username}
							thumb={require(`../../static/images/avatar/${val.avatar}.png`)}
							extra={<span>
									{val.title ? val.subject + " " + val.title : val.major + " " + val.year}
								   </span>}
						></Header>

						<Body>
							{val.desc.split('\n').map(line => (
								<span key={ line }>{ line }</span>
							))}
						</Body>
						
					</Card>)
				))}
			</WingBlank>)
	}	
}

export default withRouter(UserCard);