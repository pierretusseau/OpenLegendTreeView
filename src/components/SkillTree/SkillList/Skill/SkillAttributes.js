import React, { Component } from 'react';

import './SkillAttributes.css';

class SkillAttributes extends Component {

	getAttributesNeededList(attributesNeeded) {
		attributesNeeded.map(attr => {
			return(
				<h4>{attr.keys}</h4>
			);
		});
	}

	render(){
		return(
			<div>
				{this.getAttributesNeededList(this.props.attributes)}
				<p className="skill--block-special" dangerouslySetInnerHTML={{__html: this.props.special}}></p>
			</div>
		);
	}
}

export default SkillAttributes;
