import React, { Component } from 'react';

import './Reset.css';

class Button extends Component {

	resetAttribute() {
		this.props.resetFunction();
  }


  render() {
		// console.log(this.props)
    return (
			<button
				id="ResetButton"
				onClick={() => this.resetAttribute()}
				className="btn btn-primary btn-lg btn-block">
					{this.props.name}
			</button>
    );
  }
}

export default Button;
