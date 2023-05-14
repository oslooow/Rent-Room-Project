const router = require("express").Router()
const Controller = require("../controllers/accomController")
const { authentication } = require("../middlewares/authentications")

router.get('/', authentication, Controller.readUsers)

module.exports = router