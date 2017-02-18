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
					// 0 => Si Prérequis ne contiennent ni attribut ni feat require
				if((s.prerequisites.tier1.Attribute === undefined) && (s.prerequisites.tier1.any === undefined) && (s.prerequisites.tier1.Feat === undefined)){
					id++;
					return Object.assign({}, s, { id:(id-1) , selected: false , avaible: true , skillLevel:0 , skillLevelAtMax: false , requiredType: 0});
					// 1 => Si Prérequis ne contiennent pas d'attribut mais un Feat prérequis
				} else if (((s.prerequisites.tier1.Attribute === undefined) && (s.prerequisites.tier1.any === undefined)) && (s.prerequisites.tier1.Feat !== undefined)) {
					const requireFeatInject = Object.values(s.prerequisites.tier1.Feat);
					id++;
					return Object.assign({}, s, { id:(id-1) , selected: false , avaible: false , skillLevel:0 , skillLevelAtMax: false , requiredType: 1, requiredFeat: requireFeatInject});
					// 2 => Si Prérequis contient un/des attribut(s) mais pas de Feat prérequis
				} else if (((s.prerequisites.tier1.Attribute !== undefined) || (s.prerequisites.tier1.any !== undefined)) && (s.prerequisites.tier1.Feat === undefined)) {
					if(s.prerequisites.tier1.Attribute === undefined) {
						const requireAttributeInject = Object.values(s.prerequisites.tier1.any.Attribute);
						id++;
						return Object.assign({}, s, { id:(id-1) , selected: false , avaible: false , skillLevel:0 , skillLevelAtMax: false , requiredType: 2, requiredAttribute: requireAttributeInject});
					} else {
						const requireAttributeInject = Object.values(s.prerequisites.tier1.Attribute);
						id++;
						return Object.assign({}, s, { id:(id-1) , selected: false , avaible: false , skillLevel:0 , skillLevelAtMax: false , requiredType: 2, requiredAttribute: requireAttributeInject});
					}
					// 3 => Sinon (Attribute ET Feat prérequis pour le débloquer)
				} else {
					const requireFeatInject = Object.values(s.prerequisites.tier1.Feat);
					if(s.prerequisites.tier1.Attribute === undefined) {
						const requireAttributeInject = Object.values(s.prerequisites.tier1.any.Attribute);
						id++;
						return Object.assign({}, s, { id:(id-1) , selected: false , avaible: false , skillLevel:0 , skillLevelAtMax: false , requiredType: 3, requiredAttribute: requireAttributeInject, requiredFeat: requireFeatInject});
					} else {
						const requireAttributeInject = Object.values(s.prerequisites.tier1.Attribute);
						id++;
						return Object.assign({}, s, { id:(id-1) , selected: false , avaible: false , skillLevel:0 , skillLevelAtMax: false , requiredType: 3, requiredAttribute: requireAttributeInject, requiredFeat: requireFeatInject});
					}
				}
			})
			// Envoyer tout ce bordel dans le state
			this.setState({
				skills: skillInitialState
			});
		});

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
		this.isThisSkillAvaible(newAttributes);
	  //this.isThisSkillCanBeAvailable(this.setState.skills, newAttributes);
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
		this.isThisSkillNoAvaible(newAttributes);
	  //this.isThisSkillCanBeAvailable(this.setState.skills, newAttributes);
	}

	resetAllAttr() {
		const oldValues = this.state.skills;
		const newValues = oldValues.map(s => {
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
		const newSkills = oldSkills.map(s => {
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
				if((isPrerequisValidated > 0) || (isPrerequisValidated === true)) {
					if(s.requiredType === 1 || s.requiredType === 3) {
							console.log("Add attribute :  requiredType 1/3 " + s.name);
						if(this.checkParentUnlocked(s.requiredFeat)) {
							console.log("Add attribute :  parents unlocked " + s.name);
							return Object.assign({}, s, {avaible : true});
						}
						else {
								console.log("Add attribute :  parent locked " + s.name);
							return Object.assign({}, s);
						}
					}
					else {
							// console.log("Add attribute :  procédure normale");
						return Object.assign({}, s, {avaible : true});
					}
				} else {
						// console.log("Add attribute :  procédure normale");
					return Object.assign({}, s);
				}
			} else {
					// console.log("Add attribute :  procédure normale");
				return Object.assign({}, s);
			}
			// A partir de là, j'ai rempli requiredLevel et requiredAttributes /////////////
		});
		this.setState({
			skills: newSkills,
		});
	}

	isThisSkillNoAvaible(attributes) {
		const oldSkills = this.state.skills
		// Pour chaque skill
		const newSkills = oldSkills.map(s => {
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
				if((isPrerequisValidated > 0) || (isPrerequisValidated === false)) {
					return Object.assign({}, s, {avaible : false, selected : false, skillLevel: 0, skillLevelAtMax: false});
				} else {
					return Object.assign({}, s);
				}
			} else {
				return Object.assign({}, s);
			}
			// A partir de là, j'ai rempli requiredLevel et requiredAttributes /////////////
		});
		this.setState({
			skills: newSkills,
		});
	}

	// Increase level of the current skill
	addSkillValue(skillName) {
		const oldSkills = this.state.skills;
		let newSkills = oldSkills.map(s => {
			const skillListOfPrerequisites = Object.keys(s.prerequisites)
			const maxSkillLevel = skillListOfPrerequisites.length;
			if ((s.name === skillName) && (s.avaible === true) && (s.skillLevel < (maxSkillLevel))) {
					if(s.skillLevel === (maxSkillLevel - 1)) {
						return Object.assign({}, s, { selected: true , skillLevel: s.skillLevel+1 , skillLevelAtMax: true });
					} else {
						return Object.assign({}, s, { selected: true , skillLevel: s.skillLevel+1});
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
		var newSkills = oldSkills.map(s => {
			if ((s.name === skillName) && (s.selected === true) && (s.skillLevel > 1)) {
				return Object.assign({}, s, { skillLevel: s.skillLevel-1, skillLevelAtMax: false});
			} else if ((s.name === skillName) && (s.selected === true) && (s.skillLevel === 1)) {
				return Object.assign({}, s, { selected: false , skillLevel: s.skillLevel-1, skillLevelAtMax: false});
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
			return Object.assign({}, s, { selected: false , skillLevel: 0, skillLevelAtMax: false});
		});
		this.setState({
			skills: newSkills
		});
	}

	isAttributesRequiredAvaible(oldSkills) {
		const attributes = this.state.attributes
		// Pour chaque skill
		const newSkills = oldSkills.map(s => {
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
				if((isPrerequisValidated > 0) || (isPrerequisValidated === true)) {
					if(s.requiredType === 1 || s.requiredType === 3) {
							console.log("Add attribute :  requiredType 1/3 " + s.name);
						if(this.checkParentUnlocked(s.requiredFeat)) {
							console.log("Add attribute :  parents unlocked " + s.name);
							return Object.assign({}, s, {avaible : true});
						}
						else {
								console.log("Add attribute :  parent locked " + s.name);
							return Object.assign({}, s);
						}
					}
					else {
							// console.log("Add attribute :  procédure normale");
						return Object.assign({}, s, {avaible : true});
					}
				} else {
						// console.log("Add attribute :  procédure normale");
					return Object.assign({}, s);
				}
			} else {
					// console.log("Add attribute :  procédure normale");
				return Object.assign({}, s);
			}
			// A partir de là, j'ai rempli requiredLevel et requiredAttributes /////////////
		});
		return newSkills;
	}

	isAttributesRequiredNoAvaible(oldSkills) {
		const attributes = this.state.attributes;
		// Pour chaque skill
		const newSkills = oldSkills.map(s => {
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
				if((isPrerequisValidated > 0) || (isPrerequisValidated === false)) {
					return Object.assign({}, s, {avaible : false, selected : false, skillLevel: 0, skillLevelAtMax: false});
				} else {
					return Object.assign({}, s);
				}
			} else {
				return Object.assign({}, s);
			}
			// A partir de là, j'ai rempli requiredLevel et requiredAttributes /////////////
		});
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
			//const oldSkills = this.state.skills;
			//const attributes = this.state.attributes;
			//console.log("is this can be availaible", oldSkills);
			console.log("---------------- BEGIN ----------------");
			console.log("---------------- isThisSkillCanBeAvailable ----------------");
			const newSkills = oldSkills.map(s => {
				if(s.requiredType === 1 ||s.requiredType === 3) {
				//	console.log("unlocked : " + this.checkParentUnlocked(s.requiredFeat) + " attri");
					if(this.checkParentUnlocked(s.requiredFeat)) {
						console.log("isThisSkill : youhou! availaible true " + s.name);
						return Object.assign({}, s, {avaible : true});
					} else {
						console.log("isThisSkill : sad! " +s.name);
						return Object.assign({}, s, {avaible : false, selected : false});
					}
				} else {
					return Object.assign({}, s);
				}
			});

			this.setState({
				skills: newSkills,
			});
			console.log("---------------- END ----------------");
		}

		/*
		* check if all parents skills of the current skill are activated
		* parameters string[] requiredFeat
		* return boolean
		*/
		checkParentUnlocked(requiredFeat){
			// console.log("check parent unlocked ");
			for (var i=0; i < requiredFeat.length; i++) {
				if (this.isThisSpecificSkillActivated(requiredFeat[i]) === false) {
					return false;
				}
			}
			console.log("true checked");
			return true;
		}

		/*
		* check if this skill is activated (with correct level)
		* parameters string skillName
		* return boolean
		*/
		isThisSpecificSkillActivated(skillName) {
		//	console.log("is this specific skill ativated : " + skillName);
			//console.log("lol");
			const currentSkills = this.state.skills;
			var level = this.convertRomanNumbers(skillName);
			// console.log(" level :" + level);
			//console.log(" length skills " + currentSkills.length);
			for (var i = 0; i < currentSkills.length; i++){
				//console.log(" compare :" + currentSkills[i].name + " and " + skillName);
				if(currentSkills[i].name.includes(skillName)) {
					//console.log(" includes :" + currentSkills[i].name + " <--- " + skillName);
					if(currentSkills[i].selected && currentSkills[i].skillLevel === level) {
						console.log("OMG YES YOU CAN " + skillName);
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
			//console.log("convert roman");
			var int_roman_numbers = [' I', ' II', ' III', ' IV', ' V', ' VI', ' VII', ' VIII', ' IX'];
			for (var i = 0; i < int_roman_numbers.length; i++){
				if (skillName.includes(int_roman_numbers[i])){
				//	console.log("valeur numerique :"+ i+1 +", roman number :" + int_roman_numbers[i]);
					return i+1;
				}
			}
			return 1;
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
