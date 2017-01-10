import React, { Component } from 'react';


class Button extends Component {
  constructor() {
		super();
		this.state = {
			quantity: 0
		};
  }

  addToCart() {
		if(this.state.quantity < 9) {
			this.setState({
				quantity: this.state.quantity + 1
			});
		}
  }

  deleteFromCart() {
	  if(this.state.quantity > 0) {
		  this.setState({
			quantity: this.state.quantity - 1
		  });
	  }
  }

  render() {
    return (
			<button onClick={() =>  this.addToCart()} onContextMenu={() => this.deleteFromCart()} type="button" className="btn btn-primary btn-lg btn-block">{this.props.name}<br/>{this.state.quantity}</button>
    );
  }
}

export default Button;
