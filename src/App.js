import React, { Component } from 'react';
import Axios from 'axios';
import yaml from 'js-yaml';
import logo from './logo.png';
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
		name: 				'Fortitude',
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
		name: 				'Energy',
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

class App extends Component {
	constructor() {
		super();

		// Prevent click
		document.onClick = function(e) {
			e.preventDefault();
		}
		document.oncontextmenu = function(e) {
			e.preventDefault();
		}

		this.state = {
			attributes: initialAttributes,
			skills: []
		};

		this.addAttributeValue = this.addAttributeValue.bind(this);
		this.lessAttributeValue = this.lessAttributeValue.bind(this);
		this.resetAllAttr = this.resetAllAttr.bind(this);
		this.addSkillValue = this.addSkillValue.bind(this);
		this.lessSkillValue = this.lessSkillValue.bind(this);
		this.resetSkills = this.resetSkills.bind(this);

		let id = 0
		// Définir le tableau des skills
		Axios.get('/feats2.yml').then(res => {
			const skillJson = yaml.load(res.data);
			const skillInitialState = skillJson.map(s => {
				let skill = this.prerequisitesAttributesFeatAccordingToTiers(s, 1);
				if (skill.requiredType === 0) {
					id++;
					return Object.assign({}, skill, { id:(id-1) , selected: false , avaible: true , skillLevel:0 , skillLevelAtMax: false});
				} else {
					id++;
					return Object.assign({}, skill, { id:(id-1) , selected: false , avaible: false , skillLevel:0 , skillLevelAtMax: false});
				}
			});

			// Envoyer tout ce bordel dans le state
			this.setState({
				skills: skillInitialState
			});
		});
	}

	/*
	* return the max number of tiers (level) of the skill
	*/
	// maxNumberOfTiers(skill) {
	// 	const tiersArray = ["tier1", "tier2", "tier3", "tier4", "tier5", "tier6", "tier7", "tier8", "tier9"];
	// 	for (let i = tiersArray.length-1; i >= 0; i--){
	// 		if(skill.prerequisites.tiersArray[i] !== undefined) {
	// 			return i;
	// 		}
	// 	}
	// }

	/*
	* return the current skill with the prerequisites according to the tier
	*/
	prerequisitesAttributesFeatAccordingToTiers(skill, tier) {
		const s = skill;
		if (tier !== 0) {
			tier = "tier" + tier;
		} else {
			tier = "tier1";
		}
		if(s.name.includes("Attack Specializati"))
		console.log("TIERS : " + tier);
		// Si any est undefined dans le tier
		if((s.prerequisites[tier].any === undefined)) {
				// 0 => Si Prérequis ne contiennent ni attribut ni feat require
			if((s.prerequisites[tier].Attribute === undefined) && (s.prerequisites[tier].Feat === undefined)){
				return Object.assign({}, s, {requiredType: 0});
				// 1 => Si Prérequis ne contiennent pas d'attribut mais un Feat prérequis
			} else if ((s.prerequisites[tier].Attribute === undefined) && (s.prerequisites[tier].Feat !== undefined)) {
					const requireFeatInject = Object.values(s.prerequisites[tier].Feat);
					return Object.assign({}, s, {requiredType: 1, requiredFeat: requireFeatInject});
				// 2 => Si Prérequis contient un/des attribut(s) mais pas de Feat prérequis
			} else if ((s.prerequisites[tier].Attribute !== undefined) && (s.prerequisites[tier].Feat === undefined)) {
					const requireAttributeInject = Object.values(s.prerequisites[tier].Attribute);
					return Object.assign({}, s, {requiredType: 2, requiredAttribute: requireAttributeInject});
					// 3 => Sinon (Attribute ET Feat prérequis pour le débloquer)
			} else {
					const requireFeatInject = Object.values(s.prerequisites[tier].Feat);
					const requireAttributeInject = Object.values(s.prerequisites[tier].Attribute);
					return Object.assign({}, s, {requiredType: 3, requiredAttribute: requireAttributeInject, requiredFeat: requireFeatInject});
				}

		// Si any defined dans le tier
		} else {
				// 1 => Si Prérequis ne contiennent pas d'attribut mais un Feat prérequis
				if ((s.prerequisites[tier].any.Attribute === undefined) && (s.prerequisites[tier].any.Feat !== undefined)) {
					const requireFeatInject = Object.values(s.prerequisites[tier].any.Feat);
					return Object.assign({}, s, {requiredType: 1.1, requiredFeat: requireFeatInject});
				// 2 => Si Prérequis contient un/des attribut(s) mais pas de Feat prérequis
				} else if ((s.prerequisites[tier].any.Attribute !== undefined) && (s.prerequisites[tier].any.Feat === undefined)) {
						const requireAttributeInject = Object.values(s.prerequisites[tier].any.Attribute);
						return Object.assign({}, s, {requiredType: 2.1, requiredAttribute: requireAttributeInject});
						// 3 => Sinon (Attribute ET Feat prérequis pour le débloquer)
				} else {
						const requireFeatInject = Object.values(s.prerequisites[tier].any.Feat);
						const requireAttributeInject = Object.values(s.prerequisites[tier].any.Attribute);
						return Object.assign({}, s, {requiredType: 3.1, requiredAttribute: requireAttributeInject, requiredFeat: requireFeatInject});
					}
		}
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
		const newSkills = this.isThisSkillAvaible(newAttributes);
		this.setState({
			attributes: newAttributes,
			skills: newSkills
		});
	}

