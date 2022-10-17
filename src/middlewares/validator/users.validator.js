const { body, query } = require("express-validator");

exports.basicCreds = [
	body("email").isEmail().normalizeEmail().withMessage("Email is invalid"),
	body("password").isLength({ min: 8 }).withMessage("Password must be 8 character or more"),
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
