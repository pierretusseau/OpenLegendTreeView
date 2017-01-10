import React, { Component } from 'react';
import './Skill.css';


class Skill extends Component {

  render() {
		// console.log(this.props)
    return (
			<div className="skill--block">
				<div className="skill--block-wrapper">
					<h1>{this.props.attributes.name}</h1>
				</div>
			</div>
    );
  }
}

export default Skill;
