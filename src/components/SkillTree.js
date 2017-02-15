import React, { Component } from 'react';

import SkillList from "./SkillTree/SkillList.js";
// import Skill from "./SkillTree/SkillList/Skill.js";

import './SkillTree.css';


class SkillTree extends Component {

	// getSkillsByCategory(array, categoryName) {
	// 	return array.map(skill => {
	// 		if(skill.tags !== null){
	// 			const isThisSkillRequired = skill.tags.map(tag => {
	// 				if(tag === categoryName) {
	// 					return true;
	// 				} else {
	// 					return false;
	// 				}
	// 			});
	// 			const thisSkillIsRequired  = isThisSkillRequired.reduce((a,b)=>(a+b));
	// 			if((thisSkillIsRequired > 0) || (thisSkillIsRequired === true)) {
	// 				return (
	// 					<Skill
	// 						key={skill.id}
	// 						name={skill.name}
	// 						cost={skill.cost}
	// 						description={skill.description}
	// 						avaible={skill.avaible}
	// 						selected={skill.selected}
	// 						addSkillValue={this.props.addSkillValue}
	// 						lessSkillValue={this.props.lessSkillValue}
	// 					/>
	// 				);
	// 			} else {
	// 				return null;
	// 			}
	// 		} else {
	// 			return null;
	// 		}
	// 	});
	// }


  render() {
		// const skillList = this.props.skills;
    return (
			<div id="SkillTree">
				<h2>Your Skills</h2>
				<SkillList
					title={"SelectedSkillTree"}
					skills={this.props.skills}
					addSkillValue={this.props.addSkillValue}
					lessSkillValue={this.props.lessSkillValue}
				/>
				<SkillList
					title={"No Prerequisite"}
					skills={this.props.skills}
					addSkillValue={this.props.addSkillValue}
					lessSkillValue={this.props.lessSkillValue}
				/>
				<SkillList
					title={"Other"}
					skills={this.props.skills}
					addSkillValue={this.props.addSkillValue}
					lessSkillValue={this.props.lessSkillValue}
				/>
			</div>
    );
  }
}

export default SkillTree;



// <div id="NoPrerequisTable" className="SkillTable">
// <h2>No prerequis</h2>
// <div className="SkillTableWrapper">
// {this.getSkillsByCategory(skillList,'No Prerequisite')}
// </div>
// </div>
