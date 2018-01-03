import React from 'react';
import { connect } from 'react-redux';
import{ Result, List, WhiteSpace} from 'antd-mobile';

class User extends React.Component{
	render(){
		const props = this.props;
		const Item = List.Item;
		const Brief = Item.Brief;
		return props.user.avatar ? (
			<div>
				<Result
					img={<img src={require(`../../static/images/avatar/${props.user.avatar}.png`)} style={{width:50}} alt="" />}
					title={props.user.username}
					message={props.type === 'tutor' ? props.company : null}
				/>
				<List renderHeader={() => 'Information'}>
					<Item multipleLine>
						{props.user.type}
						{props.user.desc.split('\n').map((line, index) => (
							<Brief key={index}>{line}</Brief>
						))}
						{props.money && <Brief>Salary:{props.money}</Brief>}		
					</Item>
				</List>
				<WhiteSpace />
				<List>
					<Item>Log Out</Item>
				</List>
			</div>
		) : <div>Please Complete Personal Profile</div>
	}
}

const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps)(User);
