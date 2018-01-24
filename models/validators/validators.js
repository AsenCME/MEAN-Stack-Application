const emailChecker = email => {
	const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return pattern.test(email);
};

const usernameChecker = username => {
	const pattern = /^[A-Za-z0-9]{3,20}$/;
	return pattern.test(username);
};

const passwordChecker = password => {
	// At least one number
	// At least one special character
	// At least one letter
	// Between 8 and 40
	const pattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,40}$/;
	return pattern.test(password);
};

const emailValidators = [{ validator: emailChecker, message: "Invalid email" }];
const usernameValidators = [{ validator: usernameChecker, message: "Invalid username" }];
const passwordValidators = [{ validator: passwordChecker, message: "Invalid password" }];

exports.emailValidators = emailValidators;
exports.usernameValidators = usernameValidators;
exports.passwordValidators = passwordValidators;
