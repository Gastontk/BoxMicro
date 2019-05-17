import React from "react";
import GOOGLE_API_KEY from "../Keys/keys";
import {
	Map,
	InfoWindow,
	GoogleApiWrapper,
	Polygon,
	Marker,
	Places,
	SearchBox
} from "google-maps-react";

class DrawingMap extends React.Component {
	constructor(props) {
		super(props);
		this.markerProps = {};

		this.initMap = this.initMap.bind(this);
	}

	initMap(mapProps, map) {
		const { google } = mapProps;

		const drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode: null,
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.TOP_CENTER,
				drawingModes: [
					// google.maps.drawing.OverlayType.MARKER,
					google.maps.drawing.OverlayType.POLYGON
				]
			},
			markerOptions: {
				icon:
					"https://developers.google.com/maps/documentation/javascript/examples/full/images/parking.png"
			},
			polygonOptions: {
				fillColor: "#00FF0"
			},
			map: map
		});
		drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);

		//search bar
		// Create the search box and link it to the UI element.
		var input = document.getElementById("searchWindow");
		let searchBox = new google.maps.places.SearchBox(input);
		// map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

		// Listen for the event fired when the user selects a prediction and retrieve
		// more details for that place.

		console.log("searchBox is ", searchBox);

		var markers = [];
		searchBox.addListener("places_changed", function() {
			console.log("places changed.");
			var places = searchBox.getPlaces();

			if (places.length === 0) {
				return;
			}

			// Clear out the old markers.
			markers.forEach(function(marker) {
				marker.setMap(null);
			});
			markers = [];

			// For each place, get the icon, name and location.
			var bounds = new google.maps.LatLngBounds();
			places.forEach(function(place) {
				if (!place.geometry) {
					console.log("Returned place contains no geometry");
					return;
				}
				var icon = {
					url: place.icon,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25)
				};

				// Create a marker for each place.
				markers.push(
					new google.maps.Marker({
						map: map,
						icon: icon,
						title: place.name,
						position: place.geometry.location
					})
				);

				if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
				// bounds.extend(place.geometry.location);
			});
			map.fitBounds(bounds);
		});

		//polygon testing
		let polygonArray = [];
		let myMarkers = [];
		drawingManager.addListener("polygoncomplete", function(polygon) {
			//add a listener to the polygon so we can do things to it.
			//
			google.maps.event.addListener(polygon, "click", function(event) {
				console.log(polygon);
				//remove polygon on click
				polygon.setMap(map);
			});

			var coordinates = polygon.getPath().getArray();
			polygonArray.push(polygon);
			if (polygonArray.length > 1) {
				console.log("changing previous polygon color");
				polygonArray[polygonArray.length - 2].fillColor = "#ff00ff";
				polygonArray[polygonArray.length - 2].setMap(null);
				setTimeout(function() {
					polygonArray[polygonArray.length - 2].setMap(map);
				}, 10);
			}
			console.log("the polygon array includes: ", polygonArray);

			// console.log(coordinates);
			console.info("The coordinates that make up the polygon are");
			//log each set up lat long for the polygon
			var dimensionsString = "<br>DIMENSIONS: <br>";
			if (coordinates.length > 1) {
				coordinates.forEach(function(coord, index) {
					console.log(coord.lat(), coord.lng(), index);

					if (index < coordinates.length - 1) {
						let distance = distanceInKmBetweenEarthCoordinates(
							coordinates[index].lat(),
							coordinates[index].lng(),
							coordinates[index + 1].lat(),
							coordinates[index + 1].lng()
						);
						dimensionsString =
							dimensionsString +
							(distance * 1000 * 3.2808).toFixed(2) +
							" feet  <br> by ";
						console.log(distance.toFixed(4), "km in length");
					} else {
						let distance = distanceInKmBetweenEarthCoordinates(
							coordinates[index].lat(),
							coordinates[index].lng(),
							coordinates[0].lat(),
							coordinates[0].lng()
						);
						dimensionsString =
							dimensionsString +
							(distance * 1000 * 3.2808).toFixed(2) +
							" feet";
					}
				});
			}
			console.log("dimensionsString ", dimensionsString);

			//grab and attach value in square feet to the input box with id sqfeet
			var sqFeet =
				google.maps.geometry.spherical.computeArea(polygon.getPath()) * 10.7639;
			document.getElementById("sqfeet").value =
				sqFeet.toFixed(3) + " Square Feet";
			//log area in square meters
			console.log(
				"Its area in square meters",
				google.maps.geometry.spherical.computeArea(polygon.getPath())
			);
			console.log(sqFeet, " is the square feet.");

			var marker = new google.maps.Marker({
				position: coordinates[0],
				map: map,
				title: "Dimensions"
			});
			myMarkers.push(marker);
			console.log("markers", myMarkers);
			marker.setMap(map);
			setTimeout(function() {
				marker.setMap(null);
			}, 2000);

			//create a marker at the point of the first coordinate of each polygon created.
			// google.maps.Marker({
			// 	position: coordinates[0],
			// 	map: Map,
			// 	title:
			// 		Math.round(
			// 			google.maps.geometry.spherical.computeArea(polygon.getPath())
			// 		) *
			// 			10.7639 +
			// 		" Square Feet"
			// });
			//Create a popup window and then add a click listener to open the popup on click or hover
			var infowindow = new google.maps.InfoWindow({
				content:
					"SQUARE FEET:<br>" +
					(
						google.maps.geometry.spherical.computeArea(polygon.getPath()) *
						10.7639
					).toFixed() +
					dimensionsString
			});

			marker.addListener("click", function() {
				infowindow.open(Map, marker);
			});
			polygon.addListener("mouseover", function() {
				console.log("hovering");
				marker.setMap(map);
				infowindow.open(Map, marker);
				setTimeout(function() {
					infowindow.close();
				}, 3000);
			});
			infowindow.open(Map, marker);
		});

		/*events and listeners and blah blah*/

		drawingManager.polygonOptions.fillColor = "#00FF00";

		var legal = document.getElementById("isLegal");
		legal.addEventListener("click", function() {
			console.log("inside init and islegal is clicked.");
			drawingManager.polygonOptions.fillColor = "#00FF00";
		});
		var prohibited = document.getElementById("isProhibited");
		prohibited.addEventListener("click", function() {
			console.log("inside init and prohibited is clicked.");
			drawingManager.polygonOptions.fillColor = "#ff0000";
		});

		var degreesToRadians = function(degrees) {
			return (degrees * Math.PI) / 180;
		};
		var distanceInKmBetweenEarthCoordinates = function(lat1, lon1, lat2, lon2) {
			var earthRadiusKm = 6371;

			var dLat = degreesToRadians(lat2 - lat1);
			var dLon = degreesToRadians(lon2 - lon1);

			lat1 = degreesToRadians(lat1);
			lat2 = degreesToRadians(lat2);

			var a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.sin(dLon / 2) *
					Math.sin(dLon / 2) *
					Math.cos(lat1) *
					Math.cos(lat2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			return earthRadiusKm * c;
		};
	}

	render() {
		return (
			<div>
				<div>
					<div>
						<h2>Square Feet</h2>
						<input type="text" id="sqfeet" placeholder="value goes here" />
						<br />
						<br />
					</div>
					<h2>Mark Legal or Prohibited</h2>

					<div id="legals">
						<input
							type="radio"
							name="legal"
							value="legal"
							id="isLegal"
							// onClick={this.clickLegalHandler}
							defaultChecked
						/>{" "}
						Legal
						<br />
						<input
							type="radio"
							name="legal"
							value="prohibited"
							id="isProhibited"
							// onClick={this.clickProhibitedHandler}
						/>{" "}
						Prohibited
						<br />
						<br />
						<br />
					</div>
				</div>
				<br />
				<div id="">
					<label style={{ color: "green", fontSize: "20pt" }}>Search Bar</label>
					<br />
					<input
						style={{ border: "solid green 6px" }}
						type="text"
						id="searchWindow"
						placeholder="search for a city"
					/>
				</div>
				<Map
					style={{
						width: "80%",
						height: "80%",
						marginLeft: "10%",
						border: "solid green 8px"
					}}
					google={window.google}
					onReady={this.initMap}
					onClick={this.onMapClicked}
					initialCenter={{ lat: 47.6062, lng: -122.3321 }}
					zoom={15}
					scaleControl
					eMapApiInternals>
					{/* <Marker
						title={"The marker`s title will appear as a tooltip."}
						name={"Downtown"}
						position={{ lat: 47.60629, lng: -122.3321 }}
					/> */}
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: GOOGLE_API_KEY,
	libraries: ["drawing", "places"]
})(DrawingMap);
