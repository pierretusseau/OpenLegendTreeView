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
		if(this.props.selected === false) {
			this.props.isSkillSelected(this.props.name);
		}
  }
	deselectSkill() {
		if(this.props.selected === true) {
			this.props.isSkillDeselected(this.props.name);
		}
  }

  render() {
    return (
			<div
				className={this.skillClass(this.props.avaible, this.props.selected)}
				onClick={() => this.selectSkill()}
				onContextMenu={() => this.deselectSkill()}
			>
				<div className="skill--block-wrapper">
					<h3>{this.props.name}</h3>
					<p className="skill--block-description">{this.props.description}</p>
					<p className="skill--block-cost">{this.props.cost[0]}</p>
				</div>
			</div>
    );
  }
}

export default Skill;
