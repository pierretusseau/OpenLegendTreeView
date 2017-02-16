import React, { Component } from 'react';

import './SkillAttributes.css';

class SkillAttributes extends Component {



	render(){
		// console.log(this.props);
		return(
			<div className="skill--attribute-required">
				{this.props.name}
			</div>
		);
	}
}

export default SkillAttributes;