	lessAttributeValue(attributeName) {
		console.log("less Attribute value ");
		console.log("---------------------");
		const oldAttributes = this.state.attributes;
		const newAttributes = oldAttributes.map(s => {
			if (s.name === attributeName) {
				return Object.assign({}, s, { value: s.value - 1 });
			} else {
				return s;
			}
		});
		const newSkills = this.isThisSkillNoAvaible(newAttributes);
		this.setState({
			attributes: newAttributes,
			skills: newSkills
		});

	}

	resetAllAttr() {
		const oldValues = this.state.skills;
		const newValues = oldValues.map(s => {
			s = this.prerequisitesAttributesFeatAccordingToTiers(s, 1);
			if((s.prerequisites.tier1.Attribute !== undefined) || (s.prerequisites.tier1.any !== undefined)) {
				return Object.assign({}, s, {avaible: false, selected: false , skillLevel: 0, skillLevelAtMax: false})
			} else {
				return Object.assign({}, s, {selected: false , skillLevel: 0, skillLevelAtMax: false})
			}
		});
		this.setState({
			attributes: initialAttributes,
			skills: newValues
		});
	}
	// Skills
	// isPrerequisValidated(attrList,featList) {
	// 	if(attrList !== undefined) {
	// 		const isPrerequisValidation = prerequisiteAttributeList.map(prere => {
	// 			const filteredAttribute = attributes.filter(a => a.name === prere);
	// 			if(filteredAttribute[0].value >= requiredLevel) {
	// 				return true;
	// 			} else {
	// 				return false;
	// 			}
	// 		});
	// 	}
	// 	else if(featList !== undefined) {
	//
	// 	}
	// 	else {
	// 		return undefined;
	// 	}
	// }

	isThisSkillAvaible(attributes) {
		const oldSkills = this.state.skills
		// Pour chaque skill
		let newSkills = oldSkills.map(s => {
			return this.updateAvailabality(s, attributes);
		});
		newSkills = this.isThisSkillCanBeAvailable(newSkills);
		return newSkills;
	}

