const authRouter = require("express").Router();

const { auth } = require("../controllers");
const { users, params, check } = require("../middlewares/validator");
const { basicCreds, passwordOnlyCreds, emailOnlyCreds } = users;
const { isUUID } = params;


authRouter.get("/migrate", auth.migrateProfile);
authRouter.post("/login", basicCreds, check, auth.login);
authRouter.post("/register", basicCreds, check, auth.register);
authRouter.post("/:id/reset-password", isUUID, passwordOnlyCreds, check, auth.resetPassword);
authRouter.post("/forgot-password", emailOnlyCreds, check, auth.forgotPassword);

module.exports = authRouter;
