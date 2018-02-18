import React from 'react';

const chatForm =(Comp) => {
	return class WrapperComp extends React.Component{
		constructor(props){
			super(props)
			this.state = { type: 'student'}
		}
		handleChange = (key, val) => {
		this.setState(() => ({
			[key]: val
		}));
		}
		render(){
			return (
				<Comp
					handleChange={ this.handleChange } 
					state = { this.state }
					{ ...this.props } 
				/>
			)
		}
	}
}

export default chatForm;