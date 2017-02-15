import React, { Component } from 'react';

import './SkillSpecial.css';


class SkillSpecial extends Component {

	render(){
		return(
			<div className="skill--special-wrapper">
				<h4>Special</h4>
				<p className="skill--block-special" dangerouslySetInnerHTML={{__html: this.props.special}}></p>
			</div>
		);
	}
}

export default SkillSpecial;
