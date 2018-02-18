import React from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component{
	static propTypes = {
		selectAvatar: PropTypes.func.isRequired
	};
	constructor(props){
		super(props);
		this.state={};
		this.avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
							.split(',')
							.map(elem => ({
								icon:require(`../../static/images/avatar/${elem}.png`),
								text:elem
							}));
	}
	render(){
		const gridHeader = (this.state.icon || this.props.avatar)
							? (<div>
								<span>image selcted </span>
								<img style={{width:20}} 
									src={this.state.icon ? this.state.icon : require(`../../static/images/avatar/${this.props.avatar}.png`) } 
									alt="" 
								/>
							  </div>)
							: 'select your profile image';

		return (
			
			<List renderHeader={() => gridHeader}>
				<div>
					<Grid 
						data={this.avatarList} 
						columnNum={5}
						onClick={elem => {
							this.setState(elem);
							this.props.selectAvatar(elem.text);
						}}
					/>
				</div>
			</List>
		)
	}
}

export default AvatarSelector;