import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AttributeTree from "./components/AttributeTree.js";
import SkillTree from "./components/SkillTree.js";

const initialAttributes = [
	{
		id:						0,
		name: 				'Agility',
		category: 		'Physical',
		definition: 	"Dodge attacks, move with stealth, perform acrobatics, shoot a bow, pick a pocket",
		value:				0
	},
	{
		id:						1,
		name: 				'Foritude',
		category: 		'Physical',
		definition: 	"Resist poison, shrug off pain, survive in a desert, wear heavy armor",
		value:				0
	},
	{
		id:						2,
		name: 				'Might',
		category: 		'Physical',
		definition: 	"Wear heavy armor, swing a maul, jump over a chasm, break down a door, wrestle a foe to submission",
		value:				0
	},
	{
		id:						3,
		name: 				'Learning',
		category: 		'Mental',
		definition: 	"Recall facts about history, arcane magic, the natural world, etc.",
		value:				0
	},
	{
		id:						4,
		name: 				'Logic',
		category: 		'Mental',
		definition: 	"Solve riddles, decipher a code, improvise a tool, understand the enemy’s strategy, find a loophole",
		value:				0
	},
	{
		id:						5,
		name: 				'Perception',
		category: 		'Mental',
		definition: 	"Sense ulterior motives, track someone, catch a gut feeling, spot a hidden foe, find a secret door",
		value:				0
	},
	{
		id:						6,
		name: 				'Will',
		category: 		'Mental',
		definition: 	"Maintain your resolve, overcome adversity, resist torture, stay awake on watch, stave off insanity",
		value:				0
	},
	{
		id:						7,
		name: 				'Deception',
		category: 		'Social',
		definition: 	"Tell a lie, bluff at cards, disguise yourself, spread rumors, swindle a sucker",
		value:				0
	},
	{
		id:						8,
		name: 				'Persuasion',
		category: 		'Social',
		definition: 	"Negotiate a deal, convince someone, haggle a good price, pry information",
		value:				0
	},
	{
		id:						9,
		name: 				'Presence',
		category: 		'Social',
		definition: 	"Give a speech, sing a song, inspire an army, exert your force of personality, have luck smile upon you",
		value:				0
	},
	{
		id:						10,
		name: 				'Alteration',
		category: 		'Extraordinary',
		definition: 	"Change shape, alter molecular structures, transmute one material into another",
		value:				0
	},
	{
		id:						11,
		name: 				'Creation',
		category: 		'Extraordinary',
		definition: 	"Channeling higher powers for healing, creation, resurrection, divine might, etc.",
		value:				0
	},
	{
		id:						12,
		name: '				Energy',
		category: 		'Extraordinary',
		definition: 	"Create and control the elements–fire, cold, electricity, etc.",
		value:				0
	},
	{
		id:						13,
		name: 				'Entropy',
		category: 		'Extraordinary',
		definition: 	"Disintegrate matter, kill with a word, create undead, sicken others",
		value:				0
	},
	{
		id:						14,
		name: 				'Influence',
		category: 		'Extraordinary',
		definition: 	"Control the minds of others, speak telepathically, instill supernatural fear, create illusory figments, cloak with invisibility",
		value:				0
	},
	{
		id:						15,
		name: 				'Movement',
		category: 		'Extraordinary',
		definition: 	"Teleport, fly, hasten, slow",
		value:				0
	},
	{
		id:						16,
		name: 				'Prescience',
		category: 		'Extraordinary',
		definition: 	"See the future, read minds or auras, detect magic or evil, scry, communicate with extraplanar entities",
		value:				0
	},
	{
		id:						17,
		name: 				'Protection',
		category: 		'Extraordinary',
		definition: 	"Protect from damage, break supernatural influence, dispel magic, bind demons",
		value:				0
	},
];
const skillList = [
	{
		id:						0,
		name: 				'Skill de base',
		category:			'General',
		definition: 	"Dodge attacks, move with stealth, perform acrobatics, shoot a bow, pick a pocket",
		avaible:			true,
		selected:			false
	},
	{
		id:						1,
		name: 				'Skill spécialisé',
		category:			'Agility',
		definition: 	"Resist poison, shrug off pain, survive in a desert, wear heavy armor",
		prerequis:    [
										{
											name : "Agility",
											value : 1
										},
										{
											name : "Might",
											value : 1
										},
									],
		avaible:			false,
		selected:			false
	},
	{
		id:						2,
		name: 				'Skill spécialisé 2',
		category:			'Agility',
		definition: 	"Resist poison, shrug off pain, survive in a desert, wear heavy armor",
		prerequis:    [
										{
											name : "Agility",
											value : 4
										}
									],
		avaible:			false,
		selected:			false
	}
];

class App extends Component {
	constructor(props) {
		super(props);

		document.oncontextmenu = function(e) {
			e.preventDefault();
		}

		document.onClick = function(e) {
			e.preventDefault();
		}

		this.state = {
			attributes: initialAttributes,
			skills: skillList
		};

		this.addAttributeValue = this.addAttributeValue.bind(this);
		this.lessAttributeValue = this.lessAttributeValue.bind(this);
		this.resetAttributeValue = this.resetAttributeValue.bind(this);
	}

	addAttributeValue(attributeName) {
		const oldAttributes = this.state.attributes;
		const newAttributes = oldAttributes.map(s => {
			if (s.name === attributeName) {
				return Object.assign({}, s, { value: s.value + 1 });
			} else {
				return s;
			}
		});
		this.setState({
			attributes: newAttributes,
		});
	}
	lessAttributeValue(attributeName) {
		const oldAttributes = this.state.attributes;
		const newAttributes = oldAttributes.map(s => {
			if (s.name === attributeName) {
				return Object.assign({}, s, { value: s.value - 1 });
			} else {
				return s;
			}
		});
		this.setState({
			attributes: newAttributes,
		});
	}
	resetAttributeValue() {
		const oldAttributes = this.state.attributes;
		const newAttributes = oldAttributes.map(s => {
			return Object.assign({}, s, {value : 0})
		});
		this.setState({
			attributes: newAttributes,
		});
	}
	skillHasPrerequis(skill,attributes) {
		const thisSkillPrerequis = [];
		const thisSkillPrerequisLevel = (skill.prerequis.map(pre => pre.value).reduce((a,b) => (a+b)))/(skill.prerequis.length);
		skill.prerequis.map(pre => thisSkillPrerequis.push(pre.name))
		// Si il y a des prérequis
		const isThisSkillAvaible = thisSkillPrerequis.map(pre => {
			// filtrer ces prérequis
			attributes.filter(a => a.name === pre).map(attr => {
				// Si attribute >= sur n'importe quel prérequis
				if(attr.value>=thisSkillPrerequisLevel) {
					// return "avaible = true"
					return "caca";
				}
			});
		})
	}


  render() {
		console.log(this.skillHasPrerequis(this.state.skills[1], this.state.attributes))
		// console.log(this.skillHasPrerequis(this.state.skills[0],"prerequis"))
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Pour commencer, edit <code>src/App.js</code> and save to reload.
        </p>
				<AttributeTree
					tree={this.state.attributes}
					incrementFunction={this.addAttributeValue}
					decrementFunction={this.lessAttributeValue}
					resetFunction={this.resetAttributeValue}
				/>
				<hr/>
				<SkillTree
					skills={this.state.skills}
				/>
      </div>
    );
  }
}

export default App;
