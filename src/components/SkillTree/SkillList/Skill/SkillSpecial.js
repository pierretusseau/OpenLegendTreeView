import React, { Component } from 'react';



class SkillSpecial extends Component {

	render(){
		return(
			<div>
				<h4>Special</h4>
				<p className="skill--block-special" dangerouslySetInnerHTML={{__html: this.props.special}}></p>
			</div>
		);
	}
}

export default SkillSpecial;
