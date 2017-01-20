import React, { Component } from 'react';

import Skill from "./SkillList/Skill.js";


class SkillList extends Component {

	getId() {
		if(this.props.title === "No Prerequisite"){
			return "NoPrerequisTable";
		} else {
			return "OtherTable";
		}
	}

	filterSkills(filterMe) {
		if(this.props.title === "No Prerequisite"){
			const filteredSkills = filterMe.filter(skill => skill.prerequisites.tier1.Attribute === undefined);
			return filteredSkills;
		} else {
			const filteredSkills = filterMe.filter(skill => skill.prerequisites.tier1.Attribute !== undefined);
			return filteredSkills;
		}
	}

	getSkills(skillArray) {
		const skillList = this.filterSkills(skillArray).map(skill => {
			return (
				<Skill
					key={skill.id}
					name={skill.name}
					cost={skill.cost}
					description={skill.description}
					avaible={skill.avaible}
					selected={skill.selected}
					isSkillSelected={this.props.isSkillSelected}
					isSkillDeselected={this.props.isSkillDeselected}
				/>
			);
		});
		return skillList;
	}


  render() {
    return (
			<div id={this.getId()} className="SkillTable">
				<h2>{this.props.title}</h2>
				<div className="SkillTableWrapper">
					{this.getSkills(this.props.skills)}
				</div>
			</div>
    );
  }
}

export default SkillList;
