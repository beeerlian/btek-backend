const authRouter = require("express").Router();

const controller = require("../controllers");
const { users, params, check } = require("../middlewares/validator");
const { basicCreds } = users;
const { isUUID } = params;


authRouter.post("/login", basicCreds, check, controller.auth.login);
authRouter.post("/register", basicCreds, check, controller.auth.register);
authRouter.post("/reset-password", isUUID, check, controller.auth.resetPassword);
authRouter.post("/forgot-password", isUUID, check, controller.auth.forgotPassword);

module.exports = authRouter;