	updateAvailabality(s, attributes){
			// Si un tableau d'attrtibut existe
			if(s.requiredAttribute !== undefined){
				const attributeArray = s.requiredAttribute;
				// Déclarer tableau vide qui contiendra la valeur requise
				const requiredLevel = []
				// Déclarer tableau vide qui contiendra la liste des attributs possibles
				const prerequisiteAttributeList = [];
				attributeArray.map(attr => {
					const prerequisiteAttributeName = Object.keys(attr)[0];
					if(prerequisiteAttributeName !== "Any Extraordinary") {
						return(prerequisiteAttributeList.push(prerequisiteAttributeName));
					} else {
						return(attributes.filter(a => a.category === "Extraordinary").map(a => {
							return(prerequisiteAttributeList.push(a.name));
						}));
					}
				});
				const prerequisiteLevel = Object.values(attributeArray[0]);
				requiredLevel.push(prerequisiteLevel[0]);

				// Vérifier si un des attribute requis est équivalent ou plus grand que le niveau de prérequis
				// Si possède une skill parent
					// Si cette skill est selected
					// TRUE
					// Sinon
					// FALSE
				// Sinon
				const isPrerequisValidation = prerequisiteAttributeList.map(prere => {
					const filteredAttribute = attributes.filter(a => a.name === prere);
						if(filteredAttribute[0].value >= requiredLevel) {
							return true;
						} else {
							return false;
						}
				});
				const isPrerequisValidated  = isPrerequisValidation.reduce((a,b)=>(a+b));
				// vérifier si l'agilité est équivalent au niveau de prérequis
				if(s.requiredType === 1.1 || s.requiredType === 2.1 || s.requiredType === 3.1) {
					if((isPrerequisValidated > 0) || (isPrerequisValidated === true)) {
							return Object.assign({}, s, {avaible : true});
						}
					else {
						return Object.assign({}, s);
					}
				} else {
					if((isPrerequisValidated === isPrerequisValidated.length) || (isPrerequisValidated === true)) {
							return Object.assign({}, s, {avaible : true});
						}
					else {
						return Object.assign({}, s);
					}
				}
			} else {
					// console.log("Add attribute :  procédure normale");
				return Object.assign({}, s);
			}
			// A partir de là, j'ai rempli requiredLevel et requiredAttributes /////////////
	}

	isThisSkillNoAvaible(attributes) {
		console.log("is this skill no avaible");
		console.log("---------------------");
		const oldSkills = this.state.skills
		// Pour chaque skill
		let newSkills = oldSkills.map(s => {
		 return this.updateNoAvailability(s , attributes)
		});
		newSkills = this.isThisSkillCanBeAvailable(newSkills);
		return newSkills;
	}

	updateNoAvailability(s, attributes){
		if(s.requiredAttribute !== undefined){
			const attributeArray = s.requiredAttribute;
			// Déclarer tableau vide qui contiendra la valeur requise
			const requiredLevel = []
			// Déclarer tableau vide qui contiendra la liste des attributs possibles
			const prerequisiteAttributeList = [];
			attributeArray.map(attr => {
				const prerequisiteAttributeName = Object.keys(attr)[0];
				if(prerequisiteAttributeName !== "Any Extraordinary") {
					return(prerequisiteAttributeList.push(prerequisiteAttributeName));
				} else {
					return(attributes.filter(a => a.category === "Extraordinary").map(a => {
						return(prerequisiteAttributeList.push(a.name));
					}));
				}
			});
			const prerequisiteLevel = Object.values(attributeArray[0]);
			requiredLevel.push(prerequisiteLevel[0]);

			// Vérifier si un des attribute requis est équivalent ou plus grand que le niveau de prérequis
			const isPrerequisValidation = prerequisiteAttributeList.map(prere => {
				const filteredAttribute = attributes.filter(a => a.name === prere);
				if(filteredAttribute[0].value < requiredLevel) {
					return true;
				} else {
					return undefined;
				}
			});
			const isPrerequisValidated  = isPrerequisValidation.reduce((a,b)=>(a+b));
			// vérifier si l'agilité est équivalent au niveau de prérequis
			if(s.requiredType === 0 || s.requiredType === 1 || s.requiredType === 2 || s.requiredType === 3) {
				if((isPrerequisValidated > 0) || (isPrerequisValidated === false)) {
					s = this.prerequisitesAttributesFeatAccordingToTiers(s, 1);
					let skill = this.prerequisitesAttributesFeatAccordingToTiers(s, s.skillLevel+1);
					skill = this.updateAvailabality(skill, attributes);
					skill = this.updateNoAvailability(skill, attributes);
					return Object.assign({}, s, {avaible : skill.avaible, selected : false, skillLevel: 0, skillLevelAtMax: false});
				} else {
					return Object.assign({}, s);
				}
			} else {
					if((isPrerequisValidated > 0) || (isPrerequisValidated === false)) {
						s = this.prerequisitesAttributesFeatAccordingToTiers(s, 1);
						let skill = this.prerequisitesAttributesFeatAccordingToTiers(s, s.skillLevel+1);
						skill = this.updateAvailabality(skill, attributes);
						skill = this.updateNoAvailability(skill, attributes);
						return Object.assign({}, s, {avaible : skill.avaible, selected : false, skillLevel: 0, skillLevelAtMax: false});
					} else {
						return Object.assign({}, s);
					}
			}
		} else {
			return Object.assign({}, s);
		}
	}

