const routes = require("express").Router();

routes.use("/users", require("../routes/users.route"));
routes.use("/auth", require("../routes/auth.route"));

module.exports = routes;
