const authRouter = require("express").Router();

const { auth } = require("../controllers");
const authz = require("../middlewares/authz");
const { users, check } = require("../middlewares/validator");
const { basicCreds, emailOnlyCreds, resetPasswordCreds } = users;


authRouter.get("/migrate", auth.migrateProfile);
authRouter.post("/login", basicCreds, check, auth.login);
authRouter.post("/register", basicCreds, check, auth.register);
authRouter.post("/reset-password", authz.verify, resetPasswordCreds, check, auth.resetPassword);
authRouter.post("/forgot-password", authz.verify, emailOnlyCreds, check, auth.forgotPassword);

module.exports = authRouter;
