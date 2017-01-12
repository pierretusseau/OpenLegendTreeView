import React, { Component } from 'react';

import './Button.css';

class Button extends Component {

  addToAttribute() {
		// console.log("Button : AddToCart");
		if(this.props.value < 9) {
			this.props.incrementFunction(this.props.name);
		}
  }

  deleteFromCart() {
	  if(this.props.value > 0) {
			this.props.decrementFunction(this.props.name);
	  }
  }

  render() {
		// console.log(this.props)
    return (
			<button
				onClick={() => this.addToAttribute()}
				onContextMenu={() => this.deleteFromCart()}
				type="button"
				className="btn btn-primary btn-lg btn-block">
					{this.props.name}
					<br/>
					<span className="ButtonValue">{this.props.value}</span>
			</button>
    );
  }
}

export default Button;
