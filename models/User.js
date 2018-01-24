const bcrypt = require("bcrypt-nodejs");
const salt = bcrypt.genSaltSync();
const validators = require("./validators/validators");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const definition = {
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		validate: validators.emailValidators,
	},
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate: validators.usernameValidators,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		validate: validators.passwordValidators,
	},
};

const options = { timestaps: true };

const schema = new mongoose.Schema(definition, options);

schema.pre("save", function(next) {
	if (!this.isModified("password")) return next();
	bcrypt.hash(this.password, salt, null, (err, hash) => {
		if (err) return next(err);
		this.password = hash;
		next();
	});
});

schema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", schema);
