const { body, validationResult } = require("express-validator");

const userValidators = [
	body("email").isEmail().normalizeEmail(),
	body("password").isLength({
		min: 8
	}).withMessage("Password must be at least 8 character"),
];

const validate = (req, res, next) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				errors: errors.array()
			});
		}
		return next();
	} catch (error) {
		return res.status(400).json({
			success: false,
			errors: error
		});
	}
};
module.exports = {
	userValidators,
	validate,
};
