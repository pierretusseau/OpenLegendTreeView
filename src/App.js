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
		name: 				'Alternate Form (I - II)',
		category:			'No Prerequis',
		cost:					3,
		description: 	"You have the ability to transform from one persona to another, whether that be through bodily transformation like a werewolf or through exterior mechinisms, such as a cybernetically enhanced soldier who can call forth a symbiotic mech suit.",
		effect:				"Upon taking this feat, you build a single alternate form using the normal character creation rules, though your attribute and feat points are determined by your tier in this feat: Tier 1 - Half of your primary form's attribute points (rounded up), and 3 feat points. Tier 2 - Same attribute points as your primary form, and 3 feat points per level. // Whenever your primary form gains new attribute points or levels up, your alternate form also gains points according to the above formulas. As a focus action, you may change between any two forms (including your primary form or any alternate form). You maintain this capability in all of your forms. Each form is treated as a completely different character for mechanical purposes - possessing different attributes, feats, perks, flaws, and other defining characteristics. Your alternate form does, however, retain the ability to transform back into your primary form. In order to keep track of hit points, you should always record the total damage that your character has suffered. When transforming, your damage remains with you even if your maximum hit points change. For example, Dr. Jekyll has a max HP of 15 and Mr. Hyde has a max HP of 30. During combat, Mr. Hyde suffers 10 damage. When he later transforms back into Dr. Jekyll, the 10 damage remains and is subtracted from his new maximum, leaving the doctor with 5 out of 15 hit points.",
		special:				"When selecting feats for your alternate form, you may not select the Alternate Form feat. You may take this feat multiple times. Each time grants you access to an additional form.",
		avaible:			true,
		selected:			false
	},
	{
		id:						1,
		name: 				'Area Manipulation (I - V)',
		category:			'No Prerequis',
		cost:					1,
		description: 	"You are exceptionally precise when making area attacks, allowing you to avoid allies who would otherwise be caught in the line of fire.",
		effect:				"For each tier of this feat you possess, you can omit a single 5-foot square from being targeted as part of an area attack.",
		avaible:			true,
		selected:			false
	},
	{
		id:						2,
		name: 				'Armor Mastery (I - II)',
		category:			'No Prerequis',
		cost:					3,
		description: 	"You are specially trained to wear armor into battle, allowing you to maximize its protection and minimize its drawbacks.",
		effect:				"Your training allows you to sleep in armor without gaining one level of the Fatigued bane. In addition, while wearing armor, you gain the following benefits. Tier 1 - The Might prerequisite for wearing armor is reduced by 1. The Armor Bonus granted by the armor is increased by 1. Tier 2 - The Might prerequisite for wearing armor is reduced by 2. The Armor Bonus granted by the armor is increased by 2. Any movement penalty is reduced by 5 feet.",
		avaible:			true,
		selected:			false
	},
	{
		id:						3,
		name: 				'Attribute Substitution (I - II)',
		category:			'No Prerequis',
		cost:					2,
		description: 	"Your prowess in an extraordinary, mental, or social attribute is linked in a way that empowers another attribute of your character, allowing you to use that attribute for tasks normally reserved for another. Examples of Attribute Substitution in play include a martial artist who is physically weak but capable of using internal chi to throw and disable opponents, an anatomical genius who uses their intelligence to make vital strikes rather than their dexterity, or a gunman who's deadshot aim is the result of a dark pact.",
		effect:				"When you purchase this feat, you create a permanent link between two attributes: one stronger (the primary attribute) and one weaker (the dependent attribute). You may use your score in the primary attribute in place of the dependent attribute for different purposes depending on which tier of the feat you have: Tier 1 Making non-attack action rolls Calculating hit points, defenses, and other secondary statistics Meeting feat, bane, and boon prerequisites Other situations at the GM's discretion Tier 2 Making attack action rolls The relationship formed by your two attributes is subject to case-by-case approval by the GM and must be cleared with them first. The link must be logical and consistent with the story you are trying to tell. For example, a bard who subsitutes her Presence for her Might to represent her dance-based melee fighting style would likely not get to use her Presence Score for determining her carrying capacity. Furthermore, the GM should prevent players from creating illogical substitutions that are purely aimed at making their characters unreasonably powerful. Two examples of proper uses of this feat include an analytical warrior or martial artist who analyzes angles, leverage, and physics to substitute Logic for Might, or a gunslinger who channels dark energy, giving her deadshot accuracy and substituting Entropy for Agility.",
		special:				"This feat cannot be purchased to link attributes beyond the initial two (primary and secondary).",
		avaible:			true,
		selected:			false
	},
	{
		id:						4,
		name: 				'Bane Focus',
		category:			'No Prerequis',
		cost:					3,
		description: 	"You are specialized in the use of a particular bane that is iconic to your character.",
		effect:				"Choose a bane that you can invoke. When your roll on a damaging attack exceeds the target's defense by 5 or more (as opposed to the usual 10), you can inflict this bane for free. Each attack is still only capable of inflicting a single bane. When making a bane attack, you get Advantage 2 on the bane attack roll.",
		avaible:			true,
		selected:			false
	},
	{
		id:						5,
		name: 				'Boon Access',
		category:			'No Prerequis',
		cost:					1,
		description: 	"You have a special gift: it might be the result of your heritage, a close encounter with magical energy, or the result of years of training with a master. In any case, although you do not necessarily possess the aptitude to work extraordinary powers for yourself or create a desired effect with your physical capabilities alone, you are able to reliably replicate a single boon.",
		effect:				"When you choose this feat, choose one boon that you do not have the requisite attribute to invoke. The cost of this feat is equal to the Power Level of the chosen boon. You can invoke the chosen boon despite lacking the necessary attribute. For invocation rolls, treat your attribute score as the Power Level of the boon. If the boons has multiple attribute prerequisite options, you choose one attribute when you take this feat. Additionally, you count as having access to the chosen boon for the purpose of meeting feat prerequisites, and your attribute for meeting such prerequisites is equal to the Power Level of the boon. The Boon Access feat bypasses the normal attribute score restrictions based on character level, so a first level character could spend all 6 of their feat points to begin play with access to a Power Level 6 boon. You may acquire this feat multiple times. Each time, select a new boon.",
		special:				"Note that this feat can give access to high-powered boons with a potential for very dramatic impact on the storyline of a game. As such, using this feat to access a boon of Power Level 6 or higher should be approved by the GM before using it in a game. If you ever meet the attribute prerequisite for the chosen boon, you may choose at that time to lose this feat and regain the feat points spent. Re-allocate them as you choose.",
		avaible:			true,
		selected:			false
	},
	{
		id:						6,
		name: 				'Boon Focus (I - III)',
		category:			'No Prerequis',
		cost:					3,
		description: 	"You are specialized in the use a particular boon that is iconic to your character.",
		effect:				"Tier 1 - When you invoke the chosen boon on a single target, you succeed automatically and do not need to make an action roll. You can invoke the boon at any of the power levels you could access via your other means. If the invocation is not a single target, success is not automatic, but you get advantage 2 on the action roll to invoke the boon. Tier 2 - You gain advantage 3 on your action roll to invoke the boon if you are not single-targeting. Additionally, you may invoke the boon one time increment faster, as follows: If the invocation time is a major action or move action, it becomes a minor action. If the invocation time is 1 focus action, it becomes 1 major action. If the invocation time is 1 minute, it becomes 1 focus action. If the invocation time is 10 minutes, it becomes 1 minute. If the invocation time is 1 hour, it becomes 10 minutes. If the invocation time is 8 hours, it becomes 1 hour. Tier 3 - The effect at tier 3 varies based on the duration of the boon:",
		special:				"Note that this feat can give access to high-powered boons with a potential for very dramatic impact on the storyline of a game. As such, using this feat to access a boon of Power Level 6 or higher should be approved by the GM before using it in a game. If you ever meet the attribute prerequisite for the chosen boon, you may choose at that time to lose this feat and regain the feat points spent. Re-allocate them as you choose. If the chosen boon has a duration of ''sustain persists'', you gain advantage 4 on your action roll to invoke if you are not single-targeting. Additionally, the boon is always active for your character and passively persists, without requiring you to use a minor action to sustain it. If the boon is somehow temporarily cancelled (such as by the dispel bane), it resumes automatically at the start of your next turn. If the boon has a different duration, you gain advantage 5 on your action roll to invoke if you are not single-targeting.",
		avaible:			true,
		selected:			false
	},
	{
		id:						7,
		name: 				'Climbing',
		category:			'No Prerequis',
		cost:					2,
		description: 	"You gain the ability to climb effortlessly, as is found in certain vampires, aberrant creatures, and insects.",
		effect:				"You gain a climb speed equal to your base speed and can scale horizontal and vertical surfaces, even climb upside-down, with no fear of falling.",
		avaible:			true,
		selected:			false
	},
	{
		id:						8,
		name: 				'Combat Follow-through',
		category:			'No Prerequis',
		cost:					2,
		description: 	"You are able to decimate many enemies in quick succession, like a legendary Samurai warrior or matchless elven archer.",
		effect:				"Any time you make an attack that reduces a foe to zero hit points or less, you can immediately make an extra attack as a free action.",
		special:			"The triggering attack must be a Might or Agility action roll.",
		avaible:			true,
		selected:			false
	},
	{
		id:						9,
		name: 				'Combat Momentum',
		category:			'No Prerequis',
		cost:					1,
		description: 	"Whether through brute strength or lightning reflexes, you are able to use the momentum of combat to maneuver around the battlefield with ease.",
		effect:				"Every time you bring an enemy to zero hit points or less with a Might or Agility attack, you can immediately move up to your normal speed as a free action.",
		special:				"If you have the Movement attribute, you can use the Teleport boon instead of a normal move.",
		avaible:			true,
		selected:			false
	},
	{
		id:						10,
		name: 				'Companion (I - III)',
		category:			'No Prerequis',
		cost:					3,
		description: 	"Whether a hired bodyguard, a loyal animal sidekick, or a sibling that follows you everywhere, you have the constant and unflinching loyalty of one particular companion character. ",
		effect:				"You gain a companion character that acts independently from you. During combat, your companion acts on its own initiative count and gains the usual assortment of actions, which you may choose. You also get to assign your companion's attributes. The companion's highest attribute is determined by your level and your tier in this feat (see below). Your companion also possesses attributes at each number lower than its highest score. For example, if the companion's highest score is 6, then it also has attributes at scores 5, 4, 3, 2, and 1. The companion gains no special abilities beyond the feat granted per tier. Whenever you gain a level or purchase a new tier in this feat, you may reassign your companion's attributes and feats. Tier 1 - Your companion's highest attribute equals your level minus 2 (minimum of 3, maximum of 9). Your companion gains 1 feat, selected from the ''Simple Build'' NPC feat list in Chapter 7: Running the Game. Tier 2 - Your companion's highest attribute equals your level minus 1 (minimum of 4, maximum of 9). Your companion gains a 2nd feat from the same list. Tier 3 - Your companion's highest attribute equals your level (minimum of 5, maximum of 9). Your companion gains a 3rd feat from the same list. Example Fezzy starts at level one with Companion (Tier II), choosing a wolf for his companion. Based on Fezzy's level and feat tier, his wolf's highest attribute is 4, so he can assign the wolf four attributes at scores 4, 3, 2, and 1. He assigns the following: Agility 4, Perception 3, Might 2, and Fortitude 1. Upon reaching level 2, Fezzy purchases Companion (Tier III), raising the wolf's highest attribute to 5, so Fezzy reassigns the attributes as follows: Perception 5, Agility 4, Might 3, Fortitude 2, Presence 1.",
		special:				"If you ever lose your companion, voluntarily or involuntarily, you regain the feat points that you have spent on this feat and may spend them as usual. ",
		avaible:			true,
		selected:			false
	},
	{
		id:						97,
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
		id:						98,
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

		// Prevent click
		document.onClick = function(e) {
			e.preventDefault();
		}
		document.oncontextmenu = function(e) {
			e.preventDefault();
		}

		this.state = {
			attributes: initialAttributes,
			skills: skillList
		};

		this.addAttributeValue = this.addAttributeValue.bind(this);
		this.lessAttributeValue = this.lessAttributeValue.bind(this);
		this.resetAttributeValue = this.resetAttributeValue.bind(this);
		this.isSkillSelected = this.isSkillSelected.bind(this);
	}

	// Attributes
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
		this.isSkillAvaible(newAttributes);
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
		this.isSkillNoAvaible(newAttributes);
	}
	resetAttributeValue() {
		const oldAttributes = this.state.attributes;
		const newAttributes = oldAttributes.map(s => {
			return Object.assign({}, s, {value : 0})
		});
		this.setState({
			attributes: newAttributes,
			skills: skillList
		});
	}
	// Skills
	isSkillAvaible(attributes) {
		const oldSkills = this.state.skills;
		const newSkills = oldSkills.map(s => {
			// if prérequis est présent
			if(s.prerequis!==undefined) {
				// Définir le niveau de prérequis
				const prerequisLevel = s.prerequis.map(pre => pre.value).reduce((a,b)=>(a+b))/s.prerequis.length;
				// Définir les id des attributs à vérifier
				const prerequisAttributeArray = [];
				s.prerequis.map(pre => {
					const prerequisAttribute = pre.name;
					const prerequisAttributeList = attributes.filter(a => a.name === prerequisAttribute)
					prerequisAttributeList.map(attr => {
						prerequisAttributeArray.push(attr.id)
						return attr; //useless but warning if absent
					});
					return pre; //useless but warning if absent
				});
				// Vérifier si un des attribute requis est équivalent ou plus grand que le niveau de prérequis
				const isPrerequisValidation = prerequisAttributeArray.map(prere => {
					if(attributes[prere].value >= prerequisLevel) {
						return true;
					} else {
						return false;
					}
				});
				const isPrerequisValidated  = isPrerequisValidation.reduce((a,b)=>(a+b));
				// vérifier si l'agilité est équivalent au niveau de prérequis
				if((isPrerequisValidated > 0) || (isPrerequisValidated === true)) {
					return Object.assign({}, s, {avaible : true});
				} else {
					return Object.assign({}, s)
				}
			} else {
				return Object.assign({}, s);
			}
		});
		this.setState({
			skills: newSkills,
		});
	}
	isSkillNoAvaible(attributes) {
		const oldSkills = this.state.skills;
		const newSkills = oldSkills.map(s => {
			// if prérequis est présent
			if(s.prerequis!==undefined) {
				// Définir le niveau de prérequis
				const prerequisLevel = s.prerequis.map(pre => pre.value).reduce((a,b)=>(a+b))/s.prerequis.length;
				// Définir les id des attributs à vérifier
				const prerequisAttributeArray = [];
				s.prerequis.map(pre => {
					const prerequisAttribute = pre.name;
					const prerequisAttributeList = attributes.filter(a => a.name === prerequisAttribute)
					prerequisAttributeList.map(attr => {
						prerequisAttributeArray.push(attr.id)
						return attr; //useless but warning if absent
					});
					return pre; //useless but warning if absent
				});
				// Vérifier si un des attribute requis est équivalent ou plus grand que le niveau de prérequis
				const isPrerequisValidation = prerequisAttributeArray.map(prere => {
					if(attributes[prere].value < prerequisLevel) {
						return true;
					} else {
						return undefined;
					}
				});
				const isPrerequisValidated  = isPrerequisValidation.reduce((a,b)=>(a+b));
				// vérifier si l'agilité est équivalent au niveau de prérequis
				if((isPrerequisValidated > 0) || (isPrerequisValidated === false)) {
					return Object.assign({}, s, {avaible : false, selected : false});
				} else {
					return Object.assign({}, s)
				}
			} else {
				return Object.assign({}, s);
			}
		});
		this.setState({
			skills: newSkills,
		});
	}
	isSkillSelected(skillName) {
		const oldSkills = this.state.skills;
		const newSkills = oldSkills.map(s => {
			if (s.name === skillName) {
				return Object.assign({}, s, { selected: true });
			} else {
				return s;
			}
		});
		this.setState({
			skills: newSkills,
		});
	}
	// console.log(this.isSkillAvaible(this.state.attributes))
	// console.log("Est-ce que ma Skill spécialisé est disponible : "+this.state.skills[1].avaible);
  render() {
		// console.log(this.state.skills)
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
					isSkillSelected={this.isSkillSelected}
				/>
      </div>
    );
  }
}

export default App;