	// Increase level of the current skill
	addSkillValue(skillName) {
		const oldSkills = this.state.skills;
		let newSkills = oldSkills.map(s => {
			const skillListOfPrerequisites = Object.keys(s.prerequisites)
			const maxSkillLevel = skillListOfPrerequisites.length;
			if ((s.name === skillName) && (s.avaible === true) && (s.skillLevel < (maxSkillLevel))) {
					let skill = this.prerequisitesAttributesFeatAccordingToTiers(s, s.skillLevel+1);
					const attributes = this.state.attributes;
					skill = this.updateAvailabality(skill, attributes);
					skill = this.updateNoAvailability(skill, attributes);
					if(skill.avaible) {
						s = this.prerequisitesAttributesFeatAccordingToTiers(s, s.skillLevel+1);
						if(s.skillLevel === (maxSkillLevel - 1)) {
							return Object.assign({}, s, { selected: true , skillLevel: s.skillLevel+1 , skillLevelAtMax: true });
						} else {
							return Object.assign({}, s, { selected: true , skillLevel: s.skillLevel+1});
						}
					} else {
						return s;
					}
				}
			else {
				return s;
			}
		});
		newSkills =  this.isAttributesRequiredAvaible(newSkills);
		this.setState({
			skills: newSkills,
		});
	 //this.isAttributesRequiredAvaible(newSkills);
	}

	lessSkillValue(skillName) {
		const oldSkills = this.state.skills;
		let newSkills = oldSkills.map(s => {
			if ((s.name === skillName) && (s.selected === true) && (s.skillLevel > 1)) {
				s = this.prerequisitesAttributesFeatAccordingToTiers(s, s.skillLevel-1);
				return Object.assign({}, s, { skillLevel: s.skillLevel-1, skillLevelAtMax: false});
			} else if ((s.name === skillName) && (s.selected === true) && (s.skillLevel === 1)) {
				s = this.prerequisitesAttributesFeatAccordingToTiers(s, 1);
				return Object.assign({}, s, {selected: false , skillLevel: s.skillLevel-1, skillLevelAtMax: false});
			} else {
				return s;
			}
		});
		newSkills = this.isAttributesRequiredNoAvaible(newSkills);
		this.setState({
			skills: newSkills,
		});
	}

	resetSkills() {
		const oldSkills = this.state.skills;
		const newSkills = oldSkills.map(s => {
			s = this.prerequisitesAttributesFeatAccordingToTiers(s, 1);
			return Object.assign({}, s, { selected: false , skillLevel: 0, skillLevelAtMax: false});
		});
		this.setState({
			skills: newSkills
		});
	}

	isAttributesRequiredAvaible(oldSkills) {
		const attributes = this.state.attributes
		// Pour chaque skill
		let newSkills = oldSkills.map(s => {
			return this.updateAvailabality(s, attributes);
		});
		newSkills = this.isThisSkillCanBeAvailable(newSkills);
		return newSkills;
	}

	isAttributesRequiredNoAvaible(oldSkills) {
		const attributes = this.state.attributes;
		// Pour chaque skill
		let newSkills = oldSkills.map(s => {
		// Si un tableau d'attrtibut existe
			return this.updateNoAvailability(s, attributes);
		});
		newSkills = this.isThisSkillCanBeAvailable(newSkills);
		return newSkills;
	}

