const User = require("../models/User");

// Router
module.exports = router => {
	let result = {};

	//Routes
	router.post("/register", (req, res) => {
		if (!req.body.email || !req.body.username || !req.body.password) {
			result.success = false;
			result.message = "Insuffucient data";

			res.json(result);
			result = {};
		} else {
			let user = new User({
				email: req.body.email,
				username: req.body.username,
				password: req.body.password,
			});
			user.save((err, product) => {
				if (err) {
					// Check what the error is
					if (err.code === 11000) result.message = "User already exists!";
					else if (err.errors) {
						if (err.errors.email) result.message = err.errors.email.message;
						else if (err.errors.username) result.message = err.errors.username.message;
						else if (err.errors.password) result.message = err.errors.password.message;
					} else result.message = err;
					result.success = false;

					res.json(result);
					result = {};
				} else {
					result.data = {
						email: product.email,
						username: product.username,
						password: product.password,
					};
					result.message = "Successful creation of user";
					result.success = true;

					res.json(result);
					result = {};
				}
			});
		}
	});
	return router;
};
