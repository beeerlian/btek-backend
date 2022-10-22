const profileRouter = require("express").Router();

const controller = require("../controllers");
const auth = require("../middlewares/authz");

profileRouter.get("/", auth.verify, controller.profile.getById);
profileRouter.get("/:id", auth.verify, controller.profile.getById);
profileRouter.put("/", auth.verify, controller.profile.updateById);
profileRouter.put("/:id", auth.verify, controller.profile.updateById);

module.exports = profileRouter;
