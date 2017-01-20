import React, { Component } from 'react';

import './Reset.css';

class Button extends Component {

	resetCall() {
		const buttonType = this.props.type;
		if(buttonType === "all") {
			this.props.resetFunction();
		}
		if(buttonType === "skills") {
			this.props.resetSkills();
		}
  }


  render() {
    return (
			<button
				id="ResetButton"
				onClick={() => this.resetCall()}
				className="btn btn-primary btn-lg btn-block">
					{this.props.name}
			</button>
    );
  }
}

export default Button;
