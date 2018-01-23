// Requirements
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const config = require("./config/database");

const app = express();

// MongoDB Connection with mongoose
// Could be swapped out with Sequelize for MySQL
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, err => {
	if (err) console.log("Could not connect: ", err);
	else console.log(`Successful connection established with ${config.db}`);
});

// Send index.html file
app.use(express.static(__dirname + "/client/dist/"));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

// Start app
app.listen(config.port, () => {
	console.log(`Listening on port ${config.port}`);
});
