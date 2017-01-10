import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AttributeTree from "./components/AttributeTree.js";
// import Test from "./components/Test.js";
// import Skill from "./components/AttributeTree/SkillTree/Skill.js";

class App extends Component {
	constructor() {
		super();
		document.oncontextmenu = function(e) {
			e.preventDefault();
		}
		document.onClick = function(e) {
			e.preventDefault();
		}
	}

  render() {
		const store = [
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
				name: '				Might',
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
				name: '				Logic',
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
				name: '				Will',
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
		// console.log(store);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Pour commencer, edit <code>src/App.js</code> and save to reload.
        </p>
				<AttributeTree tree={store}/>
      </div>
    );
  }
}

export default App;
