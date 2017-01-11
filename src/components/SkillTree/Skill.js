import React, { Component } from 'react';
import './Skill.css';


class Skill extends Component {

	skillClass(skillState) {
		if (skillState) {
			return("skill--block avaible")
		} else {
			return ("skill--block")
		}
	}

  render() {
    return (
			<div className={this.skillClass(this.props.skillAvaible)}>
				<div className="skill--block-wrapper">
					<h3>Nom : {this.props.name}</h3>
				</div>
			</div>
    );
  }
}

export default Skill;
