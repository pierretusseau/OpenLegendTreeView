import React, { Component } from 'react';

import Button from "./AttributeTree/Attribute";
import Reset from "./AttributeTree/Reset";
// Import des images
import PhysicalImg from "./AttributeTree/backgrounds/physical.jpg";
import MentalImg from "./AttributeTree/backgrounds/mental.jpg";
import SocialImg from "./AttributeTree/backgrounds/social.jpg";
import ExtraordinaryImg from "./AttributeTree/backgrounds/extraordinary.png";

import './AttributeTree.css';

const PhysicalStyle = {
	backgroundImage: 'url('+PhysicalImg+')',
}
const MentalStyle = {
	backgroundImage: 'url('+MentalImg+')',
}
const SocialStyle = {
	backgroundImage: 'url('+SocialImg+')',
}
const ExtraordinaryStyle = {
	backgroundImage: 'url('+ExtraordinaryImg+')',
}

class AttributeTree extends Component {
	getAttributeByCategory(array, categoryName) {
		return array.filter(a => a.category === categoryName).map(attribute => <Button name={attribute.name} value={attribute.value} key={attribute.id} incrementFunction={this.props.incrementFunction}  decrementFunction={this.props.decrementFunction} />);
	}
	totalCategory(array, categoryName) {
		return array.filter(a => a.category === categoryName).map(attribute => attribute.value).reduce((a,b) => a+b);
	}

  render() {
		const attributeArray = this.props.tree;
    return (
			<div id="AttributeTree">
				<div className="category--block" id="Physical" style={PhysicalStyle}>
					<h2>Physical <span className="attrCategoryTotal">{this.totalCategory(attributeArray,'Physical')}</span></h2>
					{this.getAttributeByCategory(attributeArray,'Physical')}
				</div>
				<div className="category--block" id="Mental" style={MentalStyle}>
					<h2>Mental <span className="attrCategoryTotal">{this.totalCategory(attributeArray,'Mental')}</span></h2>
					{this.getAttributeByCategory(attributeArray,'Mental')}
				</div>
				<div className="category--block" id="Social" style={SocialStyle}>
					<h2>Social <span className="attrCategoryTotal">{this.totalCategory(attributeArray,'Social')}</span></h2>
					{this.getAttributeByCategory(attributeArray,'Social')}
				</div>
				<div className="category--block" id="Extraordinary" style={ExtraordinaryStyle}>
					<h2>Extraordinary <span className="attrCategoryTotal">{this.totalCategory(attributeArray,'Extraordinary')}</span></h2>
					{this.getAttributeByCategory(attributeArray,'Extraordinary')}
				</div>
				<div id="ResetWrapper">
					<Reset
						name="Reset All"
						type="all"
						resetFunction={this.props.resetFunction}
					/>
					<Reset
						name="Reset Skills"
						type="skills"
						resetSkills={this.props.resetSkills}
					/>
				</div>
			</div>
    );
  }
}

export default AttributeTree;
