const router = require("express").Router();
const Controller = require("../controllers/accomController");
const { authentication } = require("../middlewares/authentications");
const { authorization } = require("../middlewares/authorization");

router.get("/", authentication, Controller.history);

module.exports = router;
