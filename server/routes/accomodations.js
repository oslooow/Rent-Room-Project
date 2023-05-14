const router = require("express").Router();
const Controller = require("../controllers/accomController");
const { authentication } = require("../middlewares/authentications");
const { authorization } = require("../middlewares/authorization");

router.get("/",authentication, Controller.readAccomodation);
router.post("/", authentication, Controller.postAccomodation);
router.get("/detail", authentication, Controller.readAccomodationDetail);
router.get("/:id", authentication, Controller.readAccomodationById);
router.put("/:id", authentication, Controller.putAccomodation);
router.patch("/:id", authentication, Controller.patchStatus);
router.delete("/:id",authentication,authorization,Controller.deleteAccomodation);

module.exports = router;
