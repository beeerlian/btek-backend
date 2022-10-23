const { Pool } = require("pg");

const db = new Pool({
	connectionString: "postgresql://postgres:password@localhost:5432/postgres?schema=public"
});

module.exports = db;
