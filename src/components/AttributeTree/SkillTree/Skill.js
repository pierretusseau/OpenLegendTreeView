import React, { Component } from 'react';
import './Skill.css';


class Skill extends Component {

  render() {
    return (
			<div className="skill--block">
				<div className="skill--block-wrapper">
					<h2>Skill {this.props.name}</h2>
					<p>/4</p>
					<p>lorem lorem lorem</p>
				</div>
			</div>
    );
  }
}

export default Skill;
