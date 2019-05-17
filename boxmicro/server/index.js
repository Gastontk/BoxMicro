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

//temp route for getting setup
app.get("/working", (req, res) => {
	res.send("this route is now working. You have reached /working");
});

mongoose.connection.once("open", function() {
	app.listen(4000, () => console.log("Server is running on localhost:4000"));
});
