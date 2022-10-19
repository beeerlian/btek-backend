const model = require("../models");
exports.login = async (req, res) => {
	try {
		const result = await model.user.findUserByEmailAndPass(req.body);

		if (!result.rows[0]) {
			throw new Error("login failed, wrong email and password");
		}
		const user = result.rows[0];
		return res.json({
			success: true,
			message: "Logged in successfully",
			results: user,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};

exports.register = async (req, res) => {
	try {
		const find = await model.user.findUserByEmail(req.body);
		if (find.rows[0]) {
			throw new Error("Email already taken");
		}
		const insert = await model.user.insertUser(req.body);
		const user = insert.rows[0];
		return res.json({
			success: true,
			message: "User registerd successfully",
			results: user,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};
exports.resetPassword = async (req, res) => {
	try {
		const insert = await model.user.updatePasswordById(req.params.id, req.body);
		const user = insert.rows[0];
		return res.json({
			success: true,
			message: "password reset successfully",
			results: user,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};
exports.forgotPassword = async (req, res) => {
	try {

		const find = await model.user.findUserByEmail(req.body);
		if (!find.rows[0]) {
			throw new Error("User not found");
		}
		const user = find.rows[0];
		const results = {
			id: user.id,
			email: user.email,
			currentPassword: user.password,
			route: `/auth/${user.id}/reset-password`
		};
		return res.json({
			success: true,
			message: "To change your password access route in below",
			results: results,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};
