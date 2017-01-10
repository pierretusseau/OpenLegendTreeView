import React, { Component } from 'react';

import Button from "./AttributeTree/Button";

class AttributeTree extends Component {
	// getAttributeByCategory(filteredCategory) {
	// 	const attributeArray = this.state.attributeArray;
	// 	console.log(this.attributeArray);
	// 	return this.attributeArray.filter(s => s.category === filteredCategory);
	// 	return "Category"+attributeArray;
	// }
	// getAttributeByCategory() {
	// 	this.attributeArray.map(attribute => <Button name={attribute}/>);
	// }

  render() {
		const attributeArray = this.props.tree
		// console.log(this.props.tree);
    return (
			<div id="AttributeTree">
				<div>
					<h2>Physical</h2>
					{attributeArray.filter(s => s.category === 'Physical').map( attribute => <Button name={attribute.name} key={attribute.id} value={attribute.value}/>)}
				</div>
				<div>
					<h2>Mental</h2>
					{attributeArray.filter(s => s.category === 'Mental').map( attribute => <Button name={attribute.name} key={attribute.id} value={attribute.value}/>)}
				</div>
				<div>
					<h2>Social</h2>
					{attributeArray.filter(s => s.category === 'Social').map( attribute => <Button name={attribute.name} key={attribute.id} value={attribute.value}/>)}
				</div>
				<div>
					<h2>Extraordinary</h2>
					{attributeArray.filter(s => s.category === 'Extraordinary').map( attribute => <Button name={attribute.name} key={attribute.id} value={attribute.value}/>)}
				</div>
			</div>
    );
  }
}

export default AttributeTree;
