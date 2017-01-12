import React, { Component } from 'react';

import Skill from "./SkillTree/Skill.js";
import './SkillTree.css';

class SkillTree extends Component {

	getSkillsByCategory(array, categoryName) {
		return array.filter(a => a.category === categoryName).map(skill => <Skill name={skill.name} key={skill.id} avaible={skill.avaible} selected={skill.selected} isSkillSelected={this.props.isSkillSelected}/>);
	}

  render() {
		const skillList = this.props.skills;
    return (
			<div>
				<div id="NoPrerequisTable" className="SkillTable">
					<h2>No prerequis</h2>
					{this.getSkillsByCategory(skillList,'No Prerequis')}
				</div>
				<div id="PhysicalTable" className="SkillTable">
					<h2>Physical</h2>
					{this.getSkillsByCategory(skillList,'Agility')}
				</div>

			</div>
    );
  }
}

export default SkillTree;
