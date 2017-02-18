import React, { Component } from 'react';

import './Attribute.css';

class Attribute extends Component {


	increaseAttr() {
		if(this.props.value < 9) {
			//console.log("increase");
			this.props.incrementFunction(this.props.name);
			//console.log("update skill by RT");
			//console.log(this.props.updateAvailabilitySkill);
			//this.props.updateAvailabilitySkill(this.props.name);
		}
  }


  decreaseAttr() {
	  if(this.props.value > 0) {
			this.props.decrementFunction(this.props.name);
			//this.props.updateAvailabilitySkill(this.props.name);
	  }
		const thisButton = document.getElementById("attribute-"+this.props.name).children[2];
		thisButton.style.top = "100px";
		thisButton.style.opacity = "0.5";
  }

  render() {
    return (
			<button
				onClick={() => this.increaseAttr()}
				onContextMenu={() => this.decreaseAttr()}
				type="button"
				className="btn btn-primary btn-lg btn-block"
				id={"attribute-"+this.props.name}>
					{this.props.name}
					<br/>
					<span className="ButtonValue">{this.props.value}</span>
					<div className="decreaseAttribute"></div>
			</button>
    );
  }
}

export default Attribute;
