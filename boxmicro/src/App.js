import React, { Component } from "react";
import "./App.css";
import MapPage from "./Components/mapPage";
import GoogleApiWrapper from "./Components/mapPage";

class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>This is the app.js page</h1>
				<MapPage />
			</div>
		);
	}
}

export default App;
