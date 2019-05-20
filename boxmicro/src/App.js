import React, { Component } from "react";
import "./App.css";
import MapPage from "./Components/mapPage";
import Location from "./Components/getLocation";
// import { geolocated } from "react-geolocated";

// import GoogleApiWrapper from "./Components/mapPage";

class App extends Component {
	constructor(props) {
		super(props);
		this.data = [];
		this.state = {
			toBeMappedFromServer: null
		};
		this.getPolygons = this.getPolygons.bind(this);
	}

	sendPolygonToServer = async data => {
		let servresp = await fetch("http://gastonkennedy.com:4200/gps", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
	};
	getPolygons = async () => {
		const response = await fetch("http://gastonkennedy.com:4200/gps");
		const polygons = await response.json();
		this.setState({
			toBeMappedFromServer: polygons.data
		});
	};
	componentWillMount(state) {
		console.log("componentWillMount", this.state);

		this.getPolygons();
		// fetch("http://gastonkennedy.com:4200/gps")
		// 	.then(response => {
		// 		return response.json();
		// 	})
		// 	.then(data1 => {
		// 		console.log("data", data1.data);
		// 		this.setState({
		// 			toBeMappedFromServer: data1.data
		// 		});
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});
	}
	// postGPS('hello')
	render() {
		return (
			<div className="App">
				<Location />
				{this.state.toBeMappedFromServer ? (
					<MapPage
						sendPolygonToServer={this.sendPolygonToServer}
						toMapData={this.data}
						toBeMappedFromServer={this.state.toBeMappedFromServer}
					/>
				) : (
					<h1>Loading</h1>
				)}
			</div>
		);
	}
}

export default App;
