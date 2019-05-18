import React, { Component } from "react";
import "./App.css";
import MapPage from "./Components/mapPage";
import GoogleApiWrapper from "./Components/mapPage";

class App extends Component {
	constructor(props) {
		super(props);
		this.data = [];
		this.state = {
			toBeMappedFromServer: []
		};
	}
	sendPolygonToServer = async data => {
		let servresp = await fetch("/gps", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ data: { data } })
		});
		console.log("response", servresp.data);
	};

	componentDidMount() {
		console.log("componentDidMount", this.state);
		fetch("/gps")
			.then(response => {
				return response.json();
			})
			.then(data1 => {
				console.log("data", data1.data);
				this.setState({
					toBeMappedFromServer: data1.data
				});
			});
	}
	// postGPS('hello')
	render() {
		return (
			<div className="App">
				<h1>This is the app.js page</h1>
				<MapPage
					// onClick={this.postGPS}
					sendPolygonToServer={this.sendPolygonToServer}
					toMapData={this.data}
					toBeMappedFromServer={this.state.toBeMappedFromServer}
				/>
			</div>
		);
	}
}

export default App;
