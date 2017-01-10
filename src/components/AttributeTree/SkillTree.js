import React, { Component } from 'react';

import Skill from "./SkillTree/Skill.js";

class SkillTree extends Component {
	pointSpent() {

	}

  render() {
    return (
			<Skill attributes={this.props.attributes}/>
    );
  }
}

export default SkillTree;
