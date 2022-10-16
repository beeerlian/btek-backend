const users = require("express").Router();

const controller = require("../controllers");
const {
	userValidators,
	validate
} = require("../middlewares/users_input_validation");

users.get("/", controller.user.readAll);
users.post("/", userValidators, validate, controller.user.create);
users.get("/:id", controller.user.readById);
users.delete("/:id", controller.user.delete);
users.put("/:id", userValidators, validate, controller.user.update);

module.exports = users;
