import React, { Component } from 'react';

import Skill from "./SkillList/Skill.js";


class SkillList extends Component {

	getId() {
		if(this.props.title === "No Prerequisite"){
			return "NoPrerequisTable";
		} else if(this.props.title === "Other") {
			return "OtherTable";
		} else {
			return "SelectedSkillTree";
		}
	}


	filterSkills(filterMe) {
		if(this.props.title === "No Prerequisite"){
			const filteredSkills = filterMe.filter(skill => skill.requiredType === 0);
			return filteredSkills;
		} else if(this.props.title === "Other") {
			const filteredSkills = filterMe.filter(skill => skill.requiredType > 0);
			return filteredSkills;
		} else {
			const filteredSkills = filterMe.filter(skill => skill.selected === true);
			return filteredSkills;
		}
	}

	getSkills(skillArray) {
		if(this.filterSkills(skillArray) !== undefined) {
			const skillList = this.filterSkills(skillArray).map(skill => {
				return (
					<Skill
					key={skill.id}
					name={skill.name}
					cost={skill.cost}
					attributesNeeded={skill.prerequisites.tier1.Attribute}
					description={skill.description}
					effect={skill.effect}
					special={skill.special}
					avaible={skill.avaible}
					selected={skill.selected}
					skillLevel={skill.skillLevel}
					addSkillValue={this.props.addSkillValue}
					lessSkillValue={this.props.lessSkillValue}
					/>
				);
			});
			return skillList;
		}
	}


  render() {
		if(this.props.title !== "SelectedSkillTree") {
			return (
				<div id={this.getId()} className="SkillTable">
					<div className="SkillTableWrapper">
						{this.getSkills(this.props.skills)}
					</div>
				</div>
	    );
		} else {
			return (
				<div id={this.getId()}>
					<div className="SkillTableWrapper">
					{this.getSkills(this.props.skills)}
					</div>
				</div>
			);
		}
  }
}

export default SkillList;
