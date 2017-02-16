import React, { Component } from 'react';

import SkillList from "./SkillTree/SkillList.js";
// import Skill from "./SkillTree/SkillList/Skill.js";

import './SkillTree.css';


class SkillTree extends Component {

  render() {
		// const skillList = this.props.skills;
    return (
			<div id="SkillTree">
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
				<SkillList
					title={"Feats Required"}
					skills={this.props.skills}
					addSkillValue={this.props.addSkillValue}
					lessSkillValue={this.props.lessSkillValue}
				/>
			</div>
    );
  }
}

export default SkillTree;
