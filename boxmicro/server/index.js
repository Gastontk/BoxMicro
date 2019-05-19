const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

mongoose.connect(
	"mongodb://localhost/boxmicro",
	{ useNewUrlParser: true }
);

app.use(express.static(path.join(__dirname, "../build")));
app.use(express.static(path.join(__dirname, "/src")));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const Todo = mongoose.model("Todo", {
	text: String,
	complete: Boolean
});
const Polygon = mongoose.model("Polygon", {
	coords: [],
	legal: Boolean
});

//temp route for getting setup
// app.get("/working", (req, res) => {
// 	res.send("this route is now working. You have reached /working");
// });

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "../build", "index.html"));
});
//save posted gps polygon to DB
app.post("/gps", function(req, res) {
	console.log("param", req.body);
	let polygon = new Polygon({
		coords: req.body.points,
		legal: req.body.legal
	});
	polygon.save((err, data) => {
		if (err) {
			console.log("err", err);
			res.send(err);
		} else {
			console.log(data);
			res.send(data);
		}
	});
});
// return all gps polygons
app.get("/gps", async (req, res) => {
	let polygons = await Polygon.find();
	console.log("coords returned for get", polygons);
	res.send({ data: polygons });
});

//Delete all entries in DB
app.all("/reset_db", (req, res) => {
	console.log("resetting DB");
	Polygon.deleteMany({}).then(data => {
		res.redirect("/");
	});
});

mongoose.connection.once("open", function() {
	app.listen(4000, () => console.log("Server is running on localhost:4000"));
});
