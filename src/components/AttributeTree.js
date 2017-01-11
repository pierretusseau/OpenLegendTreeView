import React, { Component } from 'react';

import Button from "./AttributeTree/Button";
import Reset from "./AttributeTree/Reset";

import './AttributeTree.css';


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
				<div className="category--block" id="Physical">
					<h2>Physical : {this.totalCategory(attributeArray,'Physical')}</h2>
					{this.getAttributeByCategory(attributeArray,'Physical')}
				</div>
				<div className="category--block" id="Mental">
					<h2>Mental : {this.totalCategory(attributeArray,'Mental')}</h2>
					{this.getAttributeByCategory(attributeArray,'Mental')}
				</div>
				<div className="category--block" id="Social">
					<h2>Social : {this.totalCategory(attributeArray,'Social')}</h2>
					{this.getAttributeByCategory(attributeArray,'Social')}
				</div>
				<div className="category--block" id="Extraordinary">
					<h2>Extraordinary : {this.totalCategory(attributeArray,'Extraordinary')}</h2>
					{this.getAttributeByCategory(attributeArray,'Extraordinary')}
				</div>
				<Reset name="reset"
					resetFunction={this.props.resetFunction}
				/>
			</div>
    );
  }
}

export default AttributeTree;
