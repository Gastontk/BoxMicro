const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/boxmicro");


const Todo = mongoose.model("Todo", {
	text: String,
	complete: Boolean
});
const Polygon = mongoose.model("Polygon", {
	city: String,
	coords: {}
});


mongoose.connection.once("open", function() {
	app.listen(4000, () => console.log("Server is running on localhost:4000"));
});
