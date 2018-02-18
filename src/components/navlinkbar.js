import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

	
class NavLinkBar extends React.Component{
	static propTypes = {
		data: PropTypes.array.isRequired
	};

	render(){

		const navList = this.props.data.filter(elem => !elem.hide);
		const { pathname } = this.props.location;
		return(
			<TabBar>
				{navList.map(elem => {
					return (
						<TabBar.Item
							badge={ elem.path === '/msg' && this.props.unread }
							key={ elem.path }
							title={ elem.text }
							//icon={{uri: require(`./img/${elem.icon}.png`)}}
							icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
							selectedIcon={{ uri: 'http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/mobile-2-icon.png' }}
							selected={ pathname === elem.path }
							onPress={() => {
								this.props.history.push(elem.path);
							}}
						/>
					)
				})}
			</TabBar>
		)
	}
}

export default withRouter(NavLinkBar);