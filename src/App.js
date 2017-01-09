import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Button from "./components/Button";

class App extends Component {
	constructor() {
		super();
		document.oncontextmenu = function(e) {
			e.preventDefault();
		}
	}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Pour commencer, edit <code>src/App.js</code> and save to reload.
        </p>
				<Button name="Agility"/>
				<Button name="Fortitude"/>
				<Button name="Might"/>
				<Button name="Learning"/>
				<Button name="Logic"/>
				<Button name="Perception"/>
				<Button name="Will"/>
				<Button name="Deception"/>
				<Button name="Persuasion"/>
				<Button name="Presence"/>
				<Button name="Alteration"/>
				<Button name="Creation"/>
				<Button name="Energy"/>
				<Button name="Entropy"/>
				<Button name="Influence"/>
				<Button name="Movement"/>
				<Button name="Prescience"/>
				<Button name="Protection"/>
      </div>
    );
  }
}

export default App;
