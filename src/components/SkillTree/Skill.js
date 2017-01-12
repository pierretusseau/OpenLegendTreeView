import React, { Component } from 'react';

import './Skill.css';


class Skill extends Component {

	skillClass(skillAvaible,skillSelected) {
		if ((skillAvaible === true) && (skillSelected === false)) {
			return("skill--block avaible")
		} else if ((skillAvaible === true) && (skillSelected === true)) {
			return("skill--block selected")
		} else {
			return ("skill--block")
		}
	}

	selectSkill() {
		// console.log("Button : AddToCart");
		if(this.props.selected === false) {
			this.props.isSkillSelected(this.props.name);
		}
  }

  render() {
    return (
			<div className="skill">
				<button
					className={this.skillClass(this.props.avaible, this.props.selected)}
					onClick={() => this.selectSkill()}
				>
					<div className="skill--block-wrapper">
						<h3>{this.props.name}</h3>
					</div>
				</button>
			</div>
    );
  }
}

export default Skill;
