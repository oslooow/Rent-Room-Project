const router = require("express").Router();
const Controller = require("../controllers/accomController");
const { authentication } = require("../middlewares/authentications");
const { typeAuthorization } = require("../middlewares/authorization");

router.get("/", authentication, Controller.readTypes);
router.post("/", authentication, Controller.postTypes);
router.delete("/:id",authentication, typeAuthorization, Controller.deleteTypes);

module.exports = router