	// Archives de fonctions

	// isSkillAvaible(attributes) {
	// 	const oldSkills = this.state.skills;
	// 	const newSkills = oldSkills.map(s => {
	// 		// if prérequis est présent
	// 		if(s.prerequis!==undefined) {
	// 			// Définir le niveau de prérequis
	// 			const prerequisLevel = s.prerequis.map(pre => pre.value).reduce((a,b)=>(a+b))/s.prerequis.length;
	// 			// Définir les id des attributs à vérifier
	// 			const prerequisAttributeArray = [];
	// 			s.prerequis.map(pre => {
	// 				const prerequisAttribute = pre.name;
	// 				const prerequisAttributeList = attributes.filter(a => a.name === prerequisAttribute)
	// 				prerequisAttributeList.map(attr => {
	// 					prerequisAttributeArray.push(attr.id)
	// 					return attr; //useless but warning if absent
	// 				});
	// 				return pre; //useless but warning if absent
	// 			});
	// 			// Vérifier si un des attribute requis est équivalent ou plus grand que le niveau de prérequis
	// 			const isPrerequisValidation = prerequisAttributeArray.map(prere => {
	// 				if(attributes[prere].value >= prerequisLevel) {
	// 					return true;
	// 				} else {
	// 					return false;
	// 				}
	// 			});
	// 			const isPrerequisValidated  = isPrerequisValidation.reduce((a,b)=>(a+b));
	// 			// vérifier si l'agilité est équivalent au niveau de prérequis
	// 			if((isPrerequisValidated > 0) || (isPrerequisValidated === true)) {
	// 				return Object.assign({}, s, {avaible : true});
	// 			} else {
	// 				return Object.assign({}, s)
	// 			}
	// 		} else {
	// 			return Object.assign({}, s);
	// 		}
	// 	});
	// 	this.setState({
	// 		skills: newSkills,
	// 	});
	// }

	// isSkillNoAvaible(attributes) {
	// 	const oldSkills = this.state.skills;
	// 	const newSkills = oldSkills.map(s => {
	// 		// if prérequis est présent
	// 		if(s.prerequis!==undefined) {
	// 			// Définir le niveau de prérequis
	// 			const prerequisLevel = s.prerequis.map(pre => pre.value).reduce((a,b)=>(a+b))/s.prerequis.length;
	// 			// Définir les id des attributs à vérifier
	// 			const prerequisAttributeArray = [];
	// 			s.prerequis.map(pre => {
	// 				const prerequisAttribute = pre.name;
	// 				const prerequisAttributeList = attributes.filter(a => a.name === prerequisAttribute)
	// 				prerequisAttributeList.map(attr => {
	// 					prerequisAttributeArray.push(attr.id)
	// 					return attr; //useless but warning if absent
	// 				});
	// 				return pre; //useless but warning if absent
	// 			});
	// 			// Vérifier si un des attribute requis est équivalent ou plus grand que le niveau de prérequis
	// 			const isPrerequisValidation = prerequisAttributeArray.map(prere => {
	// 				if(attributes[prere].value < prerequisLevel) {
	// 					return true;
	// 				} else {
	// 					return undefined;
	// 				}
	// 			});
	// 			const isPrerequisValidated  = isPrerequisValidation.reduce((a,b)=>(a+b));
	// 			// vérifier si l'agilité est équivalent au niveau de prérequis
	// 			if((isPrerequisValidated > 0) || (isPrerequisValidated === false)) {
	// 				return Object.assign({}, s, {avaible : false, selected : false});
	// 			} else {
	// 				return Object.assign({}, s)
	// 			}
	// 		} else {
	// 			return Object.assign({}, s);
	// 		}
	// 	});
	// 	this.setState({
	// 		skills: newSkills,
	// 	});
	// }

