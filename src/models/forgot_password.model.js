const db = require("../helpers/db.helper");
const table = "forgot_passwords";

exports.insertForgotPassword = (data) => {
	const sql = `INSERT INTO ${table} ("email", "userId") VALUES ($1, $2) RETURNING *`;
	const params = [data.email, data.userId];
	return db.query(sql, params);
};

exports.findForgotPassword = (id) => {
	const sql = `SELECT * FROM ${table} WHERE "userId" = $1 OR "code" = $1`;
	const params = [id];
	return db.query(sql, params);
};

exports.deleteForgotPassword = (id) => {
	const sql = `DELETE FROM ${table} WHERE "userId" = $1 OR "code" = $1 RETURNING *`;
	const params = [id];
	return db.query(sql, params);
};

exports.updateForgotPassword = (id, data) => {
	const column = Object.keys(data);
	const values = Object.values(data);
	const conditionalQuery = [];

	column.forEach((val, i) => {
		conditionalQuery.push(`"${val}" = $${2 + i}`);
	});
	const sql = `UPDATE ${table} SET ${conditionalQuery.join(", ")}  WHERE "userId" = $1 OR "code" = $1 RETURNING *`;
	const params = [id, ...values];
	return db.query(sql, params);
};
