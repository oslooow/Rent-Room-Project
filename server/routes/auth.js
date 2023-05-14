const router = require("express").Router()
const userController = require("../controllers/userController")

router.post('/login', userController.login)
router.post('/google-login', userController.googleLogin)
router.post('/register', userController.register)

module.exports = router