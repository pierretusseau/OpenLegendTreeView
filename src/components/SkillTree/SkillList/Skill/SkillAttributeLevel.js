import React, { Component } from 'react';

import './SkillAttributeLevel.css';

class SkillAttributeLevel extends Component {



	render(){
		// console.log(this.props);
		return(
			<div className="skill--attribute-level">
				{this.props.value}
			</div>
		);
	}
}

export default SkillAttributeLevel;
