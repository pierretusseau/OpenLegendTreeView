import React, { Component } from 'react';

import Button from "./AttributeTree/Button";
import SkillTree from "./AttributeTree/SkillTree.js";


class AttributeTree extends Component {
	getAttributeByCategory(array, categoryName) {
		return array.filter(s => s.category === categoryName).map(attribute => <Button name={attribute.name} key={attribute.id} value={attribute.value} />);
	}

  render() {
		const attributeArray = this.props.tree;
    return (
			<div id="AttributeTree">
				<div>
					<h2>Physical</h2>
					{this.getAttributeByCategory(attributeArray,'Physical')}
				</div>
				<div>
					<h2>Mental</h2>
					{this.getAttributeByCategory(attributeArray,'Mental')}
				</div>
				<div>
					<h2>Social</h2>
					{this.getAttributeByCategory(attributeArray,'Social')}
				</div>
				<div>
					<h2>Extraordinary</h2>
					{this.getAttributeByCategory(attributeArray,'Extraordinary')}
				</div>
				<hr/>
				<div>
					<h2>Test</h2>
					<h3>{}</h3>
					<SkillTree attributes={attributeArray}/>
				</div>
			</div>
    );
  }
}

export default AttributeTree;
