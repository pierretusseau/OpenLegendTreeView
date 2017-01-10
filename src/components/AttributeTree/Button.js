import React, { Component } from 'react';


class Button extends Component {

  addToAttribute() {
		console.log("Button : AddToCart");
		if(this.props.value < 9) {
			this.props.incrementFunction(this.props.name);
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
		// console.log(this.props)
    return (
			<button onClick={() => this.addToAttribute()}
				type="button"
				className="btn btn-primary btn-lg btn-block">
					{this.props.name}
					<br/>
					{this.props.value}
			</button>
    );
  }
}

export default Button;

//onContextMenu={() => this.deleteFromCart()}
