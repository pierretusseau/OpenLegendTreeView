import React, { Component } from 'react';

import Skill from "./SkillTree/Skill.js";

class SkillTree extends Component {

	getSkillsByCategory(array, categoryName) {
		return array.filter(a => a.category === categoryName).map(skill => <Skill name={skill.name} key={skill.id} skillAvaible={skill.avaible} />);
	}

  render() {
		const skillList = this.props.skills;
    return (
			<div>
				{this.getSkillsByCategory(skillList,'General')}
				{this.getSkillsByCategory(skillList,'Agility')}
			</div>
    );
  }
}

export default SkillTree;
