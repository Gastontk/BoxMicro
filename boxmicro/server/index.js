const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/boxmicro");

app.use(express.static(path.join(__dirname, "../build")));

const Todo = mongoose.model("Todo", {
	text: String,
	complete: Boolean
});
const Polygon = mongoose.model("Polygon", {
	city: String,
	coords: {}
});

//temp route for getting setup
// app.get("/working", (req, res) => {
// 	res.send("this route is now working. You have reached /working");
// });

app.get("/*", function(req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

mongoose.connection.once("open", function() {
	app.listen(4000, () => console.log("Server is running on localhost:4000"));
});
