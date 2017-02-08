import React, { Component } from 'react';



class SkillSpecial extends Component {

	render(){
		return(
			<div>
				<h4>Special</h4>
				<p className="skill--block-special">{this.props.special}</p>
			</div>
		);
	}
}

export default SkillSpecial;
