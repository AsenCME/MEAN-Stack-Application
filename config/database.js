require("dotenv").config();
const crypto = require("crypto")
	.randomBytes(256)
	.toString("hex");

module.exports = {
	db: process.env.DB_NAME,
	uri: process.env.MONGODB_URI + this.db,
	secret: crypto,
	port: process.env.PORT,
};
