const router = require("express").Router();
const Controller = require("../controllers/customerController");
const { custAuthentication } = require("../middlewares/authentications");
const { authorization } = require("../middlewares/authorization");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-login", Controller.googleLoginCustomer);
router.get("/accomodations", Controller.getAccomCust);
router.get("/accomodations/:id", Controller.getAccomDetail);
router.get("/bookmarks",custAuthentication, Controller.getBookmarks);
router.post("/bookmarks/:id",custAuthentication, Controller.postBookmark);

module.exports = router;