	/*
	* check if this skill can be available and update it if necessary
	* parameters string[] attributes
	* void
	*/
		isThisSkillCanBeAvailable(oldSkills) {
			const newSkills = oldSkills.map(s => {
				if(s.requiredType === 1) {
					if(this.checkAllParentUnlocked(s.requiredFeat, oldSkills)) {
						return Object.assign({}, s, {avaible : true});
					} else {
						return Object.assign({}, s, {avaible : false, selected : false, skillLevel: 0});
					}
				} else if (s.requiredType === 3) {
					if(s.avaible) {
						if(this.checkAllParentUnlocked(s.requiredFeat, oldSkills)) {
							return Object.assign({}, s, {avaible : true});
						} else {
							return Object.assign({}, s, {avaible : false, selected : false, skillLevel: 0});
						}
					}
					return Object.assign({}, s);
				} else if (s.requiredType === 1.1) {
					if(this.checkOneParentUnlocked(s.requiredFeat, oldSkills)) {
						return Object.assign({}, s, {avaible : true});
					} else {
						return Object.assign({}, s, {avaible : false, selected : false, skillLevel: 0});
					}
				} else if (s.requiredType === 3.1) {
					if(!s.avaible) {
						if(this.checkOneParentUnlocked(s.requiredFeat, oldSkills)) {
							return Object.assign({}, s, {avaible : true});
						} else {
							return Object.assign({}, s, {avaible : false, selected : false, skillLevel: 0});
						}
					}
				}
				return Object.assign({}, s);
			});
			return newSkills;
		}

		/*
		* check if all parents skills of the current skill are activated
		* parameters string[] requiredFeat
		* return boolean
		*/
		checkAllParentUnlocked(requiredFeat, currentSkills){
			// console.log("check parent unlocked ");
			for (let i=0; i < requiredFeat.length; i++) {
				if (!this.isThisSpecificSkillActivated(requiredFeat[i], currentSkills)) {
					return false;
				}
			}
			return true;
		}

		checkOneParentUnlocked(requiredFeat, currentSkills){
			for (let i=0; i< requiredFeat.length; i++) {
				if(this.isThisSpecificSkillActivated(requiredFeat[i], currentSkills)) {
					return true;
				}
			}
			return false;
		}

		/*
		* check if this skill is activated (with correct level)
		* parameters string skillNameribute
		* return boolean
		*/
		isThisSpecificSkillActivated(skillName, currentSkills) {
			let level = this.convertRomanNumbers(skillName);
			// dirty way to do that, need to return the indexes and check if there is any roman number in it
			skillName = skillName.slice(0, -5);
			for (let i = 0; i < currentSkills.length; i++){
				if(currentSkills[i].name.includes(skillName)) {
					if(currentSkills[i].selected && currentSkills[i].skillLevel === level) {
						return true;
					}
				}
			}
			return false;
		}

		/*
		* convert level Roman numbers to an integer
		* parameters string skillName
		* return int
		*/
		convertRomanNumbers(skillName) {
			let int_roman_numbers = [' I', ' II', ' III', ' IV', ' V', ' VI', ' VII', ' VIII', ' IX'];
			for (let i = 0; i < int_roman_numbers.length; i++){
				if (skillName.endsWith(int_roman_numbers[i])){
					return i+1;
				}
			}
			return 1;
		}

		removeLevelStringFromSkill(skillName){

		}

  render() {
		if(this.state.skills.length === 0) {
			return (
				<div className="App">
				<div className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h2>OpenLegend - Feats TreeView</h2>
				</div>
				<AttributeTree
				tree={this.state.attributes}
				incrementFunction={this.addAttributeValue}
				decrementFunction={this.lessAttributeValue}
				resetFunction={this.resetAllAttr}
				resetSkills={this.resetSkills}
				/>
				</div>
			);
		} else {
			return (
				<div className="App">
				<div className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h2>OpenLegend - Feats TreeView</h2>
				</div>
				<AttributeTree
				tree={this.state.attributes}
				incrementFunction={this.addAttributeValue}
				decrementFunction={this.lessAttributeValue}
				resetFunction={this.resetAllAttr}
				resetSkills={this.resetSkills}
				/>
				<SkillTree
				skills={this.state.skills}
				addSkillValue={this.addSkillValue}
				lessSkillValue={this.lessSkillValue}
				/>
				</div>
			);
		}
  }
}

export default App;
