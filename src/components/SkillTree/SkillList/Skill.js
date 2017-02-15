import React, { Component } from 'react';
import SkillSpecial from "./Skill/SkillSpecial.js";
import SkillAttributes from "./Skill/SkillAttributes.js";

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

	skillLeftClick() {
		this.props.addSkillValue(this.props.name);
  }
	skillRightClick() {
		this.props.lessSkillValue(this.props.name);
  }

	hasSpecial() {
		if(this.props.special !== undefined) {
			return(
				<SkillSpecial
					special={this.props.special}
				/>
			);
		}
	}

  render() {
		if(this.props.selected === false) {
	    return (
				<div
					className={this.skillClass(this.props.avaible, this.props.selected)}
					onClick={() => this.skillLeftClick()}
					onContextMenu={() => this.skillRightClick()}
				>
					<div className="skill--block-wrapper">
						<h3>{this.props.name}</h3>
						<p className="skill--block-description">{this.props.description}</p>
						<SkillAttributes
							attributes={[]}
						/>
						<p className="skill--block-cost" data-descr="Skill cost">{this.props.cost[0]}</p>
					</div>
				</div>
	    );
		} else {
			return (
				<div
					className={this.skillClass(this.props.avaible, this.props.selected)}
					onClick={() => this.skillLeftClick()}
					onContextMenu={() => this.skillRightClick()}
				>
					<div className="skill--block-wrapper">
						<h3>{this.props.name}</h3>
						<h4>Description</h4>
						<p className="skill--block-description">{this.props.description}</p>
						<hr/>
						<h4>Effect</h4>
						<p className="skill--block-effect" dangerouslySetInnerHTML={{__html: this.props.effect}}></p>
						{this.hasSpecial()}
						<SkillAttributes
							attributes={[]}
						/>
						<p className="skill--block-cost" data-descr="Skill cost">{this.props.cost[0]}</p>
						<p className="skill--block-level" data-descr="Skill level">{this.props.skillLevel}</p>
					</div>
				</div>
			);
		}
  }
}

export default Skill;
