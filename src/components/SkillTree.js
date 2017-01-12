import React, { Component } from 'react';

import Skill from "./SkillTree/Skill.js";
import './SkillTree.css';

class SkillTree extends Component {

	getSkillsByCategory(array, categoryName) {
		return array.filter(a => a.category === categoryName).map(skill => <Skill key={skill.id} name={skill.name} cost={skill.cost} description={skill.description} avaible={skill.avaible} selected={skill.selected} isSkillSelected={this.props.isSkillSelected} isSkillDeselected={this.props.isSkillDeselected}/>);
	}

  render() {
		const skillList = this.props.skills;
    return (
			<div id="SkillTree">
				<div id="NoPrerequisTable" className="SkillTable">
					<h2>No prerequis</h2>
					<div className="SkillTableWrapper">
						{this.getSkillsByCategory(skillList,'No Prerequis')}
					</div>
				</div>
				<div id="PhysicalTable" className="SkillTable">
					<h2>With Prerequis</h2>
					<div className="SkillTableWrapper">
						{this.getSkillsByCategory(skillList,'Agility')}
					</div>
				</div>
			</div>
    );
  }
}

export default SkillTree;
