const { body, query } = require("express-validator");

exports.basicCreds = [
	body("email").isEmail().normalizeEmail().withMessage("Email is invalid"),
	body("password").isLength({ min: 8 }).isStrongPassword({ minNumbers: 0 }).withMessage("Password must be 8 character or more and at least contain 1 symbol, 1 uppercase, and 1 lowercase"),
];
exports.passwordOnlyCreds = [
	body("password").isLength({ min: 8 }).isStrongPassword({ minNumbers: 0 }).withMessage("Password must be 8 character or more and at least contain 1 symbol, 1 uppercase, and 1 lowercase"),
];
exports.emailOnlyCreds = [
	body("email").isEmail().normalizeEmail().withMessage("Email is invalid"),
];
exports.search = [
	(req, res, next) => {
		req.query.searchBy = req.query.searchBy || "email";
		req.query.search = req.query.search || "";
		return next();
	},
	query("searchBy").isIn(["email"]).withMessage("the given sortBy type not available"),
	query("search").optional().trim(),
];
